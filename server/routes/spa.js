/**
 * Assemble the SPA
 */
module.exports = async (req, res) => {
    const { matchPath } = require("inferno-router");
    const routes = require("../../shared/routes.server");
    const fetcher = require("../fetcher");

    const route = routes.find(route => route.path === req.url);

    const data = await fetcher(
        route.component.GraphQL({ accessToken: req.user.accessToken })
    );

    const InfernoServer = require("inferno-server");
    const { StaticRouter, Switch, Route } = require("inferno-router");
    const { createElement } = require("inferno-create-element");

    const { title, jsFiles, cssFiles, dataFn } = require("../page-config")[
        req.url
    ];
    const renderPage = require("../page-render");

    const pageData = dataFn(data);

    const markup = InfernoServer.renderToString(
        createElement(
            StaticRouter,
            { location: req.url },
            createElement(
                Switch,
                null,
                ...routes.map(route =>
                    createElement(
                        Route,
                        {
                            path: route.path,
                            exact: route.exact,
                            render: () =>
                                createElement(route.component, {
                                    initialData:
                                        req.url === route.path ? pageData : null
                                })
                        },
                        null
                    )
                )
            )
        )
    );

    res.send(
        renderPage({
            title,
            markup,
            jsFiles,
            cssFiles,
            pageData
        })
    );
};
