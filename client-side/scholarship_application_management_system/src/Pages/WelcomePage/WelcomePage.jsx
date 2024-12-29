import React, { useEffect } from 'react'
import style from './WelcomePage.module.css'
import { FaWpforms } from "react-icons/fa"
import { IoMdInformationCircle } from "react-icons/io"
import { useNavigate } from 'react-router-dom'
import { getProfileByUserID } from '../../Services/profileServices'

const WelcomePage = () => {

  const userDetails = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()

  useEffect(() => {

    if (userDetails?.type === 'user') {
        const fetchData = async () => {

            try {
                const result = await getProfileByUserID(userDetails?.user_id)
                console.log(result)
    
                if (result.length > 0) {
                    console.log('nice')
                    navigate('/dashboard')
                }
    
            } catch (error) {
                
            }
        }
    
        fetchData()
    }else {
        navigate('/dashboard')
    }

  },[])

  return (
    <div className={style.container}>
        <div className='container w-100 h-100 p-5 d-flex flex-column align-items-center justify-content-center overflow-auto'>
            <h3 className='fs-2 mb-5'>Congratulations, <b style={{ fontFamily: 'bold', color: '#6EC207' }}>{userDetails?.firstname + " " +userDetails?.lastname} </b></h3>
            <div className='w-100 fs-5 text-center mb-3'>
                Your account has been successfully created. You can now apply for various scholarship programs, manage your applications, and track your progress. We are excited to be part of your educational journey. Welcome to the City of Tabuk Scholarship Management System!
            </div>
            <div style={{ color: '#6EC207', textAlign: 'center' }}>
                <IoMdInformationCircle/>Before we proceed, please complete the required details in your profile to ensure a smooth application process.
            </div>
            <button className='mt-5' onClick={() => navigate('/form')}>Fill out the form <FaWpforms/></button>
        </div>
    </div>
  )
}

export default WelcomePage
