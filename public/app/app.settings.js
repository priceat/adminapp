
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
        "dashboard": {
            "nav": true,
            "name": "dashboard",
            "title": "Dashboard",
            "full": "/dashboard/",
            "slug": "/dashboard/",
            "src": "app/routes/dashboard/dashboard.route"
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
        "preferences": {
            "nav": true,
            "name": "preferences",
            "title": "Preferences",
            "full": "/preferences/",
            "slug": "/preferences/",
            "src": "app/routes/preferences/preferences.route"
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
