import React from "react";
import { Redirect } from "react-router-dom";

import { DashboardPageConfig } from "../pages/dashboard/DashboardPageConfig";
import { AboutPageConfig } from "../pages/about/AboutPageConfig";
import { AddPostPageConfig } from "../pages/posts/add-post/AddPostPageConfig";
import { AllPostsPageConfig } from "../pages/posts/all-posts/AllPostsPageConfig";
import { CalendarPageConfig } from "../pages/calendar/CalendarPageConfig";
import { ForgotPasswordPageConfig } from "../pages/auth/forgot-password/ForgotPasswordPageConfig";
import { LoginPageConfig } from "../pages/auth/login/LoginPageConfig";
import { RegisterPageConfig } from "../pages/auth/register/RegisterPageConfig";
import { Error404PageConfig } from "../pages/errors/404/Error404PageConfig";
import { Error500PageConfig } from "../pages/errors/500/Error500PageConfig";
// import { DocumentationConfig } from "../pages/documentation/DocumentationConfig";

const routeConfigs = [
  ...DashboardPageConfig.routes, // Ruta '/', DashBoardPages, listo.
  ...AllPostsPageConfig.routes,// Ruta "/pages/posts", AllPostsPage, listo.
  ...AddPostPageConfig.routes,// Ruta "/pages/posts/add-post", AddPostPage, listo.
  ...CalendarPageConfig.routes,// Ruta "/pages/calendar", CalendarPage, listo.
  ...ForgotPasswordPageConfig.routes,// Ruta "/pages/auth/forgot-password", ForgotPasswordPage
  ...LoginPageConfig.routes,// Ruta "/pages/auth/login", LoginPage
  ...RegisterPageConfig.routes,// Ruta "/pages/auth/register", RegisterPage
  ...Error404PageConfig.routes,//Ruta "/pages/errors/error-404",Error404Page
  ...Error500PageConfig.routes, // Ruta "/pages/errors/error-500", Error500Page
  ...AboutPageConfig.routes // Ruta "/pages/about", AboutPage
  // ...DocumentationConfig.routes
];

const routes = [
  ...routeConfigs,
  {
    component: () => <Redirect to="/pages/errors/error-404" />
  }
  // {
  //   path: "/test",
  //   exact: true,
  //   component: <Example />
  // }
];

export default routes;
