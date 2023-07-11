import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import MainNav from "../components/global/MainNav";

export const RootContext = React.createContext(null);

export default function RootLayout() {
  const siteName = import.meta.env.VITE_SITE_NAME;

  return (
    <RootContext.Provider value={{ siteName }}>
      <MainNav />
      <ScrollRestoration />
      <div className="container">
        <Outlet />
      </div>
    </RootContext.Provider>
  );
}
