# Project template

This project goal is to have a setup of yarn workspaces with the following projects

- web : a Next.js (front) + Nest.js (api) + react-admin (admin) 
- mobile : a React Native app
- core : shared code with Redux stack and components

## QuickStart

requirements : pipenv

Start infrastructure :

```bash
pipenv shell
yarn
docker-compose up
```

### Web project

Start the project

```
cd web && yarn dev
```

Create fake users and projects

```
yarn console:dev fixtures
```

### Mobile project

The web and mobile apps are set up to use the shared code from [core](core/src) folder

Run from the [root](/) folder to install both mobile's and web app's dependencies

```sh
yarn install
cd mobile/ios && pod install
```

Launch mobile app (React Native)

```sh
yarn ios|android
```

Run e2e test

```sh
cd mobile && detox build
detox test
```

## Library used by those projects

- Next.js https://nextjs.org/docs/getting-started
- React-hook-form https://react-hook-form.com/
- SWR (HTTP client) https://swr.vercel.app/
- Rematch (Redux stack) https://github.com/rematch/rematch
- [Restyle](https://github.com/Shopify/restyle)
- react-native-web (sharing views between web & mobile)
- swagger-typescript-api (generate TS typing from Swagger documentation)
- Nest.js with TypeORM https://nestjs.com
- nestjs-crud for the REST API https://github.com/nestjsx/crud
- react-admin https://github.com/marmelab/react-admin

## Deployement

TODO Heroku

TODO Appcenter