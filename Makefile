TAG = $(shell git rev-parse --short head)

.PHONY: build
build:
	docker build -t jesse/inc.xyz:$(TAG) .

.PHONY: local
local: build
	docker run -it --rm --name inc -p 80:80 -v $(shell pwd)/src/server/resources:/app/server/resources jesse/inc.xyz:$(TAG)

.PHONY: publish
publish: build
	docker tag jesse/inc.xyz:$(TAG) jesse/inc.xyz:latest
	docker push jesse/inc.xyz:$(TAG)
	docker push jesse/inc.xyz:latest
