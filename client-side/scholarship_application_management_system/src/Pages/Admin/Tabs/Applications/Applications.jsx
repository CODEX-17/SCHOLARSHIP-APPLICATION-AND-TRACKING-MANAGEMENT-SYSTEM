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
        axios.get('http://localhost:5001/profiles/getProfiles')
        .then((res) => {
            const result = res.data

            const filter = result.filter((data) => !data.archive)
            setRequestList(filter)
        })
        .catch((err) => console.log(err))
    },[message])

    const formatDate = (dateString) => {
        // Create a new Date object from the provided date string
        const date = new Date(dateString);
    
        // Use Intl.DateTimeFormat to format the date in the desired style
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }

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
                <button 
                    className={style.btn} 
                    title='Archived' 
                    onClick={() => {setIsShowArchivedModal(true), setSelectedData(data), console.log(data)}}
                ><IoMdArchive size={15}/>
                </button>
            </div>
        },
    ];
      
    const handleQualification = (qualified) => {
        setIsLoading(true);
    
        const updatingStatus = async () => {
            try {
                const data = {
                    status: qualified ? 'approved' : 'rejected',
                    profile_id: selectedData.profile_id,
                    firstname: selectedData.firstname,
                    email: selectedData.email,
                    program_id: selectedData?.program_id,
                    apply_status: qualified ? 'applied' : 'rejected',
                    user_id: selectedData?.user_id,
                };
    
                const res = await axios.post('http://localhost:5001/accounts/updateStatusProfile', data)
                const result = res.data;
                const message = result.message
    
                setIsShowNotification(true)
                notificationConfig(message, true)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
                setIsShowModal(false)
            }
        };
    
        updatingStatus();
    };
    
    const handleDelete = () => {
        if (selectedData && selectedData.profile_id) {
            const id = selectedData.profile_id;
    
            axios.post('http://localhost:5001/accounts/deleteProfiles', { id })
                .then((res) => {
                    const result = res.data;
                    const message = result.message;
                    setMessage(message);
    
                    const updateData = requestList.filter(data => data.profile_id !== id);
                    setRequestList(updateData);
    
                    setIsShowArchivedModal(false);
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
                        <button onClick={handleDelete}>Confirm</button>
                        <button style={{ backgroundColor: '#B8001F' }} onClick={() => setIsShowArchivedModal(false)}>Cancel</button>
                    </div>
                </div>
            )
        }
        {
            (isShowModal && selectedData) && (
                <div className={style.modal}>
                   <View data={selectedData} setIsShowModal={setIsShowModal}/>
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
