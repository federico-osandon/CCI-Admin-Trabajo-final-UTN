import AlumnoPage from "./AlumnoPage";

export const AlumnoPageConfig = {
  routes: [
    {
      path: "/pages/alumno/:id",
      exact: true,
      component: AlumnoPage
    }
  ]
};