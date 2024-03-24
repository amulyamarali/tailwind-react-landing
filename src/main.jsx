import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App'
import './index.css'
import { Courses} from './components';
import { DataProvider } from './components/dataContext';
import Template from './components/template';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/notes",
    element: <Courses />,
  },
  {
    path: "/template",
    element: <Template />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DataProvider>
     <RouterProvider router={router} />
     </DataProvider>
  </React.StrictMode>,
)

