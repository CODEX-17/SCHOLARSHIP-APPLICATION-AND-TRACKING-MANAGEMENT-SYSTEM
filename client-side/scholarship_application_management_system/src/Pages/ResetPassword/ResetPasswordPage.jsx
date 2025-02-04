import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import style from './ResetPasswordPage.module.css'
import logo from '../../../public/assets/tabuk_logo.png'
import { useForm } from 'react-hook-form'
import { MdLockReset } from "react-icons/md";
import LoadingComponents from '../../Components/LoadingComponents'
import { resetPassword } from '../../Auth/password'



const ResetPasswordPage = () => {

const { token } = useParams(null)
const navigate = useNavigate()
const [isLoadingShow, setIsShowLoading] = useState(false)
const [isDoneProcess, setIsShowDoneProcess] = useState(false)
const [message, setMessage] = useState('Data process successfully.')

const { handleSubmit, reset, register, formState: { errors } } = useForm()

useEffect(() => {
    if (!token) navigate('/login')
},[])

const onSubmit = async (record) => {
    
    const data = {
        token,
        password: record.new_password
    }

    try {

        setIsShowLoading(true)
        const result = await resetPassword(data)
        if (result) {
            setMessage(result.message)

            setTimeout(() => {
                setIsShowLoading(false)
                setIsShowDoneProcess(true)
                reset()
            }, 3000);
        }
        
    } catch (error) {
        setIsShowLoading(false)
        console.log(error)
    }
    
}

  return (
    <div className={style.container}>
        {
            isLoadingShow && (
                <div style={{ 
                    width: '100%', 
                    height: '100%', 
                    position: 'absolute', 
                    backgroundColor: 'white',
                    zIndex: 20,
                }}>
                    <LoadingComponents/>
                </div>
            )
        }
      
      <div className='d-flex flex-column align-items-center justify-content-center w-50'>
        <img src={logo} alt="logo" />
        <h1>Tabuk City, Kalinga</h1>
        <p>Scholarship Management System</p>
      </div>
      {
        isDoneProcess ?
        <div className='container d-flex flex-column align-items-center justify-content-center p-5'>
            <p>{message}</p>
            <button style={{ width: '200px', borderRadius: 5,}} onClick={() => navigate('/')}>Login</button>
        </div> :
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className={style.card}>
                <div className='d-flex align-items-center justify-content-between mb-4'>
                    <h1>Reset Password</h1>
                    <MdLockReset size={30}/>
                </div>
                <div className='d-flex flex-column mb-2'>
                    <label>New Password</label>
                    <input 
                        type="text"
                        placeholder='ex.Sample123456789!'
                        {...register('new_password', { 
                            required: 'New password is required.', 
                            validate: {
                                minLength: (value) => 
                                value.length >= 12 || 'Password must be at least 12 characters long.',
                                mixedCase: (value) =>
                                /^(?=.*[a-z])(?=.*[A-Z])/.test(value) || 
                                'Password must include both uppercase and lowercase letters.',
                                alphanumericAndSymbol: (value) =>
                                /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(value) || 
                                'Password must include at least one number and one symbol.'
                            }
                        })}
                    />
                    {errors.new_password && <p>{errors.new_password.message}</p>}
                </div>
                <div className='d-flex flex-column'>
                    <label>Re-Enter Password</label>
                    <input 
                        type="text"
                        placeholder='Passwords must match.'
                        {...register('re_password', { 
                            required: 'Re-entering the password is required.', 
                            validate: (value, allValues) => 
                            value === allValues.new_password || 'Passwords must match.' 
                        })}
                    />
                    {errors.re_password && <p>{errors.re_password.message}</p>}
                </div>
                <div className='d-flex flex-column mt-4'>
                    <button>Submit</button>
                </div>
            </div>
            </form>
        </>
      }
      
    </div>
  )
}

export default ResetPasswordPage
