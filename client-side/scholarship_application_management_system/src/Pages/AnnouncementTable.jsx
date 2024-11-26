import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import axios from 'axios';
import style from './AnnouncementTable.module.css'
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import NotificationComponent from '../Components/NotificationComponent';
import { FaPlus } from "react-icons/fa";
import ModalAnnouncementsComponent from '../Components/ModalAnnouncementsComponent';

const AnnouncementTable = () => {

    const [announcementList, setAnnouncementList] = useState([])
    const [isShowModal, setIsShowModal] = useState(false)
    const URL = 'http://localhost:5001'
    const [selectedData, setSelectedData] = useState(null)
    const [modalType, setModalType] = useState('edit')

    const [message, setMessage] = useState('')
    const [notifStatus, setNotifStatus] = useState(true)
    const [isShowNotification, setIsShowNotification] = useState(false)

    const shortenSentences = (words) => {
        if (words.length > 0) {
            return words.substring(0, 50) + '...'
        }

        return words
    }

    const columns = [
        {
            title: 'Title',
            dataIndex: 'anc_title',
            key: 'anc_title',
        },
        {
            title: 'Content',
            dataIndex: 'anc_content',
            key: 'anc_content',
            render: (words) => shortenSentences(words),
        },
        {
            title: 'Image',
            dataIndex: 'anc_image',
            render: (imagePath, index) => 
                imagePath ?
                    <img 
                        key={index} 
                        src={'http://localhost:5001/' + imagePath} 
                        alt="image" 
                        width={50} 
                        height={50}
                    /> :
                    <p>no image.</p>
        },
        {
            title: 'Date posted',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Time posted',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Action',
            render: (data, record) => 
            <div className='d-flex gap-2'>
                <button className={style.btn} title='View Details' onClick={() => { setModalType('edit'), setSelectedData(record), setIsShowModal(true)}}><BiEdit size={15}/> Edit</button>
                <button className={style.btn} title='Delete announcement' onClick={() => {setSelectedData(record)}} style={{ backgroundColor: '#B8001F' }}><AiFillDelete size={15}/> Delete</button>
            </div>
        },
    ];

    useEffect(() => {

        axios.get(`${URL}/announcements/getAnnouncements`)
        .then((res) => setAnnouncementList(res.data))
        .catch(err => console.log(err))

    },[message])

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
            isShowNotification &&
                <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                    <NotificationComponent message={message} status={notifStatus}/>
                </div>
        }

        { isShowModal && 
            <div className='w-100 h-100 d-flex position-absolute'>
                <ModalAnnouncementsComponent 
                    modalType={modalType} 
                    selectedData={selectedData}
                    setIsShowModal={setIsShowModal}
                    setSelectedData={setSelectedData}
                    notificationConfig={notificationConfig}
                />
            </div>  
        }

        <div className={style.head}>
            <h1>Announcement Table</h1>
            <button onClick={() => { setModalType('add'), setIsShowModal(true) }}>Add <FaPlus size={10}/></button>
        </div>

        <Table 
            className={style.table} 
            columns={columns} 
            dataSource={announcementList} 
            pagination={{ pageSize: 5 }}
        />
    </div>
  )
}

export default AnnouncementTable
