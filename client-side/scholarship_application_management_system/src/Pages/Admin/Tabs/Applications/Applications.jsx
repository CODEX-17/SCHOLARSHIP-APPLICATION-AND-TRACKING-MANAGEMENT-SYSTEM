import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import style from './Applications.module.css'
import axios from 'axios';
import { AiFillProfile } from "react-icons/ai";
import { BiExit } from "react-icons/bi";
import { IoMdArchive } from "react-icons/io";
import NotificationComponent from '../../../../Components/NotificationComponent';
import LoadingComponents from '../../../../Components/LoadingComponents';
import UserProfilePicture from '../../../ProfilePicture/UserProfilePicture';
import View from './Modal/View';
import { archivedRequest, getRequestJoinProfileJoinAccount } from '../../../../Services/requestServices';
import { convertDateFormatIntoString, convertTimeTo12HourFormat } from '../../../../Utils/dateUtils';



const RequestPage = () => {

    const [requestList, setRequestList] = useState([])

    const [isShowModal, setIsShowModal] = useState(false)
    const [isShowArchivedModal, setIsShowArchivedModal] = useState(false)
    const [selectedData, setSelectedData] = useState(null)
    const [message, setMessage] = useState('')
    const [notifStatus, setNotifStatus] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const [isShowNotification, setIsShowNotification] = useState(false)
    const userDetails = JSON.parse(localStorage.getItem('user')) || null

    useEffect(() => {

        const fetchData = async () => {

            try {
                const result = await getRequestJoinProfileJoinAccount()

                if (result) {
                    console.log(result)
                    const programRequest = 
                        result.filter(
                            data => data.request_type === 'program' && data?.archived === 0
                        )
                    
                    setRequestList(programRequest)
                }

            } catch (error) {
                console.log(error)
            }
        }

        fetchData()

    },[message, setIsShowModal])

    const columns = [
        {
            title: 'Status',
            dataIndex: 'request_status',
            key: 'request_status',
        },
        {
            title: 'User ID',
            dataIndex: 'user_id',
            key: 'user_id',
        },
        {
            title: 'Program ID',
            dataIndex: 'program_id',
            key: 'program_id',
        },
        {
            title: 'Date',
            dataIndex: 'request_date',
            key: 'request_date',
            render: (data) => convertDateFormatIntoString(data),
        },
        {
            title: 'Time',
            dataIndex: 'request_time',
            key: 'request_time',
            render: (data) => convertTimeTo12HourFormat(data),
        },
        {
          title: 'Profile Picture',
          render: (data) => 
            <div style={{ width: 50, height: 50, }}>
                <UserProfilePicture
                    profile_pic={data.profile_picture} 
                    firstname={data.firstname}
                />,
            </div>
        },
        {
            title: 'Action',
            render: (data) => 
            <div className='d-flex gap-2'>
                <button 
                    className={style.btn} 
                    title='View Details' 
                    onClick={() => {setIsShowModal(true), setSelectedData(data), console.log(data)}}
                ><AiFillProfile size={15}/> View
                </button>
                {
                    data?.request_status !== 'pending' &&
                    <button 
                        className={style.btn} 
                        title='Archived' 
                        onClick={() => {setIsShowArchivedModal(true), setSelectedData(data), console.log(data)}}
                    ><IoMdArchive size={15}/>
                    </button>
                }
                
            </div>
        },
    ];

    const handleAchivedRequest = async () => {
        try {
            
            const result = await archivedRequest(selectedData?.request_id)
            if (result) {
                console.log(result.message)
                notificationConfig(result.message, true)
                setIsShowArchivedModal(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const notificationConfig = (message, status) => {
        setMessage(message)
        setNotifStatus(status)
        setIsShowNotification(true)
        
        setTimeout(() => {
            setIsShowNotification(false)
            setMessage('')
        }, 3000);
    }


  return (
    <div className={style.container}>
        {
            isShowNotification && (
                <div className={style.notification}>
                    <NotificationComponent message={message} status={notifStatus}/>
                </div>
            )
        }
        {
            isShowArchivedModal && (
                <div className={style.modalDelete}>
                  <h2>Are you sure you want to archive this item?</h2>
                  <p>Archived items will be stored for future reference but cannot be directly accessed or modified. Ensure this action is intentional.</p>
                    <div className='d-flex gap-3'>
                        <button onClick={handleAchivedRequest}>Confirm</button>
                        <button style={{ backgroundColor: '#B8001F' }} onClick={() => setIsShowArchivedModal(false)}>Cancel</button>
                    </div>
                </div>
            )
        }
        {
            (isShowModal && selectedData) && (
                <div className={style.modal}>
                   <View data={selectedData} setIsShowModal={setIsShowModal} setMessage={setMessage}/>
                </div>
            )
        }

        <div className={style.content}>
            <div className='w-100'>
                <h1>Applications List</h1>
            </div>
            <Table 
                className={style.table} 
                columns={columns} 
                dataSource={requestList} 
                pagination={{ pageSize: 5 }} 
            />
        </div>
    </div>
  )
}

export default RequestPage
