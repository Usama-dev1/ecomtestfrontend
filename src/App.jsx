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
const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Mainlayout />}>
        <Route index element={<Homepage/>} />
        <Route path="product/:id" element={<Singleproduct/>} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
