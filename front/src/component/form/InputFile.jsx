import {useEffect, useState} from "react";

export function InputFile({name, title, updateTitle, value}) {
    const [file, setFile] = useState(null);

    const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, {type: contentType});
        return blob;
    }

    useEffect(() => {
        if (value) {
            const blob = b64toBlob(value, 'application/pdf');
            setFile(blob);
        }
    }, []);

    function getBlob(e) {
        if (e.target.files[0].type === 'application/pdf') {
            return new Blob(e.target.files, {type: e.target.files[0].type})
        }
        return
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
                       accept={'application/pdf'}
                       className="hidden"/>
            </>
            {file && <a href={URL.createObjectURL(file)} download className="text-center hover:text-indigo-500">
                <i class="fa-solid fa-download"></i>Télécharger</a>}
        </div>
    )
}