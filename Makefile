export DOCKER_COMPOSE=docker-compose

help: ## Show help like directly using make
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## Install all dependencies
	$(DOCKER_COMPOSE) build

run: ## Run the docker stack
	$(info ********************)
	$(info INFO: This can take a while to complete on first time, check `make logs`)
	$(info ********************)
	$(DOCKER_COMPOSE) up -d

stop: ## stop the docker stack
	$(DOCKER_COMPOSE) stop

logs: ## logs
	$(DOCKER_COMPOSE) logs --tail=10 -f

down: ## Delete the Docker containers and volumes
	$(DOCKER_COMPOSE) down -v

cli: ## Access the container shell
	$(DOCKER_COMPOSE) exec redis sh

