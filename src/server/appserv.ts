/// <reference path="./typings/tsd.d.ts" />
import * as express from 'express';
import * as path from 'path';

var app = express();

app.use('/app', express.static(path.resolve(__dirname, 'app')));
app.use('/libs', express.static(path.resolve(__dirname, 'libs')));

var renderIndex = (req: express.Request, res: express.Response, next: any) => {
    //passthrough the reload requests... --> see [HACK]
    if (req.url.indexOf('/reload') === 0) { return next();}
    //else
    console.log("-> request to %s", req.url);
    res.sendFile(path.resolve(__dirname, 'index.html'));
}

// [HACK]
// we need this /* trick only for ng single page apps that do their own routing
// as a consequence the renderIndex now needs to bypass /reload stuff
// we will fix this when introducing views
app.get('/*', renderIndex);

export { app }

// below useful stuff for later additions
/*
import * as express from "express";
import { join } from "path";
import * as favicon from "serve-favicon";
import * as logger from "morgan";
import { json, urlencoded } from "body-parser";
import { loginRouter } from "./routes/login";
import { protectedRouter } from "./routes/protected";

const app: express.Application = express();
app.disable("x-powered-by");

app.use(favicon(join(__dirname, "../public", "favicon.ico")));
app.use(express.static("./public"));
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: true }));

// api routes
app.use("/api", protectedRouter);
app.use("/login", loginRouter);

// catch 404 and forward to error handler
app.use(function(req: express.Request, res: express.Response, next) {
    let err = new Error("Not Found");
    next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get("env") === "development") {
    app.use(function(err, req: express.Request, res: express.Response) {
        res.status(err.status || 500);
        res.json({
            error: err,
            message: err.message
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err: any, req: express.Request, res: express.Response) {
    res.status(err.status || 500);
    res.json({
        error: {},
        message: err.message
    });
});

*/
