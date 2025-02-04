import React, { useContext, useEffect, useState } from 'react'
import style from './UserProfilePicture.module.css'
import { IoPerson } from "react-icons/io5";
import { UserContext } from '../../context/userContext';


const UserProfilePicture = () => {

  const BASE_URL = 'http://localhost:5001'
  const { userDetails, setUserDetails } = useContext(UserContext)
  const [image, setImage] = useState(userDetails?.profile_pic)

  useState(() => {
    setImage(userDetails?.profile_pic)
  },[userDetails, setUserDetails])

  return (
    image === '' ? 
        <div className={style.default}>
            <IoPerson size={100}/>
        </div> :
        <div className={style.profilePic}>
            <img src={`${BASE_URL}/${image}`} alt="profile" />
        </div>
  )
}

export default UserProfilePicture
