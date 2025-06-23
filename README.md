# Link_Vault
A simple micro saas that solve a real problem: fast, clean, personal knowledge management — better than browser bookmarks or messy Notion tables.

# Start PostgreSQL locally (if not running):
sudo service postgresql start

# Stop PostgreSQL locally (if running):
sudo service postgresql stop


# From the project root:
docker build -t linkvault-backend ./linkvault-backend
docker build -t linkvault-frontend ./linkvault-frontend

# From the project root (where docker-compose.yml is located):
docker-compose up --build

# From the project root (where docker-compose.yml is located):
docker-compose up

# Stopping and Cleaning Up
docker-compose down

# Stopping and Cleaning Up the data in the DB with volumes
docker-compose down -v

===========================For updating the new changes=========================================

# 1. Build the Docker image (replace 'linkvault-frontend' with your preferred image name)
docker build -t linkvault-frontend .
docker build -t linkvault-backend .
# 2. Stop and remove the old container (if running)(use 'rmi' instead of 'stop' in case of error)
docker stop linkvault-frontend || true
docker stop linkvault-backend || true
# 3. Remove the old container (if running)
docker rm linkvault-frontend || true
docker rm linkvault-backend || true
# 4. Run the container (adjust ports as needed)
docker run -d --name linkvault-frontend -p 3000:3000 linkvault-frontend
docker run -d --name linkvault-backend -p 5000:5000 linkvault-backend