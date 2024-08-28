import {NavLink, useNavigate} from "react-router-dom"
import {useEffect} from "react";

export function Welcome() {
    const navigate = useNavigate()
    useEffect(() => {
        const apiKey = window.localStorage.getItem("api-key")
        if (apiKey) {
            navigate('/home')
        }
    }, []);
    return <div
        className="h-screen flex items-center justify-center bg-[url('src/assets/images/fond.png')] bg-cover bg-center">
        <div className="text-center">
            <img src="src/assets/images/sphere.gif" alt="GIF" className="w-40 md:w-fit mx-auto -mt-20"/>
            <h1 className="text-3xl md:text-6xl font-bold mb-4 px-8">Bienvenue sur <span
                className="text-indigo-500">JobTrack </span>!!
            </h1>
            <p className="text-base  md:text-lg font-medium mb-6 px-12">Votre outil pour enregistrer et suivre les
                entreprises
                ciblées <br/>dans
                votre recherche d'emploi.</p>
            <div className="flex justify-center space-x-4">
                <NavLink to="/Login.jsx.jsx">
                    <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                        Se connecter
                    </button>
                </NavLink>
                <NavLink to="/Signin.jsx">
                    <button
                        className="bg-white border-2 border-indigo-500 hover:bg-indigo-500 hover:text-white text-indigo-500 font-bold py-2 px-4 rounded">
                        S'inscrire
                    </button>
                </NavLink>
            </div>
        </div>
    </div>
}