import React, { useEffect, useState } from 'react'
import style from './ApplicationForm.module.css'
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { FaCircleCheck } from "react-icons/fa6";
import NotificationComponent from '../Components/NotificationComponent';

const ApplicationForm = () => {

  const navigate = useNavigate()

  const [isShowNotification, setIsShowNotification] = useState(false)
  const [currentSteps, setCurrentSteps] = useState(1)
  const [message, setMessage] = useState('')
  const [messageStatus, setMessageStatus] = useState(true)

  const [isBtnEnabled, setIsBtnEnabled] = useState(true)

  // personal information variables
  const [firstname, setFirstname] = useState('') 
  const [middlename, setMiddlename] = useState('') 
  const [lastname, setLastname] = useState('')
  const [birthdate, setBirthdate] = useState('') 
  const [gender, setGender] = useState('')
  const [civilStatus, setCivilStatus] = useState('')
  const [currentAddress, setCurrentAddress] = useState('')
  const [permanentAddress, setPermanentAddress] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
 // family background variables
 // mother
 const [mfirstname, setMFirstname] = useState('') 
 const [mmiddlename, setMMiddlename] = useState('') 
 const [mlastname, setMLastname] = useState('')
 const [mcurrentAddress, setMCurrentAddress] = useState('')
 const [mpermanentAddress, setMPermanentAddress] = useState('')
 const [mcontact, setMContact] = useState(0)
 const [mVoters, setMVoters] = useState(false)
 const [mLong, setMLong] = useState(0)

  // father
  const [ffirstname, setFFirstname] = useState('') 
  const [fmiddlename, setFMiddlename] = useState('') 
  const [flastname, setFLastname] = useState('')
  const [fcurrentAddress, setFCurrentAddress] = useState('')
  const [fpermanentAddress, setFPermanentAddress] = useState('')
  const [fcontact, setFContact] = useState(0)
  const [fVoters, setFVoters] = useState(false)
  const [fLong, setFLong] = useState(0)

  // files variables
  const [coeFile, setCoeFile] = useState(null)
  const [brgyIndigencyFile, setBrgyIndigencyFile] = useState(null)
  const [cogFile, setCogFile] = useState(null)
  const [parentIDFile, setParentIDFile] = useState(null)
  const [schoolIDFile, setSchoolIDFile] = useState(null)


  // password requirements variables
  const [mixChar, setMixChar] = useState(false)
  const [specialChar, setSpecialChar] = useState(false)
  const [validLenghtChar, setValidLenghtChar] = useState(false)

  const hasLowerAndUpperCase = (value) => {
    return /[a-z]/.test(value) && /[A-Z]/.test(value)
    
  }

  const hasNumberAndSymbols = (value) => {
    return /[0-9]/.test(value) && /[!@#$%^&*()]/.test(value)
  }

  useEffect(() => {

    console.log({
        firstname,
        middlename,
        lastname,
        birthdate,
        gender,
        civilStatus,
        currentAddress,
        permanentAddress,
        email,
        password,
        mfirstname,
        mmiddlename,
        mlastname,
        mcurrentAddress,
        mpermanentAddress,
        mcontact,
        mVoters,
        mLong,
        ffirstname,
        fmiddlename,
        flastname,
        fcurrentAddress,
        fpermanentAddress,
        fcontact,
        fVoters,
        fLong,
        coeFile,
        brgyIndigencyFile,
        cogFile,
        schoolIDFile,
        parentIDFile,
        mixChar, 
        specialChar, 
        validLenghtChar
  })

    if (password) {

        if (password=== '') {
            setValidLenghtChar(false)
            setSpecialChar(false)
            setMixChar(false)
        }

        if (password.length > 11) {
            setValidLenghtChar(true)
        }else {
            setValidLenghtChar(false)
        }

        if (hasLowerAndUpperCase(password)) {
            setMixChar(true)
        }else {
            setMixChar(false)
        }

        if (hasNumberAndSymbols(password)) {
            setSpecialChar(true)
        }else {
            setSpecialChar(false)
        }

        
    }

    if (firstname &&
        middlename &&
        lastname &&
        birthdate &&
        gender &&
        civilStatus &&
        currentAddress &&
        permanentAddress &&
        email &&
        password &&
        mfirstname &&
        mmiddlename &&
        mlastname &&
        mcurrentAddress &&
        mpermanentAddress &&
        mcontact &&
        mVoters &&
        mLong &&
        ffirstname &&
        fmiddlename &&
        flastname &&
        fcurrentAddress &&
        fpermanentAddress &&
        fcontact &&
        fVoters &&
        fLong &&
        coeFile &&
        brgyIndigencyFile &&
        cogFile &&
        schoolIDFile &&
        parentIDFile && 
        mixChar && 
        specialChar && 
        validLenghtChar
    ) {
        setIsBtnEnabled(false)
    }

  },[
    firstname,
    middlename,
    lastname,
    birthdate,
    gender,
    civilStatus,
    currentAddress,
    permanentAddress,
    email,
    password,
    mfirstname,
    mmiddlename,
    mlastname,
    mcurrentAddress,
    mpermanentAddress,
    mcontact,
    mVoters,
    mLong,
    ffirstname,
    fmiddlename,
    flastname,
    fcurrentAddress,
    fpermanentAddress,
    fcontact,
    fVoters,
    fLong,
    coeFile,
    brgyIndigencyFile,
    cogFile,
    schoolIDFile,
    parentIDFile
  ])

  const handleFileUpload = (e, type) => {
    if (e, type) {
        const file = e.target.files[0]

        if (file.type === 'application/pdf') {
            if (type === 'coe') {
                setCoeFile(file)
            }else if (type === 'brgy') {
                setBrgyIndigencyFile(file)
            }else if (type === 'cog') {
                setCogFile(file)
            }else if (type === 'sid') {
                setSchoolIDFile(file)
            }else if (type === 'pid') {
                setParentIDFile(file)
            }
           
        }
    }
    
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log ('submit')
  }

  return (
    <div className={style.container}>
        {
            isShowNotification && (
                <div id={style.notifDiv}>
                    <NotificationComponent message={message} status={messageStatus}/>
                </div>
            )
        }

        <form onSubmit={handleSubmit}>
            <h1 id={style.title}>Application Form For Scholarship</h1>
            <div className={style.card}>
                    <div className='d-flex w-100 gap-10 align-items-center mb-5'>
                        <div className={style.stepDiv}>
                            <div 
                                className={style.stepCard} 
                                style={{ backgroundColor: currentSteps === 1 ? '#6EC207' : 'gray' }}
                                onClick={() => setCurrentSteps(1)}
                            >Personal Information</div>
                            <div 
                                className={style.stepCard} 
                                style={{ backgroundColor: currentSteps === 2 ? '#6EC207' : 'gray' }}
                                onClick={() => setCurrentSteps(2)}
                            >Family Background</div>
                            <div 
                                className={style.stepCard} 
                                style={{ backgroundColor: currentSteps === 3 ? '#6EC207' : 'gray' }}
                                onClick={() => setCurrentSteps(3)}
                            >Upload Files</div>
                        </div>
                    </div>
                <div className='d-flex w-100 align-items-center justify-content-between mb-2'>
                    <div className='d-flex w-100 gap-5 align-items-center'>
                        <h1 style={{ margin: '0', color: '#6EC207' }}>{
                            currentSteps === 1 && 'Personal Information' ||
                            currentSteps === 2 && 'Family Background' ||
                            currentSteps === 3 && 'Upload Files'
                        }</h1>
                        
                    </div>
                    
                    <FaArrowRight title='Back to Login' cursor={'pointer'} size={20} onClick={() => navigate('/')}/>
                </div>
                
                {
                    currentSteps === 1 &&
                    <>
                        <div className='d-flex w-100'>
                            <div className='d-flex gap-2 w-100 align-items-center justify-content-center'>
                                <div className='d-flex gap-2 flex-column align-items-start w-50'>
                                    <label>Firstname</label>
                                    <input type="text" required value={firstname} onChange={(e) => setFirstname(e.target.value)}/>
                                </div>
                                <div className='d-flex gap-2 flex-column align-items-start w-50'>
                                    <label>Middlename</label>
                                    <input type="text" required value={middlename} onChange={(e) => setMiddlename(e.target.value)}/>
                                </div>
                                <div className='d-flex gap-2 flex-column align-items-start w-50'>
                                    <label>Lastname</label>
                                    <input type="text" required value={lastname} onChange={(e) => setLastname(e.target.value)}/>
                                </div>
                            </div>
                        </div>

                        <div className='d-flex w-100'>
                            <div className='d-flex gap-2 w-100 align-items-center justify-content-center'>
                                <div className='d-flex gap-2 flex-column align-items-start w-50'>
                                    <label>Birthdate</label>
                                    <input type="date" required value={birthdate} onChange={(e) => setBirthdate(e.target.value)}/>
                                </div>
                                <div className='d-flex gap-2 flex-column align-items-start w-50'>
                                    <label>Gender</label>
                                    <select required value={gender} onChange={(e) => setGender(e.target.value)}>
                                        <option value="">Select gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div className='d-flex gap-2 flex-column align-items-start w-50'>
                                    <label>Civil Status</label>
                                    <select required value={civilStatus} onChange={(e) => setCivilStatus(e.target.value)}>
                                        <option value="">Select gender</option>
                                        <option value="single">Single</option>
                                        <option value="married">Married</option>
                                        <option value="divorced">Divorced</option>
                                        <option value="widowed">Widowed</option>
                                        <option value="separated">Separated</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex w-100'>
                            <div className='d-flex gap-2 w-100 align-items-center justify-content-center'>
                                <div className='d-flex gap-2 flex-column align-items-start w-100'>
                                    <label>Current Address</label>
                                    <input type="text" placeholder='BARANGAY / CITY / PROVINCE' required value={currentAddress} onChange={(e) => setCurrentAddress(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex w-100'>
                            <div className='d-flex gap-2 w-100 align-items-center justify-content-center'>
                                <div className='d-flex gap-2 flex-column align-items-start w-100'>
                                    <label>Permanent Address</label>
                                    <input type="text" placeholder='BARANGAY / CITY / PROVINCE' required value={permanentAddress} onChange={(e) => setPermanentAddress(e.target.value)}/>
                                </div>
                            </div>
                        </div>

                        <div className='d-flex w-100 mt-2'>
                            <h1 id={style.subtitle} style={{ color: '#6EC207' }}>Account Details</h1>
                        </div>
                        <div className='d-flex w-100'>
                            <div className='d-flex gap-2 w-100 align-items-center justify-content-center'>
                                <div className='d-flex gap-2 flex-column align-items-start w-100'>
                                    <label>Email</label>
                                    <input type="email" value={email} placeholder='ex. sample@gmail.com' required onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                                <div className='d-flex gap-2 flex-column align-items-start w-100'>
                                    <label>Password</label>
                                    <input type="text" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex flex-column w-100'>
                            <p><FaCircleCheck color={validLenghtChar ? '#6EC207' : 'gray'}/> at least 12 characters long.</p>
                            <p><FaCircleCheck color={mixChar ? '#6EC207' : 'gray'}/> contains a mix of uppercase and lowercase letters.</p>
                            <p><FaCircleCheck color={specialChar ? '#6EC207' : 'gray'}/> includes numbers and special characters.</p>
                        </div>
                    </>
                }

                {
                    currentSteps === 2 &&
                    <>
                        <div className='d-flex w-100'>
                            <h1 id={style.subtitle}>Mother Information</h1>
                        </div>
                        <div className='d-flex w-100 mb-0'>
                            <div className='d-flex gap-2 w-100 align-items-center justify-content-center'>
                                <div className='d-flex gap-2 flex-column align-items-start w-50'>
                                    <label>Firstname</label>
                                    <input type="text" required value={mfirstname} onChange={(e) => setMFirstname(e.target.value)}/>
                                </div>
                                <div className='d-flex gap-2 flex-column align-items-start w-50'>
                                    <label>Middlename</label>
                                    <input type="text" required value={mmiddlename} onChange={(e) => setMMiddlename(e.target.value)}/>
                                </div>
                                <div className='d-flex gap-2 flex-column align-items-start w-50'>
                                    <label>Lastname</label>
                                    <input type="text" required value={mlastname} onChange={(e) => setMLastname(e.target.value)}/>
                                </div>
                            </div>
                        </div>

                        <div className='d-flex w-100'>
                            <div className='d-flex gap-2 w-100 align-items-center justify-content-center'>
                                <div className='d-flex gap-2 flex-column align-items-start w-100'>
                                    <label>Current Address</label>
                                    <input type="text" placeholder='BARANGAY / CITY / PROVINCE' required value={mcurrentAddress} onChange={(e) => setMCurrentAddress(e.target.value)}/>
                                </div>
                                <div className='d-flex gap-2 flex-column align-items-start w-100'>
                                    <label>Permanent Address</label>
                                    <input type="text" placeholder='BARANGAY / CITY / PROVINCE' required value={mpermanentAddress} onChange={(e) => setMPermanentAddress(e.target.value)}/>
                                </div>
                            </div>
                        </div>

                        <div className='d-flex w-100 align-items-center justify-content-between gap-2'>
                            <div className='d-flex flex-column w-50'>
                                <div className='d-flex align-items-center gap-2'>
                                    <input type="checkbox" style={{ width: '15px', margin: '0px' }} required value={mVoters} onChange={(e) => setMVoters(e.target.value)}/>
                                    <p>Are you registered voter of Tabuk City?</p>
                                </div>
                                <input type="number" maxLength={4} placeholder='How long ?' disabled={mVoters ? false : true} required={mVoters ? false : true} value={mLong} onChange={(e) => setMLong(e.target.value)}/>
                            </div>
                            <div className='d-flex gap-2 flex-column align-items-start w-50'>
                                <label>Contact Number</label>
                                <input style={{ margin: '0px' }} type="tel" required value={mcontact} onChange={(e) => setMContact(e.target.value)}/>
                            </div>
                               
                        </div>

                        <div className='d-flex w-100 mt-5'>
                            <h1 id={style.subtitle}>Father Information</h1>
                        </div>
                        <div className='d-flex w-100 mb-0'>
                            <div className='d-flex gap-2 w-100 align-items-center justify-content-center'>
                                <div className='d-flex gap-2 flex-column align-items-start w-50'>
                                    <label>Firstname</label>
                                    <input type="text" required value={ffirstname} onChange={(e) => setFFirstname(e.target.value)}/>
                                </div>
                                <div className='d-flex gap-2 flex-column align-items-start w-50'>
                                    <label>Middlename</label>
                                    <input type="text" required value={fmiddlename} onChange={(e) => setFMiddlename(e.target.value)}/>
                                </div>
                                <div className='d-flex gap-2 flex-column align-items-start w-50'>
                                    <label>Lastname</label>
                                    <input type="text" required value={flastname} onChange={(e) => setFLastname(e.target.value)}/>
                                </div>
                            </div>
                        </div>

                        <div className='d-flex w-100'>
                            <div className='d-flex gap-2 w-100 align-items-center justify-content-center'>
                                <div className='d-flex gap-2 flex-column align-items-start w-100'>
                                    <label>Current Address</label>
                                    <input type="text" placeholder='BARANGAY / CITY / PROVINCE' required value={fcurrentAddress} onChange={(e) => setFCurrentAddress(e.target.value)}/>
                                </div>
                                <div className='d-flex gap-2 flex-column align-items-start w-100'>
                                    <label>Permanent Address</label>
                                    <input type="text" placeholder='BARANGAY / CITY / PROVINCE' required value={fpermanentAddress} onChange={(e) => setFPermanentAddress(e.target.value)}/>
                                </div>
                            </div>
                        </div>

                        <div className='d-flex w-100 align-items-center justify-content-between gap-2'>
                            <div className='d-flex flex-column w-50'>
                                <div className='d-flex align-items-center gap-2'>
                                    <input type="checkbox" style={{ width: '15px', margin: '0px' }} required value={fVoters} onChange={(e) => setFVoters(e.target.value)}/>
                                    <p>Are you registered voter of Tabuk City?</p>
                                </div>
                                <input type="number" maxLength={4} placeholder='How long ?' disabled={fVoters ? false : true} required={mVoters ? false : true} value={fLong} onChange={(e) => setFLong(e.target.value)}/>
                            </div>
                            <div className='d-flex gap-2 flex-column align-items-start w-50'>
                                <label>Contact Number</label>
                                <input style={{ margin: '0px' }} type="tel" required value={fcontact} onChange={(e) => setFContact(e.target.value)}/>
                            </div>
                               
                        </div>
                    
                        

                        
                        
                    </>
                }

                                
                {
                    currentSteps === 3 &&
                    <>  
                        <div className='d-flex w-100'>
                            <p id={style.subtitle}>Makesure the file uploaded is pdf format @sample.pdf</p>
                        </div>
                        <div className='d-flex gap-2 align-items-center justify-content-between mt-5'>
                            <div className='d-flex w-100 gap-2'>
                                <div className={style.cardUpload} style={{ border: coeFile ? '2px solid #6EC207' : 'none' }}>
                                    <p>Certificate of Enrollment</p>
                                    {coeFile && <p style={{ fontSize: '8pt' }}>Filename : {coeFile.name.substring(0,10)}...</p>}
                                    <input type="file" accept='.pdf' onChange={(e) => handleFileUpload(e, 'coe')}/>
                                </div>
                            </div>

                            <div className='d-flex w-100 gap-2'>
                                <div className={style.cardUpload} style={{ border: brgyIndigencyFile ? '2px solid #6EC207' : 'none' }}>
                                    <p>Barangay Indigency</p>
                                    {brgyIndigencyFile && <p style={{ fontSize: '8pt' }}>Filename : {brgyIndigencyFile.name.substring(0,10)}...</p>}
                                    <input type="file" accept='.pdf' onChange={(e) => handleFileUpload(e, 'brgy')}/>
                                </div>
                            </div>

                            <div className='d-flex w-100 gap-2'>
                                <div className={style.cardUpload} style={{ border: cogFile ? '2px solid #6EC207' : 'none' }}>
                                    <p>Last Sem Certificate of Grades</p>
                                    {cogFile && <p style={{ fontSize: '8pt' }}>Filename : {cogFile.name.substring(0,10)}...</p>}
                                    <input type="file" accept='.pdf' onChange={(e) => handleFileUpload(e, 'cog')}/>
                                </div>
                            </div>

                            <div className='d-flex w-100 gap-2'>
                                <div className={style.cardUpload} style={{ border: schoolIDFile ? '2px solid #6EC207' : 'none' }}>
                                    <p>School ID</p>
                                    {schoolIDFile && <p style={{ fontSize: '8pt' }}>Filename : {schoolIDFile.name.substring(0,10)}...</p>}
                                    <input type="file" accept='.pdf' onChange={(e) => handleFileUpload(e, 'sid')}/>
                                </div>
                            </div>

                            <div className='d-flex w-100 gap-2'>
                                <div className={style.cardUpload} style={{ border: parentIDFile ? '2px solid #6EC207' : 'none' }}>
                                    <p>Parent ID</p>
                                    {parentIDFile && <p style={{ fontSize: '8pt' }}>Filename : {parentIDFile.name.substring(0,10)}...</p>}
                                    <input type="file" accept='.pdf' onChange={(e) => handleFileUpload(e, 'pid')}/>
                                </div>
                            </div>
                        </div>
                        

                    </>
                }


                {
                    currentSteps === 3 && (
                        <div className='d-flex w-100 mt-5'>
                            <button disabled={isBtnEnabled} type='submit'>Submit application</button>
                        </div>
                    )
                }
                
              
                
                
            </div>
        </form>
    </div>
  )
}

export default ApplicationForm
