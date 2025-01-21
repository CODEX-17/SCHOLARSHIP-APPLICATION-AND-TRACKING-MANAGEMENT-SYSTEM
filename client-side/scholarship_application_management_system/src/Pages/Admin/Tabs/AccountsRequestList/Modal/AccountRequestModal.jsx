import React, { useEffect, useState } from 'react'
import style from './AccountRequestModal.module.css'
import { BiExit } from "react-icons/bi";
import { IoPersonSharp } from "react-icons/io5";
import { SiFiles } from "react-icons/si";
import sample from '../../../../../assets/tabuk_logo.png'
import { FaFile } from "react-icons/fa";
import { getAccountByUserID, updateAccountStatus } from '../../../../../Services/accountServices';
import ViewPDFFile from '../../../../../Components/ViewPDFFile';
import { FaCheckCircle } from "react-icons/fa";
import LoadingComponent from '../../../../../Components/LoadingComponents'



const AccountRequestModal = ({ selectData, setIsShowModal }) => {

  const [selectedPage, setSelectedPage] = useState(1)
  const [currentData, setCurrentData] = useState(null)
  const [isShowViewPDF, setIsShowViewPDF] = useState(false) 
  const [pdfFile, setPdfFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const BASE_URL = "http://localhost:5001"

  
  useEffect(() => {

    console.log(selectData)

    const fetchData = async () => {
        try {
            const result = await getAccountByUserID(selectData?.user_id)
            console.log('result', result)
            if (result) {
                setCurrentData(result[0])
            }

        } catch (error) {
            console.log(error)
        }
    }

    fetchData()

  },[isLoading])

  const handleDownload = (url) => {
    window.open(url, '_blank');
  }

  const handleResponse = async (response) => {

    setIsLoading(true)

    const user_id = currentData?.user_id
    const request_id = selectData?.request_id
    const account_status = response

    try {
    
        const result = await updateAccountStatus(user_id, account_status, request_id)
        
        if (result) {
            console.log(result.message)
            setTimeout(() => {
                setIsLoading(false)
            }, 3000);
        }

    } catch (error) {
        setIsLoading(false)
        console.log('Error server in server', error)
    }

  }

  return (
    <div className={style.container}>
        {
            isShowViewPDF &&
            <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 20, }}>
                <ViewPDFFile 
                    pdfFile={pdfFile}
                    setIsShowViewPDF={setIsShowViewPDF}
                />          
            </div>
            
        }
      <div className={style.card}>
        {
            isLoading ? 
            <>
                <LoadingComponent message={'Updating account...'}/>
            </> : 
            <>
                <div className='d-flex align-items-center justify-content-between w-100 mb-3'>
                    <p>USER ID: <b>{currentData?.user_id}</b></p>
                    <BiExit size={20} cursor={'pointer'} onClick={() => setIsShowModal(false)}/>
                </div>
                <div className='d-flex gap-3 align-items-center w-100 mb-5'>
                    <div 
                        className={
                            selectedPage === 1 ? style.navigateBtnActive : style.navigateBtn
                        }
                        onClick={() => setSelectedPage(1)}
                    >
                        <IoPersonSharp/> Account Info
                    </div>
                    <div 
                        className={
                            selectedPage === 2 ? style.navigateBtnActive : style.navigateBtn
                        }
                        onClick={() => setSelectedPage(2)}
                    >
                        <SiFiles/> Files
                    </div>
                </div>
                <div className={style.content}>
            
                    {
                        selectedPage === 1 ? 
                        <>
                            <div className='d-flex gap-5 mb-4'>
                                <div className='d-flex flex-column'>
                                    <label>First Name</label>
                                    <p>{currentData?.firstname}</p>
                                </div>
                                <div className='d-flex flex-column'>
                                    <label>Middle Name</label>
                                    <p>{currentData?.middlename}</p>
                                </div>
                                <div className='d-flex flex-column'>
                                    <label>Last Name</label>
                                    <p>{currentData?.lastname}</p>
                                </div>
                            </div>
                            <div className='d-flex gap-5 mb-4'>
                                <div className='d-flex flex-column'>
                                    <label>Contact Number</label>
                                    <p>{currentData?.contact}</p>
                                </div>
                                <div className='d-flex flex-column'>
                                    <label>Email</label>
                                    <p>{currentData?.email}</p>
                                </div>
                            </div>
                            <div className='d-flex gap-5 mb-4'>
                                <div className='d-flex flex-column'>
                                    <label>Address</label>
                                    <p>{currentData?.address}</p>
                                </div>
                            </div>
                        </> :
                        <>
                        <div className='d-flex w-100 gap-2'>
                                
                                <div className={style.imgDiv}>
                                    <img src={`${BASE_URL}/${currentData?.profile_pic}`} alt="picture" /> 
                                    <div className='d-flex flex-column'>
                                        <label>Profile Picture</label>
                                        <p onClick={() => handleDownload(`${BASE_URL}/${currentData?.profile_pic}`)}>View Image</p>
                                    </div> 
                                </div>
                            
                                <div className={style.fileDiv}>
                                    <FaFile size={40}/>
                                    <div className='d-flex flex-column'>
                                        <label>Valid ID</label>
                                        <p onClick={() => handleDownload(`${BASE_URL}/${currentData?.valid_id}`)}>Download</p>
                                    </div>
                                </div> 
                            
                        </div>
                        </>
                    }
                    <div className='d-flex gap-2 mt-4'>
                        {
                            currentData?.account_status !== 'pending' ?
                            <>
                                <h1><FaCheckCircle/> This account is {currentData?.account_status}</h1>
                            </> :
                            <>
                                <button onClick={() => handleResponse('approved')}>Approved</button>
                                <button onClick={() => handleResponse('rejected')} style={{ backgroundColor: '#AF1740' }}>Reject</button>
                            </>
                        }
                    
                    </div>
                </div>
            </>
        }
        
      </div>
    </div>
  )
}

export default AccountRequestModal
