# booking-client

## How to deploy on prod

`yarn build && yarn netlify deploy --prod`

This is a way to deploy an app without using Netlify's continuous deployment.
https://docs.netlify.com/cli/get-started/#manual-deploys
I use Github actions for CI/CD.
To use Netlif's CI/CD, find a way to do so on https://docs.netlify.com/cli/get-started/

After loging in to Netlify, choose

- Link this directory to an existing site
- Use current git remote origin

## todo

- Hide ID in availableDate for each staff
- I10n (Make error messages translatable, allow admin ppl to use different currency signs, etc)
- Clean up mock files under `src/network`

## How to run this application

1. Make sure Node.js and yarn are available on your machine (If you see any issue starting the application, please try to use Node.js v20.11.0 or higher)
2. Make sure that there is `.env` file in the root of the project (If it's missing, create it by referring to `.env.example`)
3. Run `yarn install`
4. Use the following commands

### `yarn start`

Runs the application on the development mode

### `yarn test`

Runs unit tests

### `yarn build`

Builds the application for production to the `build` folder

### `npx serve -s build`

Runs the production-ready application on your local machine by `serve` package (Please run `yarn build` first)
