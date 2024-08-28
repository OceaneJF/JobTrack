import React, {useState} from "react";
import {Input} from "./form/Input.jsx";
import {DateInput} from "./form/DateInput.jsx";
import {ModalLogout} from "./ModalLogout.jsx";

export function ModalCard() {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = (e) => {
        if (e.target === e.currentTarget) {
            setIsOpen(false);
        }
    };


    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const confirmAction = () => {
        // Ajoutez ici la logique pour la déconnexion ou l'action confirmée
        setIsModalOpen(false);
        console.log('Déconnexion confirmée');
    };
    if (!isOpen) return null;
    return (
        <div
            className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center h-screen py-10"
            onClick={handleClose}
        >
            <div className="bg-white rounded-lg p-4 w-1/2 relative overflow-auto h-full">
                <div className="flex items-center justify-center w-full">
                    <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 "
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">Ajouter une image</span>
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden"/>
                    </label>
                </div>
                <div className="p-6 flex flex-col gap-3 ">
                    <input
                        className="text-4xl w-full outline-none bg-white text-black placeholder-gray-600 placeholder:text-4xl"
                        type="text"
                        placeholder="Nom de l'entreprise"
                    />
                    <input
                        className="text-2xl w-full outline-none bg-white text-black placeholder-gray-600 placeholder:text-2xl"
                        type="text"
                        placeholder="Titre du poste"
                    />
                    <div>
                        <label
                            htmlFor="message"
                            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                        >
                            Description
                        </label>
                        <textarea
                            id="message"
                            rows="4"
                            className="block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded border border-indigo-100 focus:outline-none focus:border-blue-500"
                            placeholder="Ajoutez des infos sur l'entreprise"
                        ></textarea>
                    </div>
                    <Input placeholder={"Adresse"}>
                        <i className="fa-solid fa-location-dot fa-xl text-gray-300 "></i>
                    </Input>
                    <Input placeholder={"Email"}>
                        <i className="fa-regular fa-envelope fa-xl text-gray-300"></i>
                    </Input>
                    <Input placeholder={"Telephone"}>
                        <i className="fa-solid fa-phone fa-xl text-gray-300"></i>
                    </Input>
                    <Input placeholder={"Lien vers le linkedin"}>
                        <i className="fa-brands fa-linkedin-in fa-xl text-gray-300"></i>
                    </Input>
                    <div className="py-2 flex gap-12">
                        <DateInput label={"Date ou vous avez postulé"}></DateInput>
                        <DateInput label={"Date de réponse"}></DateInput>
                    </div>
                    <Input placeholder={"Lien vers l'offre"}>
                        <i className="fa-solid fa-link fa-xl text-gray-300"></i>
                    </Input>
                    <div className="flex justify-between items-center">
                        <div className="p-3 flex gap-6">
                            <button
                                className="bg-indigo-500 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded">
                                Ajouter un CV
                            </button>
                            <button
                                className="bg-indigo-500 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded">
                                Ajouter une lettre de motivation
                            </button>
                            <button
                                className="bg-indigo-500 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded">
                                Ajouter une offre
                            </button>
                        </div>
                        <i onClick={openModal} className="fa-solid fa-trash-can fa-xl hover:text-indigo-500"></i>
                    </div>
                </div>
            </div>
            <ModalLogout isOpen={isModalOpen} onClose={closeModal} onConfirm={confirmAction}
                         title="Etes vous sur de vouloir supprimer cette entreprise?"/>
        </div>
    );
}
