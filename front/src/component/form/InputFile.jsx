import {useState} from "react";

export function InputFile({name, title, updateTitle}) {
    const [file, setFile] = useState(null);

    function getBlob(e) {
        return new Blob(e.target.files, {type: e.target.files[0].type})
    }

    return (
        <div className={`flex flex-col ${file ? 'border border-indigo-200 border-dashed gap-4 p-2 rounded-lg' : ""}`}>
            <>
                <label htmlFor={name}
                       className="text-indigo-500 border-2 border-indigo-500 hover:bg-indigo-700 hover:text-white text-center font-medium py-2 px-4 rounded cursor-pointer">
                    {file ? updateTitle : title}
                </label>
                <input onChange={(e) => setFile(getBlob(e))} id={name}
                       name={name} type="file"
                       className="hidden"/>
            </>
            {file && <a href={URL.createObjectURL(file)} download className="text-center hover:text-indigo-500">
                <i class="fa-solid fa-download"></i>Télécharger</a>}
        </div>
    )
}