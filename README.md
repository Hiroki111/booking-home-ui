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