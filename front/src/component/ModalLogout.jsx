import React from 'react';
import {api} from "../utils.js";
import {useNavigate} from "react-router-dom";

export function ModalLogout({isOpen, onClose, onConfirm, title, id = null}) {
    const apiKey = window.localStorage.getItem("api-key")
    const navigate = useNavigate()

    async function handleSup(e) {
        if (id) {
            const response = await api(`http://localhost:8000/api/companies/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`
                }
            });
            if (response.status) {
                navigate(0);
            }
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
             onClick={onClose}>
            <div className="bg-white rounded-lg p-6 w-96 relative">
                {/* Croix pour fermer la modale */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                >
                    &times;
                </button>

                {/* Image au centre */}
                <div className="flex justify-center mb-4">
                    <img src="src/assets/images/deconnection.gif" alt="Confirmation" className="w-24 h-32"/>
                </div>

                {/* Titre */}
                <h2 className="text-center text-xl font-semibold mb-6">
                    {title}
                </h2>

                {/* Boutons */}
                <div className="flex justify-around">
                    <button
                        onClick={id ? handleSup : onConfirm}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                        Oui, je suis sûr
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                    >
                        En fait non
                    </button>
                </div>
            </div>
        </div>
    );
}

