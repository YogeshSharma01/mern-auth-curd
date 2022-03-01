import React,{useState} from "react";
import noteContext from "./noteContext";
const NoteState = (props) =>{
    const host = "http://localhost:5000";
    const initialNotes = []
    const [notes, setNotes] = useState(initialNotes)

    // Get All notes
    const getNotes = async() =>{
        // API call 
        
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
            },
          });
          const resJson = await response.json();
          
          setNotes(resJson);
          
    }
    // Add a note
    const addNote = async(title, description, tag) =>{
        // API TODO
        const url = `${host}/api/notes/addnote`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({title, description,tag}) 
          });
          const note = await response.json();
          setNotes(notes.concat(note));
          
       
    }
    // Delete a note
   const deleteNote = async(id) =>{
       // API call backend attached
       const url = `${host}/api/notes/deletenode/${id}`
       const response = await fetch(url, {
           method: 'DELETE',
           headers: {
             'Content-Type': 'application/json',
             'auth-token':localStorage.getItem('token')
           },
           
         });
         const json =  response.json();
         console.log(json);
         

    //    client login 
        console.log("Deleting a note with this id : " + id);
        const newNote = notes.filter((note)=>{return note._id!==id});
        setNotes(newNote); 
    }
    // Edit a note
    const editNote = async(id, title, description, tag) =>{
        // API work from backend
        const url = `${host}/api/notes/updatenote/${id}`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag}) 
          });
          const json =  response.json();
          console.log(json);
        // login to edit in client
        for(let i = 0; i <notes.length; i++){
            const elem = notes[i];
            if(elem._id === id){
                elem.title = title;
                elem.description = description;
                elem.tag = tag;
            }
        }
        
    }
return ( <noteContext.Provider value={{notes, addNote, deleteNote,editNote,getNotes}}>
        {props.children}
    </noteContext.Provider>
    
)}

export default NoteState;