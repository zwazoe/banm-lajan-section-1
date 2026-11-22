WEB = apps/web
API = services/payment-api

# server and clients are commands and not files
.PHONY: server client requests

server:
	cd $(API) && npm run dev

client:
	cd $(WEB) && npm run dev

requests:
	bash requests.sh

