import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import style from './ProgramsPage.module.css'
import axios from 'axios';
import { AiFillProfile } from "react-icons/ai";
import { BiExit } from "react-icons/bi";
import { FaDownload } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import NotificationComponent from '../Components/NotificationComponent';
import { FiPlusCircle } from "react-icons/fi";


const ProgramsPage = () => {

    const [programList, setProgramList] = useState([])

    const [isShowModal, setIsShowModal] = useState(false)
    const [isShowModalAddProgram, setIsShowModalAddProgram] = useState(false)
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [selectedData, setSelectedData] = useState(null)
    const [message, setMessage] = useState('')

    const [programName , setProgramName] = useState('')
    const [programDesc, setProgramDesc] = useState('')
    const [isCreateBtnDisable, setIsCreateBtnDisable] = useState(true)
 
    const [isShowNotification, setIsShowNotification] = useState(false)
    const userDetails = JSON.parse(localStorage.getItem('user')) || null

    useEffect(() => {
        axios.get('http://localhost:5001/programs/getPrograms')
        .then((res) => {
            const result = res.data
            setProgramList(result)
        })
        .catch((err) => console.log(err))
    },[message])

    useEffect(() => {
        if (programName !== '' && programDesc !== '' ) {
            setIsCreateBtnDisable(false)
        }else{
            setIsCreateBtnDisable(true)
        }
    },[programName,programDesc])

    const columns = [
        {
            title: 'Program ID',
            dataIndex: 'program_id',
            key: 'program_id',
        },
        {
          title: 'Program Name',
          dataIndex: 'program_name',
          key: 'program_name',
        },
        {
          title: 'Total Applicant',
          dataIndex: 'total_applicant',
          key: 'total_applicant',
        },
        {
            title: 'Action',
            render: (record, index) => 
            <div className='d-flex gap-2'>
                <button className={style.btn} key={index} title='View Details' onClick={() => {setIsShowModal(true), setSelectedData(record)}}><AiFillProfile size={15}/> View</button>
                <button className={style.btn} style={{ backgroundColor: '#C7253E' }} key={index} title='View Details' onClick={() => {setIsShowModalDelete(true), setSelectedData(record)}}><AiFillDelete size={15}/> Delete</button>
            </div>
        },
    ];
      

    const handleCreateProgram = () => {
        
        axios.post('http://localhost:5001/programs/addPrograms', {programName, programDesc})
        .then((res) => {
            const result = res.data
            const message = result.message
            setMessage(message)
            setIsShowNotification(true)
            setIsShowModalAddProgram(false)
            setTimeout(() => {
                setIsShowNotification(false)
            }, 3000);
            
        }).catch(err => console.log(err))
    }

    const handleDeleteProgram = () => {
        if (selectedData) {
            const id = selectedData.program_id

            axios.post('http://localhost:5001/programs/deletePrograms', { id })
            .then((res) => {
                const result = res.data
                const message = result.message
                setMessage(message)
                setIsShowNotification(true)
                setIsShowModalDelete(false)
                setProgramList(() => {
                    return programList.filter((prog) => prog.program_id !== id)
                })

                setTimeout(() => {
                    setIsShowNotification(false)
                }, 3000);
            })
            .catch(err => console.log(err))
        }
    }

  return (
    <div className={style.container}>
        {isShowNotification && (
            <div className={style.notification}>
                <NotificationComponent message={message} status={true}/>
            </div>
            
        )}
        {
            (isShowModal && selectedData) && (
                <div className={style.modal} style={{ width: 'auto', height: 'auto', maxWidth: '700px' }}>
                    <div className={style.head}>
                        <h1>Add Program</h1>
                        <BiExit size={25} cursor={'pointer'} onClick={() => setIsShowModal(false)}/>
                    </div>
                    <div className={style.body} style={{ display: 'flex', flexDirection: 'column', minWidth: '500px', marginTop: '5%' }}>
                        <div className='d-flex w-100 mt-1 mb-3'>
                           <div id={style.statusDiv} title='program status'>ACTIVE</div>
                        </div>
                        <div className='d-flex w-100 mb-2'>
                            <div className='d-flex w-50 flex-column'>
                                <h2>Program name</h2>
                                <p>{selectedData.program_name}</p>
                            </div>
                            <div className='d-flex w-50 flex-column'>
                                <h2>Total Applicants</h2>
                                <p>{selectedData.total_applicant}</p>
                            </div>
                        </div>
                        <div className='d-flex w-100 flex-column'>
                            <h2>Program Description</h2>
                            <div style={{
                                width: '100%',
                                overflow: 'auto',
                                wordWrap: 'break-word',
                                whiteSpace: 'normal'
                            }}></div>
                            <div>{selectedData.program_desc}</div>
                        </div>
                    </div>
                </div>
            )
        }
        {
            isShowModalAddProgram &&
            <div className={style.modal} style={{ width: 'auto', height: 'auto' }}>
                <div className={style.head}>
                    <h1>Add Program</h1>
                    <BiExit size={25} cursor={'pointer'} onClick={() => setIsShowModalAddProgram(false)}/>
                </div>
                   <div className={style.body} style={{ display: 'flex', flexDirection: 'column', minWidth: '500px', marginTop: '5%' }}>
                    <div className='d-flex w-100 flex-column mb-2'>
                        <label>Program name</label>
                        <input type="text" onChange={(e) => setProgramName(e.target.value)}/>
                    </div>
                    <div className='d-flex w-100 flex-column'>
                        <label>Program Description</label>
                        <textarea onChange={(e) => setProgramDesc(e.target.value)}></textarea>
                    </div>
                    <div className='d-flex w-100 flex-column mt-5'>
                        <button disabled={isCreateBtnDisable} onClick={handleCreateProgram}>Create</button>
                    </div>
                </div>
            </div>
        }
        {
            isShowModalDelete &&
            <div className={style.modal} style={{ width: 'auto', height: 'auto' }}>
                <div className={style.body} style={{ display: 'flex', flexDirection: 'column', minWidth: '500px', alignItems: 'center', justifyContent: 'center'}}>
                    <div className='d-flex w-100 flex-column'>
                        <h2 style={{textAlign: 'center', fontSize: '15pt'}}>Are you sure you want to delete this program?</h2>
                        <p style={{textAlign: 'center', fontSize: '8pt'}}>Deleting this program is a permanent action and cannot be undone. Please confirm if you'd like to proceed.</p>
                    </div>
                    <div className='d-flex w-100 gap-2 mt-2'>
                        <button onClick={handleDeleteProgram}>Delete</button>
                        <button onClick={() => setIsShowModalDelete(false)} style={{backgroundColor: 'rgb(199, 37, 62)'}}>Cancel</button>
                    </div>
                </div>
            </div>
        }

        <div className={style.content}>
            <div className={style.menuHead}>
                <h1>Program List</h1>
                <button onClick={() => setIsShowModalAddProgram(true)}>Create Program <FiPlusCircle/></button>
            </div>
            <Table className={style.table} columns={columns} dataSource={programList} pagination={{ pageSize: 5 }} />
        </div>
    </div>
  )
}

export default ProgramsPage
