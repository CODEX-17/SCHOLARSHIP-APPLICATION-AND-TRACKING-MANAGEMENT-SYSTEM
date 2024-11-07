import React, { useEffect, useState } from 'react'
import style from './ProgramListPage.module.css'
import axios from 'axios'
import ApplicationForm from './ApplicationForm'

const ProgramListPage = () => {

  const [programList, setProgramList] = useState([])
  const [requestList, setRequestList] = useState([])
  const url = 'http://localhost:5001/'
  const [selectedData, setSelectedData] = useState(null)
  const [isShowForm, setIsShowForm] = useState(false)
  const userDetails = JSON.parse(localStorage.getItem('user')) || null

  const [alreadyApplied, setAlreadyApplied] = useState(false)

  useEffect(() => {
    axios.get(`${url}programs/getPrograms`)
    .then((res) => {
        const result = res.data
        setProgramList(result)
    })
    .catch(err => console.log(err))

    axios.get(`${url}profiles/getProfiles`)
    .then((res) => {
        const result = res.data
        setRequestList(result)
    })
    .catch(err => console.log(err))
  },[])


  useEffect(() => {

   setAlreadyApplied(false)
   for (let i = 0; i < requestList.length; i++) {
    if (requestList[i].user_id === userDetails.user_id && requestList[i].program_id === selectedData.program_id) {
        setAlreadyApplied(true)
        console.log(requestList[i])
    }
   }

  },[selectedData])

  const handleShorten = (data) => {
    if (data.length > 60) {
        return data.substring(0,60) + '...'
    }
    return data
  }

  const handleApply = (status) => {
    setIsShowForm(status)
  }

  return (
        isShowForm ? (
            <><ApplicationForm programDetails={selectedData} handleApply={handleApply}/></>
        ) : (
            <div className={style.container}>
                {
                    selectedData && (
                        <div className={style.previewSection}>
                            <div className={style.prevContent}>
                                <div className='d-flex flex-column'>
                                    <p>Program name</p>
                                    <h1>{selectedData.program_name}</h1>
                                </div>
                                <div className='d-flex flex-column mt-5'>
                                    <p><b>Program Description</b></p>
                                    <p style={{ textAlign: 'justify' }}>{selectedData.program_desc}</p>
                                </div>
                                <button disabled={alreadyApplied} onClick={(() => handleApply(true))}>{alreadyApplied ? 'Already Applied' : 'Apply'}</button>
                            </div>
                        </div>
                    )
                }
                <div className={style.listSection}>
                    <div className={style.head}>
                        <h1>Programs</h1>
                    </div>
                    <div className={style.listCard}>
                        {
                            programList.length > 0 ? (
                                programList.map((prog) => (
                                    <div className={style.card}>
                                        <div className='d-flex flex-column'>
                                            <h3>{prog.program_name}</h3>
                                            <p>{handleShorten(prog.program_desc)}</p>
                                        </div>
                                        <button onClick={() => setSelectedData(prog)}>View</button>
                                    </div>
                                ))
                                
                            ) : (
                                <p>No program yet.</p>
                            )
                        }
                        
                    
                        
                        
                    </div>
                </div>
            </div>
        )
  )
}

export default ProgramListPage
