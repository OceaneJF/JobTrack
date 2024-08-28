import {Card} from "../component/Card.jsx";
import {CVcard} from "../component/CVcard.jsx";
import {useFetch} from "../hooks/useFetch.js";
import React from "react";

export function Home() {
    const apiKey = window.localStorage.getItem("api-key");
    const userId = window.localStorage.getItem("user-id");

    const {loading, data, error} = useFetch(`http://localhost:8000/api/companies/${userId}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`
        }
    })
    console.log(data)

    return <div className="bg-indigo-50 h-screen flex ">
        <div className="p-16 pr-0 flex flex-wrap w-full gap-16 w-3/4 z-0 h-fit">
            <div
                className="w-64 h-48 rounded-lg bg-gray-100 relative p-7 border-2 border-gray-300 transition ease-out duration-500 overflow-visible hover:border-indigo-600 hover:shadow-lg">
                <div className="text-black h-full gap-2 grid place-content-center">
                    <i className="fa-solid fa-plus text-2xl font-bold text-center"></i>
                </div>
            </div>
            {data.map((company, index) => (
                <Card
                    key={index}
                    title={company.name}
                    description={company.job_title}
                    url={company.image}
                />
            ))}
        </div>
        <aside className="w-1/4  flex justify-center p-14">
            <CVcard/>

        </aside>

    </div>
}