import {Spinner} from "./Spinner.jsx";
import {Navbar} from "./Navbar.jsx";
import {Outlet, useLocation, useNavigation} from "react-router-dom";

export function Root() {
    const navigation = useNavigation()
    const location = useLocation()
    return <>
        <header>
            {location.pathname === "/home" && <Navbar/>}
        </header>
        <main>
            {navigation.state === 'login' && <Spinner/>}
            <Outlet/>
        </main>
    </>
}