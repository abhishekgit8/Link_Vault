# Link_Vault
A simple micro saas that solve a real problem: fast, clean, personal knowledge management — better than browser bookmarks or messy Notion tables.


# From the project root:
docker build -t linkvault-backend ./linkvault-backend
docker build -t linkvault-frontend ./linkvault-frontend

# From the project root (where docker-compose.yml is located):
docker-compose up --build

# Stopping and Cleaning Up
docker-compose down

# Stopping and Cleaning Up the data in the DB with volumes
docker-compose down -v