import { createBrowserRouter } from "react-router";
import MainLayOut from "../LayOuts/MainLayOut";
import Home from "../Pages/Home/Home";
import AuthLayOut from "../LayOuts/AuthLayOut";
import LogIn from "../Authentication/Login/LogIn";
import Register from "../Authentication/Register/Register";
import Coverage from "../Pages/Coverage/Coverage";
import SendParcel from "../Pages/Home/SendParcel/SendParcel";
import PrivetRoute from "../routes/PrivetRoute";
import DashbordLayOut from "../LayOuts/DashbordLayOut";
import MyParcels from "../Pages/Dashboard/MyParcels";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/Payment/PaymentHistory";
import TrackParcel from "../Pages/Dashboard/TrackParcel/TrackParcel";
import BeARider from "../Pages/Dashboard/BeArider/BeARider";
import PendingRiders from "../Pages/Dashboard/PendingRiders/PendingRiders";
import ActiveRiders from "../Pages/Dashboard/ActiveRiders/ActiveRiders";
import AdminManager from "../Pages/Dashboard/AdminManager/AdminManager";
import Forbidden from "../Pages/Forbidden/Forbidden";
import AdminRoute from "../routes/AdminRoute";
import AssignRiders from "../Pages/Dashboard/AssignRiders/AssignRiders";
import PendingDeliveries from "../Pages/Dashboard/PendingDeliveries/PendingDeliveries";
import RiderRoute from "../routes/RiderRoute";
import CompletedDelivery from "../Pages/Dashboard/CompletedDelivery/CompletedDelivery";
import MyEarnings from "../Pages/Dashboard/MyEarnings/MyEarnings";


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
          path:'be-a-rider',
          element:<PrivetRoute>
            <BeARider></BeARider>
          </PrivetRoute>,
          loader:()=>fetch('/warehouses.json')
        },
        {
          path:"/forbidden",
          Component:Forbidden
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
  },
  {
    path:'/dashboard',
    element:<PrivetRoute>
      <DashbordLayOut></DashbordLayOut>
    </PrivetRoute>,
    children:[
      { path:'myParcels',
        Component:MyParcels
      },
      { path:'payment/:parcelId',
        Component:Payment
      },
      { path:'paymentHistory',
        Component:PaymentHistory
      },
      {
        path: 'track',
        Component:TrackParcel
      },
      {
        path:'pending-deliveries',
        element:<RiderRoute>
          <PendingDeliveries></PendingDeliveries>
        </RiderRoute>
      },
      {
        path:'completed-deliveries',
        element:<RiderRoute>
          <CompletedDelivery></CompletedDelivery>
        </RiderRoute>
      },
      {
        path:'my-earnings',
        element:<RiderRoute>
          <MyEarnings></MyEarnings>
        </RiderRoute>
      },
      {
        path:"pending-riders",
       element:<AdminRoute>
        <PendingRiders></PendingRiders>
       </AdminRoute>
      },
      {
        path:'assign-rider',
        element:<AdminRoute>
          <AssignRiders></AssignRiders>
        </AdminRoute>
      },
      {
        path:"active-riders",
        element:<AdminRoute>
          <ActiveRiders></ActiveRiders>
        </AdminRoute>
      },
      { path:'admin-manager',
        element:<AdminRoute>
          <AdminManager></AdminManager>
        </AdminRoute>
      }
    ]
  }
]);