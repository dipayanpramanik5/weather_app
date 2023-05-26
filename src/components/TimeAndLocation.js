import React from 'react'
import moment from "moment";

export default function TimeAndLocation({ weather: { time, date, name, country } }) {
    return (
        <div>
            <div className='flex items-center justify-center my-6'>
                <p className='text-white text-xl front-extralight'>
                    {`${date} | Local Time: ${time}`}
                </p>
            </div>
            <div className='flex items-center justify-center my-3'>
                <p className='text-white text-3xl front-medium'>
                    {`${name}, ${country}`}
                </p>
            </div>
        </div>
    )
}
