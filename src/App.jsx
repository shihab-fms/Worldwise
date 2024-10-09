// import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import HomePage from "./pages/HomePage";
// import PageNav from "./components/PageNav";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
// import CityList from "./components/CityList";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CityProvider } from "./contexts/CityContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectRoute from "./pages/ProtectRoute";

export default function App() {
  // console.log(cities);
  return (
    <AuthProvider>
      <CityProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage />}></Route>
            <Route path='product' element={<Product />}></Route>
            <Route path='pricing' element={<Pricing />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route
              path='app'
              element={
                <ProtectRoute>
                  <AppLayout />
                </ProtectRoute>
              }>
              <Route index element={<Navigate replace to='cities' />} />
              <Route path='cities' element={<CityList />} />
              <Route path='cities/:id' element={<City />} />
              <Route path='countries' element={<CountryList />} />
              <Route path='form' element={<Form />} />
            </Route>
            <Route path='*' element={<AppLayout />}></Route>
          </Routes>
        </BrowserRouter>
      </CityProvider>
    </AuthProvider>
  );
}
