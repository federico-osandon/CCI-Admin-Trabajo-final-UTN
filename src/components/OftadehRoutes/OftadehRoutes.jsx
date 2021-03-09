import React from "react";
//import { useHistory } from 'react-router-dom'
import { Switch, Route } from "react-router-dom";
import routes from "../../oftadeh-configs/routesConfig";
//import authContext from '../../context/ Authentication/authContext'


const OftadehRoutes = () => {
  
  
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route key={index} {...route} />
      ))}
    </Switch>
  );
};

export default OftadehRoutes;
