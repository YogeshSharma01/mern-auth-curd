import React,{useContext} from 'react'
import noteContext from "../context/notes/noteContext";

export default function NoteItem(props) {
    const context = useContext(noteContext);
    const { deleteNote} = context;
    const {note, updateNote} = props;
  return (
    <>
    <div className="col-md-3">
    <div className="card my-3" >
        <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            <button onClick={()=>{ return deleteNote(note._id)}} type="button" className="btn btn-danger mx-2">Delete</button>
            <button type="button" onClick={()=>{updateNote(note)}} className="btn btn-info mx-2">Edit</button>
        </div>
    </div>
    </div>
    </>
  )
}
