import React from "react";

export function CVcard() {
    return <div
        className="w-80">
        <div className="flex items-center justify-center w-full h-[500px] relative">
            <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 p-6"
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
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                    </svg>
                    <p className="mb-2 text-lg text-gray-500 ">
                        <span className="font-semibold">Ajouter un CV</span>
                    </p>
                    <p className="text-xs text-gray-500 text-center ">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden"/>
            </label>
            <i className="fa-solid fa-trash-can fa-xl hover:text-indigo-500 absolute bottom-10"></i>
        </div>
    </div>
}