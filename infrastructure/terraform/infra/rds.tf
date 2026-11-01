data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

resource "aws_db_subnet_group" "postgres" {
  name       = "${var.project_name}-${var.env}-postgres"
  subnet_ids = data.aws_subnets.default.ids

  tags = {
    Name = "${var.project_name}-${var.env}-postgres"
  }
}

resource "aws_security_group" "postgres" {
  name        = "${var.project_name}-${var.env}-postgres-sg"
  description = "PostgreSQL access from the environment EC2 instance only"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    description     = "PostgreSQL from EC2"
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.web.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_db_instance" "postgres" {
  identifier              = "${var.project_name}-${var.env}-postgres"
  engine                  = "postgres"
  engine_version          = "16"
  instance_class          = "db.t3.micro"
  allocated_storage       = 20
  max_allocated_storage   = 20
  storage_type            = "gp2"
  db_name                 = "rituai"
  username                = var.db_username
  password                = var.db_password
  port                    = 5432
  db_subnet_group_name    = aws_db_subnet_group.postgres.name
  vpc_security_group_ids  = [aws_security_group.postgres.id]
  publicly_accessible     = false
  multi_az                = false
  backup_retention_period = 0
  skip_final_snapshot     = true
  deletion_protection     = false
  apply_immediately       = true

  tags = {
    Name = "${var.project_name}-${var.env}-postgres"
  }
}
