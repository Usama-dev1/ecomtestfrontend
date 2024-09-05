import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import Mainlayout from "./layouts/Mainlayout";
import Singleproduct from "./components/Singleproduct";
import Cartpage from "./pages/Cartpage";
import Loginpage from "./pages/Loginpage";
import Registerpage from "./pages/Registerpage";
import Shippingpage from "./pages/Shippingpage";
import PrivateRoute from "./components/PrivateRoute";
import Paymentpage from "./pages/Paymentpage";
import Orderpage from "./pages/Orderpage";
import Getorderpage from "./pages/Getorderpage";
import Profilepage from "./pages/Profilepage";
import Customerorderpage from "./pages/Customerorderpage";
import Allproductspage from "./pages/Allproductspage";
import Error404 from "./pages/Error404";
import Contactuspage from "./pages/Contactuspage";
const App = () => {
  const router = createBrowserRouter(    
    createRoutesFromElements(
      <Route path="/" element={<Mainlayout />}>
        <Route index element={<Homepage />} />    
        <Route path="*" element={<Error404 />} />
        <Route path="/contactus" element={<Contactuspage />} />

        {/* This is single product page*/}
        <Route path="/product/:id" element={<Singleproduct />} />
        <Route path="/products" element={<Allproductspage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/cart" element={<Cartpage />} />

        {/* Route for registered users */}
        <Route path="" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profilepage />} />
          <Route path="/payment" element={<Paymentpage />} />
          <Route path="/placeorder/mine" element={<Customerorderpage />} />
          <Route path="/placeorder" element={<Orderpage />} />
          <Route path="/placeorder/:id" element={<Getorderpage />} />
          <Route path="/shipping" element={<Shippingpage />} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
