import React, { useState } from 'react';
import { Draggable, Droppable } from "react-beautiful-dnd";
import { FaPlus } from "react-icons/fa6";

function DndContainer({ text, d, i, items, addItem }) {
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleButtonClick = () => {
        setShowInput(!showInput);
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (inputValue) {
            addItem(d, { id: `item-${new Date().getTime()}`, name: inputValue });
            setInputValue('');
            setShowInput(false);
        }
    };

    return (
        <Draggable key={d} draggableId={d} index={i}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="draggable-item"
                >
                    <div className="w-80 h-fit rounded-2xl bg-slate-50 shadow-2xl p-5 mb-14">
                        <div className="flex flex-col">
                            <div className="ml-2 mb-5 font-semibold">{text}</div>
                            <Droppable droppableId={d} type="ITEM">
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className="flex flex-col gap-3"
                                    >
                                        {items.map((el, index) => (
                                            <Draggable key={el.id} draggableId={el.id} index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="bg-white border-2 hover:border-blue-500 flex items-center gap-2 cursor-pointer font-normal transition-all rounded-xl p-2 shadow-md"
                                                    >
                                                        {el.name}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                            <div className="mt-12">
                                {showInput ? (
                                    <form onSubmit={handleFormSubmit}>
                                        <input
                                            type="text"
                                            value={inputValue}
                                            onChange={handleInputChange}
                                            placeholder="Enter something..."
                                            className="border rounded-lg outline-none p-2 mb-2 w-full"
                                        />
                                        <button type="submit" className="p-2 bg-blue-500 text-white rounded w-full">Submit</button>
                                    </form>
                                ) : (
                                    <div onClick={handleButtonClick} className="gap-2 bg-transparent flex items-center mx-auto justify-center cursor-pointer w-60 text-[#44546F] font-bold transition-all rounded-xl duration-700 p-2 hover:p-2 hover:bg-[#5f5f5f97]">
                                        <FaPlus /> Add a card
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
}

export default DndContainer;
