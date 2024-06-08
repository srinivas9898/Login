import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';

function Signup() {

  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let passwordInputRef = useRef();
  let ageInputRef = useRef();
  let emailInputRef = useRef();
  let mobileNoInputRef = useRef();
  let profilePicInputRef = useRef();

  let[profilePic,setProfilePic] = useState("./images/noimage.png");

  let onSignup = async()=>{

     let myHeader = new Headers();
     myHeader.append("content-type","application/json");

     let dataToSend = {
      firstName:firstNameInputRef.current.value,
      lastName:lastNameInputRef.current.value,
      password:passwordInputRef.current.value,
      age:ageInputRef.current.value,
      email:emailInputRef.current.value,
      mobileNo:mobileNoInputRef.current.value,
      profilePic:profilePicInputRef.current.value,
     }

    let reqOptions ={
      method:"Post",
      headers:myHeader,
      body:JSON.stringify(dataToSend),
    };
    let JSONData = await fetch("http://localhost:4567/register,",reqOptions);

    let JSOData = await JSONData.json();
   
     alert(JSOData.msg); 
    console.log(JSOData);
  };

  let onSignupUsingFD = async()=>{
   
      let dataToSend = new FormData();
      dataToSend.append("firstName",firstNameInputRef.current.value);
      dataToSend.append("lastName",lastNameInputRef.current.value);
      dataToSend.append("email",emailInputRef.current.value);
      dataToSend.append("password",passwordInputRef.current.value);
      dataToSend.append("age",firstNameInputRef.current.value);
      dataToSend.append("mobileNo",mobileNoInputRef.current.value);
      dataToSend.append("profilePic",profilePicInputRef.current.value);
      

    let reqOptions={
      method:"POST",
      body:dataToSend,
    };

       let JSONData = await fetch("http://localhost:4567/register",reqOptions);
     let JSOData = await JSONData.json();
     alert(JSOData.msg);
       console.log(JSOData)
  };    

  let onSignupUsingURLE = async()=>{
    let myHeader = new Headers();
    myHeader.append("content-type","application/x-www-form-urlencoded");

      let dataToSend = new URLSearchParams();
      dataToSend.append("firstName",firstNameInputRef.current.value);
      dataToSend.append("lastName",lastNameInputRef.current.value);
      dataToSend.append("email",emailInputRef.current.value);
      dataToSend.append("password",passwordInputRef.current.value);
      dataToSend.append("age",firstNameInputRef.current.value);
      dataToSend.append("mobileNo",mobileNoInputRef.current.value);

      for(let i=0;i<profilePicInputRef.current.file.length;i++){
        dataToSend.append("profilePic",profilePicInputRef.current.file[i]);
      }
   
      

    let reqOptions={
      method:"POST",
      headers:myHeader,
      body:dataToSend,
    };

       let JSONData = await fetch("http://localhost:4567/register",reqOptions);
     let JSOData = await JSONData.json();
     alert(JSOData.msg);
       console.log(JSOData)
  };    

  return (
    <div className="App">
        <form>
          <h2>Signup</h2>
            <div>
            <label>FirstName:</label>
            <input ref={firstNameInputRef}></input>
            </div>
            <div>
            <label>LastName:</label>
            <input ref={lastNameInputRef}></input>
            </div>
            <div>
            <label>Email:</label>
            <input ref={emailInputRef}></input>
            </div>
            <div>
            <label>Password:</label>
            <input ref={passwordInputRef}></input>
            </div>
            <div>
            <label>Age:</label>
            <input ref={ageInputRef}></input>
            </div>
            <div>
            <label>Mobile No:</label>
            <input ref={mobileNoInputRef}></input>
            </div>
            <div>
            <label>Profile Pic:</label>
            <input ref={profilePicInputRef} type="file" accept="image/*" onClick={(eo)=>{
               let selectedPicPath = URL.createObjectURL(eo.target.files[0]);
               setProfilePic(selectedPicPath);
            }}></input>
            <br></br>
            <img src={profilePic} className="profilePic"></img>
            </div>
            <div>
           <button type="button" onClick={()=>{
            onSignup();
           }}>Sign Up (JSON)</button>
           <button type="button" onClick={()=>{
            onSignupUsingURLE();
           }}>Sign Up (URLE)</button>
           <button type="button" onClick={()=>{
           onSignupUsingFD();
           }}>Sign Up (FD)</button>
            </div>
        </form>
        <br></br>
        <br></br>
        <Link to="/">Login</Link>
    </div>
  )
}

export default Signup;