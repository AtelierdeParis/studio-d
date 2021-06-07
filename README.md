# Studio D

The project is divided in two parts:
- web : Next.js
- back : Strapi (Node Js server)

## QuickStart


```bash
# Start infrastructure (database, local email service)
docker-compose up

# Install all dependencies
yarn install
```

### Front

Start the project

``` bash
# Development
yarn client:dev

# Production
yarn client:build
yarn client:start
```
Default url: [http://localhost:1337](http://localhost:1337)

### Back

Start the project

``` bash
# Development
yarn server:dev

# Production
yarn server:build
yarn server:start
```

Default url: [http://localhost:3000](http://localhost:3000)

### Email
Email templates are located in folder `back/email-templates.sql`, you must execute those queries into a sql database client, then you will be able to find them in strapi, left menu go to Plugins > Email Designer

If you create new email templates from strapi keep in mind that you have to export them from your sql client as INSERT queries and update `back/email-templates.sql`

### Deployment
Staging deployment is launched when new code is either pushed or merged on **develop** branch
Production deployment is launched when new code is either pushed or merged on **master** branch

### Environment vars
Rename files `.env.dist` into `.env` and fill empty values

### Swagger documentation
Swagger types are automatically generated by strapi and are used to generated typescript interfaces `web/typings/api.ts`.  
They can be overrided for each entity under `back/api/ENTITY/documentation/VERSION/overrides/ENTITY.json`, then you must regenerate the documentation from strapi, Plugins > Documentation > Recreate, then execute command `yarn get-types`
