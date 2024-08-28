import {Card} from "../component/Card.jsx";
import {CVcard} from "../component/CVcard.jsx";

export function Home() {
    return <div className="bg-indigo-50 h-screen flex ">
        <div className="p-16 flex flex-wrap w-full gap-16 w-3/4 z-0">
            <div
                className="w-64 h-48 rounded-lg bg-gray-100 relative p-7 border-2 border-gray-300 transition ease-out duration-500 overflow-visible hover:border-indigo-600 hover:shadow-lg">
                <div className="text-black h-full gap-2 grid place-content-center">
                    <i className="fa-solid fa-plus text-2xl font-bold text-center"></i>
                </div>
            </div>
            <Card title={"Card title"} description={"ca c'est la cerise"} url={"src/assets/images/fond.png"}></Card>
        </div>
        <aside className="w-1/4  flex justify-center p-14">
            <CVcard/>
        </aside>

    </div>
}