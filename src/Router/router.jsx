import { createBrowserRouter } from "react-router";
import MainLayOut from "../LayOuts/MainLayOut";
import Home from "../Pages/Home/Home";
import AuthLayOut from "../LayOuts/AuthLayOut";
import LogIn from "../Authentication/Login/LogIn";
import Register from "../Authentication/Register/Register";
import Coverage from "../Pages/Coverage/Coverage";
import SendParcel from "../Pages/Home/SendParcel/SendParcel";
import PrivetRoute from "../routes/PrivetRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut></MainLayOut>,
    children:[
        { index:true, element:<Home></Home>},
        { path:'/coverage', element:<Coverage></Coverage>,
          loader:()=>fetch('/warehouses.json')
        },
        {
          path:'/sendParcel', 
          element:<PrivetRoute>
            <SendParcel></SendParcel>
          </PrivetRoute>,
          loader:()=>fetch('/warehouses.json')
        }
    ]
  },
  {
    path:"/",
    element:<AuthLayOut></AuthLayOut>,
    children:[
      { path:'login', Component:LogIn},
      { path:'register', Component:Register}
    ]
  }
]);