import React, { useEffect, useState } from 'react'
import style from './Homepage.module.css'
import { AiFillNotification } from "react-icons/ai";
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Homepage = () => {

  const [postList, setPostList] = useState([])
  const url = 'http://localhost:5001'

  useEffect(() => {
    axios.get(`${url}/announcements/getAnnouncements`)
    .then((res) => {
        const result = res.data
        if (result.length > 0) {
            const sortedDates = sortSchedulesByDateTimeDescending(result)
            setPostList(sortedDates)
        }
    })
    .catch(err => console.log(err)) 
  },[])

  const sortSchedulesByDateTimeDescending = (date) => {
    return date.sort((a, b) => {
        const dateTimeA = new Date(a.date).getTime() + new Date(`1970-01-01T${a.time}`).getTime();
        const dateTimeB = new Date(b.date).getTime() + new Date(`1970-01-01T${b.time}`).getTime();
        return dateTimeB - dateTimeA; // Sort newest to oldest
    });
}

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
                                        <LazyLoadImage
                                            id={style.imagePost}
                                            height='100%'
                                            alt="Post picture"
                                            src={`${url}/${data.anc_image}`}
                                            effect="blur" // You can also use "opacity" or "black-and-white"
                                        />
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
