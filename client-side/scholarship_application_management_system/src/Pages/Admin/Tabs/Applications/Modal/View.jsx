import React, { useState } from 'react'
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

const View = ({ setIsShowModal }) => {

  return (
    <div className={style.container}>
        <div className={style.card}>
            <BiExit 
                size={20} 
                alt='Closed' 
                cursor={'pointer'} 
                style={{ position: 'absolute', top: 10, right: 10 }}
                onClick={() => setIsShowModal(false)}
            />
            <div className='w-100 h-100'>
                <Tabs defaultActiveKey="1" type="card">
                    <TabPane tab={<Profile />} key="1" style={{ backgroundColor:'white', overflowY: 'auto' }}>
                        <div className='d-flex w-100 mt-4'>
                            <div className='w-100 row d-flex'>
                                <div className='col-md-6 d-flex flex-column align-items-start mb-3'>
                                 
                                    <img className='img-fluid mb-4' src={sample} alt="profile picture" />
                                    <h3>Information <FaInfoCircle/></h3>
                                    <div className='d-flex flex-column mb-2'>
                                        <label>First Name</label>
                                        <p>Rumar</p>
                                    </div>
                                    <div className='d-flex flex-column mb-2'>
                                        <label>Middle Name</label>
                                        <p>Capoquian</p>
                                    </div>
                                    <div className='d-flex flex-column mb-2'>
                                        <label>Last Name</label>
                                        <p>Pamparo</p>
                                    </div>
                                    <div className='d-flex flex-column mb-3'>
                                        <label>Birth Date</label>
                                        <p>Feb. 16, 2000</p>
                                    </div>
                                    <div className='d-flex flex-column mb-3'>
                                        <label>Civil Status</label>
                                        <p>Single</p>
                                    </div>
                                    <div className='d-flex flex-column mb-3'>
                                        <label>Age</label>
                                        <p>20</p>
                                    </div>
                                </div>
                             
                                <div className='col-md-6 d-flex flex-column align-items-start'>

                                    <h3>Contact <FaLocationDot/></h3>
                                    <div className='w-100 d-flex flex-column mb-3'>
                                        <div className='d-flex flex-column mb-2'>
                                            <label>Email</label>
                                            <p>pamparor@gmail.com</p>
                                        </div>
                                        <div className='d-flex flex-column mb-2'>
                                            <label>Contact</label>
                                            <p>0976020262</p>
                                        </div>
                                    </div>

                                    <h3>Address <FaLocationDot/></h3>
                                    <div className='w-100 d-flex gap-4 justify-content-between'>
                                        <div className='d-flex flex-column mb-3'>
                                            <label>Current Address</label>
                                            <p>103 Commercio, Solana, Cagayan</p>
                                        </div>
                                    </div>
                                    <div className='w-100 d-flex gap-4 justify-content-between mb-3'>
                                        <div className='d-flex flex-column mb-3'>
                                            <label>Permanent Address</label>
                                            <p>103 Commercio, Solana, Cagayan</p>
                                        </div>
                                    </div>

                                    <h3>Educational Background <FaLocationDot/></h3>
                                    <div className='w-100 d-flex gap-4 justify-content-between'>
                                        <div className='d-flex flex-column mb-3'>
                                            <label>Primary School Name</label>
                                            <p>103 Commercio, Solana, Cagayan</p>
                                            <p><i>2020-2025</i></p>
                                        </div>
                                    </div>
                                    <div className='w-100 d-flex gap-4 justify-content-between'>
                                        <div className='d-flex flex-column mb-3'>
                                            <label>Secondary School Name</label>
                                            <p>103 Commercio, Solana, Cagayan</p>
                                            <p><i>2020-2025</i></p>
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
                                    <p>Mayeth C. Pamparo</p>
                                </div>
                                <div className='col-sm d-flex flex-column'>
                                    <label>Mother's Middle Name</label>
                                    <p>Mayeth C. Pamparo</p>
                                </div>
                                <div className='col-sm d-flex flex-column'>
                                    <label>Mother's Last Name</label>
                                    <p>Mayeth C. Pamparo</p>
                                </div>
                            </div>

                            <div className='d-flex flex-column'>
                                <label>Contact</label>
                                <p>099986756665</p>
                            </div>
                            <div className='d-flex flex-column'>
                                <label>Current Address</label>
                                <p>Mayeth C. Pamparo</p>
                            </div>
                            <div className='d-flex flex-column'>
                                <label>Permanent Address</label>
                                <p>Mayeth C. Pamparo</p>
                            </div>

                            <p className='mb-3 mt-2' style={{ color: '#6EC207' }}><b><i>A 3year registered voter.</i></b></p>

                            <h3>Father's Information</h3>
                            <div className='row'>
                                <div className='col-sm d-flex flex-column'>
                                    <label>Father's First Name</label>
                                    <p>Mayeth C. Pamparo</p>
                                </div>
                                <div className='col-sm d-flex flex-column'>
                                    <label>Father's Middle Name</label>
                                    <p>Mayeth C. Pamparo</p>
                                </div>
                                <div className='col-sm d-flex flex-column'>
                                    <label>Father's Last Name</label>
                                    <p>Mayeth C. Pamparo</p>
                                </div>
                            </div>

                            <div className='d-flex flex-column'>
                                <label>Contact</label>
                                <p>099986756665</p>
                            </div>
                            <div className='d-flex flex-column'>
                                <label>Current Address</label>
                                <p>Mayeth C. Pamparo</p>
                            </div>
                            <div className='d-flex flex-column'>
                                <label>Permanent Address</label>
                                <p>Mayeth C. Pamparo</p>
                            </div>

                            <p className='mb-3 mt-2' style={{ color: '#6EC207' }}><b><i>A 3year registered voter.</i></b></p>
                        
                        </div>
                    </TabPane>
                    <TabPane tab={<Files />} key="3">
                       <div className={style.fileCard}>
                            dasd
                       </div>
                    </TabPane>
                </Tabs>
                
            </div>
        </div>
    </div>
  )
}

export default View
