import React, { useEffect, useState } from 'react'
import style from './NotificationComponent.module.css'
import { FaCircleCheck } from "react-icons/fa6";
import { TbXboxXFilled } from "react-icons/tb";

const NotificationComponent = ({ message, status }) => {

  const [finalMessage, setFinalMessage] = useState(message)

  useEffect(() => {
    setFinalMessage(message)
  },[])

  
  const finalStatus = status ? status : true
    
  return (
    <div className={style.container} style={{ backgroundColor: finalStatus ? '#347928' : '#C7253E' }}>
      {finalStatus ? <FaCircleCheck size={25}/> : <TbXboxXFilled size={25}/>}
      {finalMessage}
    </div>
  )
}

export default NotificationComponent
