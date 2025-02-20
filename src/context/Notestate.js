import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    // const s1 = {s
    //     "name" : "nayan",
    //     "class" : "5b"
    // }
    // const [state, setState] = useState(s1);
    // const update = () => { 
    //     setTimeout(() => {
    //         setState({
    //             "name" : "Harsh",
    //             "class" : "10b"
    //         })
    //     }, 1000);
    // }

    // const host = "http://localhost:5000"
    const host = "https://inotec-9.onrender.com"

    const notesInitial = []
    const [notes, setnotes] = useState(notesInitial)

    // Get all Notes
    const getNotes = async () => {
      // API Call 
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET", 
        headers: {
          "Content-Type": "application/json", 
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify(),
      });
      const json = await response.json();
      setnotes(json);
    }

    // Add a Note
    const addNote = async (title, description, tag) => {
      // TODO : API call
      // API Call
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag}), 
      });

      const note = await response.json();
      setnotes(notes.concat(note));
    }

    // Delete a Note
    const deleteNote = async (id) => {
      // API call
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      });
      const json = await response.json();  
      console.log(json);

      const newNote = notes.filter((note)=>{return note._id !== id})
      setnotes(newNote);
    }

    // Edit a Note
    const editNote = async (id, title, description, tag) => {
      // API Call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag}), 
      });
      const json = await response.json(); 
      console.log(json);
      
      let newNotes = JSON.parse(JSON.stringify(notes));
      // Logic to edit in client
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setnotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;