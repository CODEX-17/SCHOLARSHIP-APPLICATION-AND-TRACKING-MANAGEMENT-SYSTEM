import React, { useContext, useRef, useState } from 'react'
import style from './ManageAccountComponent.module.css'
import { IoMdSettings } from "react-icons/io";
import { BiExit } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import { useForm } from 'react-hook-form'
import { sendPasswordLink } from '../Auth/password';
import { IoMdInformationCircleOutline } from "react-icons/io";
import { updateAccount } from '../Services/accountServices'
import { UserContext } from '../context/userContext';


const ManageAccountComponent = ({ setIsShowManageAccount, notificationConfig }) => {

  const { userDetails, setUserDetails } = useContext(UserContext)

  const [image, setImage] = useState(null)
  const [isShowInfoBox, setIsShowInfoBox] = useState(false)
    
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    defaultValues: {
        firstname: userDetails?.firstname,
        middlename: userDetails?.middlename,
        lastname: userDetails?.lastname,
        email: userDetails?.email,
    }
  })

  const inputFile = useRef(null)

  const onSubmit = async (data) => {

    const formData = new FormData()
    formData.append('firstname', data.firstname)
    formData.append('middlename', data.middlename)
    formData.append('lastname', data.lastname)
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
            updatedUserDetails.firstname = data.firstname
            updatedUserDetails.middlename = data.middlename
            updatedUserDetails.lastname = data.lastname
            updatedUserDetails.image = data.filename

            setUserDetails(updatedUserDetails)
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
                <label>First Name</label>
                <input 
                    type="text"
                    placeholder='ex.Juan'
                    {...register('firstname', { required: 'First Name is required.' })}
                />
                {errors.firstname && <p style={{ margin: 0, color: 'red' }}>{errors.firstname.message}</p>}
            </div>
            <div className='d-flex w-100 flex-column gap-2'>
                <label>Middle Name</label>
                <input 
                    type="text"
                    placeholder='ex.Reyes' 
                    {...register('middlename', { required: 'Middle Name is required.' })}
                />
                {errors.middlename && <p style={{ margin: 0, color: 'red' }}>{errors.middlename.message}</p>}
            </div>
            <div className='d-flex w-100 flex-column gap-2'>
                <label>Last Name</label>
                <input 
                    type="text"
                    placeholder='ex.Dela Cruz'
                    {...register('lastname', { required: 'Last Name is required.' })}
                />
                {errors.lastname && <p style={{ margin: 0, color: 'red' }}>{errors.lastname.message}</p>}
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
