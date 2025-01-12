import React, { useEffect } from 'react'
import style from './UserProfilePicture.module.css'
import { IoPerson } from "react-icons/io5";

const UserProfilePicture = ({ profile_pic }) => {

  const BASE_URL = 'http://localhost:5001'

  return (
    profile_pic === 'default' ? 
        <div className={style.default}>
            <IoPerson size={100}/>
        </div> :
        <div className={style.profilePic}>
            <img src={`${BASE_URL}/${profile_pic}`} alt="profile" />
        </div>
  )
}

export default UserProfilePicture
