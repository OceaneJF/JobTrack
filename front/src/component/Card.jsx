import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger} from "./ui/context-menu.jsx";
import {api} from "../utils.js";
import {useState} from "react";
import {ModalCard} from "./ModalCard.jsx";

export function Card({title, description, url, id}) {
    const [isHidden, setIsHidden] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    async function handleSup(e) {
        const apiKey = window.localStorage.getItem("api-key");

        const response = await api(`http://localhost:8000/api/companies/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`
            }
        });
        if (response.status) {
            setIsHidden(true);
        }
    }

    function handleMod(e) {
        console.log("Mod");
    }

    return <ContextMenu>
        <ContextMenuTrigger className={isHidden ? 'hidden' : ''}>
            <div onClick={() => setOpenModal(true)}
                 className={`w-64 h-48 rounded-lg bg-white relative p-7 border-2 border-gray-300 transition ease-out duration-500 hover:border-indigo-600 hover:shadow-lg`}>
                <div className="text-black h-full gap-2 grid place-content-center">
                    <p className="text-2xl font-bold text-center  z-40 truncate">{title}</p>
                    <p className="text-gray-950 text-center z-40 truncate ">{description}</p>
                </div>
                {url && <img src={`${"data:image/png;base64," + url}`}
                             className={'absolute inset-0 w-full h-full bg-center object-cover z-0 opacity-50 rounded-[6px]'}
                             alt=""/>}

            </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
            <ContextMenuItem onClick={handleSup} inset>
                <i className="fa-solid fa-trash pr-2"> </i>
                Supprimer
            </ContextMenuItem>
            <ContextMenuItem onClick={handleMod} inset>
                <i className="fa-solid fa-pen pr-2"></i>
                Modifier
            </ContextMenuItem>
        </ContextMenuContent>
        <ModalCard isOpenModal={openModal} setOpenModal={setOpenModal}/>
    </ContextMenu>
}