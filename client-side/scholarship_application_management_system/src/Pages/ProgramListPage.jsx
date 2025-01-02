import React, { useEffect, useState } from 'react'
import style from './ProgramListPage.module.css'
import axios from 'axios'
import ApplicationForm from './ApplicationForm'
import { Progress } from 'antd';

const ProgramListPage = () => {

  const [programList, setProgramList] = useState([])
  const [requestList, setRequestList] = useState([])
  const url = 'http://localhost:5001/'
  const [selectedData, setSelectedData] = useState(null)
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [isShowForm, setIsShowForm] = useState(false)
  const [applicantStatus, setApplicantStatus] = useState(null)
  const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem('user')) || null)

  const [alreadyApplied, setAlreadyApplied] = useState(false)

  useEffect(() => {

    const user_id = userDetails?.user_id
    axios.get(`${url}/accounts/getAcctByID`, { user_id })
    .then((res) => {
      const result = res.data
      if (result) {
        setUserDetails(result)
        localStorage.setItem('user', JSON.stringify(result))
      }
    })
    .catch(err => console.log(err))

    axios.get(`${url}programs/getPrograms`)
    .then((res) => {
        const result = res.data
        console.log(userDetails)
        if (result.length > 0) {

            let updated = [...result]
            console.log(updated)
            for (let i = 0; i < updated.length; i++) {
                
                console.log(updated[i].program_id === userDetails.program_id )
                  if (
                    updated[i].program_id === userDetails.program_id &&
                    userDetails.apply_status === 'applying'
                  ) {
                    console.log('yes')
                    updated[i].program_prev = 'Application Submitted'
                  }
              
                  else if (
                    (updated[i].program_id === userDetails.program_id &&
                    userDetails.apply_status === 'applied' &&
                    updated[i].program_status === 'renewal')
                  ) {
                    updated[i].program_prev = 'Renew Application'
                  }
              
                  else if (
                    updated[i].program_id === userDetails.program_id &&
                    userDetails.apply_status === 'applied' &&
                    updated[i].program_status !== 'renewal'
                  ) {
                    updated[i].program_prev = 'Already Applied'
                  }
              
                  else if (
                    userDetails.apply_status === 'free' ||
                    userDetails.apply_status === 'rejected' &&
                    updated[i].program_id !== userDetails.program_id
                  ) {
                    updated[i].program_prev = 'Apply'
                  }

                  else if (
                    userDetails.apply_status === 'applied' &&
                    updated[i].program_id !== userDetails.program_id ||
                    userDetails.apply_status === 'applying' &&
                    updated[i].program_id !== userDetails.program_id
                  ) {
                    updated[i].program_prev = 'Unable to apply'
                  }
              
              
                  else if (
                    updated[i].program_id === userDetails.program_id &&
                    userDetails.apply_status === 'rejected'
                  ) {
                    updated[i].program_prev = 'Application Rejected'
                  }
                
            }

            console.log('updated', updated)

            setProgramList(updated)
    
        }
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
    setApplicantStatus(userDetails?.apply_status)
  },[userDetails])


  useEffect(() => {

   setAlreadyApplied(false)
   for (let i = 0; i < requestList.length; i++) {
    if (requestList[i].user_id === userDetails.user_id && requestList[i].program_id === selectedData.program_id) {
        setAlreadyApplied(true)
        setSelectedProfile(requestList[i])
        if (selectedData.program_status === 'renewal') {
            console.log('renewal')
            setApplicantStatus('renewal')
        }else if (selectedData.program_status === 'active') {
            console.log('applied')
            setApplicantStatus('applied')
        }
    }else {
        setApplicantStatus('apply')
    }
   }
   
  },[selectedData])

  const handleShorten = (data) => {
    if (data.length > 60) {
        return data.substring(0,50) + '...'
    }
    return data
  }

  const handleApply = (status) => {
    setIsShowForm(status)
  }


  const handleUpdateDisabledButton = () => {
    if ( 
        selectedData?.program_prev === 'Renew Application' ||
        selectedData?.program_prev === 'Apply' ||
        selectedData?.program_prev === 'Renew Application'
    ) {
        return false
    }else {
        return true
    }
  }

  const handlePercent = (current, limit) => {
    return ((current/limit)*100)
  }

  return (
        isShowForm ? (
            <>
                <ApplicationForm 
                    programDetails={selectedData} 
                    handleApply={handleApply} 
                    applicantStatus={applicantStatus}
                    selectedProfile={selectedProfile}
                />
            </>
        ) : (
            <div className={style.container}>
                {
                    selectedData && (
                        <div className={style.previewSection}>
                            <div className={style.slotDiv}>
                              <b>Slot :</b> {selectedData?.available_slot}/{selectedData?.limit_slot}
                            </div>
                            <div className={style.prevContent}>
                                <div className='d-flex flex-column'>
                                    <p>Program name</p>
                                    <h1>{selectedData?.program_name}</h1>
                                </div>
                                <div className='d-flex flex-column mt-5'>
                                    <p><b>Program Description</b></p>
                                    <p>{selectedData?.program_desc}</p>
                                </div>
                                
                            </div>
                            <div className='w-100'>
                              <button disabled={handleUpdateDisabledButton()} onClick={(() => handleApply(true))}>{selectedData?.program_prev}</button>
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
                                            <p style={{ fontSize:'.8rem', color: '#6EC207' }}>Available Slot: {prog?.available_slot}</p>
                                            
                                            <div className='mt-2'>
                                              <p><b>Description</b></p>
                                              <p style={{ fontSize: '.8rem' }}>{handleShorten(prog?.program_desc)}</p>
                                            </div>
                                        </div>
                                        <div className='w-100 d-flex flex-column gap-2'>
                                          <Progress
                                            percent={handlePercent(prog.total_applicant, prog.limit_slot)}
                                            percentPosition={{ align: 'end', type: 'inner' }}
                                            size={['100%', 20]}
                                            strokeColor="#6EC207"
                                          />
                                          <button onClick={() => {setSelectedData(prog), console.log(prog)}}>View</button>
                                        </div>
                                        
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
