import React, { useState } from 'react'
import style from './LoginPage.module.css'
import logo from '../assets/tabuk_logo.png'
import { TbEyeClosed } from "react-icons/tb";
import { TbEye } from "react-icons/tb";
import { IoIosArrowRoundForward } from "react-icons/io";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

  const [isShowPassword, setIsShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isShowError, setIsShowError] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = () => {

    axios.post('http://localhost:5001/accounts/checkAccount', { email, password })
    .then((res) => {
        const result = res.data
        
        if (result) {
            let userData = result.data

            localStorage.setItem("user", JSON.stringify(userData))

            if (userData.type === 'admin') {
                navigate('/admin')
            }else {
                navigate('/user')
            }
        
        }else {
            setIsShowError(true)

            setTimeout(() => {
                setIsShowError(false)
            }, 3000);
            
        }

    }).catch((err) => console.log(err))
  }

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit}>
      <img src={logo} alt="logo" id={style.logo}/>
        <div className={style.card}>
            <h1>Login Account</h1>
            <input type="text" placeholder='Enter email...' required onChange={(e) => setEmail(e.target.value)}/>
            <div id={style.passwordInput}>
                <input type={isShowPassword ? 'text': 'password'} placeholder='Enter password...' required onChange={(e) => setPassword(e.target.value)}/>
                {
                    isShowPassword ? <TbEyeClosed id={style.showIcon} size={20} onClick={() => setIsShowPassword(false)} cursor={'pointer'}/> : <TbEye id={style.showIcon} size={20} onClick={() => setIsShowPassword(true)} cursor={'pointer'}/>
                }
                
            </div>
            {
                isShowError && <p style={{ color: 'red' }}>Wrong password!</p>
            }
            <button type='submit' style={{ marginTop: '20px' }}>Login</button>
        </div>
        <p id={style.link} onClick={() => navigate('/application-form')}>Apply For Scholarship <IoIosArrowRoundForward size={20}/></p>
      </form>
    </div>
  )
}

export default LoginPage
