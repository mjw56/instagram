const express = require("express");
const path = require("path");
const morgan = require("morgan");
const app = express();
const passport = require("passport");
const session = require("express-session");
const routes = require("./routes");
const middleware = require("./middleware");

const graphqlHTTP = require("express-graphql");
const schema = require("../shared/graphql");

require("dotenv").config();

const setCorsHeaders = res => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Accept, Content-Type, Authorization, Content-Length, X-Requested-With"
    );
};

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});
passport.use(require("./services/instagram/strategy"));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "../public")));

app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

app.use(morgan("combined"));

app.get("/login", routes.login);
app.get("/logout", routes.logout);

app.get(
    "/auth/instagram",
    passport.authenticate("instagram-token"),
    routes.instagram.token
);
app.get("/auth/instagram/callback", routes.instagram.callback);

app.get("/graphql", (req, res) => {
    return graphqlHTTP({
        schema,
        graphiql: true
    })(req, res);
});

app.post("/graphql", (req, res) => {
    setCorsHeaders(res);
    setTimeout(
        () =>
            graphqlHTTP({
                schema,
                graphiql: false
            })(req, res),
        500
    );
});

app.get("/*", middleware.auth, routes.spa);

app.listen(process.env.PORT, () =>
    console.log(`app listening on port ${process.env.PORT}`)
);
