import {Spinner} from "./Spinner.jsx";
import {Navbar} from "./Navbar.jsx";
import {Outlet, useLocation, useNavigation} from "react-router-dom";
import {createContext, useState} from "react";

export const SearchContext = createContext(null)

export function Root() {
    const navigation = useNavigation()
    const location = useLocation()
    const [searchQuery, setSearchQuery] = useState();
    return <>
        <header>
            {location.pathname === "/home" && <Navbar setSearchQuery={setSearchQuery}/>}
        </header>
        <main>
            {navigation.state === 'login' && <Spinner/>}
            <SearchContext.Provider value={searchQuery}>
                <Outlet/>
            </SearchContext.Provider>
        </main>
    </>
}