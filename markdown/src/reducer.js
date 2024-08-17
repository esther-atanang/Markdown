import { v4 as uuidv4 } from 'uuid';
import { find_date } from "./constants";



//This is to update the local storage
const updateStorage = () => {
    let storedNotes = JSON.parse(localStorage.getItem("notes"))
    storedNotes = storedNotes.map(note => {
        if (note.currentFile) {
            return {
                ...note,
                currentFile: false
            }
        }
        return note
    })
    //localStorage.setItem("notes", JSON.stringify(storedNotes))
}

export default function reducer(state, action) {
    switch (action.type) {
        case "change_file_name": {
            //I don't know how this is working
            const myRe = /.*\.md$/;
            let newNotes = state.map(note => {
                if (note.id == action.id) {
                    return {
                        ...note,
                        fileName: action.fileName
                    }
                }
                return note
            })
            if (myRe.test(action.fileName)) {
                // localStorage.setItem('notes', JSON.stringify(newNotes))I need to remove all of this, Then where do i put them??
                return (newNotes)
            }
            return state
        }
        case "save_changes": {
            let storedNotes = JSON.parse(localStorage.getItem("notes"))
            let currentNote = state.filter((note) => note.id == action.id)
            let findNote = storedNotes.find((value) => value.id == action.id)
            let newStoredNotes;
            if (findNote) {
                newStoredNotes = storedNotes.map(note => {
                    if (note.currentFile) {
                        return {
                            ...note,
                            currentFile: false
                        }
                    }
                    if (note.id === action.id) {
                        return currentNote[0]
                    }
                    return note
                })
            }
            // localStorage.setItem("notes", JSON.stringify(newStoredNotes))
            return state;
        }

        case "update_current_file": {
            let newNotes = state.map(note => {
                if (note.id == action.file_id) {
                    return {
                        ...note,
                        content: action.content
                    }
                }
                return note
            })
            return (newNotes)
        }

        case "change_current_file": {
            let newNote = state.map(note => {
                if (note.currentFile && note.id !== action.file_id) {
                    return {
                        ...note,
                        currentFile: false,
                    }
                }
                if (action.file_id == note.id && !note.currentFile) {
                    return {
                        ...note,
                        currentFile: true
                    }
                }
                return note
            })
            return (newNote)
        }
        case "create_new_file": {
            // updateStorage()
            const newNote = {
                id: uuidv4(),
                fileName: "untitled-document.md",
                date: find_date(),
                currentFile: true,
                content: " "
            }
            let oldNotes = state.map(note => {
                if (note.currentFile) {
                    return {
                        ...note,
                        currentFile: false
                    }
                }
                return note;
            })
            let newNotes = [newNote, ...oldNotes]
           // localStorage.setItem('notes', JSON.stringify(newNotes))

            // action.notify_ref.classList.add("show")
            // let timeout = setTimeout(() => {
            //     action.notify_ref.classList.remove("show") //Look for a way to clear the timeout
            // }, 1000);
            return (newNotes);
        }
        case "delete_file": {
            let newCurrentIndex = state.findIndex(note => note.id == action.file_id)

            if (newCurrentIndex >= 0 && newCurrentIndex != (state.length - 1)) {
                newCurrentIndex = newCurrentIndex + 1
            } else if (newCurrentIndex == (state.length - 1)) {
                newCurrentIndex = newCurrentIndex - 1
            }

            const updatedNotes = state.map((note, index) => {
                if (index === newCurrentIndex) {
                    return {
                        ...note,
                        currentFile: true
                    }
                }
                return note
            })
            const newNotes = updatedNotes.filter((note) => note.id !== action.file_id)
           // localStorage.setItem("notes", JSON.stringify(newNotes))

            //Notify that the note has been deleted
            // notifyRef.current.classList.add("show")
            // let timeout = setTimeout(() => {
            //     notifyRef.current.classList.remove("show")
            // }, 1000);

            return (newNotes)
        }
        default:
            return state;
    }
}