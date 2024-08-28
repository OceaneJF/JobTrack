import React from 'react'
import {createBrowserRouter, RouterProvider, useRouteError} from 'react-router-dom';
import {Root} from "./component/Root.jsx";
import {Home} from "./pages/Home.jsx";
import {Welcome} from "./pages/Welcome.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <PageError/>,
        children: [
            {
                path: "home",
                element: <Home/>
            },
            {
                path: "",
                element: <Welcome/>
            }
        ]
    }
]);

function PageError() {
    const error = useRouteError()
    return <>
        <h1>Une erreur est survenue</h1>
        <p>
            {error?.error?.toString() ?? error?.toString()}
        </p>
    </>
}

function App() {
    return (
        <RouterProvider router={router}/>
    );
}

export default App;
