import {NavLink, useNavigate} from "react-router-dom";
import {api} from "../utils.js";
import {useState} from "react";

export function Login() {
    const navigate = useNavigate()
    const [isWrongPassword, setisWrongPassword] = useState(false);
    const [isWrongEmail, setIsWrongEmail] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formdata = new FormData(e.target)
        const loginData = {
            email: formdata.get('email'),
            password: formdata.get('password'),
        }
        const response = await api("http://localhost:8000/api/login", {
            method: "POST",
            body: JSON.stringify(loginData),
        });
        if (response.status === "failed") {
            setIsWrongEmail(true);
            return
        }
        if (response.error) {
            setisWrongPassword(true);
            return
        }
        window.localStorage.setItem("api-key", response.jwt);
        window.localStorage.setItem("user-id", response.user_id);
        navigate('/home');
    }

    return <div
        className="h-screen flex items-center justify-center bg-[url('src/assets/images/fond.png')] bg-cover bg-center">
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center  text-2xl md:text-4xl font-bold leading-9 tracking-tight text-gray-900">Connectez
                    vous à votre compte</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-lg font-medium leading-6 text-gray-900">Adresse
                            mail</label>
                        <div className="mt-2">
                            <input id="email" name="email" type="email" autoComplete="email" required
                                   className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${isWrongEmail ? 'ring-red-700' : 'ring-gray-300'} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}/>
                        </div>
                        {isWrongEmail ? <p className="text-sm text-red-600">Email incorrect</p> : <p></p>}
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password"
                                   className="block text-lg font-medium leading-6 text-gray-900">Mot de passe</label>
                        </div>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" autoComplete="current-password"
                                   required
                                   className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${isWrongPassword ? 'ring-red-700' : 'ring-gray-300'} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}/>
                        </div>
                        {isWrongPassword ? <p className="text-sm text-red-600">Mot de passe incorrect</p> : <p></p>}
                    </div>

                    <div>
                        <button type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-lg font-medium leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Se
                            connecter
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-gray-500">
                    Pas de compte?
                    <NavLink to="/signup"
                             className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Inscrivez-vous
                        ici</NavLink>
                </p>
            </div>
        </div>
    </div>;
}