# Front-end (ES6) Starter Kit
A front-end template that helps you build fast, modern mobile web apps.

## Prerequisites

### [Node.js](https://nodejs.org)
Bring up a terminal and type `node --version`.
Node should respond with a version at or above 0.10.x.
If you require Node, go to [nodejs.org](https://nodejs.org) and click on the big green Install button.
Also you should install latest version of NPM.
```sh
$ npm install -g npm@8.5.4
```

### [Gulp](http://gulpjs.com)
Bring up a terminal and type `gulp --version`.
If Gulp is installed it should return a version number at or above 3.9.x.
If you need to install/upgrade Gulp, open up a terminal and type in the following:
```sh
$ npm install --global gulp-cli
```

*This will install Gulp globally. Depending on your user account, you may need to [configure your system](https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md) to install packages globally without administrative privileges.*

## Installation
* Download and extract to where you want to work or clone:
```
git clone URL
```

### Local dependencies
Next, install the local dependencies starter requires:
```sh
$ npm init
$ npm install
$ npm install --save-dev gulp
```
Watch for changes & automatically refresh across devices
```sh
$ gulp serve
```
Build production files
```sh
$ gulp build
```

## External modules 
* [Sass media queries](https://github.com/paranoida/sass-mediaqueries)

## Methodologies
* [BEM](http://getbem.com/)
* [SMACSS](https://smacss.com/)