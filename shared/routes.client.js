import routes from "./routes.master";

function updateRoute(route) {
    return Object.assign({}, route, {
        component: `./${route.component}`
    });
}

export default routes.map(updateRoute);
