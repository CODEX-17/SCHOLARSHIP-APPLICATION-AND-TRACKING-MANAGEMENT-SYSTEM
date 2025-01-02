import React, { useEffect, useState } from 'react'
import style from './DashboardPage.module.css'
import logo from '../assets/tabuk_logo.png'
import { GiHamburgerMenu } from "react-icons/gi";
import { BiLogOutCircle } from "react-icons/bi";
import Applications from './Admin/Tabs/Applications/Applications'
import { useNavigate } from 'react-router-dom';
import MyApplication from './MyApplication';
import ManageAccountComponent from '../Components/ManageAccountComponent';
import ProgramsPage from './ProgramsPage';
import ProgramListPage from './ProgramListPage';
import NotificationComponent from '../Components/NotificationComponent';
import ApplicantsList from './ApplicantsList';
import Homepage from './Homepage';
import AnnouncementTable from './AnnouncementTable';
import Analytics from './Analytics';
import { IoPerson } from "react-icons/io5";
import { getFullname } from '../Utils/nameUtils';
import AccountsRequestList from './Admin/Tabs/AccountsRequestList/AccountsRequestList';
import MyProfile from './User/Tabs/MyProfile/MyProfile';

const DashboardPage = () => {

  const [isShowSideBar, setIsShowSideBar] = useState(true)
  const [isShowManageAccount, setIsShowManageAccount] = useState(false)
  const [activeDisplay, setActiveDisplay] = useState('homepage')
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user')) || null

  const [isShowNotification, setIsShowNotification] = useState(false)

  const BASE_URL = 'http://localhost:5001'
  
  const [message, setMessage] = useState('')
  const [notifStatus, setNotifStatus] = useState(true)

  useEffect(() => {
    if (!user) {
       navigate('/')
    }

    if (user.type === 'user') {
        setActiveDisplay('homepage')
    }

  },[])


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
        isShowSideBar && (
            <div className={style.sideBar}>
                <div className={style.head}>
                    <img src={logo} alt="logo" />
                    <div className='d-flex flex-column align-items-center justify-content-center'>
                        <h1>Scholarship Management System</h1>
                        <p>Tabuk City, Kalinga</p>
                    </div>
                    <GiHamburgerMenu size={25} cursor={'pointer'} title='hide sidebar' onClick={() => setIsShowSideBar(!isShowSideBar)}/>
                </div>
                <div className={style.profile}>
                    {
                        user.profile_pic !== 'default' ? 
                        <img src={`${BASE_URL}/${user.profile_pic}`} alt="profile" /> :
                        <div className={style.defaultProfile}>
                            <IoPerson size={100}/>
                        </div>
                    }
                    
                    <h1>{getFullname()}</h1>
                    <button onClick={() => setIsShowManageAccount(true)}>Manage Account</button>
                </div>
                <div className={style.menus}>

                    <button className={activeDisplay === 'homepage' ? style.btnMenuActive : style.btnMenu} onClick={() => setActiveDisplay('homepage')}>Homepage</button>
                    {/* <button className={activeDisplay === 'dashboard' ? style.btnMenuActive : style.btnMenu} onClick={() => setActiveDisplay('dashboard')}>Dashboard</button> */}
                    
                    {
                        user && user.type === 'user' && (
                        <>
                            <button className={activeDisplay === 'my-profile' ? style.btnMenuActive : style.btnMenu} onClick={() => setActiveDisplay('my-profile')}>My Profile</button>
                            <button className={activeDisplay === 'apply' ? style.btnMenuActive : style.btnMenu} onClick={() => setActiveDisplay('apply')}>Apply for Scholar</button>
                            <button className={activeDisplay === 'my-application' ? style.btnMenuActive : style.btnMenu} onClick={() => setActiveDisplay('my-application')}>My Applications</button>
                        </>
                        )
                        
                    }
                    
                    {
                        user && user.type === 'admin' && (
                            <>
                                <button 
                                    className={activeDisplay === 'programs' ? style.btnMenuActive : style.btnMenu}
                                    onClick={() => setActiveDisplay('programs')}
                                >Programs</button>
                                <button 
                                    className={activeDisplay === 'applications' ? style.btnMenuActive : style.btnMenu} 
                                    onClick={() => setActiveDisplay('applications')}
                                >Applications</button>
                                <button 
                                    className={activeDisplay === 'accounts-request' ? style.btnMenuActive : style.btnMenu} 
                                    onClick={() => setActiveDisplay('accounts-request')}
                                >Accounts Request</button>
                                <button 
                                    className={activeDisplay === 'applicants' ? style.btnMenuActive : style.btnMenu} 
                                    onClick={() => setActiveDisplay('applicants')}
                                >Applicants</button>
                                <button 
                                    className={activeDisplay === 'announcements' ? style.btnMenuActive : style.btnMenu} 
                                    onClick={() => setActiveDisplay('announcements')}
                                >Announcements</button>
                            </>
                        )
                    }
                    
                </div>
                
            </div>   
        )
    }

      <div className={style.content}>
        <div className={style.navigation}>
            {
                !isShowSideBar &&  <GiHamburgerMenu size={25} cursor={'pointer'} title='hide sidebar' onClick={() => setIsShowSideBar(!isShowSideBar)}/>
            }
            <BiLogOutCircle size={25} cursor={'pointer'} title='logout' id={style.btnLogout} onClick={() => {localStorage.clear(), navigate('/')}}/>
        </div>
        <div className={style.display}>
            { 
                isShowNotification &&
                    <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 20 }}>
                        <NotificationComponent message={message} status={notifStatus}/>
                    </div>
            }
            {
                isShowManageAccount && (
                    <div className={style.manageAcctDiv}>
                      <ManageAccountComponent 
                        setIsShowManageAccount={setIsShowManageAccount} 
                        notificationConfig={notificationConfig}
                    />  
                    </div>
                )
            }

            {
                activeDisplay === 'announcements' && <AnnouncementTable/> ||
                activeDisplay === 'accounts-request' && <AccountsRequestList/> ||
                activeDisplay === 'dashboard' && <Analytics/> ||
                activeDisplay === 'homepage' && <Homepage/> ||
                activeDisplay === 'applications' && <Applications/> ||
                activeDisplay === 'apply' && <ProgramListPage/> ||
                activeDisplay === 'my-application' && <MyApplication/> ||
                activeDisplay === 'programs' && <ProgramsPage/> ||
                activeDisplay === 'applicants' && <ApplicantsList/> ||
                activeDisplay === 'my-profile' && <MyProfile/>
            }
            
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
