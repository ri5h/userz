![GitHub license](https://img.shields.io/badge/license-MIT-lightgrey.svg)

# userz

Practical Example for a user management app with React as Frontend and Symfony 4 as API backend.
- please find the technical requirements doc for functionalities.

#### Tech Stack
- Frontend : ReactJs
- Backend : Symfony4

#### Important Components and extensions used.
- Symfony
  - symfony/maker-bundle
  - FOSRestBundle
  - nelmio/cors-bundle
  - symfony/apache-pack
  - symfony/orm-pack
  - symfony/var-dumper
- ReactJS
  - axios
  - react-dom
  - react-router-dom
  - react-select
  
---- 

#### Detailed description
- This app is a simple demo implementation to show how we can use reactjs in the frontend and symfony4 in the backend for a simple starting point. Though this app considers a lot of things it is nowhere ready for production.
- The setup is ideal to understand how you can use FOSRestBundle to create APIs and How react-router can help with making different pages. 

#### Setup Instructions
0. Setup a domain in local or update config.js file for the address(url) of the app.
1. cd backend
2. composer install
3. cd frontend
4. npm install
5. npm run serve

#### Todo
1. Add better validations as current app does not validate much data.
2. Reformat some code to avoid duplication and improve code quality.
3. Write Test Cases to cover other aspects.
4. Set up CI/CD with testing automation to deploy automatically.

----



