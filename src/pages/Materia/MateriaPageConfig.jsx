import MateriaPage from "./MateriaPage";

export const MateriaPageConfig = {
  routes: [
    {
      path: "/pages/materia/:id",
      exact: true,
      component: MateriaPage
    }
  ]
};