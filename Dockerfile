FROM wordpress

################################################################################
# Install any additional dependencies here
################################################################################
RUN apt-get update && apt-get install -y \
      vim

CMD ["apache2-foreground"]