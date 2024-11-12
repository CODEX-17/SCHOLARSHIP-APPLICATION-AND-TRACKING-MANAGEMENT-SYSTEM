import React, { useEffect, useRef, useState } from 'react'
import style from './ApplicationForm.module.css'
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { FaCircleCheck } from "react-icons/fa6";
import { FaCircleInfo } from "react-icons/fa6";
import axios from 'axios'

const ApplicationForm = ({ programDetails, handleApply, applicantStatus, selectedProfile }) => {

    const [isShowSubmitted, setIisShowSubmitted] = useState(false)
    const [currentSteps, setCurrentSteps] = useState(1)
    const [message, setMessage] = useState('')
    const [messageStatus, setMessageStatus] = useState(true)

    const programID = programDetails.program_id || null
    const currentProfile = selectedProfile || null

    const url = 'http://localhost:5001/'
  
    const [isBtnEnabled, setIsBtnEnabled] = useState(true)
    const fileInput = useRef(null)

    const [requestList, setRequestList] = useState([])

    const userDetails = JSON.parse(localStorage.getItem('user')) || null
  
    // personal information variables
    const [firstname, setFirstname] = useState('') 
    const [middlename, setMiddlename] = useState('') 
    const [lastname, setLastname] = useState('')
    const [birthdate, setBirthdate] = useState('') 
    const [gender, setGender] = useState('')
    const [contact, setContact] = useState('')
    const [civilStatus, setCivilStatus] = useState('')
    const [currentAddress, setCurrentAddress] = useState('')
    const [permanentAddress, setPermanentAddress] = useState('')
    const email = useState(userDetails?.email || null)
    

    //Same in current variable
    const [isSameInCurrentAddPersonal, setIsSameInCurrentAddPersonal] = useState(false)
    const [isSameInCurrentAddFather, setIsSameInCurrentAddFather] = useState(false)
    const [isSameInCurrentAddMother, setIsSameInCurrentAddMother] = useState(false)
    
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
  
    const hasLowerAndUpperCase = (value) => {
      return /[a-z]/.test(value) && /[A-Z]/.test(value)
      
    }
  
    const hasNumberAndSymbols = (value) => {
      return /[0-9]/.test(value) && /[!@#$%^&*()]/.test(value)
    }

    useEffect(() => {
        console.log(currentProfile)
        if (applicantStatus === 'renewal' && currentProfile) {
            // Personal Information
            setFirstname(currentProfile.firstname);
            setMiddlename(currentProfile.middlename);
            setLastname(currentProfile.lastname);
            setBirthdate(currentProfile.birthdate);
            setGender(currentProfile.gender);
            setContact(currentProfile.contact);
            setCivilStatus(currentProfile.civil_status);
            setCurrentAddress(currentProfile.current_address);
            setPermanentAddress(currentProfile.permanent_address);

            // Mother's Information
            setMFirstname(currentProfile.mother_firstname);
            setMMiddlename(currentProfile.mother_middlename);
            setMLastname(currentProfile.mother_lastname);
            setMCurrentAddress(currentProfile.mother_current_address);
            setMPermanentAddress(currentProfile.mother_permanent_address);
            setMContact(currentProfile.mother_contact_number);
            setMVoters(currentProfile.mother_registered_voter === 1); // Convert 0/1 to boolean
            setMLong(parseInt(currentProfile.mother_voting_years, 10)); // Convert to integer

            // Father's Information
            setFFirstname(currentProfile.father_firstname);
            setFMiddlename(currentProfile.father_middlename);
            setFLastname(currentProfile.father_lastname);
            setFCurrentAddress(currentProfile.father_current_address);
            setFPermanentAddress(currentProfile.father_permanent_address);
            setFContact(currentProfile.father_contact_number);
            setFVoters(currentProfile.father_registered_voter === 1); // Convert 0/1 to boolean
            setFLong(parseInt(currentProfile.father_voting_years, 10)); // Convert to integer
        }

    },[])
  
    useEffect(() => {

            console.log(
                firstname,
        middlename,
        lastname,
        birthdate,
        gender,
        civilStatus,
        currentAddress,
        permanentAddress,
        email,
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
            )
    
        if (firstname &&
            middlename &&
            lastname &&
            birthdate &&
            gender &&
            civilStatus &&
            currentAddress &&
            permanentAddress &&
            email &&
            mfirstname !== '' &&
            mmiddlename !== '' &&
            mlastname !== '' &&
            mcurrentAddress &&
            mpermanentAddress &&
            mcontact &&
            ffirstname &&
            fmiddlename &&
            flastname &&
            fcurrentAddress &&
            fpermanentAddress &&
            fcontact &&
            coeFile &&
            brgyIndigencyFile &&
            cogFile &&
            schoolIDFile &&
            parentIDFile
        ) {
            setIsBtnEnabled(false)
        }else{
            setIsBtnEnabled(true)
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

    //For copy current to permanent address
    useEffect(()=> {

        if (applicantStatus !== 'renewal') {
            if (isSameInCurrentAddPersonal) {
                setPermanentAddress(currentAddress)
            }else {
                setPermanentAddress('')
            }
    
            if (isSameInCurrentAddMother) {
                setMPermanentAddress(mcurrentAddress)
            }else {
                setMPermanentAddress('')
            }
    
            if (isSameInCurrentAddFather) {
                setFPermanentAddress(fcurrentAddress)
            }else {
                setFPermanentAddress('')
            }
        }
    
    },[
        isSameInCurrentAddFather,
        isSameInCurrentAddMother,
        isSameInCurrentAddPersonal
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

    const formData = new FormData()

    // Append personal information
    formData.append('user_id', userDetails && userDetails.user_id);
    formData.append('program_id', programID);
    formData.append('email', userDetails && userDetails.email);
    formData.append('firstname', firstname);
    formData.append('middlename', middlename);
    formData.append('lastname', lastname);
    formData.append('birthdate', birthdate);
    formData.append('gender', gender);
    formData.append('civil_status', civilStatus);
    formData.append('current_address', currentAddress);
    formData.append('permanent_address', permanentAddress);
    formData.append('contact', contact);

    // Append mother information
    formData.append('mother_firstname', mfirstname);
    formData.append('mother_middlename', mmiddlename);
    formData.append('mother_lastname', mlastname);
    formData.append('mother_current_address', mcurrentAddress);
    formData.append('mother_permanent_address', mpermanentAddress);
    formData.append('mother_contact_number', mcontact);
    formData.append('mother_registered_voter', mVoters);
    formData.append('mother_voting_years', mLong);

    // Append father information
    formData.append('father_firstname', ffirstname);
    formData.append('father_middlename', fmiddlename);
    formData.append('father_lastname', flastname);
    formData.append('father_current_address', fcurrentAddress);
    formData.append('father_permanent_address', fpermanentAddress);
    formData.append('father_contact_number', fcontact);
    formData.append('father_registered_voter', fVoters);
    formData.append('father_voting_years', fLong);

    // Append files
    if (coeFile) {
        formData.append('coeFile', coeFile);
    }
    if (brgyIndigencyFile) {
        formData.append('brgyIndigencyFile', brgyIndigencyFile);
    }
    if (cogFile) {
        formData.append('cogFile', cogFile);
    }
    if (parentIDFile) {
        formData.append('parentIDFile', parentIDFile);
    }
    if (schoolIDFile) {
        formData.append('schoolIDFile', schoolIDFile);
    }

    formData.append('profile_picture', userDetails.image);
    

    axios.post('http://localhost:5001/profiles/addProfiles', formData)
    .then((res) => {
        const result = res.data
        const message = result.message
        console.log(message)
        setIisShowSubmitted(true)

        let updatedDetails = userDetails

        updatedDetails.apply_status = 'pending'

        localStorage.setItem('user', JSON.stringify(updatedDetails))
    })
    .catch((err) => console.log(err))
  }

  return (
    <div className={style.container}>

        <form onSubmit={handleSubmit}>
            <h1 id={style.title}>{programDetails && programDetails.program_name}</h1>
            <div className={style.card}>
                {
                    isShowSubmitted ? (
                        <div id={style.submittedDiv}>
                            <FaCircleCheck size={100} color='#6EC207'/>
                            <div className='d-flex mt-5 flex-column align-items-center'>
                                <h1>Your scholarship application has been submitted!</h1>
                                <p>Check your email for updates on your qualification status. Good luck!</p>
                                <button className='mt-5 w-50' onClick={() => window.location.href='https://mail.google.com/'}>Check Email</button>
                            </div>
                        </div>
                    ) : (
                        <>
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
                                    <h1 style={{ margin: '0', color: '#6EC207', fontSize: '15pt' }}>{
                                        currentSteps === 1 && 'Personal Information' ||
                                        currentSteps === 2 && 'Family Background' ||
                                        currentSteps === 3 && 'Upload Files'
                                    }</h1>
                                    
                                </div>
                                
                                <FaArrowRight title='Back to Login' cursor={'pointer'} size={20} onClick={() => handleApply(false)}/>
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
                                                <label>Contact Number</label>
                                                <input type="tel" required value={contact} onChange={(e) => setContact(e.target.value)}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-flex w-100'>
                                        <div className='d-flex gap-2 w-100 align-items-center justify-content-center'>
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
                                    <div className='d-flex flex-column w-100'>
                                        <div className='d-flex gap-2 w-100 align-items-center justify-content-center'>
                                            <div className='d-flex gap-2 flex-column align-items-start w-100'>
                                                <label>Permanent Address</label>
                                                <input type="text" placeholder='BARANGAY / CITY / PROVINCE' required value={permanentAddress} onChange={(e) => setPermanentAddress(e.target.value)}/>
                                            </div>
                                        </div>
                                        {
                                            currentAddress !== '' &&
                                            <div className='d-flex gap-2 align-items-start w-100'>
                                                <input id={style.checkbox} type="checkbox" onChange={() => setIsSameInCurrentAddPersonal(!isSameInCurrentAddPersonal)}/>
                                                <p>Same as Current Address</p>
                                            </div> 
                                        }  
                                    </div>
                                    
                                </>
                            }
        
                            {
                                currentSteps === 2 &&
                                <div className={style.body}>
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
                                         
                                        </div>
                                    </div>
                                    <div className='d-flex flex-column w-100'>
                                        <div className='d-flex gap-2 w-100 align-items-center justify-content-center'>
                                            <div className='d-flex gap-2 flex-column align-items-start w-100'>
                                                <label>Permanent Address</label>
                                                <input type="text" placeholder='BARANGAY / CITY / PROVINCE' required value={mpermanentAddress} onChange={(e) => setMPermanentAddress(e.target.value)}/>
                                            </div>
                                        </div>
                                        {
                                            mcurrentAddress !== '' &&
                                            <div className='d-flex gap-2 align-items-start w-100'>
                                                <input id={style.checkbox} type="checkbox" onChange={() => setIsSameInCurrentAddMother(!isSameInCurrentAddMother)}/>
                                                <p>Same as Current Address</p>
                                            </div> 
                                        }  
                                    </div>
        
                                    <div className='d-flex w-100 align-items-center justify-content-between gap-2'>
                                        <div className='d-flex gap-2 flex-column align-items-start w-50'>
                                            <label>Contact Number</label>
                                            <input style={{ margin: '0px' }} type="tel" required value={mcontact} onChange={(e) => setMContact(e.target.value)}/>
                                        </div>
                                        <div className='d-flex flex-column w-50'>
                                            <div className='d-flex align-items-center gap-2'>
                                                <input type="checkbox" style={{ width: '15px', margin: '0px' }} required checked={mVoters} onChange={(e) => {setMVoters(e.target.checked), setMLong(1)}}/>
                                                <p>Are you registered voter of Tabuk City? For how many years?</p>
                                            </div>
                                            <input type="number" maxLength={4} placeholder='How many years?' disabled={mVoters ? false : true} required={mVoters ? false : true} value={mLong} onChange={(e) => setMLong(e.target.value)}/>
                                        </div>
                                    </div>
        
                                    <div className='d-flex w-100 mt-2'>
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
                                         
                                        </div>
                                    </div>
                                    <div className='d-flex flex-column w-100'>
                                        <div className='d-flex gap-2 w-100 align-items-center justify-content-center'>
                                            <div className='d-flex gap-2 flex-column align-items-start w-100'>
                                                <label>Permanent Address</label>
                                                <input type="text" placeholder='BARANGAY / CITY / PROVINCE' required value={fpermanentAddress} onChange={(e) => setFPermanentAddress(e.target.value)}/>
                                            </div>
                                        </div>
                                        {
                                            fcurrentAddress !== '' &&
                                            <div className='d-flex gap-2 align-items-start w-100'>
                                                <input id={style.checkbox} type="checkbox" onChange={() => setIsSameInCurrentAddFather(!isSameInCurrentAddFather)}/>
                                                <p>Same as Current Address</p>
                                            </div> 
                                        }  
                                    </div>
        
                                    <div className='d-flex w-100 align-items-center justify-content-between gap-2'>
                                    <div className='d-flex gap-2 flex-column align-items-start w-50'>
                                            <label>Contact Number</label>
                                            <input style={{ margin: '0px' }} type="tel" required value={fcontact} onChange={(e) => setFContact(e.target.value)}/>
                                        </div>
                                        <div className='d-flex flex-column w-50'>
                                            <div className='d-flex align-items-center gap-2'>
                                                <input type="checkbox" style={{ width: '15px', margin: '0px' }} required checked={fVoters} onChange={(e) => {setFVoters(e.target.checked), setFLong(1)}}/>
                                                <p>Are you registered voter of Tabuk City? For how many years?</p>
                                            </div>
                                            <input type="number" maxLength={4} placeholder='How many years?' disabled={fVoters ? false : true} required={mVoters ? false : true} value={fLong} onChange={(e) => setFLong(e.target.value)}/>
                                        </div>
                                    </div>
                                
                                    
        
                                    
                                    
                                </div>
                            }
        
                                            
                            {
                                currentSteps === 3 &&
                                <>  
                                    <div className='d-flex w-100'>
                                        <p id={style.subtitle}>Makesure the file uploaded is pdf format @sample.pdf</p>
                                    </div>
                                    <div className='d-flex w-100 flex-column gap-2 align-items-center justify-content-between mt-2'>
                                        <div className='d-flex w-100 align-items-center'>
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
                                    <div className='d-flex w-100 gap-5 mt-5 flex-column'>
                                        <p><FaCircleInfo color='#6EC207'/> Please review all the information carefully before submitting, as you will not be able to make any changes once submitted.</p>
                                        <button disabled={isBtnEnabled} type='submit'>Submit application</button>
                                    </div>
                                )
                            }
                        
                        </>
                    )
                }


                
                
            </div>
        </form>
    </div>
  )
}

export default ApplicationForm
