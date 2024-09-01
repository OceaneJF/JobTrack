import React, {useState} from "react";
import {Document, Page, pdfjs} from 'react-pdf';
import {api, b64toBlob} from "../utils.js";
import {useFetch} from "../hooks/useFetch.js";
import {useNavigate} from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

export function CVcard() {
    const [file, setFile] = useState(null);
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const userId = localStorage.getItem('user-id')
    const apiKey = localStorage.getItem("api-key")
    const navigate = useNavigate();

    const {data, error, loading} = useFetch('http://localhost:8000/api/user/' + userId, {
        headers: {
            Authorization: `Bearer ${apiKey}`,
        },
    })

    async function handleChange(e) {
        setFile(e.target.files[0]);
        const data = new FormData()
        data.append('cv', e.target.files[0]);

        await api('http://localhost:8000/api/user/' + userId, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
            body: data
        })
    }

    function onDocumentLoadSuccess({numPages}) { // Déstructuration de l'objet pour obtenir numPages
        setNumPages(numPages);
    }

    async function handleDelete() {
        setFile(null)
        const response = await api('http://localhost:8000/api/user/' + userId, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        })

        if (response.status) {
            navigate(0);
        }
    }

    const fileUrl = file ? URL.createObjectURL(file) : data?.cv ? URL.createObjectURL(b64toBlob(data.cv, 'application/pdf')) : null;

    return (
        <div className="w-80">
            <div className="flex items-center justify-center w-full h-[495px] relative">
                <label
                    htmlFor="dropzone-file"
                    className="flex flex-col relative items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 p-6"
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
                            PDF (MAX. 800x400px)
                        </p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" onChange={handleChange}
                           accept={"application/pdf"}/>
                </label>
                {(fileUrl) && <i onClick={handleDelete}
                                 className="fa-solid fa-trash-can fa-xl hover:text-indigo-500 absolute right-5 bottom-8 z-50"></i>}
                {(fileUrl) && <Document
                    file={fileUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    className={'absolute z-30 top-0'}
                >
                    <Page pageNumber={pageNumber} renderTextLayer={false} scale={0.5} height={500} width={700}
                          _className={'absolute flex items-center'}/>
                </Document>}
            </div>
        </div>
    );
}
