# Output the Public IP address of the EC2 instance
output "instance_ip" {
  value = aws_instance.backend_instance.public_ip
  description = "Public IP of the EC2 instance"
}

# Output the DNS name for the EC2 instance
output "instance_dns" {
  value = aws_instance.backend_instance.public_dns
  description = "Public DNS name of the EC2 instance"
}
