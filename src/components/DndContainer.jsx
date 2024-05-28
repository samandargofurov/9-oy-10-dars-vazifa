import { FaPlus } from "react-icons/fa6";
import React, { useState } from 'react';


function DndContainer({ text }) {
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState({
        'id': '',
        'name': ''
    });
    const [submittedValue, setSubmittedValue] = useState('');

    const handleButtonClick = () => {
        setShowInput(!showInput);
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (inputValue) {
            setSubmittedValue(inputValue);
            setInputValue('');
            setShowInput(false);
        }

        setInputValue('')
    };



    return (
        <>
            <div className="w-80 rounded-2xl bg-slate-50 shadow-2xl p-5 mb-14">
                <div className="flex flex-col">
                    <div className="ml-2 mb-5 font-semibold">{text}</div>

                    <div className="flex flex-col gap-3">
                        {
                            submittedValue && submittedValue.map((el, index) => {
                                return (
                                     <div key={index} className="bg-white border-2 hover:border-blue-500 flex items-center gap-2 cursor-pointer font-normal transition-all rounded-xl p-2 shadow-md">{el.name} && <p>{el.name}</p></div>
                                )
                            })
                        }
                    </div>

                    <div className="mt-12">

                    {showInput && (
                        <form onSubmit={handleFormSubmit}>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={handleInputChange}
                                placeholder="Enter something..."
                            />
                            <button type="submit">Submit</button>
                        </form>
                    )}
                    <div onClick={handleButtonClick} className="gap-2 bg-transparent flex items-center mx-auto justify-center cursor-pointer w-60 text-[#44546F] font-bold transition-all rounded-xl duration-700 p-2 hover:p-2 hover:bg-[#5f5f5f97]"><FaPlus />Add a card</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DndContainer


