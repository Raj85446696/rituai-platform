terraform {
  backend "s3" {
    bucket       = "rituai-terraform-state-bucket"
    key          = "rituai/terraform.tfstate"
    region       = "ap-south-1"
    use_lockfile = true
  }
}