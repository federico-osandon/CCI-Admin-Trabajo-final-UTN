import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
//import ProfilePage from './pages/ProfilePage';
import TablesPage from './pages/TablesPage';
import MapsPage from './pages/MapsPage';
import NotFoundPage from './pages/NotFoundPage';
import AlumnoItem from './Alumnos/AlumnoItem';
//import AlumnosContainer from './Alumnos/AlumnosContainer'

//const Home = lazy(() => import('./routes/Home'));
const AlumnosContainer = lazy(() => import('./Alumnos/AlumnosContainer'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));

export default function Routes(){

    const loading = <div>Loading...</div>
  
    return (
      <Suspense fallback={loading}>
        <Switch>
            <Route path='/' exact component={DashboardPage} />
            <Route path='/dashboard' exact component={DashboardPage} />
            {/* <Route path='/profile' exact component={ProfilePage} /> */}
            <Route path='/alumnos' exact component={AlumnosContainer} />
            <Route path='/alumno/:id' exact component={ProfilePage} />
            <Route path='/tables' exact component={TablesPage} />
            <Route path='/maps' exact component={MapsPage} />
            <Route path='/404' exact component={NotFoundPage} />
        </Switch>        
      </Suspense>
    );
  
}


