import React, { useEffect, useState } from 'react'
import style from './MyApplication.module.css'
import { Table } from 'antd';
import { AiFillProfile } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { BiExit } from "react-icons/bi";
import { FaDownload } from "react-icons/fa";
import axios from 'axios';
import NotificationComponent from '../Components/NotificationComponent';

const MyApplication = () => {

    const [applicationList, setApplicationList] = useState([])
    const userDetails = JSON.parse(localStorage.getItem('user')) || null

    const [isShowModal, setIsShowModal] = useState(false)
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
    const [isShowNotification, setIsShowNotification] = useState(false)

    const [message, setMessage] = useState('')
    const [selectedData, setSelectedData] = useState(null)

    const formatDate = (dateString) => {
        // Create a new Date object from the provided date string
        const date = new Date(dateString);
    
        // Use Intl.DateTimeFormat to format the date in the desired style
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }

    useEffect(() => {
        axios.get('http://localhost:5001/profiles/getProfiles')
        .then(res => {
            const result = res.data
            const filter = result.filter((data) => data.user_id === userDetails.user_id)
            setApplicationList(filter)
        })
        .catch(err => console.log(err))
    },[])

    const columns = [
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'First Name',
            dataIndex: 'firstname',
            key: 'firstname',
        },
        {
            title: 'Middle Name',
            dataIndex: 'middlename',
            key: 'middlename',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastname',
            key: 'lastname',
        },
        {
            title: 'Permanent Address',
            dataIndex: 'permanent_address',
            key: 'permanent_address',
        },
        {
            title: 'Contact',
            dataIndex: 'contact',
            key: 'contact',
        },
        {
            title: 'Action',
            render: (data, record) => 
            <div className='d-flex gap-2'>
                <button className={style.btn} title='View Details' onClick={() => {setIsShowModal(true), setSelectedData(record)}}><AiFillProfile size={20}/> View</button>
                <button className={style.btn} style={{ backgroundColor: '#B8001F' }} title='Delete application' onClick={() => {setSelectedData(data), setIsShowDeleteModal(true)}}><AiFillDelete size={20}/> Delete</button>
            </div>
        },
    ];

    const handleDelete = () => {
    
        if (selectedData && selectedData.profile_id) {
            const id = selectedData.profile_id;
    
            axios.post('http://localhost:5001/accounts/deleteProfiles', { id })
                .then((res) => {
                    const result = res.data;
                    const message = result.message;
                    setMessage(message);
    
                    const updateData = applicationList.filter(data => data.profile_id !== id);
                    setApplicationList(updateData);
    
                    setIsShowDeleteModal(false);
                    setIsShowNotification(true);
    
                    setTimeout(() => {
                        setIsShowNotification(false);
                    }, 3000);
                })
                .catch((err) => console.log(err));
        } else {
            console.log('No profile selected or profile ID missing.');
        }
    }
    

  return (
    <div className={style.container}>
        {
            (isShowModal && selectedData) && (
                <div className={style.modal}>
                    <div className={style.head}>
                        <h1 style={{ color: 'black' }}>Applicant Profile</h1>
                        <BiExit size={25} cursor={'pointer'} onClick={() => setIsShowModal(false)}/>
                    </div>
                    <div className={style.body}>
                        <div className={style.section}>
                            <div className={style.top}>
                                <h1>Personal Information</h1>
                                <img src={'http://localhost:5001/' + selectedData.profile_picture} alt='profile'/>
                            </div>
                            <div className={style.bot}>
                                <div className='d-flex flex-column'>
                                    <h2>Firstname</h2>
                                    <p>{selectedData.firstname}</p>
                                </div>
                                <div className='d-flex flex-column'>
                                    <h2>Middlename</h2>
                                    <p>{selectedData.middlename}</p>
                                </div>
                                <div className='d-flex flex-column'>
                                    <h2>Lastname</h2>
                                    <p>{selectedData.lastname}</p>
                                </div>
                                <div className='d-flex flex-column'>
                                    <h2>Birthdate</h2>
                                    <p>{formatDate(selectedData.birthdate)}</p>
                                </div>
                                <div className='d-flex flex-column'>
                                    <h2>Gender</h2>
                                    <p>{selectedData.gender}</p>
                                </div>
                                <div className='d-flex flex-column'>
                                    <h2>Civil Status</h2>
                                    <p>{selectedData.civil_status}</p>
                                </div>
                                <div className='d-flex flex-column'>
                                    <h2>Contact</h2>
                                    <p>{selectedData.contact}</p>
                                </div>
                                <div className='d-flex flex-column'>
                                    <h2>Current Address</h2>
                                    <p>{selectedData.current_address}</p>
                                </div>
                                <div className='d-flex flex-column'>
                                    <h2>Permanent Address</h2>
                                    <p>{selectedData.permanent_address}</p>
                                </div>
                                
                            </div>
                           
                        </div>
                        <div className={style.section}>
                            <div className={style.top}>
                                <h1>Family Background</h1>
                            </div>
                            <div className={style.bot}>
                                <div className='d-flex flex-column'>
                                    <h2>Mother's Firstname</h2>
                                    <p>{selectedData.mother_firstname}</p>
                                </div>
                                <div className='d-flex flex-column'>
                                    <h2>Mother's Middlename</h2>
                                    <p>{selectedData.mother_middlename}</p>
                                </div>
                                <div className='d-flex flex-column'>
                                    <h2>Mother's Lastname</h2>
                                    <p>{selectedData.mother_lastname}</p>
                                </div>
                                <div className='d-flex flex-column'>
                                    <h2>Current Address</h2>
                                    <p>{selectedData.mother_current_address}</p>
                                </div>
                                <div className='d-flex flex-column'>
                                    <h2>Permanent Address</h2>
                                    <p>{selectedData.mother_permanent_address}</p>
                                </div>
                                <div className='d-flex flex-column'>
                                    <h2>Registered Voter Since</h2>
                                    <p>{selectedData.mother_registered_voter}</p>
                                </div>
                                <div className='d-flex flex-column'>
                                    <h2>Contact</h2>
                                    <p>{selectedData.mother_contact_number}</p>
                                </div>

                                <div className='d-flex flex-column'>
                                    <h2>Father's Firstname</h2>
                                    <p>{selectedData.father_firstname}</p>
                                </div>
                                <div className='d-flex flex-column'>
                                    <h2>Father's Middlename</h2>
                                    <p>{selectedData.father_middlename}</p>
                                </div>
                                <div className='d-flex flex-column'>
                                    <h2>Father's Lastname</h2>
                                    <p>{selectedData.father_lastname}</p>
                                </div>
                                <div className='d-flex flex-column'>
                                    <h2>Current Address</h2>
                                    <p>{selectedData.father_current_address}</p>
                                </div>
                                <div className='d-flex flex-column'>
                                    <h2>Permanent Address</h2>
                                    <p>{selectedData.father_permanent_address}</p>
                                </div>
                                <div className='d-flex flex-column'>
                                    <h2>Registered Voter Since</h2>
                                    <p>{selectedData.father_registered_voter}</p>
                                </div>
                                <div className='d-flex flex-column'>
                                    <h2>Contact</h2>
                                    <p>{selectedData.father_contact_number}</p>
                                </div>
                            </div>
                        </div>
                        <div className={style.section}>
                            <div className={style.top}>
                                <h1>Documents</h1>
                            </div>
                            <div className={style.bot}>
                                <div className='d-flex w-100 flex-column mt-3'>
                                    <h2>Certificate of Enrollment</h2>
                                    <div className={style.fileCard}>{selectedData.coe_file} <FaDownload cursor={'pointer'} title='download' onClick={() => window.location.href = `http://localhost:5001/${selectedData.coe_file}`}/></div>
                                </div>
                                <div className='d-flex w-100 flex-column mt-3'>
                                    <h2>Barangay Indigency</h2>
                                    <div className={style.fileCard}>{selectedData.brgy_indigency} <FaDownload cursor={'pointer'} title='download' onClick={() => window.location.href=`http://localhost:5001/${selectedData.brgy_indigency}`}/></div>
                                </div>
                                <div className='d-flex w-100 flex-column mt-3'>
                                    <h2>Last Sem Certificate of Grades</h2>
                                    <div className={style.fileCard}>{selectedData.cog_file} <FaDownload cursor={'pointer'} title='download' onClick={() => window.location.href=`http://localhost:5001/${selectedData.cog_file}`}/></div>
                                </div>
                                <div className='d-flex w-100 flex-column mt-3'>
                                    <h2>School ID</h2>
                                    <div className={style.fileCard}>{selectedData.school_id} <FaDownload cursor={'pointer'} title='download' onClick={() => window.location.href=`http://localhost:5001/${selectedData.school_id}`}/></div>
                                </div>
                                <div className='d-flex w-100 flex-column mt-3'>
                                    <h2>Parent ID</h2>
                                    <div className={style.fileCard}>{selectedData.parent_id} <FaDownload cursor={'pointer'} title='download' onClick={() => window.location.href=`http://localhost:5001/${selectedData.parent_id}`}/></div>
                                </div>
                            </div>
                        </div>
                     
                    </div>
                </div>
        
            )
        }

        {
            isShowNotification && (
                <div className={style.notification}>
                    <NotificationComponent message={message} status={true}/>
                </div>
                
            )
        }

        {
            isShowDeleteModal && (
                <div className={style.modalDelete}>
                    <h2>Are you sure you want to delete?</h2>
                    <p>Once deleted, you will not be able to retrieve this data.</p>
                    <div className='d-flex gap-3'>
                        <button onClick={handleDelete}>Confirm</button>
                        <button style={{ backgroundColor: '#B8001F' }} onClick={() => setIsShowDeleteModal(false)}>Cancel</button>
                    </div>
                </div>
            )
        }

      <div className={style.content}>
            <div className='w-100'>
                <h1>My Application</h1>
            </div>
            <Table className={style.table} columns={columns} dataSource={applicationList} pagination={{ pageSize: 5 }} />
        </div>
    </div>
  )
}

export default MyApplication
