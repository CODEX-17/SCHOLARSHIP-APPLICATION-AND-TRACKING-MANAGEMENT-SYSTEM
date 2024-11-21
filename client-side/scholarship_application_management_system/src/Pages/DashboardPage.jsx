import React, { useEffect, useState } from 'react'
import style from './DashboardPage.module.css'
import logo from '../assets/tabuk_logo.png'
import { GiHamburgerMenu } from "react-icons/gi";
import { BiLogOutCircle } from "react-icons/bi";
import RequestPage from './RequestPage';
import { useNavigate } from 'react-router-dom';
import MyApplication from './MyApplication';
import ManageAccountComponent from '../Components/ManageAccountComponent';
import ProgramsPage from './ProgramsPage';
import ProgramListPage from './ProgramListPage';
import NotificationComponent from '../Components/NotificationComponent';

const DashboardPage = () => {

  const [isShowSideBar, setIsShowSideBar] = useState(true)
  const [isShowManageAccount, setIsShowManageAccount] = useState(false)
  const [activeDisplay, setActiveDisplay] = useState('dashboard')
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user')) || null

  const [isShowNotification, setIsShowNotification] = useState(false)

  
  const [message, setMessage] = useState('')
  const [notifStatus, setNotifStatus] = useState(true)

  useEffect(() => {
    if (!user) {
       navigate('/')
    }
  },[])

  const handleShowCloseManageAccount = (status) => {
    setIsShowManageAccount(status)
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
                    <img src={'http://localhost:5001/'+user?.image} alt="profile" />
                    <h1>{user?.username}</h1>
                    <button onClick={() => setIsShowManageAccount(true)}>Manage Account</button>
                </div>
                <div className={style.menus}>
                <button className={activeDisplay === 'dashboard' ? style.btnMenuActive : style.btnMenu} onClick={() => setActiveDisplay('dashboard')}>Dashboard</button>
                    {
                        user && user.type === 'user' && (
                        <>
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
                    <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                        <NotificationComponent message={message} status={notifStatus}/>
                    </div>
            }
            {
                isShowManageAccount && (
                    <div className={style.manageAcctDiv}>
                      <ManageAccountComponent handleShowCloseManageAccount={handleShowCloseManageAccount} notificationConfig={notificationConfig}/>  
                    </div>
                )
            }

            {
                activeDisplay === 'applications' && <RequestPage/> ||
                activeDisplay === 'apply' && <ProgramListPage/> ||
                activeDisplay === 'my-application' && <MyApplication/> ||
                activeDisplay === 'programs' && <ProgramsPage/>
            }
            
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
