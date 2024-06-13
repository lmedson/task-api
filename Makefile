.PHONY: tests

default:
	@echo "Choose one task"
	@echo "make run-app: Run the application"
	@echo "make dbup: Setup database"
	@echo "make tests: Run tests"
	@exit 1

run-app:
	@echo "Starting the application..."
	@make dbup && docker-compose up task-api

dbup:
	@echo "Setting up database..."
	@docker-compose up -d mongo

tests:
	@echo "Preparing to run the tests..."
	@docker-compose run --rm test
