export function DateInput({label, name, value, onChange}) {
    function isValidDate(date) {
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime());
    }

    function formatDate(date) {
        if (!isValidDate(date)) {
            return "";
        }
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    return (
        <div className="flex flex-col relative max-w-full">
            <label htmlFor={name} className="mb-2 text-base font-medium text-gray-900">
                {label}
            </label>
            <input
                name={name}
                className="text-base p-2 w-full outline-none bg-white text-black border-b-2 border-indigo-100 focus:border-indigo-600 transition duration-300 ease-in-out placeholder-gray-400"
                type="date"
                value={isValidDate(value) ? formatDate(value) : ""}
                onChange={onChange}
            />
        </div>
    );
}
