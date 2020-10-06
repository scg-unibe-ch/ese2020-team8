
project_name = $(shell basename $(PWD))

# A help function from https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
.DEFAULT_GOAL := help

.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'


install:           ## npm install backend and frontend
		docker-compose -f docker/dev/docker-compose.yml -p $(project_name) run --rm frontend npm install
		docker-compose -f docker/dev/docker-compose.yml -p $(project_name) run --rm backend npm install
	        #docker run --rm -it -v $(shell pwd):/app -w /app/backend node:12 npm install
	        #docker run --rm -it -v $(shell pwd):/app -w /app/frontend node:12 npm install

start: 		## Start backend and frontend in a container
		docker-compose -f docker/dev/docker-compose.yml -p $(project_name) up -d
		#docker run -d --name $(shell basename $(PWD))-backend -v $(shell pwd):/app -w /app/backend node:12 npm run dev
		#docker run -d --name $(shell basename $(PWD))-frontend -v $(shell pwd):/app -w /app/frontend node:12 npm start

stop: 		## Stop and remove the containers
		docker-compose -f docker/dev/docker-compose.yml -p $(project_name) down
		# docker stop $(shell basename $(PWD))-backend
		# docker stop $(shell basename $(PWD))-frontend
		# docker rm $(shell basename $(PWD))-backend
		# docker rm $(shell basename $(PWD))-frontend

