import React from 'react'

function Forecast({ title, items, weatherUnit }) {
    return (
        <div>
            <div className='flex item-center justify-start my-6'>
                <p className='text-white font-medium uppercase'>
                    {`${title} at ${items[0].hour}`}
                </p>
            </div>

            <hr className='my-2'></hr>
            <div className='flex flex-row items-center justify-between text-white'>
                {items.map((item) => (
                    <div className='flex flex-col items-center justify-center' key={item.key}>
                        <p className='font-light text-sm'>
                            {item.title}
                        </p>
                        <img src="http://openweathermap.org/img/wn/01d@2x.png" className='w-12 my-1' />
                        <p className='font-medium'>{`${item.temp.toFixed()}"${weatherUnit}`}</p>
                    </div>

                ))}
            </div>
        </div >
    )
}

export default Forecast
