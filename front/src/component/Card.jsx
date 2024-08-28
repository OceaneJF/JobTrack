import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger} from "./ui/context-menu.jsx";

export function Card({title, description, url}) {

    function handleSup(e) {
        console.log("DS");
    }

    function handleMod(e) {
        console.log("Mod");
    }

    return <ContextMenu>
        <ContextMenuTrigger>
            <div
                className={`w-64 h-48 rounded-lg bg-white relative p-7 border-2 border-gray-300 transition ease-out duration-500 hover:border-indigo-600 hover:shadow-lg`}>
                <div className="text-black h-full gap-2 grid place-content-center">
                    <p className="text-2xl font-bold text-center  z-40">{title}</p>
                    <p className="text-gray-600 text-center z-50">{description}</p>
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
    </ContextMenu>
}