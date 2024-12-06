import React, { useRef, useState } from 'react'
import style from './ManageAccountComponent.module.css'
import { IoMdSettings } from "react-icons/io";
import { BiExit } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import { useForm } from 'react-hook-form'
import { sendPasswordLink } from '../Auth/password';
import { IoMdInformationCircleOutline } from "react-icons/io";
import { updateAccount } from '../Services/accountServices'


const ManageAccountComponent = ({ setIsShowManageAccount, notificationConfig }) => {

  const userDetails = JSON.parse(localStorage.getItem('user')) || null

  const [image, setImage] = useState(null)
  const [isShowInfoBox, setIsShowInfoBox] = useState(false)
    
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors }
  } = useForm({
    defaultValues: {
        username: userDetails?.username,
        email: userDetails?.email,
    }
  })

  const inputFile = useRef(null)

  const onSubmit = async (data) => {

    const formData = new FormData()
    formData.append('username', data.username)
    formData.append('email', data.email)
    formData.append('user_id', userDetails?.user_id)

    if (image) {
        formData.append('image', image)
    }else {
        formData.append('image', userDetails?.image)
    }

    try {
        const result =  await updateAccount(formData)
        console.log(result)
        if (result) {
            const data = result.object
            let updatedUserDetails = {...userDetails}

            updatedUserDetails.email = data.email
            updatedUserDetails.username = data.username
            updatedUserDetails.image = data.filename

            console.log(updatedUserDetails)

            localStorage.setItem('user', JSON.stringify(updatedUserDetails))
            notificationConfig(result.message, true)
            setIsShowManageAccount(false)
        }
    } catch (error) {
        console.log(error)
    }
    

  }

  const handleChangePassword = async () => {
    if (userDetails?.email) {
        const email = userDetails?.email

        try {
            const result= await sendPasswordLink(email)
            if (result) {
               setIsShowInfoBox(true)
               notificationConfig(result.message, true)
            }
        } catch (error) {
            console.log(error)
        }
        
    }
  }

  return (
    <div className={style.container}>

      <div className={style.card}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='d-flex w-100 align-items-center justify-content-between'>
                <h1>Manage Account <IoMdSettings/></h1>
                <BiExit cursor={'pointer'} title='exit' size={20} onClick={() => setIsShowManageAccount(false)}/>
            </div>
            
            <div className='w-100 d-flex align-items-center justify-content-center mt-5'>
                <div className={style.imageDiv} onClick={() => inputFile.current.click()}>
                    {
                        image ? <img src={URL.createObjectURL(image)} alt="image" id={style.profilePic}/> : 'Change Image.'
                    }
                </div>
                <input type="file" ref={inputFile} style={{ display: 'none' }} onChange={(e) => setImage(e.target.files[0])}/>
            </div>
        
            <div className='d-flex w-100 flex-column gap-2'>
                <label>Username</label>
                <input 
                    type="text" 
                    {...register('username', { required: 'Username is required.' })}
                />
                {errors.username && <p style={{ margin: 0, color: 'red' }}>{errors.username.message}</p>}
            </div>
            <div className='d-flex w-100 flex-column gap-2'>
                <label>Email</label>
                <input 
                    type="text"
                    {...register('email', { required: 'Email is required.' })}
                />
                {errors.email && <p style={{ margin: 0, color: 'red' }}>{errors.email.message}</p>}
            </div>
            <div className='w-100 d-flex flex-column gap-2 mt-2 align-items-center'>
                <button type='submit' disabled={isShowInfoBox}>Save Changes</button>
                <p id={style.changePass} onClick={handleChangePassword}>Change Password <RiLockPasswordLine/></p>
                {
                    isShowInfoBox &&  <div className={style.infoBox}><IoMdInformationCircleOutline/>Reset Link is sent via email. Please check the reset link in your inbox.</div>
                }
               
            </div>
            
        </form>
      </div>
    </div>
  )
}

export default ManageAccountComponent
