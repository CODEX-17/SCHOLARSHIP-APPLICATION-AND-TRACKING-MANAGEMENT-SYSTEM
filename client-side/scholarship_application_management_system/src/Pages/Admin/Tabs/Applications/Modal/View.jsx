import React, { useEffect, useState } from 'react'
import style from './View.module.css'
import { BiExit } from "react-icons/bi";
import { FaDownload } from "react-icons/fa";
import sample from '../../../../../assets/tabuk_logo.png'
import { IoPerson } from "react-icons/io5";
import { Tabs } from 'antd';
import { FaLocationDot } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import { SiFiles } from "react-icons/si";
import { convertDateFormatIntoString } from '../../../../../Utils/dateUtils';
import LoadingComponents from '../../../../../Components/LoadingComponents';
import { updateRequestStatus } from '../../../../../Services/requestServices';
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoCloseCircleSharp } from "react-icons/io5";

const { TabPane } = Tabs

const Profile = () => {
    return (
        <div className={style.tabs}>
            <IoPerson/> 
            Personal Info
        </div>
        
    )
}

const FamilyBackground = () => {
    return (
        <div className={style.tabs}>
            <MdFamilyRestroom/> 
            FamilyBackground
        </div>
        
    )
}

const Files = () => {
    return (
        <div className={style.tabs}>
            <SiFiles/> 
            Files
        </div>
        
    )
}


