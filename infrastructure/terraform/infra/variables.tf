variable "env" {
  description = "Deployment environment name"
  type        = string
}

variable "project_name" {
  description = "Prefix used in resource names"
  type        = string
}

variable "bucket_name" {
  description = "Reserved state bucket name passed by the root module"
  type        = string
  default     = null
  nullable    = true
}

variable "aws_instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}

variable "aws_instance_count" {
  description = "Number of EC2 instances"
  type        = number
  default     = 1
  validation {
    condition     = var.aws_instance_count == 1
    error_message = "This module currently supports exactly one EC2 instance."
  }
}

variable "key_name" {
  description = "Name of an existing EC2 key pair"
  type        = string
}

variable "allowed_ssh_cidr" {
  description = "CIDR allowed to connect over SSH"
  type        = string
}

variable "db_username" {
  description = "Master username for PostgreSQL"
  type        = string
}

variable "db_password" {
  description = "Master password for PostgreSQL"
  type        = string
  sensitive   = true
}
