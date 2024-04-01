# Start

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