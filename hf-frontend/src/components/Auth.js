import React, { useState, useContext } from 'react'
import '../css/auth.css'
import axios from 'axios';
import { GlobalContext } from "../context/globalContext";

const Auth = () => {


    //Global State //
    const {setCurrentUser, setLocalStoreageUser} = useContext(GlobalContext);


    //Local Form State //
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError] = useState('');
    const [ signInVSCreateAccount, setSignInVSCreateAccount] = useState(true);

   

    const attemptSignIn = async () => {
        setError('')
        const URL = 'http://localhost:4500/users/login'
        try{
            const returnData = await axios.post(URL, { user : username, password })
            setCurrentUser(returnData.data)
            setLocalStoreageUser(returnData.data)
        }catch(err){
            setError(err.response.data.message)
        }
    }

    const attemptCreateAccount = async()=>{
        setError('')
         const URL = 'http://localhost:4500/users/signup'
         try{
            const returnData = await axios.post(URL, {user : username, email, password})
            setCurrentUser(returnData.data)
            setLocalStoreageUser(returnData.data)
            
         }catch(err){
             console.log(err)
            setError(err.response.data.message)
         }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(signInVSCreateAccount){
            attemptCreateAccount()
        }else{
            attemptSignIn()
        }
    }

    const toggleFormType = () => {
        setSignInVSCreateAccount( p => !p)
        setPassword('')
        setUsername('')
    }

    

    return (
        <div className = 'authContainer'>
            <form className = 'authForm'  onSubmit = {handleSubmit} >
                <div className="form__title__container">
                    <i className = 'fab fa-twitter'></i>
                    <h2 className= 'form__title'>Flitter <span className="form__subtitle">Twitter without the Fleets</span> </h2>
                    <h4 className = 'form__boost'>{signInVSCreateAccount ? "Create Account" : "Sign In"}</h4>
                </div>
                <div className="form__input__container">
                    <input type="text"  autoComplete = 'on' className="form__username form__input" placeholder = "username" minLength = {6} value = {username} onChange = {(e) => setUsername(e.currentTarget.value)}/>
                    {signInVSCreateAccount && <input type="email"  autoComplete = 'on' className="form__email form__input" placeholder = "email" minLength = {6} onChange = {(e) => setEmail(e.currentTarget.value)}/>}
                    <input type = 'password' autoComplete = 'on' className="form__password form__input" placeholder = "password" minLength = {6} value = {password} onChange = {(e) => setPassword(e.currentTarget.value)}/>
                </div>
                <p className = 'form__error'>{error} {error.length >= 1 && <i className = 'fas fa-times clear-error' onClick = {()=> setError('')}></i>}</p>
                <div className="form__button__container">
                    <button type = 'submit' className = "btn form__signIn">{ signInVSCreateAccount ? "Create Account" : "Sign In"}</button>
                    <p className = "btn form__toggle__signIn" onClick ={toggleFormType} >{signInVSCreateAccount ? "Already Have an Accout? Sign In" : "Dont Have An Account? Create One"}</p>
                </div>
            </form>
        </div>
    )
}

export default Auth
