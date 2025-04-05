provider "aws" {
  region = "eu-north-1"  # AWS Region where the EC2 instance will be deployed
}

# Data source for retrieving the AMI ID
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["amazon"]
  filters = {
    name = "ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-server-*"
  }
}

# Resource for EC2 instance
resource "aws_instance" "backend_instance" {
  ami           = data.aws_ami.ubuntu.id  # Dynamically retrieve the latest Ubuntu AMI
  instance_type = "t3.micro"  # Instance type as t3.micro (small instance)

  # VPC and Subnet Configuration
  subnet_id = "subnet-061ce1958ac01794f"
  vpc_security_group_ids = ["sg-12345678"]  # Replace with your security group ID

  # Enable Public IP assignment (auto-assign)
  associate_public_ip_address = true

  # Instance Metadata and SSH Key Configuration
  key_name = "your-ssh-key-name"  # SSH key name for instance access

  # Optional: User Data for EC2 instance (e.g., install updates)
  user_data = <<-EOF
              #!/bin/bash
              apt update -y
              apt upgrade -y
              EOF

  tags = {
    Name = "Backend-Instance"
  }

  # Additional configurations (e.g., monitoring, etc.)
  monitoring = true  # Enable CloudWatch monitoring
}

# Output the Public IP of the EC2 instance
output "instance_ip" {
  value       = aws_instance.backend_instance.public_ip
  description = "The public IP address of the EC2 instance"
}

# Output the DNS of the EC2 instance
output "instance_dns" {
  value       = aws_instance.backend_instance.public_dns
  description = "The public DNS of the EC2 instance"
}
