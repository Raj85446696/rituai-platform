data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-server-*"]
  }
}

locals {
  git_branch = var.env == "prod" ? "main" : "dev"

  user_data = <<-EOT
    #!/bin/bash
    set -eux

    # swap, so npm build does not run out of memory
    fallocate -l 2G /swapfile
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    echo '/swapfile none swap sw 0 0' >> /etc/fstab

    # tools
    apt-get update -y
    apt-get install -y git nginx curl
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
    npm install -g pm2

    # nginx
    cat > /etc/nginx/sites-available/rituai <<'NGINX'
    server {
      listen 80 default_server;
      server_name _;
      location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
      }
    }
    NGINX
    rm -f /etc/nginx/sites-enabled/default
    ln -sf /etc/nginx/sites-available/rituai /etc/nginx/sites-enabled/rituai
    systemctl restart nginx

    # app
    sudo -u ubuntu git clone -b ${local.git_branch} https://github.com/Raj85446696/rituai-platform.git /home/ubuntu/rituai-platform
    sudo -u ubuntu bash -lc 'cd /home/ubuntu/rituai-platform/apps/web && npm ci && npm run build && pm2 start npm --name rituai-web -- start && pm2 save'
    env PATH=$PATH:/usr/bin pm2 startup systemd -u ubuntu --hp /home/ubuntu
  EOT
}

resource "aws_instance" "web" {
  count                  = var.aws_instance_count
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.aws_instance_type
  key_name               = var.key_name
  vpc_security_group_ids = [aws_security_group.web.id]
  iam_instance_profile   = aws_iam_instance_profile.ec2.name
  user_data              = local.user_data

  root_block_device {
    volume_size = 20
    volume_type = "gp3"
  }

  tags = {
    Name = "${var.project_name}-${var.env}-web-${count.index}"
  }
}

resource "aws_eip" "web" {
  count    = var.aws_instance_count
  instance = aws_instance.web[count.index].id
  domain   = "vpc"
}

data "aws_vpc" "default" {
  default = true
}

resource "aws_security_group" "web" {
  name        = "${var.project_name}-${var.env}-web-sg"
  description = "SSH from my IP, HTTP and HTTPS from anywhere"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.allowed_ssh_cidr]
  }

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}