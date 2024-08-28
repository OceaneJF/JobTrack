import React from 'react';

export function ModalLogout({isOpen, onClose, onConfirm, title}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
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
                        onClick={onConfirm}
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

