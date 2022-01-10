# Mbx

Soon to be **Nector**, this is Proxy server to use in my apps to obfuscate some
internals of frontend apps

Directory structure(so far..):

```
- app/
  - index.html
- assets/
  - \*.css
  - \*.js
  - ...images
- controllers/
  - index.js
- core/
  - index.js
  - plugins.js
- index.html
- index.js
- jsconfig.json
- LICENSE
- package.json
- postcss.config.js
- README.md
- tailwindcss.config.js
- uploads/
- utils/
  - index.js
- views/
  - index.vue
  - layouts/
  - partials/
```

## `App`

This folder is where front-end code should be added

- Route
  - /

## `Assets`

This folder has all your assets for Nector views, including images, css and javascript

## `Controllers`

This folder is where the magic happens:

Here is where to write all the routes and their logic to use
The exported routes. A default routes has been added for the App
**NOTE**:

- Only javacript(.js) files will be loaded from this folder

## `Core`

This folder contains the core logic for Mbx/Nector
Which is bacsically a system of autoloading all **Controllers** files(including those in folders)

## `index.html`

This is the root
