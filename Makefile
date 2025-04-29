# Build and run the backend container
up:
	docker-compose up --build

# Run without rebuilding (faster if no Dockerfile/requirements changes)
start:
	docker-compose up

# Stop the running container
down:
	docker-compose down

# Start detached (in background)
up-detach:
	docker-compose up -d

# Show container logs
logs:
	docker-compose logs -f

# Prune all stopped containers and dangling images (careful)
prune:
	docker system prune -f
