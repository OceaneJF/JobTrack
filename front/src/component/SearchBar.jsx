import React, {useState} from "react";

export function SearchBar() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Ajoutez ici la logique de recherche
        setIsModalOpen(false);
    };

    return (
        <>
            {/* Barre de recherche visible sur les écrans md et plus */}
            <form className="hidden md:flex mx-auto w-full">
                <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500 h-10"
                        placeholder="Rechercher une entreprise"
                        required
                    />
                    <button
                        type="submit"
                        className="text-white absolute end-1.5 bottom-1.5 bg-indigo-500 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded text-sm px-2 py-1"
                    >
                        Recherche
                    </button>
                </div>
            </form>

            {/* Icône loupe visible sur les petits écrans */}
            <i
                onClick={openModal}
                className="block md:hidden fa-solid fa-magnifying-glass fa-lg cursor-pointer hover:text-indigo-600 hover:scale-105 transition-all duration-100"
            ></i>

            {/* Modale pour la recherche sur petits écrans */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96 relative">
                        {/* Croix pour fermer la modale */}
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                        >
                            &times;
                        </button>

                        {/* Barre de recherche dans la modale */}
                        <form onSubmit={handleSearchSubmit} className="w-full">
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg
                                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="search"
                                    id="modal-search"
                                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500 h-10"
                                    placeholder="Rechercher une entreprise"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="text-white absolute end-1.5 bottom-1.5 bg-indigo-500 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded text-sm px-2 py-1"
                                >
                                    Recherche
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
