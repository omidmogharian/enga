## enga - Enterprise Architecture for AngularJS
a code structure for app development

- `verison: 0.5.1`

# Folder structure

```
enga/
  |- .build/
  |- _data/
  |- _html/
  |- _doc/
  |  |- <service>_<version>/
  |- public/
  |  |- assets/
  |  |- templates/
  |  |- index.html
  |- src/
  |  |- js/
  |  |  |- app/
  |  |  |- cas/
  |  |  |- lib/
  |  |  |- init.js
  |  |  |- setting.js
  |  |- less/
    |  |- less/
  |- vendor/
  |  |- ....
  |- gulpfile.js
  |- package.json

```

- `.build/` - a folder which will be generated after each build, it's a es5 version of src/js folder
- `_data/` -  each json file inside, automaticly will register as mocking service in cas/mockingService
- `_html/` -  for static html
- `_doc/` - for storing docs and data schema

- `src/js/app/` - application-specific code, i.e. angular module.
- `src/js/cas/` - central access to servicess
- `src/js/lib/` - library place
- `src/js/init.js` - app initilization, initilize enga and set the bridge for data up
- `src/js/setting.js` - global setting as well as any others

- `public/assets/` - static files like fonts and images and bundled js and css
- `public/assets/templates` - partial templates of modules
- `public/index.html` - this is the main HTML document of project

- `vendor/` - third-party libraries and components mostly from bowers
- `gulpfile.js` - key command to run with gulp: gulp , build(for just build, without browserify)  genarate-module --name=<yourmodulename>
- `package.json` - not only for npm pakages but also for alias names and browserify shim

