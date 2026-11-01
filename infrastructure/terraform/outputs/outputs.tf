output "public_ip" {
  description = "Elastic IP of the web server"
  value       = aws_eip.web.public_ip
}

output "instance_id" {
  description = "EC2 instance ID"
  value       = aws_instance.web.id
}

output "ssh_command" {
  description = "Command to connect"
  value       = "ssh -i <your-key>.pem ubuntu@${aws_eip.web.public_ip}"
}