import './App.css'
import DndContainer from './components/DndContainer'

function App() {

  return (
    <>
      <div className='container mx-auto w-[1100px]'>
        <div className='flex justify-between mt-14 items-center'>
          <DndContainer text={"To Do"}></DndContainer>
          <DndContainer text={"Doing"}></DndContainer>
          <DndContainer text={"Done"}></DndContainer>
        </div>
      </div>
    </>
  )
}

export default App
