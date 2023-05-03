import { Router } from "@vaadin/router";

const router = new Router(document.getElementById("root"));

router.setRoutes([
   { path: "/", component: "page-welcome" },
   { path: "/welcome", component: "page-welcome" },
   { path: "/pets", component: "page-pets" },
   { path: "/login", component: "page-login" },
   { path: "/singup", component: "page-singup" },
   { path: "/datos", component: "page-datos" },
   { path: "/myReport", component: "page-myreport" },
   { path: "/newReport", component: "page-newreport" },
   { path: "/editReport", component: "page-editreport" },
]);
