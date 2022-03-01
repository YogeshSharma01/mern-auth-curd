import React, {useState} from 'react'
import {useNavigate}from "react-router-dom";

const Signup = () => {
  const [credential, setCredentials] = useState({name:"",email: "", password: "", cpassword:""})
    let history = useNavigate();
    const handleSubmit = async(e) =>{
        e.preventDefault();
        const {name, email, password} = credential;

        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password})
          });
          const json = await response.json();
          console.log(json);
          if(json.success){
            //   store in local storage and redirect 
              localStorage.setItem('token',json.authToken)
              history("/");
          }else{
            alert('Invalid Credentials');
          }
    }
    const onChange = (e) =>{
        setCredentials ({...credential, [e.target.name]: e.target.value});
    }
  return (
    <>
    <div className="container">
    <h1>Sign Up</h1>
    <form onSubmit={handleSubmit}>
    <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input required onChange={onChange} type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input required onChange={onChange} type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp"/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input required onChange={onChange} minLength={5} type="password" className="form-control" name="password" id="password"/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input required onChange={onChange} minLength={5} type="password" className="form-control" name="cpassword" id="cpassword"/>
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div>
      
    </>
  )
}

export default Signup
