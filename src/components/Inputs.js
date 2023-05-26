import React, { useState } from 'react';
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons';

export default function Inputs(props) {
    // Using state assign search input field value.
    const [searchInput, setSearchInput] = useState('');

    // On Change of search input field value update state value.
    const inputHandler = (event) => {
        setSearchInput(event.target.value);
    }

    // Upon clicking on search icon set the searchinput in the api query parameter and call parent
    // component method using two way binding.
    const searchHandler = () => {
        props.onInputChange({ q: searchInput });
    }

    // Upon clicking on current location icon fetch user location and update query and call parent
    // component method using two way binding.
    const userLocationHandler = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                props.onInputChange({ lat, lon });
                setSearchInput('');
            });
        }
    }

    // Update weather information on change of units.
    const unitChangeHandler = (event) => {
        props.onChangeUnit(event.target.value);
    }
    return (
        <div className='flex flex-row justify-center my-6'>
            <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
                <input
                    type='text'
                    placeholder='search'
                    className='text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize'
                    value={searchInput}
                    onChange={inputHandler}
                />
                <UilSearch
                    size={25}
                    className='text-white cursor-pointer transition ease-out hover:scale-125'
                    onClick={searchHandler}
                />
                <UilLocationPoint
                    size={25}
                    className='text-white cursor-pointer transition ease-out hover:scale-125'
                    onClick={userLocationHandler}
                />
            </div>
            <div className='flex flex-row w-1/4 items-center justify-center'>
                <button
                    name='metric'
                    value='metric'
                    onClick={unitChangeHandler}
                    className='text-xl text-white font-light'>
                    C
                </button>
                <p className='text-xl text-white mx-1'> | </p>
                <button
                    name='imperial'
                    value='imperial'
                    onClick={unitChangeHandler}
                    className='text-xl text-white font-light'>
                    F
                </button>
            </div>
        </div>
    )
}
