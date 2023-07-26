require("babel-register")({
    presets: ["es2015", "react"]
});

import router from "./src/Router";
import Sitemap from "react-router-sitemap";

function generateSitemap() {
    return (
        new Sitemap(router)
            .build("https://www.primepellet.es")
            .save("./public/sitemap.xml")
    );
}

generateSitemap();