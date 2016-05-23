# ngex_gulp_starter

Seed project for angualr2 and express with gulp build



# Ref & Credits

Started off from template described in

[http://blog.edenmsg.com/angular2-typescript-gulp-and-expressjs/](http://blog.edenmsg.com/angular2-typescript-gulp-and-expressjs/) 


# What

First try-out of the system, merging in the angular-2 'tour-of-heroes' example into an express implementation


# How

## install 
Grab the dependencies with:

```shell
$ npm install
```

then build to ```/dist``` by running 

```shell
$ gulp
```

and if you're ready to deploy: simply place the contents of ```/dist``` to any ${DEPLOY_PATH} you like

```shell
$ mv ./dist/* ${DEPLOY_PATH}  #Note: should become DEPLOY_PATH=./your_path gulp deploy
```

## run
### in production/deployed

``` shell
$ cd ${DEPLOY_PATH}
$ node bin/www
```

### during development

This will keep a 'watch'ing eye on the source code being saved, and will update the running service to reflect any live changes to the source code.

```shell
$ gulp serv
```

----
# TODO in document:

describe & link tsd usage
describe gulp tasks
describe how to further develop
- adding ng apps & components
- adding public-static content (html/css/jade) 
- adding routes --> rest api's
- adding views ? if needed ?
- what about storage backend?
