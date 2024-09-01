import {Card} from "../component/Card.jsx";
import {CVcard} from "../component/CVcard.jsx";
import {useFetch} from "../hooks/useFetch.js";
import React, {useContext, useState} from "react";
import {Spinner} from "../component/Spinner.jsx";
import {ModalCard} from "../component/ModalCard.jsx";
import {SearchContext} from "../component/Root.jsx";

export function Home() {
    const apiKey = window.localStorage.getItem("api-key");
    const userId = window.localStorage.getItem("user-id");
    const [openModal, setOpenModal] = useState(false);
    const searchQuery = useContext(SearchContext)

    const {loading, data, error} = useFetch(`http://localhost:8000/api/companies/${userId}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`
        }
    })

    if (loading) {
        return <Spinner/>
    }
    if (error) {
        return <div className="alert-error">{error.toString()}</div>
    }
    return <div className="bg-indigo-50 h-full md:h-screen flex flex-col md:flex-row">
        <div className="p-16 pr-0 flex flex-wrap w-full gap-10 w-3/4 h-fit">
            <div
                onClick={() => setOpenModal(true)}
                className="w-64 h-48 rounded-lg bg-gray-100 relative p-7 border-2 border-gray-300 transition ease-out duration-500 overflow-visible hover:border-indigo-600 hover:shadow-lg">
                <div className="text-black h-full gap-2 grid place-content-center">
                    <i className="fa-solid fa-plus text-2xl font-bold text-center"></i>
                </div>
            </div>
            {data.filter((company) => company.name.includes(searchQuery ?? '') || company.job_title.includes(searchQuery ?? '')).map((company, index) => (
                <Card
                    key={index}
                    title={company.name}
                    description={company.job_title}
                    url={company.image}
                    id={company.id}
                />
            ))}
            <ModalCard isOpenModal={openModal} setOpenModal={setOpenModal}/>
        </div>
        <aside className="w-full md:w-[600px] flex justify-center p-0 md:p-14 md:pl-0">
            <CVcard/>
        </aside>

    </div>
}