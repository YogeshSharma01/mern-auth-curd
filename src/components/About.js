import React from 'react';



export default function About() {


  return (
    <>
        <h1 className="my-2">About Page </h1> 
        <div style={{display:"flex"}} className="continer">
       
        <img className="my-3" src="https://media.giphy.com/avatars/chartadesign/sgYyTAmvUUkx.gif" alt="about"></img>
        <div>
        <h2 >This is About page </h2>
        <p> This is <strong><i>Digital note</i> </strong> making app it allows you to Create, Delete, organise and share your notes, making it easy to collaborate with others. </p>
        <img src="https://media2.giphy.com/media/3o7GUB9ExWUxjiSrKw/giphy.gif" alt="img"></img>
        <p className="mx-2">Your crucial data is stored on cloud storage </p>
        </div>
        </div>
       
    </>
  )
}
