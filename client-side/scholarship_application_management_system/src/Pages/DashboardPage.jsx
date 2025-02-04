import React, { useEffect, useState } from 'react'
import style from './DashboardPage.module.css'
import logo from '../../public/assets/tabuk_logo.png'
import { GiHamburgerMenu } from "react-icons/gi";
import { BiLogOutCircle } from "react-icons/bi";
import Applications from './Admin/Tabs/Applications/Applications'
import { useNavigate } from 'react-router-dom';
import ManageAccountComponent from '../Components/ManageAccountComponent';
import ProgramsPage from './ProgramsPage';
import ProgramListPage from './User/Tabs/ProgramList/ProgramListPage';
import NotificationComponent from '../Components/NotificationComponent';
import ApplicantsList from './ApplicantsList';
import Homepage from './Homepage';
import AnnouncementTable from './AnnouncementTable';
import Analytics from './Analytics';
import { getFullname } from '../Utils/nameUtils';
import AccountsRequestList from './Admin/Tabs/AccountsRequestList/AccountsRequestList';
import MyProfile from './User/Tabs/MyProfile/MyProfile';
import Overview from './Admin/Tabs/Overview/Overview';
import UserProfilePicture from './ProfilePicture/UserProfilePicture';
import renderStore from '../store/renderStore';
import { getUpdatedAccountByUserID } from '../Services/accountServices';

const DashboardPage = () => {

  const [isShowSideBar, setIsShowSideBar] = useState(true)
  const [isShowManageAccount, setIsShowManageAccount] = useState(false)
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user')) || null

  const [isShowNotification, setIsShowNotification] = useState(false)

  const BASE_URL = 'http://localhost:5001'
  
  const [message, setMessage] = useState('')
  const [notifStatus, setNotifStatus] = useState(true)

  const { currentRender, changeRender } = renderStore()

  useEffect(() => {

    if (!user) {
       navigate('/')
    }

    if (user.type === 'user') {
        changeRender('homepage')
    }

    const fetchData = async () => {
        try {
        
        const result = await getUpdatedAccountByUserID(user?.user_id)

        if (result) {
            localStorage.setItem('user', JSON.stringify(result))
        }

        } catch (error) {
            console.log(error)
        }
    } 

    fetchData()
    

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
                        <p style={{ fontSize: '.9rem' }}>Tabuk City, Kalinga</p>
                    </div>
                    <GiHamburgerMenu size={25} cursor={'pointer'} title='hide sidebar' onClick={() => setIsShowSideBar(!isShowSideBar)}/>
                </div>
                <div className={style.profile}>

                    <div 
                        style={{ 
                        width: 200, 
                        height: 200, 
                        borderRadius: 10,
                        }}
                    >
                        <UserProfilePicture/>
                    </div>
                    <h1>{getFullname()}</h1>
                    <button onClick={() => setIsShowManageAccount(true)}>Manage Account</button>
                </div>
                <div className={style.menus}>

                    <button className={currentRender === 'homepage' ? style.btnMenuActive : style.btnMenu} onClick={() => changeRender('homepage')}>Homepage</button>
                    
                    
                    {
                        user && user.type === 'user' && (
                        <>
                            <button className={currentRender === 'my-profile' ? style.btnMenuActive : style.btnMenu} onClick={() => changeRender('my-profile')}>My Profile</button>
                            <button className={currentRender === 'my-application' ? style.btnMenuActive : style.btnMenu} onClick={() => changeRender('my-application')}>My Applications</button>
                        </>
                        )
                        
                    }
                    
                    {
                        user && user.type === 'admin' && (
                            <>
                                <button 
                                    className={currentRender === 'overview' ? style.btnMenuActive : style.btnMenu}
                                    onClick={() => changeRender('overview')}
                                >Overview</button>
                                <button 
                                    className={currentRender === 'programs' ? style.btnMenuActive : style.btnMenu}
                                    onClick={() => changeRender('programs')}
                                >Programs</button>
                                <button 
                                    className={currentRender === 'applications' ? style.btnMenuActive : style.btnMenu} 
                                    onClick={() => changeRender('applications')}
                                >Applications</button>
                                <button 
                                    className={currentRender === 'accounts-request' ? style.btnMenuActive : style.btnMenu} 
                                    onClick={() => changeRender('accounts-request')}
                                >Accounts Request</button>
                                <button 
                                    className={currentRender === 'applicants' ? style.btnMenuActive : style.btnMenu} 
                                    onClick={() => changeRender('applicants')}
                                >Applicants</button>
                                <button 
                                    className={currentRender === 'announcements' ? style.btnMenuActive : style.btnMenu} 
                                    onClick={() => changeRender('announcements')}
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
                currentRender === 'overview' && <Overview/> ||
                currentRender === 'announcements' && <AnnouncementTable/> ||
                currentRender === 'accounts-request' && <AccountsRequestList/> ||
                currentRender === 'dashboard' && <Analytics/> ||
                currentRender === 'homepage' && <Homepage changeRender={changeRender}/> ||
                currentRender === 'applications' && <Applications/> ||
                currentRender === 'my-application' && <ProgramListPage/> ||
                currentRender === 'programs' && <ProgramsPage/> ||
                currentRender === 'applicants' && <ApplicantsList/> ||
                currentRender === 'my-profile' && <MyProfile/>
            }
            
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
