import React, { useState, useRef, useEffect } from 'react'
import style from './CreateAccount.module.css'
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { FaCircleCheck } from "react-icons/fa6";
import { FaCircleInfo } from "react-icons/fa6";
import axios from 'axios'

const CreateAccount = () => {

  const [email, setEmail] = useState('') 
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [profilePic, setProfilePic] = useState(null)
  const [isBtnEnabled, setIsBtnEnabled] = useState(null)
  const fileInput = useRef(null)
  
  // password requirements variables
  const [mixChar, setMixChar] = useState(false)
  const [specialChar, setSpecialChar] = useState(false)
  const [validLenghtChar, setValidLenghtChar] = useState(false)

  const hasLowerAndUpperCase = (value) => {
    return /[a-z]/.test(value) && /[A-Z]/.test(value)
  }

  const hasNumberAndSymbols = (value) => {
    return /[0-9]/.test(value) && /[!@#$%^&*()]/.test(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()

    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('file', profilePic);

    axios.post('http://localhost:5001/accounts/createAccount', formData)
    .then((res) => {
        const result = res.data
        const message = result.message

        console.log(message)

        setIisShowSubmitted(true)
    })
    .catch((err) => console.log(err))
  }


  useEffect(() => {
    if (password) {

        if (password=== '') {
            setValidLenghtChar(false)
            setSpecialChar(false)
            setMixChar(false)
        }

        if (password.length > 11) {
            setValidLenghtChar(true)
        }else {
            setValidLenghtChar(false)
        }

        if (hasLowerAndUpperCase(password)) {
            setMixChar(true)
        }else {
            setMixChar(false)
        }

        if (hasNumberAndSymbols(password)) {
            setSpecialChar(true)
        }else {
            setSpecialChar(false)
        }    
    }

    if (profilePic && mixChar && validLenghtChar && specialChar && password === rePassword) {
        setIsBtnEnabled(false)
    }else {
        setIsBtnEnabled(true)
    }

  },[
    profilePic,
    password,
    rePassword,
    mixChar,
    specialChar,
    validLenghtChar
  ])

  return (
    <div className={style.container}>
        <div className={style.card}>
            <form onSubmit={handleSubmit}>  
                <div className='d-flex w-100 mt-2 align-items-center justify-content-between'>
                    <h1 id={style.subtitle} style={{ color: '#6EC207' }}>Create Account</h1>
                    <FaArrowRight cursor={'pointer'} title='back to login'/>
                </div>
                <div className='d-flex w-100 gap-5'>
                    <div className='d-flex flex-column gap-2 w-100 align-items-center justify-content-center'>
                        <div className='d-flex gap-2 flex-column align-items-start w-100'>
                            <label>Username</label>
                            <input type="text" value={username} placeholder='ex. sample17' required onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div className='d-flex gap-2 flex-column align-items-start w-100'>
                            <label>Email</label>
                            <input type="email" value={email} placeholder='ex. sample@gmail.com' required onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className='d-flex gap-2 flex-column align-items-start w-100'>
                            <label>Password</label>
                            <input type="text" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className='d-flex flex-column w-100'>
                            <p><FaCircleCheck color={validLenghtChar ? '#6EC207' : 'gray'}/> at least 12 characters long.</p>
                            <p><FaCircleCheck color={mixChar ? '#6EC207' : 'gray'}/> contains a mix of uppercase and lowercase letters.</p>
                            <p><FaCircleCheck color={specialChar ? '#6EC207' : 'gray'}/> includes numbers and special characters.</p>
                        </div>
                        <div className='d-flex gap-2 flex-column align-items-start w-100 mt-2'>
                            <label>Re-enter Password</label>
                            <input type="text" required value={rePassword} onChange={(e) => setRePassword(e.target.value)}/>
                        </div>
                        <div className='d-flex gap-2 flex-column align-items-start w-100 mt-3'>
                            <button disabled={isBtnEnabled}>Create Account</button>
                        </div>
                    </div>
                    <div className='d-flex flex-column p-2 align-items-start justify-content-center'>
                        <div className={style.imgDiv} onClick={() => fileInput.current.click()}>
                            {
                                profilePic ? 
                                <img src={URL.createObjectURL(profilePic)} alt="profile" /> :
                                'Upload image here.'
                            }
                        </div>
                        <input type="file" ref={fileInput} style={{ display: 'none' }} onChange={(e) => setProfilePic(e.target.files[0])}/>
                    </div>
                    
                </div>  
            </form>
        </div>
    </div>
  )
}

export default CreateAccount