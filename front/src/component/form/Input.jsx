export function Input({placeholder, children}) {
    return <div className="flex items-center relative max-w-full">
        <div className="absolute left-2 ">
            {children}
        </div>
        <input
            className="text-base p-2 w-full pl-10 outline-none bg-white text-black border-b-2 border-indigo-100 focus:border-indigo-600 transition duration-300 ease-in-out placeholder-gray-400"
            type="text" placeholder={placeholder}/>
    </div>
}
export function Input({placeholder, children}) {
    return <div className="flex items-center relative max-w-full">
        <div className="absolute left-2 ">
            {children}
        </div>
        <input
            className="text-base p-2 w-full pl-10 outline-none bg-white text-black border-b-2 border-indigo-100 focus:border-indigo-600 transition duration-300 ease-in-out placeholder-gray-400"
            type="text" placeholder={placeholder}/>
    </div>
}