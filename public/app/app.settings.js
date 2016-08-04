
// This file may be overwritten by sps-cli, anything outside of the
// exported object will be removed when using the sps-cli commands.

// Important! This file is used by both Node and browser, so it must
// remain in ES5 format (for now).

module.exports = {
    "title": "Fulfillment Analytics",
    "namespace": "fulfillment-analytics",
    "navigation": [],
    "routes": {
        "index": {
            "slug": "/",
            "full": "/",
            "src": "app/routes/index.route",
            "redirect": "admin"
        },
        "overview": {
            "nav": true,
            "name": "overview",
            "title": "Overview",
            "full": "/overview/",
            "slug": "/overview/",
            "src": "app/routes/overview/overview.route"
        },
        "visibility": {
            "nav": true,
            "name": "visibility",
            "title": "Visibility",
            "full": "/visibility/",
            "slug": "/visibility/",
            "src": "app/routes/visibility/visibility.route"
        },
        "orderperf": {
            "nav": true,
            "name": "orderperf",
            "title": "Order Performance",
            "full": "/orderperf/",
            "slug": "/orderperf/",
            "src": "app/routes/orderperf/orderperf.route"
        },
        "compliance": {
            "nav": true,
            "name": "compliance",
            "title": "Compliance",
            "full": "/compliance/",
            "slug": "/compliance/",
            "src": "app/routes/compliance/compliance.route"
        },
        "admin": {
            "nav": true,
            "name": "admin",
            "title": "Admin",
            "full": "/admin/",
            "slug": "/admin/",
            "src": "app/routes/admin/admin.route"
        }
    },
    "roles": {},
    "features": {}
};

// Admin (formerly workbench)
