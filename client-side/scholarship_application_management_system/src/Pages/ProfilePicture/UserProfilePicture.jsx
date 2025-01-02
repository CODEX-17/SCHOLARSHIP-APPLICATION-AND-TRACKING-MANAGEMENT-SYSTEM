import React, { useEffect } from 'react'
import style from './UserProfilePicture.module.css'

const UserProfilePicture = ({ profile_pic, firstname }) => {

  const BASE_URL = 'http://localhost:5001'

  return (
    profile_pic === 'default' ? 
        <div className={style.default}>
            {firstname.substring(0,1).toUpperCase()}
        </div> :
        <div className={style.profilePic}>
            <img src={`${BASE_URL}/${profile_pic}`} alt="profile" />
        </div>
  )
}

export default UserProfilePicture
