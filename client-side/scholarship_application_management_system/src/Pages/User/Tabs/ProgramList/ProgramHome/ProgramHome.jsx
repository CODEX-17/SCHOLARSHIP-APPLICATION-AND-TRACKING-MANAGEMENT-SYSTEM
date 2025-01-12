import React, { useEffect, useState } from 'react'
import style from './ProgramHome.module.css'
import { Tabs, ConfigProvider } from 'antd';
import { BiExit } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import renderStore from '../../../../../store/renderStore';
import programStore from '../../../../../store/programStore';


const Details = ({ details }) => {
    return (
        <div className="w-100 h-100">
            <h5><b>Program Description</b></h5>
            <p>{details || 'no description.'}</p>
        </div>
    )
}

const Anncouncements = () => {
    return (
        <div className="w-100 h-100">
            <h2><b>Comming Soon</b></h2>
            <p className='fs-5'><i>This features is ongoing development.</i></p>
        </div>
    )
}

const RenewApplication = ({ setisShowRenewalModal }) => {
    
   const { changeRender } = renderStore()

    return (
        <div className={style.renewalModal}>
            <div 
                style={{ 
                    position: 'absolute', 
                    top: 10, 
                    right: 20, 
                    cursor: 'pointer' 
                }}
                onClick={() => setisShowRenewalModal(false)}
            ><BiExit size={20}/></div>
            <h3 className='m-0'><b>Renewal Account</b></h3>
            <p>Reminder: Please renew your scholarship application to keep your status active. Thank you!</p>
            <div className='d-flex gap-2 mt-4'>
                <button className='rounded' onClick={() => changeRender('my-profile')}>Update Profile</button>
                <button className='rounded'>Submit Application</button>
                
            </div>
        </div>
    )
}

const ProgramHome = () => {
    
    const [isShowRenewalModal, setisShowRenewalModal] = useState(false)
    const { currentProgram } = programStore()

    const items = [
        {
          key: '1',
          label: 'Details',
          children: <Details details={currentProgram?.program_desc}/>,
        },
        {
          key: '2',
          label: 'Members',
          children: <Anncouncements/>,
        },
        {
          key: '3',
          label: 'Anncouncements',
          children: <Anncouncements/>,
        },
    ]

  return (
    <div className={style.container}>
      {
        isShowRenewalModal &&
        <div className="position-absolute d-flex align-items-center justify-content-center w-100 h-100">
            <RenewApplication setisShowRenewalModal={setisShowRenewalModal}/>
        </div>
      }
      <div className='w-100 h-100 p-5'>
        <div className='w-100 align-items-end justify-content-between d-flex'>
            <div className='d-flex flex-column'>
                <h1>{currentProgram?.program_name}</h1>
                <p className='gap-4 m-0'><b>Application Status:</b> Approved</p>
            </div>
            <button className='rounded' style={{ width: 200, }} onClick={() => setisShowRenewalModal(true)}>Renew</button>
        </div>
        <hr />
        <div className='w-100 h-auto'>
            <div>
            <ConfigProvider
                theme={{
                    components: {
                        Tabs: {
                            itemActiveColor: '#6EC207',
                            itemColor: '#6EC207',
                            itemSelectedColor: '#6EC207',
                            inkBarColor: '#6EC207',
                            fontFamily: 'normal',
                            fontSize: '.8rem',
                        },
                    },
                }}
            >
                <Tabs defaultActiveKey="1" items={items}/>
            </ConfigProvider>
                
            </div>
        </div>
      </div>
      
    </div>
  )
}

export default ProgramHome
