output "public_ip" {
  description = "Elastic IP of the web server"
  value = {
    dev  = module.dev-infra.public_ip
    prod = module.prod-infra.public_ip
  }
}

output "instance_id" {
  description = "EC2 instance ID"
  value = {
    dev  = module.dev-infra.instance_id
    prod = module.prod-infra.instance_id
  }
}

output "ssh_command" {
  description = "Command to connect"
  value = {
    dev  = module.dev-infra.ssh_command
    prod = module.prod-infra.ssh_command
  }
}

output "postgres_endpoint" {
  description = "Private PostgreSQL endpoint for each environment"
  value = {
    dev  = module.dev-infra.postgres_endpoint
    prod = module.prod-infra.postgres_endpoint
  }
}
