import React, { useEffect, useState } from 'react';
import style from './ApplicantsList.module.css';
import { FaThList } from 'react-icons/fa';
import { RiDeleteBin5Line } from "react-icons/ri";
import NotificationComponent from '../Components/NotificationComponent';
import axios from 'axios';
import LoadingComponents from '../Components/LoadingComponents';

const ApplicantsList = () => {

  const [showPanel, setShowPanel] = useState(true);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const url = 'http://localhost:5001'

  const [programList, setProgramList] = useState([])
  const [applicantsList, setApplicationList] = useState([])

  const [currentApplicants, setCurrentApplicants] = useState([])

  const [isLoading, setIsLoading] = useState(false)
  const [isShowNotification, setIsShowNotification] = useState(false)
  const [message, setMessage] = useState('')
  const [notifStatus, setNotifStatus] = useState(true)


  useEffect(() => {
    axios.get(`${url}/programs/getPrograms`)
    .then((res) => {setProgramList(res.data)})
    .catch(err => console.log(err))

    axios.get(`${url}/profiles/getProfiles`)
    .then((res) => {setApplicationList(res.data)})
    .catch(err => console.log(err))
    
  },[message])

  const handleSelectCurrentApplicants = (program_id) => {
      let applicants = []

      if (applicantsList.length > 0) {
          for (let i = 0; i < applicantsList.length; i++) {
              if (program_id === applicantsList[i].program_id) {
                  applicants.push(applicantsList[i])
              }
          }
      
      }
      
      setCurrentApplicants(applicants)
  }

  const handleSelectProgram = (data) => {
    
    const program_id = data.program_id

    if (window.innerWidth <= 425) {
      setShowPanel(false)
    }

    handleSelectCurrentApplicants(program_id)
    setSelectedProgram(data)

  }

  const handleShortenWords = (words) => {
    if (words.length > 60) {
        return words.substring(0, 60) + '...'
    }
    return words
  }

  const handleFullname = (firstname, middlename, lastname) => {
    return `${firstname.toUpperCase()} ${middlename.substring(0, 1).toUpperCase()}. ${lastname.toUpperCase()}`
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

  const handleDelete = (data) => {

    const profile_id = data.profile_id
    const user_id = data.user_id

    setIsLoading(true)

    const filter = currentApplicants.filter((application) => application.profile_id !== profile_id)
    setCurrentApplicants(filter)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000);

    axios.post(`${url}/accounts/deleteProfiles`, { profile_id, user_id })
    .then((res) => {
        const result = res.data
        notificationConfig(result.message, true)
    })
    .catch(err => console.log(err))

  }

  

  return (
    <div className={style.container}>
        { 
            isShowNotification &&
                <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                    <NotificationComponent message={message} status={notifStatus}/>
                </div>
        }
      <div className={`${style.left} ${!showPanel ? style.hidden : ''}`}>
        <div className={style.head}>
          <h2>Programs</h2>
          <p>List of Programs</p>
        </div>
        <div className={style.programList}>
        {
            programList.map((program, index) => (
                <div 
                    className={style.card} 
                    key={index}
                    style={{ border: selectedProgram?.program_id === program.program_id ? '2px solid #6EC207' : 'none'}}
                >
                    <h2>{program.program_name}</h2>
                    <p>{handleShortenWords(program.program_desc)}</p>
                    <button onClick={() => handleSelectProgram(program)}>View Applicants</button>
                </div>
            ))
        }
        </div>
      </div>
      <div className={style.right}>
        {
            isLoading ? 
                <div className='d-flex w-100 h-100 align-items-center justify-content-center'>
                    <LoadingComponents message={'Deleting applicant...'}/>
                </div> 
            :
            <>
                <div className={style.head}>
                <h2>Applicants List</h2>
                <FaThList
                    id={style.hamburgerMenu}
                    size={25}
                    cursor="pointer"
                    title="Toggle Menu"
                    onClick={() => setShowPanel(!showPanel)}
                />
                </div>
                <div 
                  className={style.applicantsList} 
                  style={{ 
                      flexDirection: window.innerWidth <= 2189 ? 'column' : 'row',
                      flexWrap: window.innerWidth <= 2189 ? 'nowrap' : 'wrap', 
                  }}
                >
                    {
                        currentApplicants.length > 0 ?
                            currentApplicants.map((applicants) => (
                                <div className={style.cardApplicant}>
                                    <img src={`${url}/${applicants.profile_picture}`} alt="profile" />
                                    <div className='d-flex flex-column'>
                                        <p>Applicant name</p>
                                        <h2>{handleFullname(applicants.firstname, applicants.middlename, applicants.lastname)}</h2>
                                        
                                    </div>
                                    <RiDeleteBin5Line size={25} cursor={'pointer'} onClick={() => handleDelete(applicants)}/>
                                </div>
                            ))
                        :
                        <div className='d-flex flex-column align-items-center justify-content-center w-100 h-100 fade show'>
                            <h2 style={{ fontFamily: 'bold' }}>No Data.</h2>
                            <p>There is no selected program.</p>
                        </div>
                    }
                    
                    
                </div>
            </>
        }

      </div>
    </div>
  )
}

export default ApplicantsList
