import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  
  let emailInputRef = useRef();
  let passwordInputRef = useRef();

    let dispatch = useDispatch();

    let navigate = useNavigate();
 
     let validateLogin = async()=>{
        
        let dataToSend = new FormData();
        dataToSend.append("email",emailInputRef.current.value);
        dataToSend.append("password",passwordInputRef.current.value);

        let reqOptions = {
            method:"POST",
            body:dataToSend,
        };

        let JSONData = await fetch("http://localhost:4567/login",reqOptions);
        let JSOData = await JSONData.json();

            if(JSOData.status === "success"){
              dispatch({type:"login",data:JSOData.data});
                        navigate("/dashboard");
            }else{
              alert(JSOData.msg);
            }

        console.log(JSOData);
     };

  return (
    <div className="App">
        <form>
            <h2>Login</h2>
           
            <div>
            <label>Email:</label>
            <input ref={emailInputRef}></input>
            </div>
            <div>
            <label>Password:</label>
            <input ref={passwordInputRef}></input>
           <button type="button" onClick={()=>{
             validateLogin();
           }}>Login</button>
            </div>
        </form>
        <br></br>
        <br></br>
        <Link to="/signup">Signup</Link>
    </div>
  )
}

export default Login;