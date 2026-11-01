variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-south-1"
}

variable "project_name" {
  description = "Prefix used in resource names"
  type        = string
  default     = "rituai-platform"
}

variable "instance_type" {
  description = "EC2 instance size"
  type        = string
  default     = "t3.micro"
}

variable "key_name" {
  description = "Name of an existing EC2 key pair"
  type        = string
}

variable "allowed_ssh_cidr" {
  description = "Your public IP in CIDR form, for example 203.0.113.10/32"
  type        = string
}