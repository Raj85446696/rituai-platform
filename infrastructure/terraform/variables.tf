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
  validation {
    condition     = length(trimspace(var.key_name)) > 0
    error_message = "key_name must be the name of an EC2 key pair that exists in the configured AWS region."
  }
}

variable "allowed_ssh_cidr" {
  description = "Your public IP in CIDR form, for example 203.0.113.10/32"
  type        = string
  validation {
    condition     = var.allowed_ssh_cidr != "0.0.0.0/0"
    error_message = "allowed_ssh_cidr must be your public IP in /32 form; 0.0.0.0/0 exposes SSH to the internet."
  }
}

variable "db_username" {
  description = "Master username for PostgreSQL"
  type        = string
  default     = "rituaiadmin"
}

variable "db_password" {
  description = "Master password for PostgreSQL; use a secret variable or tfvars file"
  type        = string
  sensitive   = true
  validation {
    condition = (
      length(var.db_password) >= 8 &&
      can(regex("^[!-~]+$", var.db_password)) &&
      !can(regex("[/@\" ]", var.db_password))
    )
    error_message = "db_password must be at least 8 characters and contain only printable ASCII characters excluding slash (/), at sign (@), double quote (\") and spaces."
  }
}