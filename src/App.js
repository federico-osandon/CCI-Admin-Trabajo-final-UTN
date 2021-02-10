import React from 'react';
import Routes from '../src/components/Routes';
import TopNavigation from './components/TopNavigation';
import SideNavigation from './components/SideNavigation';
import Footer from './components/Footer';
import './index.css';

export default function App() { 
  
    return (
        <div className="flexible-content">
          <TopNavigation />
          <SideNavigation />
          <main id="content" className="p-5">
            <Routes />
          </main>
          <Footer />
        </div>
    );
 
}


