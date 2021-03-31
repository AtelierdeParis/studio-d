# Studio D

This project goal is to have a setup of yarn workspaces with the following projects

- web : Next.js 
- back : Strapi

## QuickStart


```bash
# Start infrastructure
docker-compose up

# Install all dependencies
yarn install
```

### Back

Start the project

``` bash
# Development
yarn client:dev

# Production
yarn client:build
yarn client:start
```
Default url: [http://localhost:1337](http://localhost:1337)

### Front

Start the project

``` bash
# Development
yarn server:dev

# Production
yarn server:build
yarn server:start
```

Default url: [http://localhost:3000](http://localhost:3000)
