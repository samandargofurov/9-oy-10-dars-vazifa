import React, { useState } from 'react';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import DndContainer from './components/DndContainer';

const initialContainers = [
    {
        id: 'container-1',
        text: 'To Do',
        items: []
    },
    {
        id: 'container-2',
        text: 'Doing',
        items: []
    },
    {
      id: 'container-3',
      text: 'Done',
      items: []
  }
];

const App = () => {
    const [containers, setContainers] = useState(initialContainers);

    const handleDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) return;

        if (source.droppableId === 'all-containers' && destination.droppableId === 'all-containers') {
            const newContainers = Array.from(containers);
            const [movedContainer] = newContainers.splice(source.index, 1);
            newContainers.splice(destination.index, 0, movedContainer);
            setContainers(newContainers);
        }

        if (source.droppableId !== 'all-containers' && source.droppableId === destination.droppableId) {
            const containerIndex = containers.findIndex(container => container.id === source.droppableId);
            const newItems = Array.from(containers[containerIndex].items);
            const [movedItem] = newItems.splice(source.index, 1);
            newItems.splice(destination.index, 0, movedItem);

            const newContainers = Array.from(containers);
            newContainers[containerIndex].items = newItems;
            setContainers(newContainers);
        }

        if (source.droppableId !== 'all-containers' && source.droppableId !== destination.droppableId) {
            const sourceContainerIndex = containers.findIndex(container => container.id === source.droppableId);
            const destinationContainerIndex = containers.findIndex(container => container.id === destination.droppableId);

            const sourceItems = Array.from(containers[sourceContainerIndex].items);
            const destinationItems = Array.from(containers[destinationContainerIndex].items);
            const [movedItem] = sourceItems.splice(source.index, 1);
            destinationItems.splice(destination.index, 0, movedItem);

            const newContainers = Array.from(containers);
            newContainers[sourceContainerIndex].items = sourceItems;
            newContainers[destinationContainerIndex].items = destinationItems;
            setContainers(newContainers);
        }
    };

    const addItem = (containerId, item) => {
        const newContainers = containers.map(container => {
            if (container.id === containerId) {
                return { ...container, items: [...container.items, item] };
            }
            return container;
        });
        setContainers(newContainers);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="all-containers" direction="horizontal" type="CONTAINER">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="flex justify-center gap-20 mt-10">
                        {containers.map((container, index) => (
                            <DndContainer 
                                key={container.id} 
                                text={container.text} 
                                d={container.id} 
                                i={index} 
                                items={container.items} 
                                addItem={addItem} 
                            />
                        ))}
                        
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default App;