const View = ({ data, setIsShowModal, setMessage }) => {

  const BASE_URL = 'http://localhost:5001'
  console.log(data)

  const [isShowLoading, setIsShowLoading] = useState(false)

  const handleDownload = (file) => {
    window.location.href = `${BASE_URL}/${file}`
  }

  const handleAction = async (action) => {
    
    setIsShowLoading(true)

    try {
        const updated = {
            action,
            request_id: data?.request_id,
            user_id: data?.user_id,
            program_id: data?.program_id,
        } 

        const result = await updateRequestStatus(updated)

        if (result) {
            console.log(result?.message)
            setMessage(result?.message)
        }

        setTimeout(() => {
            setIsShowLoading(false)
            setIsShowModal(false)
        }, 3000);
        
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div className={style.container}>
        {
            isShowLoading ?
                <div className="w-100 h-100 position-absolute d-flex align-items-center justify-content-center" style={{ zIndex: 20 }}>
                    <div className={style.card} style={{ minWidth: '40%', }}>
                        <LoadingComponents/>
                    </div>
                </div>
            :
                <div className='w-100 h-100 position-relative p-2 overflow-auto d-flex flex-wrap gap-2 align-items-center justify-content-center'>
                    <div 
                        className={style.card} 
                        style={{ 
                            width: 'fit-content', 
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexGrow: 1,
                        }}
                    >
                        <BiExit 
                            size={20} 
                            alt='Closed' 
                            cursor={'pointer'} 
                            style={{ position: 'absolute', top: 20, left: 20 }}
                            onClick={() => setIsShowModal(false)}
                        />
                        <h3>Profile Picture <FaInfoCircle/></h3>
                        <img className='img-fluid mb-4' src={sample} alt="profile picture" />
                        
                        {
                            data?.request_status !== 'pending' ? 
                                <div className="w-100 align-items-center justify-content-center">
                                    <p 
                                        style={{ 
                                            color: '#6EC207', 
                                            fontFamily: 'bold', 
                                            fontSize: '1rem', 
                                            textAlign: 'center' 
                                        }}
                                    >
                                        { data?.request_status === 'approved' ? 
                                            <IoIosCheckmarkCircle/> : <IoCloseCircleSharp/>
                                        } This request is {data?.request_status}.
                                    </p>
                                </div> :
                                <div className='d-flex flex-column gap-2'>
                                    <button 
                                        style={{ 
                                            width: 300, 
                                            borderRadius: 5 
                                        }}
                                        onClick={() => handleAction('approved')}
                                    >approved</button>
                                    <button 
                                        style={{ 
                                            width: 300, 
                                            borderRadius: 5, 
                                            backgroundColor: '#d64161' 
                                        }}
                                        onClick={() => handleAction('rejected')}
                                    >Reject</button>
                                </div>
                        }


                    </div>
                    <div className={style.card}>
                        <div className='w-100 h-100 p-2'>
                            <Tabs defaultActiveKey="1" type="card">
                                <TabPane tab={<Profile />} key="1" style={{ backgroundColor:'white', overflowY: 'auto' }}>
                                    <div className='d-flex w-100 mt-4'>
                                        <div className='w-100 row d-flex'>
                                            <div className='col-md-6 d-flex flex-column align-items-start mb-3'>
                                                                                
                                                <h3>Information <FaInfoCircle/></h3>
                                                <div className='d-flex flex-column mb-2'>
                                                    <label>First Name</label>
                                                    <p>{data?.firstname}</p>
                                                </div>
                                                <div className='d-flex flex-column mb-2'>
                                                    <label>Middle Name</label>
                                                    <p>{data?.middlename}</p>
                                                </div>
                                                <div className='d-flex flex-column mb-2'>
                                                    <label>Last Name</label>
                                                    <p>{data?.lastname}</p>
                                                </div>
                                                <div className='d-flex flex-column mb-3'>
                                                    <label>Birth Date</label>
                                                    <p>{convertDateFormatIntoString(data?.birthdate)}</p>
                                                </div>
                                                <div className='d-flex flex-column mb-3'>
                                                    <label>Civil Status</label>
                                                    <p>{data?.civil_status}</p>
                                                </div>
                                                <div className='d-flex flex-column mb-3'>
                                                    <label>Age</label>
                                                    <p>{data?.age}</p>
                                                </div>

                                                <h3>Contact <FaLocationDot/></h3>
                                                <div className='w-100 d-flex flex-column mb-3'>
                                                    <div className='d-flex flex-column mb-2'>
                                                        <label>Email</label>
                                                        <p>{data?.email}</p>
                                                    </div>
                                                    <div className='d-flex flex-column mb-2'>
                                                        <label>Contact</label>
                                                        <p>{data?.contact}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                            <div className='col-md-6 d-flex flex-column align-items-start'>

                                                

                                                <h3>Address <FaLocationDot/></h3>
                                                <div className='w-100 d-flex gap-4 justify-content-between'>
                                                    <div className='d-flex flex-column mb-3'>
                                                        <label>Current Address</label>
                                                        <p>{data?.current_address}</p>
                                                    </div>
                                                </div>
                                                <div className='w-100 d-flex gap-4 justify-content-between mb-3'>
                                                    <div className='d-flex flex-column mb-3'>
                                                        <label>Permanent Address</label>
                                                        <p>{data?.permanent_address}</p>
                                                    </div>
                                                </div>

                                                <h3>Educational Background <FaLocationDot/></h3>
                                                <div className='w-100 d-flex gap-4 justify-content-between'>
                                                    <div className='d-flex flex-column mb-3'>
                                                        <label>{data?.primary_school_name}</label>
                                                        <p>{data?.primary_school_address}</p>
                                                        <p><i>{data?.primary_school_year_attended}</i></p>
                                                    </div>
                                                </div>
                                                <div className='w-100 d-flex gap-4 justify-content-between'>
                                                    <div className='d-flex flex-column mb-3'>
                                                        <label>{data?.secondary_school_name}</label>
                                                        <p>{data?.secondary_school_address}</p>
                                                        <p><i>{data?.secondary_school_year_attended}</i></p>
                                                    </div>
                                                </div>
                                                
                    

                                            </div>
                                        </div>
                                    </div>
                                </TabPane>
                                <TabPane tab={<FamilyBackground />} key="2">
                                    <div className='d-flex flex-column w-100 mt-4'>
                                        
                                        <h3>Mother's Information</h3>
                                        <div className='row'>
                                            <div className='col-sm d-flex flex-column'>
                                                <label>Mother's First Name</label>
                                                <p>{data?.mother_firstname}</p>
                                            </div>
                                            <div className='col-sm d-flex flex-column'>
                                                <label>Mother's Middle Name</label>
                                                <p>{data?.mother_middlename}</p>
                                            </div>
                                            <div className='col-sm d-flex flex-column'>
                                                <label>Mother's Last Name</label>
                                                <p>{data?.mother_lastname}</p>
                                            </div>
                                        </div>

                                        <div className='d-flex flex-column'>
                                            <label>Contact</label>
                                            <p>{data?.mother_contact_number}</p>
                                        </div>
                                        <div className='d-flex flex-column'>
                                            <label>Current Address</label>
                                            <p>{data?.mother_current_address}</p>
                                        </div>
                                        <div className='d-flex flex-column'>
                                            <label>Permanent Address</label>
                                            <p>{data?.mother_permanent_address}</p>
                                        </div>

                                        {
                                            data?.mother_registered_voter ?
                                            <p className='mb-3 mt-2' style={{ color: '#6EC207' }}><b><i>A {data?.mother_voting_years}year registered voter.</i></b></p> :
                                            <p className='mb-3 mt-2' style={{ color: '#6EC207' }}><b><i>Not a registered voter.</i></b></p>
                                        }
                                        

                                        <h3>Father's Information</h3>
                                        <div className='row'>
                                            <div className='col-sm d-flex flex-column'>
                                                <label>Father's First Name</label>
                                                <p>{data?.father_firstname}</p>
                                            </div>
                                            <div className='col-sm d-flex flex-column'>
                                                <label>Father's Middle Name</label>
                                                <p>{data?.father_middlename}</p>
                                            </div>
                                            <div className='col-sm d-flex flex-column'>
                                                <label>Father's Last Name</label>
                                                <p>{data?.father_lastname}</p>
                                            </div>
                                        </div>

                                        <div className='d-flex flex-column'>
                                            <label>Contact</label>
                                            <p>{data?.father_contact_number}</p>
                                        </div>
                                        <div className='d-flex flex-column'>
                                            <label>Current Address</label>
                                            <p>{data?.father_current_address}</p>
                                        </div>
                                        <div className='d-flex flex-column'>
                                            <label>Permanent Address</label>
                                            <p>{data?.father_permanent_address}</p>
                                        </div>

                                        {
                                            data?.father_registered_voter ?
                                            <p className='mb-3 mt-2' style={{ color: '#6EC207' }}><b><i>A {data?.father_voting_years}year registered voter.</i></b></p> :
                                            <p className='mb-3 mt-2' style={{ color: '#6EC207' }}><b><i>Not a registered voter.</i></b></p>
                                        }
                                    
                                    </div>
                                </TabPane>
                                <TabPane tab={<Files />} key="3">
                                <div className='d-flex flex-column mb-2'>
                                        <label>Certificate of Enrollment</label>
                                        <div className={style.fileCard} title='download file' onClick={() => handleDownload(data?.coe_file)}>
                                                {data?.coe_file}
                                                <FaDownload/>
                                        </div>
                                </div>
                                <div className='d-flex flex-column mb-2'>
                                        <label>Baragay Indigency</label>
                                        <div className={style.fileCard} title='download file' onClick={() => handleDownload(data?.brgy_indigency)}>
                                                {data?.brgy_indigency}
                                                <FaDownload/>
                                        </div>
                                </div>
                                <div className='d-flex flex-column mb-2'>
                                        <label>Last Sem Certificate of Grades</label>
                                        <div className={style.fileCard} title='download file' onClick={() => handleDownload(data?.cog_file)}>
                                                {data?.cog_file}
                                                <FaDownload/>
                                        </div>
                                </div>
                                <div className='d-flex flex-column mb-2'>
                                        <label>School ID</label>
                                        <div className={style.fileCard} title='download file' onClick={() => handleDownload(data?.school_id)}>
                                                {data?.school_id}
                                                <FaDownload/>
                                        </div>
                                </div>
                                <div className='d-flex flex-column mb-2'>
                                        <label>Perent ID</label>
                                        <div className={style.fileCard} title='download file' onClick={() => handleDownload(data?.parent_id)}>
                                                {data?.parent_id}
                                                <FaDownload/>
                                        </div>
                                </div>
                                <div className='d-flex flex-column mb-2'>
                                        <label>Certificate of Registration from Comelec</label>
                                        <div className={style.fileCard} title='download file' onClick={() => handleDownload(data?.certificate_of_registration_comelec)}>
                                                {data?.certificate_of_registration_comelec}
                                                <FaDownload/>
                                        </div>
                                </div>

                                </TabPane>
                            </Tabs>       
                        </div>
                    </div>
                </div>
        }
        
    </div>
  )
}

export default View
