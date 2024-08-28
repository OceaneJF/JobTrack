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
                className={`w-64 h-48 rounded-lg bg-[${url ? "url('" + url + "')" : 'white'}] relative p-7 border-2 border-gray-300 transition ease-out duration-500 hover:border-indigo-600 hover:shadow-lg`}>
                <div className="text-black h-full gap-2 grid place-content-center">
                    <p className="text-2xl font-bold text-center">{title}</p>
                    <p className="text-gray-600 text-center">{description}</p>
                </div>
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