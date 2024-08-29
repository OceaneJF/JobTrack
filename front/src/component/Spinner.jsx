import {trio} from 'ldrs'

trio.register()

export function Spinner() {
    return <div className="flex items-center justify-center h-screen bg-indigo-50">
        <l-trio
            size="100"
            speed="1.3"
            color="#6875f5"
        ></l-trio>
    </div>
}
