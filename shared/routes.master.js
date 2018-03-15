/**
 * Master list of routes that is used by
 * client and server to build their routes
 */

module.exports = [
    {
        path: "/",
        component: "pages/home",
        exact: true
    },
    {
        path: "/profile",
        component: "pages/profile"
    }
];
