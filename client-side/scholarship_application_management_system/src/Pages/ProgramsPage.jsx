import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import style from './ProgramsPage.module.css'
import axios from 'axios';
import { AiFillProfile } from "react-icons/ai";
import { BiExit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import NotificationComponent from '../Components/NotificationComponent';
import { FiPlusCircle } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import Switch from '@mui/material/Switch';
import { useForm } from 'react-hook-form'
import { addPrograms, editProgram } from '../Services/programServices';
import { 
    convertDateFormatIntoString,
    convertTimeTo12HourFormat
} from '../Utils/dateUtils';


const ProgramsPage = () => {

    const [programList, setProgramList] = useState([])

    const [isShowModal, setIsShowModal] = useState(false)
    const url = 'http://localhost:5001/'
    const [isShowModalForm, setIsShowisShowModalForm] = useState(false)
    const [isShowModalEditProgram, setIsShowModalEditProgram] = useState(false)
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [selectedData, setSelectedData] = useState(null)
    const [message, setMessage] = useState('')
    const [modalType, setModalType] = useState('add')


    const {
        handleSubmit,
        reset,
        register,
        setValue,
        watch,
        formState: { errors }
    } = useForm({
        defaultValues: {
            program_name: modalType === 'edit' && selectedData.program_name,
            limit_slot: modalType === 'edit' ? selectedData.limit_slot : '50',
        },
      })
    
    const [handleEnableCustomeSlot, setHandleEnableCustomeSlot] = useState(true)

    const limit_slot = watch('limit_slot');

    useEffect(() => {
        if ([20, 50, 100].includes(Number(limit_slot))) {
            setHandleEnableCustomeSlot(true);
        } else {
            setHandleEnableCustomeSlot(false);
        }
    }, [limit_slot])

    useEffect(() => {
        reset({
            limit_slot: '50'
        })
    }, [])
    
    
    const [isShowNotification, setIsShowNotification] = useState(false)
    const userDetails = JSON.parse(localStorage.getItem('user')) || null

    //Edit program variables
    const [editProgramName , setEditProgramName] = useState('')
    const [editProgramDesc, setEditProgramDesc] = useState('')
    const [renewalProg, setRenewalProg] = useState(false)
    const [isEditBtnDisable, setIsEditBtnDisable] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:5001/programs/getPrograms')
        .then((res) => {
            const result = res.data
            setProgramList(result)
        })
        .catch((err) => console.log(err))
    },[message])

    useEffect(() => {
        setRenewalProg(selectedData?.renewal)
    },[selectedData])


    useEffect(() => {
        if (selectedData) {
            if (
                editProgramDesc !== selectedData.program_desc ||
                editProgramName !== selectedData.program_name ||
                renewalProg !== selectedData.program_status
            ) {
                setIsEditBtnDisable(false)
            }else if (
                editProgramDesc !== '' ||
                editProgramName !== ''
            ) {
                setIsEditBtnDisable(true)
            }else {
                setIsEditBtnDisable(true)
            }
        }
    },[
        editProgramDesc,
        editProgramName,
        renewalProg,
    ])

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
            <div className='d-flex gap-2' key={index}>
                <button 
                    className={style.btn} 
                    title='View Details' 
                    onClick={() => {setIsShowModal(true), setSelectedData(record)}}
                ><AiFillProfile size={15}/> View</button>
                <button 
                    className={style.btn} 
                    style={{ backgroundColor: '#C7253E' }} 
                    title='View Details' 
                    onClick={() => {setIsShowModalDelete(true), setSelectedData(record)}}
                ><AiFillDelete size={15}/> Delete</button>
            </div>
        },
    ];

    const onSubmit = async (data) => {
        
        try {

            let updated = data
            updated.program_id = selectedData?.program_id
            updated.renewal = renewalProg

            console.log(updated)

            const result = modalType === 'add' ? await addPrograms(updated) : await editProgram(updated)

            if (result) {
                console.log(result)
                const message = result.message
                setMessage(message)
                setIsShowNotification(true)
                setIsShowisShowModalForm(false)
                setIsShowModal(false)
                setTimeout(() => {
                    setIsShowNotification(false)
                }, 3000)
            }

        } catch (error) {
            console.log(error)
        }

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

    const handleEditModal = () => {
        setModalType('edit')
        if (selectedData) {
            setValue('program_desc', selectedData.program_desc)
            setValue('program_name', selectedData.program_name)
            setValue('limit_slot', selectedData.limit_slot)
            setIsShowisShowModalForm(true)
        }
    }

    const handleUpdateProgram = () => {

        axios.post(`${url}programs/updatePrograms`, { 
            program_desc: editProgramDesc, 
            program_name: editProgramName, 
            program_status: renewalProg, 
            program_id: selectedData.program_id 
        })
        .then((res) => {
            const result = res.data
            const message = result.message
        
            setProgramList(() => {
                let updated = [...programList]
                
                updated.map((prog) => {
                    if (prog.program_id === selectedData.program_id) {
                        updated.program_desc = editProgramDesc
                        updated.program_name = editProgramName
                        updated.program_status = renewalProg
                    }
                })

                return updated
            })

            setMessage(message)
            setIsShowNotification(true)
            setIsShowModalEditProgram(false)

            setTimeout(() => {
                setIsShowNotification(false)
            }, 3000);
        }).catch(err => console.log(err)) 
    }

    const handleAddProgram = () => {
        setModalType('add')
        reset()
        setIsShowisShowModalForm(true)
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
                <div className={style.modal}>
                    <div className={style.head}>
                        <h1>Program Details</h1>
                        <div className='d-flex gap-2'>
                            <FaEdit size={22} cursor={'pointer'} title='edit' onClick={handleEditModal}/>
                            <BiExit size={25} cursor={'pointer'} title='close' onClick={() => setIsShowModal(false)}/>
                        </div>
                    </div>
                    <div className={style.body} style={{ display: 'flex', flexDirection: 'column'}}>
                        <div className='d-flex flex-column w-100 gap-2 mt-1 mb-3 align-items-start'>
                           <div 
                                id={style.statusDiv} 
                                title='program status'
                            >{selectedData.program_status.toUpperCase()}
                            </div>
                            <p style={{ fontStyle: 'italic', fontSize: '0.6rem', margin: 0 }}>
                                <b>Creation Date:</b>
                                {`
                                    ${convertDateFormatIntoString(selectedData?.date)} 
                                    ${convertTimeTo12HourFormat(selectedData?.time)}
                                `}
                            </p>
                        </div>
                        <div className='d-flex flex-column w-100 mb-2'>
                            <div className='d-flex w-100 flex-column'>
                                <h2>Program name</h2>
                                <p style={{ 
                                    width: '100%',
                                    overflow: 'auto',
                                    wordWrap: 'break-word',
                                    whiteSpace: 'normal'
                                 }}>{selectedData?.program_name}</p>
                            </div>
                            <div className='d-flex w-100 flex-column'>
                                <h2>Program Description</h2>
                                <div style={{
                                    width: '100%',
                                    overflow: 'auto',
                                    wordWrap: 'break-word',
                                    whiteSpace: 'normal'
                                }}></div>
                                <div style={{ textWrap: 'wrap', wordWrap: 'break-word' }}>{selectedData.program_desc + "dasdasddasdnakjsbndjkasbndjknasjkdnasjkndjkasndjkasndjknabsjkdnasjkdnasjkdnajksndjkasndjkansdkjnsjk"}</div>
                            </div>
                        </div>
                        <div className='d-flex w-100 mt-3 gap-2'>
                            <div className={style.cardStatic}>
                                <label>Total Applicant</label>
                                <p className='fs-1 m-0'>{selectedData?.total_applicant}</p>
                            </div>
                            <div className={style.cardStatic}>
                                <label>Available Slot</label>
                                <p className='fs-1 m-0'>{selectedData?.available_slot}</p>
                            </div>
                            <div className={style.cardStatic}>
                                <label>Slot Limit</label>
                                <p className='fs-1 m-0'>{selectedData?.limit_slot}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        {
            isShowModalForm &&
            <div className={style.modal}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={style.head}>
                        <h1>{modalType === 'add' ? 'Add' : 'Edit'} Program</h1>
                        <BiExit size={25} cursor={'pointer'} onClick={() => setIsShowisShowModalForm(false)}/>
                    </div>
                    <div className={style.body} style={{ display: 'flex', flexDirection: 'column', width: '100%', }}>
                        <div className='d-flex w-100 flex-column mb-2'>
                            <label>Program Name</label>
                            <input 
                                type="text" 
                                placeholder='Scholar ng Bayan' 
                                {...register('program_name', { required: 'Program Name is required.' })}
                            />
                            { errors?.program_name && <p style={{ color:'red', fontSize:'.8rem' }}>{errors.program_name?.message}</p>}
                            
                        </div>
                        <div className='d-flex w-100 flex-column mb-2'>
                            <label>Program Description</label>
                            <textarea 
                                placeholder='Write description about the scholarship program.' 
                                {...register('program_desc', { required: 'Program Description is required.' })}
                            ></textarea>
                            { errors?.program_desc && <p style={{ color:'red', fontSize:'.8rem' }}>{errors.program_desc?.message}</p>}
                        </div>
                        <div className='d-flex w-100 flex-column'>
                            <label>Program Slot limit</label>
                            <div className='d-flex w-100 gap-2'>
                                <select
                                    className='w-100 flex-glow-1'
                                    style={{ width: '70%' }}
                                    value={limit_slot + 'Person'}
                                    {...register('limit_slot', { required: 'Slot limit is required.' })}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setValue('limit_slot', value); // Update limit_slot
                                    }}
                                >
                                    <option value={20}>20 Person</option>
                                    <option value={50}>50 Person</option>
                                    <option value={100}>100 Person</option>
                                    <option value={0}>Customize Slot</option>
                                </select>
                                <input
                                    className="w-100 flex-glow-1"
                                    value={handleEnableCustomeSlot ? '' : limit_slot} // Clear input when disabled
                                    disabled={handleEnableCustomeSlot}
                                    type="number"
                                    {...register('limit_slot', {
                                        required: 'Custom slot is required.',
                                        valueAsNumber: true,
                                        validate: (value) =>
                                            !handleEnableCustomeSlot || (value > 0 && value <= 1000) || 'Enter a valid slot number.',
                                    })}
                                    onChange={(e) => setValue('limit_slot', e.target.value)} // Update limit_slot
                                />
                            </div>
                            
                        </div>
                        <div className='d-flex align-items-center justify-content-between mt-2'>
                            <label style={{ color: '#6EC207' }}>Open for Renewal and New Application</label>
                            <Switch 
                                checked={renewalProg} 
                                onChange={(e) => setRenewalProg(e.target.checked)}
                                sx={{
                                    '& .MuiSwitch-switchBase.Mui-checked': {
                                    color: 'green', // Custom color when switch is ON
                                    },
                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                    backgroundColor: '#6EC207', // Track color when switch is ON
                                    },
                                    '& .MuiSwitch-switchBase': {
                                    color: '#ccc', // Custom color when switch is OFF
                                    },
                                    '& .MuiSwitch-switchBase + .MuiSwitch-track': {
                                    backgroundColor: '#ccc', // Track color when switch is OFF
                                    },
                                }}
                            />
                        </div>
                          
                        <div className='d-flex w-100 flex-column mt-5'>
                            <button type='submit'>{modalType === 'add' ? 'Create' : 'Update'}</button>
                        </div>
                    </div>
                </form>
            </div>
        }

        {
            isShowModalEditProgram && (
                <div className={style.modal}>
                    <div className={style.head}>
                        <h1>Edit Program</h1>
                        <BiExit size={25} cursor={'pointer'} onClick={() => setIsShowModalEditProgram(false)}/>
                    </div>
                    <div className={style.body} style={{ display: 'flex', flexDirection: 'column', minWidth: '500px', marginTop: '5%' }}>
                        <div className='d-flex w-100 flex-column mb-2'>
                            <label>Program name</label>
                            <input type="text" placeholder='Scholar ng Bayan' value={editProgramName} onChange={(e) => setEditProgramName(e.target.value)}/>
                        </div>
                        <div className='d-flex w-100 flex-column'>
                            <label>Program Description</label>
                            <textarea value={editProgramDesc} placeholder='Write description about the scholarship program.' onChange={(e) => setEditProgramDesc(e.target.value)}></textarea>
                        </div>
                        <div className='d-flex align-items-center justify-content-between mt-2'>
                            <label style={{ color: '#6EC207' }}>Open for Renewal and New Application</label>
                            <Switch 
                                checked={renewalProg === 'active' ? false : true} 
                                onChange={(e) => handleRenewal(e.target.checked)}
                                sx={{
                                    '& .MuiSwitch-switchBase.Mui-checked': {
                                    color: 'green', // Custom color when switch is ON
                                    },
                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                    backgroundColor: '#6EC207', // Track color when switch is ON
                                    },
                                    '& .MuiSwitch-switchBase': {
                                    color: '#ccc', // Custom color when switch is OFF
                                    },
                                    '& .MuiSwitch-switchBase + .MuiSwitch-track': {
                                    backgroundColor: '#ccc', // Track color when switch is OFF
                                    },
                                }}
                            />
                        </div>
                        
                        <div className='d-flex w-100 flex-column mt-5'>
                            <button disabled={isEditBtnDisable} onClick={handleUpdateProgram}>Update</button>
                        </div>
                    </div>
                </div> 
            )
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
                <button onClick={handleAddProgram}>Create Program <FiPlusCircle/></button>
            </div>
            <Table 
                className={style.table} 
                columns={columns} 
                dataSource={programList} 
                pagination={{ pageSize: 5 }} 
            />
        </div>
    </div>
  )
}

export default ProgramsPage
