import React, { useRef, useState } from 'react'
import style from './ManageAccountComponent.module.css'
import { IoMdSettings } from "react-icons/io";
import { BiExit } from "react-icons/bi";

const ManageAccountComponent = ({ handleShowCloseManageAccount }) => {

  const userDetails = JSON.parse(localStorage.getItem('user')) || null

  const [username, setUsername] = useState(userDetails.username)
  const [email, setEmail] = useState(userDetails.email)
  const [password, setPassword] = useState(userDetails.password)
  const [image, setImage] = useState(null)

  const [isShowChangePassword, setIsShowChangePassword] = useState(false)

  const inputFile = useRef(null)

  return (
    <div className={style.container}>
      <div className={style.card}>
        <div className='d-flex w-100 align-items-center justify-content-between'>
            <h1>Manage Account <IoMdSettings/></h1>
            <BiExit cursor={'pointer'} title='exit' size={20} onClick={() => handleShowCloseManageAccount(false)}/>
        </div>
        
        <div className='w-100 d-flex align-items-center justify-content-center mt-5'>
            <div className={style.imageDiv} onClick={() => inputFile.current.click()}>
                {
                    image ? <img src={URL.createObjectURL(image)} alt="image" id={style.profilePic}/> : 'Change Image.'
                }
            </div>
            <input type="file" ref={inputFile} style={{ display: 'none' }} onChange={(e) => setImage(e.target.files[0])}/>
        </div>
    
        <div className='d-flex flex-column gap-2'>
            <label>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className='d-flex flex-column gap-2'>
            <label>Email</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className='w-100 d-flex flex-column gap-2 mt-2'>
            <button onClick={() => setIsShowChangePassword(!isShowChangePassword)}>Change Password</button>
        </div>
        {
            isShowChangePassword && 
            <>
                <div className='d-flex flex-column gap-2 mt-2'>
                    <label>Current Password</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className='d-flex flex-column gap-2'>
                    <label>New Password</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className='d-flex flex-column gap-2'>
                    <label>Re-Enter Password</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
            </>
        }
        
        
      </div>
    </div>
  )
}

export default ManageAccountComponent
