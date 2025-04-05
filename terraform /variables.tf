# Define any variables that you want to use in your configuration (Optional)

variable "region" {
  type    = string
  default = "eu-north-1"  # Default AWS region for your EC2 instances
}

variable "instance_type" {
  type    = string
  default = "t3.micro"  # Default instance type
}

variable "vpc_security_group_ids" {
  description = "The security group IDs to associate with the instance."
  type        = list(string)
  default     = ["sg-12345678"]  # Replace with your actual security group ID
}
