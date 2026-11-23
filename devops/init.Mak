WEB = apps/web
API = services/payment-api

.PHONY: server client requests create-env 

# get initial files

create-env:
	cp -n devops/.env.example .env

# no need because package.json scripts already include it
api-setup:
	cd $(API) && npm pkg set "scripts.dev=node --env-file=../../.env src/index.ts"

# server and clients are commands and not files

server:
	cd $(API) && npm run dev

client:
	cd $(WEB) && npm run dev

requests:
	bash devops/requests.sh




