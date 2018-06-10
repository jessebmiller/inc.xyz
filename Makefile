TAG = $(shell git rev-parse --short head)

.PHONY: build
build:
	docker build -t jesse/inc.xyz:$(TAG) .
