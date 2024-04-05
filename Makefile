# Start


postgres:
	docker run -e POSTGRES_PASSWORD=postgres -e POSTGRES_PORT=5440 --name=pg --rm -d -p 5440:5440 postgres:16

hasura:
	curl https://raw.githubusercontent.com/hasura/graphql-engine/stable/install-manifests/docker-compose/docker-compose.yaml -o docker-compose.yml

hasura-up:
	docker-compose up -d

aura:
	docker run --name=my-neo4j --env NEO4J_AUTH=none \
		--restart always \
		--publish=7474:7474 --publish=7687:7687 \
		neo4j:5.18.0

run:
	lsof -i :3000 | awk 'NR!=1 {print $$2}' | xargs -r kill -9
	bun run dev

# Node modules

upgrade-modules:
	npx npm-check-updates -u

reinstall-modules:
	rm -rf node_modules && bun install

# Git

delete-git:
	git branch -D $(branch)
	git push origin --delete $(branch)

# make delete-git branch=your-branch-name

# psql -U postgres -d perntodo
# perntodo=# create user dumbelco password 'supersecret';
# perntodo=# grant connect on database perntodo to dumbelco;
# perntodo=# grant create,usage on schema public to dumbelco;


