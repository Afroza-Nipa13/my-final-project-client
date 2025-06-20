import { createBrowserRouter } from "react-router";
import MainLayOut from "../LayOuts/MainLayOut";
import Home from "../Pages/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut></MainLayOut>,
    children:[
        { index:true, element:<Home></Home>}
    ]
  },
]);