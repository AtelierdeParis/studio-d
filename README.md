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

### Email
In order to be able to you email functions, you must import email templates in strapi, go to Plugins > Email Designer in the left menu, then you will see a button Import templates, choose the files located in ```back/email-designer-templates_XXXXXXXX.json```.  
  
Note: You must refresh your navigator to see imported templates
