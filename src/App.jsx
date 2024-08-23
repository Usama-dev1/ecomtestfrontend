import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import Mainlayout from "./layouts/Mainlayout";
const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Mainlayout />}>
        <Route index element={<Homepage/>} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
