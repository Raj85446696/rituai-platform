output "public_ip" {
  description = "Elastic IP of the web server"
  value       = aws_eip.web[0].public_ip
}

output "instance_id" {
  description = "EC2 instance ID"
  value       = aws_instance.web[0].id
}

output "ssh_command" {
  description = "Command to connect"
  value       = "ssh -i <your-key>.pem ubuntu@${aws_eip.web[0].public_ip}"
}

output "postgres_endpoint" {
  description = "Private PostgreSQL endpoint and port"
  value       = "${aws_db_instance.postgres.address}:${aws_db_instance.postgres.port}"
}
