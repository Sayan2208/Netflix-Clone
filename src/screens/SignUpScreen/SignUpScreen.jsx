import React, { useRef } from "react";
import "./SignUpScreen.css";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

function SignUpScreen() {
  const emailRef = useRef(null); //Imagine a big finger pointing at an html element.
  const passwordRef = useRef(null);
  const register = (event) =>{
    event.preventDefault();

    createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
    .then((cred)=>{
      console.log(cred.user);
    })
    .catch((err)=>{
      alert(err.message);
    })
  }

  const signIn = (event) =>{
    event.preventDefault();

    signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
    .then((cred)=>{
      console.log(cred.user);
    })
    .catch((err)=>{
      alert(err.message);
    })
  }
  return (
    <div className="signUpScreen">
      <form>
        <h1>Sign In</h1>
        <input ref={emailRef} type="email" placeholder="Email" />
        <input ref={passwordRef} type="password" placeholder="Password" />
        <button type="submit" onClick={signIn}>Sign In</button>

        <h4>
          <span className="signUpScreen__gray">New to Netflix? </span>
          <span className="signUpScreen__link" onClick={register}>Sign up now.</span>
        </h4>
      </form>
    </div>
  );
}

export default SignUpScreen;
