import React, { useEffect, useState } from 'react'
import style from './AccountsRequestList.module.css'
import { Table, ConfigProvider } from 'antd';
import { getAllRequest } from '../../../../Services/requestServices';
import { convertDateFormatIntoString, convertTimeTo12HourFormat } from '../../../../Utils/dateUtils';
import { AiFillProfile } from "react-icons/ai";
import AccountRequestModal from './Modal/AccountRequestModal';


const AccountsRequestList = () => {

    const [requestList, setRequestList] = useState([])
    const [isShowModal, setIsShowModal] = useState(false)
    const [selectData,  setSelectedData] = useState(null)

    useEffect(() => {

        const fetchData = async () => {
            try {
                const result = await getAllRequest() 
                console.log(result)
                setRequestList(result)

            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    },[])

    const column = [
        {
          title: 'Request ID',
          dataIndex: 'request_id',
          key: 'request_id',
          sorter: (a, b) => a.request_id.localeCompare(b.request_id),
          responsive: ['xs', 'sm', 'md', 'lg'],
        },
        {
          title: 'Request Type',
          dataIndex: 'request_type',
          key: 'request_type',
          sorter: (a, b) => a.request_type.localeCompare(b.request_type),
          responsive: ['xs', 'sm', 'md', 'lg'],
        },
        {
          title: 'User ID',
          dataIndex: 'user_id',
          key: 'user_id',
          sorter: (a, b) => a.user_id.localeCompare(b.user_id),
          responsive: ['xs', 'sm', 'md', 'lg'],
        },
        {
          title: 'Date',
          render: (data) => convertDateFormatIntoString(data.date),
          key: 'date',
          sorter: (a, b) => new Date(a.date) - new Date(b.date),
          responsive: ['xs', 'sm', 'md', 'lg'],
        },
        {
          title: 'Time',
          render: (data) => convertTimeTo12HourFormat(data.time),
          key: 'time',
          sorter: (a, b) => new Date(`1970-01-01T${a.time}`) - new Date(`1970-01-01T${b.time}`),
          responsive: ['xs', 'sm', 'md', 'lg'],
        },
        {
          title: 'Request Status',
          dataIndex: 'request_status',
          key: 'request_status',
          sorter: (a, b) => a.request_status.localeCompare(b.request_status),
          responsive: ['xs', 'sm', 'md', 'lg'],
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 200,
            responsive: ['xs', 'sm', 'md', 'lg'],
            render: (data) => 
              <button 
                className={style.btn} 
                title='View Details'
                onClick={() => {setIsShowModal(true), setSelectedData(data)}}
              >
                <AiFillProfile/>View
              </button>
        }
    ]

  return (
    <div className={style.container}>
        {
          isShowModal &&
          <div style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 20}}>
            <AccountRequestModal
              selectData={selectData}
              setIsShowModal={setIsShowModal}
            />
          </div>
        }
        <div className={style.tableDiv}>
            <div className='w-80'>
                <h1>Accounts Request</h1>
            </div>
            <ConfigProvider
                theme={{
                    components: {
                    Table: {
                        cellFontSize: '.8em',
                    },
                    },
                }}
            >
                <Table 
                    className={style.table} 
                    headerBg={'#38b6ff'}
                    columns={column} 
                    dataSource={requestList} 
                    pagination={{ pageSize: 5 }} 
                    bordered
                    scroll={{ x: '1000px' }}
                />
            </ConfigProvider> 
        </div>

    </div>
  )
}

export default AccountsRequestList
