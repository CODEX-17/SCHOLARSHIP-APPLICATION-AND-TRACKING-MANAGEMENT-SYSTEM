import React, { useState } from 'react'
import style from './DashboardPage.module.css'
import logo from '../assets/tabuk_logo.png'
import { GiHamburgerMenu } from "react-icons/gi";
import { BiLogOutCircle } from "react-icons/bi";

const DashboardPage = () => {

  const [isShowSideBar, setIsShowSideBar] = useState(true)

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
                    <img src={logo} alt="profile" />
                    <h1>Mark Reyes</h1>
                    <button>Manage Account</button>
                </div>
                <div className={style.menus}>
                    <button className={style.card}>Dashboard</button>
                    <button className={style.card}>Dashboard</button>
                </div>
            </div>   
        )
    }

      <div className={style.content}>
        <div className={style.navigation}>
            {
                !isShowSideBar &&  <GiHamburgerMenu size={25} cursor={'pointer'} title='hide sidebar' onClick={() => setIsShowSideBar(!isShowSideBar)}/>
            }
            <BiLogOutCircle size={25} cursor={'pointer'} title='logout' id={style.btnLogout}/>
        </div>
        <div className={style.display}>Display</div>
      </div>
    </div>
  )
}

export default DashboardPage
