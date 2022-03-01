import React,{useContext, useState} from 'react'
import noteContext from "../context/notes/noteContext";


export const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote} = context;
    const [note, setNote] = useState({title: "", description: "", tag:""})
  const clickHandler = (e) =>{
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title: "", description: "", tag:""});
  }

  const onChange = (e) =>{
    setNote({...note, [e.target.name]: e.target.value});
  }


  return (
    <>
      <div className="container my-3">
     <h1>Add a Note</h1> 
     <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input required value={note.title} minLength={5} type="text" className="form-control" id="title" name="title" onChange={onChange} />
        
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input required value={note.description} minLength={5} type="text" className="form-control" id="description" name="description" onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input required value={note.tag}  type="text" className="form-control" id="tag" name="tag" onChange={onChange}/>
          </div>
          
          <button disabled={note.title.length<5 || note.description.length<5} type="submit" onClick={clickHandler} className="btn btn-primary">Add a Note</button>
      </form>
      </div>
    </>
  )
}
