import React, { useEffect, useState } from 'react'
import style from './ProgramListPage.module.css'
import axios from 'axios'
import ApplicationForm from '../../../ApplicationForm'
import { Progress } from 'antd';
import ProgramHome from './ProgramHome/ProgramHome';
import programStore from '../../../../store/programStore';
import loadingStore from '../../../../store/loadingStore';
import LoadingComponents from '../../../../Components/LoadingComponents';
import { addRequest } from '../../../../Services/requestServices';

const PendingPage = () => {
  return (
    <div className='w-100 h-100 d-flex flex-column align-items-center justify-content-center '>
      <h2>Application Submitted Successfully</h2>
      <p className='text-center mb-5'>Thank you for submitting your application! Please allow some time for the admin to review and approve your request. <br/> You will receive updates regarding the status of your application via email. Stay tuned!</p>
      <button style={{ width: 300, borderRadius: 5 }}>Check Email</button>
    </div>
  )
}

const ProgramListPage = () => {

  const [programList, setProgramList] = useState([])
  const url = 'http://localhost:5001/'
  const userDetails = JSON.parse(localStorage.getItem('user'))

  const [isShowProgramHome, setIsShowProgramHome] = useState(false)
  const [renderDisplay, setRenderDisplay] = useState('list')

  const { 
    currentProgram, 
    changeProgram, 
    resetProgram 
  } = programStore()

  useEffect(() => {
    
    resetProgram()

    axios.get(`${url}programs/getPrograms`)
    .then((res) => {
        const result = res.data
        setProgramList(result)

        if (userDetails?.apply_status === 'pending') {
          setRenderDisplay('pending')
        }else if (userDetails?.apply_status === 'applied' && userDetails?.program_id) {
          const filter = result.filter((data) => data.program_id === userDetails?.program_id)
          changeProgram(filter[0])
          setIsShowProgramHome(true)
        }
    })
    .catch(err => console.log(err))

  },[])


  const handleShorten = (data) => {
    if (data.length > 60) {
        return data.substring(0,50) + '...'
    }
    return data
  }

  const handlePercent = (current, limit) => {
    return ((current/limit)*100)
  }

  const handleApply = async () => {
    setRenderDisplay('loading')

    try {
      const data = {
        user_id: userDetails?.user_id,
        program_id: currentProgram?.program_id,
      }

      const result = await addRequest(data)

      if (result) {
        const message = result.message
        console.log(message)

        let updatedProfile = userDetails
        updatedProfile.apply_status = 'pending'
        updatedProfile.program_id = currentProgram?.program_id
        localStorage.setItem('user', JSON.stringify(updatedProfile))

        setTimeout(() => {
          setRenderDisplay('pending')
        }, 3000);
      }

    } catch (error) {
      console.log(error)
    }
    
  }

  
  return (
    isShowProgramHome ? ( 
      <ProgramHome/>
    ) : (
      <div className={style.container}>
          {
              (currentProgram && renderDisplay === 'list') && (
                  <div className={style.previewSection}>
                      <div className={style.slotDiv}>
                        <b>Slot :</b> {currentProgram?.available_slot}/{currentProgram?.limit_slot}
                      </div>
                      <div className={style.prevContent}>
                          <div className='d-flex flex-column'>
                              <p>Program name</p>
                              <h1>{currentProgram?.program_name}</h1>
                          </div>
                          <div className='d-flex flex-column mt-5'>
                              <p><b>Program Description</b></p>
                              <p>{currentProgram?.program_desc}</p>
                          </div>
                          
                      </div>
                      <div className='w-100'>
                        <button onClick={handleApply}>Apply</button> 
                      </div>
                      
                  </div>
              )
          }
          <div className={style.listSection}>
            {
              renderDisplay === 'pending' && <PendingPage/> ||
              renderDisplay === 'loading' && <LoadingComponents message={'Submitting application...'}/> ||
              renderDisplay === 'list' &&
              <>
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
                                      <button onClick={() => changeProgram(prog)}>View</button>
                                    </div>
                                    
                                </div>
                            ))
                            
                        ) : (
                            <p>No program yet.</p>
                        )
                    }

                </div>
              </>
            }

          </div>
      </div>
    )
  )
}

export default ProgramListPage
