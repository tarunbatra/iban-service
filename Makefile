.DEFAULT_GOAL := all

build:
	@echo "building application"
	npm ci

test:
	@echo "testing application"
	npm t

run:
	@echo "running application"
	npm run dev

all: build run