import React, {useEffect, useRef, useState} from "react";
import {Input} from "./form/Input.jsx";
import {DateInput} from "./form/DateInput.jsx";
import {ModalLogout} from "./ModalLogout.jsx";
import {InputFile} from "./form/InputFile.jsx";
import {useNavigate} from "react-router-dom";
import {api, b64toBlob} from "../utils.js";


export function ModalCard({isOpenModal, setOpenModal, id = null}) {
    const navigate = useNavigate()
    const [data, setData] = useState(null);
    const formData = useRef();
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (id) {
            api("http://localhost:8000/api/company/" + id, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("api-key")
                }
            }).then((res) => {
                setData(res)
            })
        }
    }, []);

    const handleClose = (e) => {
        if (e.target === e.currentTarget) {
            handlePatchSubmit(formData.current)
            setOpenModal(false);
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
    };

    const handlePostSubmit = async (form) => {
        const formdata = new FormData(form)
        formdata.append("company_user_id", window.localStorage.getItem("user-id"));
        const response = await api("http://localhost:8000/api/companies", {
            method: "POST",
            body: formdata,
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("api-key")}`
            }
        });
        if (response.status) {
            navigate(0)
        }
    }

    const handlePatchSubmit = async (form) => {
        const formdata = new FormData(form)
        formdata.append("company_user_id", window.localStorage.getItem("user-id"));

        const response = await api("http://localhost:8000/api/companies/" + id, {
            method: "PATCH",
            body: formdata,
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("api-key")}`
            }
        });
        if (response.status) {
            navigate(0)
        }
    }


    function displayImage() {
        if (image && !data?.image) {
            return `url(${URL.createObjectURL(image)})`
        } else if (data?.image && !image) {
            return `url(${URL.createObjectURL(b64toBlob(data?.image, "image/png"))})`
        } else if (data?.image && image) {
            return `url(${URL.createObjectURL(image)})`
        } else {
            return ''
        }

    }

    if (!isOpenModal) return null;

    return (
        <div
            className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center h-screen py-10 z-50"
            onClick={handleClose}
        >
            <form onSubmit={(e) => {
                e.preventDefault()
                return id ? handlePatchSubmit(e.target) : handlePostSubmit(e.target)
            }}
                  ref={formData}
                  className="bg-white rounded-lg p-4 w-1/2 relative overflow-auto h-full">
                <div className="flex items-center justify-center w-full">
                    <label
                        htmlFor="dropzone-file"
                        style={{
                            backgroundImage: displayImage(),
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                        className={`flex flex-col  w-full h-48 rounded-lg cursor-pointer ${data?.image || image ? "items-end justify-end" : "bg-gray-50 border-2 border-gray-300 border-dashed items-center justify-center"} `}
                    >
                        <div
                            className={`flex pt-5 pb-6 flex-col items-center justify-center`}>
                            {

                                !data?.image && !image && <>
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
                                        SVG, PNG, JPG or GIF
                                    </p>
                                </>
                            }
                        </div>
                        <input id="dropzone-file" onChange={(e) => setImage(e.target.files[0])} name={"image"}
                               type="file" className="hidden" accept={"image/*"}/>
                        {(data?.image || image) && <i className="fa-regular fa-square-plus fa-xl pb-6 pr-4"></i>}
                    </label>
                </div>
                <div className="p-6 flex flex-col gap-3 ">
                    <input
                        name="name"
                        className="text-4xl w-full outline-none bg-white text-black placeholder-gray-600 placeholder:text-4xl"
                        type="text"
                        placeholder="Nom de l'entreprise"
                        onChange={(e) => setData({...data, name: e.target.value})}
                        value={data?.name}
                    />
                    <input
                        name="job_title"
                        className="text-2xl w-full outline-none bg-white text-black placeholder-gray-600 placeholder:text-2xl"
                        type="text"
                        placeholder="Titre du poste"
                        onChange={(e) => setData({...data, job_title: e.target.value})}
                        value={data?.job_title}
                    />
                    <div>
                        <label
                            htmlFor="message"
                            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                        >
                            Description
                        </label>
                        <textarea
                            name="description"
                            id="message"
                            rows="4"
                            className="block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded border border-indigo-100 focus:outline-none focus:border-blue-500"
                            placeholder="Ajoutez des infos sur l'entreprise"
                            value={data?.description}
                            onChange={(e) => setData({...data, description: e.target.value})}
                        ></textarea>
                    </div>
                    <Input placeholder={"Adresse"} name={"address"} value={data?.address}
                           onChange={(e) => setData({...data, address: e.target.value})}>
                        <i className="fa-solid fa-location-dot fa-xl text-gray-300 "></i>
                    </Input>
                    <Input placeholder={"Email"} name={"email"} value={data?.email}
                           onChange={(e) => setData({...data, email: e.target.value})}>
                        <i className="fa-regular fa-envelope fa-xl text-gray-300"></i>
                    </Input>
                    <Input placeholder={"Telephone"} name={"phone"} value={data?.phone}
                           onChange={(e) => setData({...data, phone: e.target.value})}>
                        <i className="fa-solid fa-phone fa-xl text-gray-300"></i>
                    </Input>
                    <Input placeholder={"Lien vers le linkedin"} name={"linkedin"} value={data?.linkedin}
                           onChange={(e) => setData({...data, linkedin: e.target.value})}>
                        <i className="fa-brands fa-linkedin-in fa-xl text-gray-300"></i>
                    </Input>
                    <div className="py-2 flex gap-12">
                        <DateInput label={"Date ou vous avez postulé"} name={"applied_at"} value={data?.applied_at}
                                   onChange={(e) => setData({...data, applied_at: e.target.value})}></DateInput>
                        <DateInput label={"Date de réponse"} name={"answered_at"} value={data?.answered_at}
                                   onChange={(e) => setData({...data, answered_at: e.target.value})}></DateInput>
                    </div>
                    <Input placeholder={"Lien vers l'offre"} name={"offer_link"} value={data?.offer_link}
                           onChange={(e) => setData({...data, offer_link: e.target.value})}>
                        <i className="fa-solid fa-link fa-xl text-gray-300"></i>
                    </Input>
                    <div className="flex justify-between items-center">
                        <div className="py-3 flex gap-6">
                            <InputFile title={'Ajouter un CV'} updateTitle={'Modifier le cv'} name={'cv'}
                                       value={data?.cv}></InputFile>
                            <InputFile title={'Ajouter une lettre de motivation'}
                                       updateTitle={'Modifier la lettre de motivation'}
                                       name={'cover_letter'}
                                       value={data?.cover_letter}></InputFile>
                            <InputFile title={'Ajouter une offre'} updateTitle={"Modifier l'offre"}
                                       name={'offer_pdf'}
                                       value={data?.offer_pdf}></InputFile>
                        </div>
                    </div>
                    <div className={'flex justify-between items-center'}>
                        <button type={"submit"}
                                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded w-fit">
                            Enregistrer
                        </button>
                        <i onClick={openModal} className="fa-solid fa-trash-can fa-xl hover:text-indigo-500"></i>
                    </div>

                </div>
            </form>
            <ModalLogout isOpen={isModalOpen} onClose={closeModal} onConfirm={confirmAction} id={id}
                         title="Etes vous sur de vouloir supprimer cette entreprise?"/>
        </div>
    );
}
