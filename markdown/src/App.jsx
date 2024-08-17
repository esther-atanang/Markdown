import { useState, useEffect, useReducer, useRef,useMemo } from "react"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import MarkdownInterface, { Preview } from "./components/MarkdownInterface"
import { checked } from "./utils";
import init from "./init";
import reducer from "./reducer";

function App() {
  const [notes, dispatch] = useReducer(reducer, [], init)
  const [isMenuOpen, setSidebarOpen] = useState(false)
  const [isLight, setLightMode] = useState(false)
  const [openPreview, setPreview] = useState(false)
  const notifyRef = useRef()
  const currentNote = useMemo(()=>{
    return notes ? notes.find((note) => note.currentFile) : null
  },[notes])


  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  const handleFileName = (e, curr_id) => {
    dispatch({
      type: "change_file_name",
      fileName: e.target.value,
      id: curr_id,
    })
  }

  //This is to save the current file
  const handleSave = (id) => {
    dispatch({
      type: "save_changes",
      id: id,
      notify_ref: notifyRef.current
    })
  }

  //This is to create a new file.
  const handleCreate = () => {
    dispatch({
      type: 'create_new_file'
    })

  }
  //This is to delete the current File
  const handleDelete = (id) => {
    dispatch({
      type: "delete_file",
      file_id: id
    })
  }

  //This is to switch between files
  const handleChangeFile = (id) => {
    dispatch({
      type: "change_current_file",
      file_id: id
    })
  }

  //This is to update the current File...
  const handleChange = (e, curr_id) => {
    dispatch(
      {
        type: "update_current_file",
        content: e.target.value,
        file_id: curr_id
      }
    )
  }

  //Open up the sidebar
  function handleOpen() {
    setSidebarOpen(value => !value)
  }


  

  return (
    <div className={`app ${isMenuOpen ? "menuOpen" : ""}`} data-theme={isLight ? "light" : "dark"}>

    <div className="notification" ref={notifyRef}>
      <img src={checked} alt="icon" />
      <p>New document created</p>
    </div>
  
    <div className={`app__sidebar ${isMenuOpen ? "menuOpen" : ""}`}>
      <Sidebar
        onSetTheme={setLightMode}
        isLight={isLight}
        notes={notes}
        onChangeFile={handleChangeFile}
        onCreateFile={handleCreate}
      />
    </div>
  
    <div className="app__main-content">
      <Navbar
        onClick={handleOpen}
        onDelete={handleDelete}
        currID={currentNote?.id ?? -1}
        fileName={currentNote?.fileName ?? ""}
        onSave={() => handleSave(currentNote.id)}
        onChangeFileName={handleFileName}
      />
  
      <div className={`app__wrapper ${openPreview ? "open-preview" : ""}`}>
        <MarkdownInterface
          onChange={handleChange}
          onOpen={setPreview}
          currID={currentNote?.id ?? -1}
          text={currentNote?.content ?? " "}
        />
        <Preview
          onOpen={setPreview}
          text={currentNote?.content ?? " "}
        />
      </div>
    </div>
  </div>
  
  )
}
export default App;

{/* 
  HOOK THIS UP!!!
  <div className="delete-modal">
         <h3 className="delete-modal__title">Delete this document?</h3>
         <p className="delete-modal__message">Are you sure you want to delete <span className="file-name">‘welcome.md’</span> document and its contents? This action cannot be reversed.</p>
         <button className="delete-modal__btn btn">Confirm & delete</button>
      </div> */}