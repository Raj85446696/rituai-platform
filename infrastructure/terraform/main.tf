module "dev-infra" {
  source             = "./infra"
  env                = "dev"
  project_name       = var.project_name
  aws_instance_type  = "t3.micro"
  aws_instance_count = 1
  key_name           = var.key_name
  allowed_ssh_cidr   = var.allowed_ssh_cidr
  db_username        = var.db_username
  db_password        = var.db_password
}

module "prod-infra" {
  source             = "./infra"
  env                = "prod"
  project_name       = var.project_name
  bucket_name        = "my-tf-state-manage-bucket"
  aws_instance_type  = "t3.micro"
  aws_instance_count = 1
  key_name           = var.key_name
  allowed_ssh_cidr   = var.allowed_ssh_cidr
  db_username        = var.db_username
  db_password        = var.db_password
}
