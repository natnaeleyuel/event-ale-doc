import Header from "./Header";
import {Outlet} from "react-router-dom";
import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();
  let outlet;
  if (location.pathname === '/') {
    outlet = 'HomePage';
  } else {
    outlet = 'Outlet';
  }
  
  return (
    <>
        <main >
            <Header/>
        </main>
        <div className={outlet}>
            <Outlet />
        </div>
    </>
  );
}