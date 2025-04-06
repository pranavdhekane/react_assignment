import { useEffect, useState } from "react";

function DateTimeComponent(){
    const date = new Date().toDateString();
    const [time, setTime] = useState(currentTime());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(currentTime());
        }, 1000)

        return () => {
            clearInterval(interval); 
        }
    }, [])

    function currentTime() {
        return new Date().toLocaleTimeString('en-GB', {
            hour12 : false
        });
    }
    
    return(
        <div className="bg-blue-800 h-[5rem] text-white flex justify-center items-center p-5">
            <h1 className="text-2xl sm:text-3xl font-semibold">{`${date} ${time}`}</h1>
        </div>
    )
}

export default DateTimeComponent;