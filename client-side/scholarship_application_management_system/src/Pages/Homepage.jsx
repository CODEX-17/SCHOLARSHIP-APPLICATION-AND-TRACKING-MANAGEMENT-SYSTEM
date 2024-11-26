import React, { useEffect, useState } from 'react'
import style from './Homepage.module.css'
import { AiFillNotification } from "react-icons/ai";
import sample from '../assets/tabuk_logo.png'
import axios from 'axios';

const Homepage = () => {

  const [postList, setPostList] = useState([])
  const url = 'http://localhost:5001'

  useEffect(() => {
    axios.get(`${url}/announcements/getAnnouncements`)
    .then((res) => {console.log(res.data), setPostList(res.data)})
    .catch(err => console.log(err)) 
  },[])

  const convertToDesiredDate = (inputDate) => {

    const oldDate = new Date(inputDate)

    // Format the new date to "Month Day, Year"
    const formattedDate = oldDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    })

    return formattedDate
  }
  
  const convertTo12HourFormat = (timeString) => {
   
    const [hours, minutes] = timeString.split(":");

    const hourNumber = parseInt(hours, 10);
    const period = hourNumber >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    const hour12 = hourNumber % 12 === 0 ? 12 : hourNumber % 12;

    // Return formatted time string
    return `${hour12}:${minutes} ${period}`;
}

  return (

    <div className={style.container}>
        <div className='container'>
            <div className={style.head}>
                <h2><AiFillNotification size={30}/> Announcements</h2>
            </div>
            <div className={style.content}>
                {
                    postList.length > 0 ? (
                        postList.map((data, index) => (
                            <div className={style.card} key={index}>
                                <div className='d-flex w-100 gap-2 align-items-center justify-content-start mb-2'>
                                    <h3>{data.anc_title}</h3>
                                    <p 
                                        style={{ 
                                            fontSize: '0.6rem',
                                            margin: 0, 
                                            color: 'gray', 
                                            fontStyle: 'italic',
                                            padding: 0,
                                         }}
                                    >{`${convertToDesiredDate(data.date)} ${convertTo12HourFormat(data.time)}`}</p>
                                </div>
                                
                                <p>{data.anc_content}</p>
                                {
                                    data.anc_image && 
                                    <div className={style.imgContainer}>
                                        <img src={`${url}/${data.anc_image}`} alt="Post picture" />
                                    </div>
                                }
                                
                            </div>
                        ))
                    ) : (
                        <div className='d-flex w-100 h-100 align-items-center justify-content-center'>
                            <h3 className='text-bold'>No announcement.</h3>
                        </div>
                    )
                        

                } 
            </div>
        </div>
    </div>
  )
}

export default Homepage
