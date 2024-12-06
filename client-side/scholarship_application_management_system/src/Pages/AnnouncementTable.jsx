import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import axios from 'axios';
import style from './AnnouncementTable.module.css'
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import NotificationComponent from '../Components/NotificationComponent';
import { FaPlus } from "react-icons/fa";
import ModalAnnouncementsComponent from '../Components/ModalAnnouncementsComponent';
import { deleteAnnouncements } from '../Services/announcementServices'
import { convertDateFormatIntoString, convertTimeTo12HourFormat } from '../Utils/dateUtils';
import { shortenSentence } from '../Utils/textUtils';
import { parseTime } from '../Utils/timeUtils';

const AnnouncementTable = () => {

    const [announcementList, setAnnouncementList] = useState([])
    const [isShowModal, setIsShowModal] = useState(false)
    const URL = 'http://localhost:5001'
    const [selectedData, setSelectedData] = useState(null)
    const [modalType, setModalType] = useState('edit')

    const [message, setMessage] = useState('')
    const [notifStatus, setNotifStatus] = useState(true)
    const [isShowNotification, setIsShowNotification] = useState(false)


    const handleDelete = async (data) => {
        setSelectedData(data)

        try {
            
            const result = await deleteAnnouncements(data.anc_id)

            if (result) notificationConfig(result.message, true)

        } catch (error) {
            console.log(error)
            notificationConfig('Failed to delete announcement.', false)
        }
        
    }

    const columns = [
        {
            title: 'Title',
            dataIndex: 'anc_title',
            key: 'anc_title',
            sorter: (a, b) => a.anc_title.localeCompare(b.anc_title),
            sortDirections: ['ascend', 'descend'], // No reset button
            render: (words) => shortenSentence(words, 20),
        },
        {
            title: 'Content',
            dataIndex: 'anc_content',
            key: 'anc_content',
            sorter: (a, b) => a.anc_content.localeCompare(b.anc_content),
            sortDirections: ['ascend', 'descend'],
            render: (words) => shortenSentence(words, 20),
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
            sorter: (a, b) => new Date(a.date) - new Date(b.date),
            sortDirections: ['ascend', 'descend'],
            render: (date) => convertDateFormatIntoString(date) 
        },
        {
            title: 'Time posted',
            dataIndex: 'time',
            key: 'time',
            sorter: (a, b) => parseTime(a.time) - parseTime(b.time),
            sortDirections: ['ascend', 'descend'],
            render: (time) => convertTimeTo12HourFormat(time) 
        },
        {
            title: 'Action',
            render: (data, record) => 
            <div className='d-flex gap-2'>
                <button className={style.btn} title='View Details' onClick={() => { setModalType('edit'), setSelectedData(record), setIsShowModal(true)}}><BiEdit size={15}/> Edit</button>
                <button className={style.btn} title='Delete announcement' onClick={() => handleDelete(record)} style={{ backgroundColor: '#B8001F' }}><AiFillDelete size={15}/> Delete</button>
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
