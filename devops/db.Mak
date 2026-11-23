COMPOSE = docker compose --env-file .env -f devops/compose.yml

.PHONY:  db db-stop db-check


db: 
	${COMPOSE} up -d db

db-stop: 
	${COMPOSE} stop db

db-check: 
	${COMPOSE} exec db pg_isready -U banm_lajan -d banm_lajan


