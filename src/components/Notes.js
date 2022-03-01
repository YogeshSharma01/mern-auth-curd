import React,{useContext, useEffect, useRef} from 'react'
import noteContext from "../context/notes/noteContext";
import NoteItem from './NoteItem';
import { AddNote } from './AddNote';
import {useNavigate}from "react-router-dom";





export default function Notes() { 
  const context = useContext(noteContext);
  let history = useNavigate();
  const {notes, getNotes} = context;
  useEffect(()=>{
    if(localStorage.getItem('token')){
      getNotes();
    }else{
      history('/login');
    }
  },[])
  
  const ref = useRef(null);
  const updateNote = (note)=>{
    ref.current.click();
    console.log('updateNote');
}
  return (
    <>
    <AddNote/>
    {/* This modal is not working work TODO */}
    <button ref={ref} type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
      Launch demo modal
    </button>


<div  className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        ...
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
    <div className="row my-3">
    <h1>Your Notes</h1> 
    <div className="container mx-3">
    {notes.length === 0 && 'No notes to display!'}
    </div>
    {notes.map((note)=>{
     return <NoteItem key={note.id} updateNote={updateNote} note={note}/>;
    })}
    </div>
    </>
  )
}
