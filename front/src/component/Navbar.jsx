import {NavLink, useNavigate} from "react-router-dom"
import {SearchBar} from "./SearchBar.jsx";
import React, {useState} from 'react';
import {ModalLogout} from "./ModalLogout.jsx";


export function Navbar() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate()
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const confirmAction = () => {
        setIsModalOpen(false);
        window.localStorage.removeItem("api-key");
        navigate("");
    };
    return <>
        <div className="navbar bg-indigo-50 md:p-4 p-2">
            <div className="flex-1">
                <NavLink className="w-28 md:w-36 " to="/"> <img
                    className="hover:scale-105 transition-all duration-100 cursor-pointer "
                    alt="Logo jobtrack"
                    src="src/assets/images/logo.PNG"/></NavLink>
            </div>
            <div className=" flex-none w-fit md:w-[450px] md:gap-2 gap-6">
                <div className="form-control w-full">
                    <SearchBar/>
                </div>
                <div>
                    <div className="w-10 rounded-full">
                        <i onClick={openModal}
                           className="fa-solid fa-arrow-right-from-bracket cursor-pointer hover:text-indigo-600 hover:scale-105 transition-all duration-100 text-lg md:text-2xl"></i>
                    </div>
                </div>
            </div>
        </div>
        <ModalLogout isOpen={isModalOpen} onClose={closeModal} onConfirm={confirmAction}
                     title="Etes vous sur de vouloir vous déconnecter?"/>
    </>
}