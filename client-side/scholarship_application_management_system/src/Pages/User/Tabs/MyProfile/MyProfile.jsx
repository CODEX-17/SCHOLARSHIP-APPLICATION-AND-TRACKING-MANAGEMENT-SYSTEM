import React, { useEffect, useState } from 'react'
import style from './MyProfile.module.css'
import UserProfilePicture from '../../../ProfilePicture/UserProfilePicture'
import { useForm } from 'react-hook-form'
import { Tabs } from 'antd';
import { FaLocationDot } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { SiFiles } from "react-icons/si";
import { getProfileByUserID, updateProfile, addProfile } from '../../../../Services/profileServices';
import LoadingComponents from '../../../../Components/LoadingComponents'
import { useNavigate } from 'react-router-dom';


const Profile = () => {
    return (
        <div className={style.tabs}>
            <IoPerson/> 
            Personal Info
        </div>
        
    )
}

const FamilyBackground = () => {
    return (
        <div className={style.tabs}>
            <MdFamilyRestroom/> 
            FamilyBackground
        </div>
        
    )
}

const Files = () => {
    return (
        <div className={style.tabs}>
            <SiFiles/> 
            Files
        </div>
        
    )
}

const MyProfile = () => {

  const userDetails = JSON.parse(localStorage.getItem('user')) || null
  const { TabPane } = Tabs
  const [message, setMessage] = useState('Updating Profile...')
  const [isLoading, setIsLoading] = useState(false)
  const [isProfileComplete, setIsProfileComplete] = useState(false)
  const navigate = useNavigate()

  const [errorFileMessage, setErrorFileMessage] = useState(false)

  const { 
    handleSubmit, 
    reset, 
    setValue, 
    register, 
    watch,
    formState:{errors} 
  } = useForm()

  useEffect(() => {

    const fetchData = async () => {
      const result =  await getProfileByUserID(userDetails?.user_id)
      if (result) {
        setIsProfileComplete(true)
        setValue('firstname', result[0]?.firstname)
        setValue('middlename', result[0]?.middlename)
        setValue('lastname', result[0]?.lastname)
        setValue('birthdate', result[0]?.birthdate.substring(0,10))
        setValue('civil_status', result[0]?.civil_status)
        setValue('gender', result[0]?.gender)
        setValue('age', result[0]?.age)
        setValue('contact', result[0]?.contact)
        setValue('email', result[0]?.email)
        setValue('current_address', result[0]?.current_address)
        setValue('permanent_address', result[0]?.permanent_address)
        setValue('primary_school_name', result[0]?.primary_school_name)
        setValue('primary_school_address', result[0]?.primary_school_address)
        setValue('primary_school_year_attended', result[0]?.primary_school_year_attended)
        setValue('secondary_school_name', result[0]?.secondary_school_name)
        setValue('secondary_school_address', result[0]?.secondary_school_address)
        setValue('secondary_school_year_attended', result[0]?.secondary_school_year_attended)
        setValue('mother_firstname', result[0]?.mother_firstname)
        setValue('mother_middlename', result[0]?.mother_middlename)
        setValue('mother_lastname', result[0]?.mother_lastname)
        setValue('mother_current_address', result[0]?.mother_current_address)
        setValue('mother_permanent_address', result[0]?.mother_permanent_address)
        setValue('mother_contact_number', result[0]?.mother_contact_number)
        setValue('mother_voting_years', result[0]?.mother_voting_years)
        setValue('father_firstname', result[0]?.father_firstname)
        setValue('father_middlename', result[0]?.father_middlename)
        setValue('father_lastname', result[0]?.father_lastname)
        setValue('father_current_address', result[0]?.father_current_address)
        setValue('father_permanent_address', result[0]?.father_permanent_address)
        setValue('father_contact_number', result[0]?.father_contact_number)
        setValue('father_voting_years', result[0]?.father_voting_years)

        if (parseInt(result[0]?.mother_voting_years) > 0) {
          setValue('mother_registered_voter', true)
        }else {
          setValue('mother_registered_voter', result[0]?.mother_registered_voter)
        }

        if (parseInt(result[0]?.father_voting_years) > 0) {
          setValue('father_registered_voter', true)
        }else {
          setValue('father_registered_voter', result[0]?.father_registered_voter)
        }

        setCoe_file(result[0]?.coe_file || null)
        setBrgy_indigency(result[0]?.brgy_indigency || null)
        setCog_file(result[0]?.cog_file || null)
        setSchool_id(result[0]?.school_id || null)
        setParent_id(result[0]?.parent_id || null)
        setCertificate_of_registration_comelec(result[0]?.certificate_of_registration_comelec || null)
        
      }else {
        setIsProfileComplete(false)
        setValue('firstname', userDetails?.firstname)
        setValue('middlename', userDetails?.middlename)
        setValue('lastname', userDetails?.lastname)
        setValue('civil_status', 'Single')
        setValue('gender', 'Male')
        setValue('email', userDetails?.email)
        setValue('father_registered_voter', false)
        setValue('mother_registered_voter', false)
        setValue('father_voting_years', 0)
        setValue('mother_voting_years', 0)
        setValue('profile_picture', userDetails?.profile_pic)
        setValue('program_id', null)
        setValue('age', 15)
      }
    }

    fetchData()
    

  },[])

  const birthdate = watch('birthdate') || ''
  const mother_registered_voter = watch('mother_registered_voter') || false
  const father_registered_voter = watch('father_registered_voter') || false

  //Files
  const [coe_file, setCoe_file] = useState(null)
  const [brgy_indigency, setBrgy_indigency] = useState(null)
  const [cog_file, setCog_file] = useState(null)
  const [school_id, setSchool_id] = useState(null)
  const [parent_id, setParent_id] = useState(null)
  const [certificate_of_registration_comelec, setCertificate_of_registration_comelec] = useState(null)

  const onSubmit = async (data) => {
    console.log('asds')
    console.log(data)
    
    if (
      cog_file && 
      brgy_indigency && 
      school_id && 
      parent_id && 
      certificate_of_registration_comelec
    ) {
      setErrorFileMessage(false)
      setIsLoading(true) 
      let updated = {...data}
      
      updated["user_id"] = userDetails?.user_id
      updated.coe_file = coe_file
      updated.brgy_indigency = brgy_indigency
      updated.cog_file = cog_file
      updated.school_id = school_id
      updated.parent_id = parent_id
      updated.certificate_of_registration_comelec = certificate_of_registration_comelec

      console.log(updated)

      try {
        const result = isProfileComplete ? await updateProfile(updated) : await addProfile(updated)

        if (result) {
          console.log(result.message)
          setMessage(result.message)

          setTimeout(() => {
            setIsLoading(false)

            if (!isProfileComplete) {
              navigate('/dashboard')
            }
          }, 3000)
        }
        
      } catch (error) {
        console.log(error)
      }

   }else {
      setErrorFileMessage(true)
   }

  }

  const handleUploadFile = (e, type) => {
    if (e, type) {
        const file = e.target.files[0]

        if (file.type === 'application/pdf') {
            if (type === 'coe_file') {
              setCoe_file(file)
            }else if (type === 'brgy_indigency') {
              setBrgy_indigency(file)
            }else if (type === 'cog_file') {
              setCog_file(file)
            }else if (type === 'school_id') {
              setSchool_id(file)
            }else if (type === 'parent_id') {
              setParent_id(file)
            }else if (type === 'certificate_of_registration_comelec') {
              setCertificate_of_registration_comelec(file)
            }
           
        }
    }
    
  }

  const handleFileNameDisplay = (data) => {
    if (Array.isArray(data) || data?.name) {
      return data.name.substring(0, 10)
    }
    return data
  }

  return (
    <div className={style.container}>
      {
        isLoading ? 
        <div className='d-flex w-100 align-items-center justify-content-center' style={{ height: '80vh', }}>
          <LoadingComponents message={message}/>
        </div> :
        <>
          <form 
            className='w-100 h-100 p-2 d-flex flex-column align-items-start justify-content-start' 
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='d-flex justify-content-between w-100 mb-2'>
              <div className='d-flex flex-column w-100'>
                <h1 className='fs-2 m-0'>{ isProfileComplete ? 'Manage Profile' : 'Fill Out Form'}</h1>
                <p className='fs-6 m-0'>{ isProfileComplete ? 'Updating your profile information.' : 'Complete your profile information.'}</p>
              </div>
              <button type='submit'>Save</button>
            </div>
                
                <Tabs defaultActiveKey="1" type="card" className='w-100 h-100 overflow-auto'>
                  <TabPane tab={<Profile />} key="1" className='w-100 h-100 overflow-auto'>
                      <div className={style.card}>
                        <div className='row w-100 h-100'>
                          <div className='col-md-6 d-flex flex-column align-items-start mb-3'>
                              <div className='d-flex w-100 justify-content-center mb-4'>
                                <div 
                                  style={{ 
                                    width: 200, 
                                    height: 200, 
                                    borderRadius: 10,
                                  }}
                                >
                                  <UserProfilePicture 
                                    profile_pic={userDetails?.profile_pic} 
                                  />
                                </div>
                              </div>
                              <h3>Information <FaInfoCircle/></h3>
                              <div className='d-flex w-100 flex-column mb-2'>
                                <label>First Name</label>
                                <input 
                                  type="text" 
                                  readOnly 
                                  {...register('firstname', {required: 'First Name is required.'})}
                                />
                                {errors.firstname && <p style={{ color: 'red', fontSize: '.8rem', margin: 0 }}>{errors.firstname?.message}</p>}
                              </div>
                              <div className='d-flex w-100 flex-column mb-2'>
                                <label>Middle Name</label>
                                <input 
                                  type="text" 
                                  readOnly 
                                  {...register('middlename', {required: 'Middle Name is required.'})}
                                />
                                {errors.firstname && <p style={{ color: 'red', fontSize: '.8rem', margin: 0 }}>{errors.firstname?.message}</p>}
                              </div>
                              <div className='d-flex w-100 flex-column mb-2'>
                                <label>Last Name</label>
                                <input 
                                  type="text" 
                                  readOnly 
                                  {...register('lastname', {required: 'Last Name is required.'})}
                                />
                                {errors.firstname && <p style={{ color: 'red', fontSize: '.8rem', margin: 0 }}>{errors.firstname?.message}</p>}
                              </div>
                              <div className='d-flex w-100 flex-column mb-2'>
                                <label>Birth Date</label>
                                <input 
                                  type="date"
                                  value={birthdate}
                                  {...register('birthdate', {required: 'Birth Date is required.'})}
                                />
                                {errors.birthdate && <p style={{ color: 'red', fontSize: '.8rem', margin: 0 }}>{errors.birthdate?.message}</p>}
                              </div>
                              <div className='d-flex w-100 flex-column mb-2'>
                                <label>Civil Status</label>
                                <select
                                  {...register('civil_status', {required: 'Civil Status is required.'})}
                                >
                                  <option value="Single">Single</option>
                                  <option value="Married">Married</option>
                                  <option value="Widowed">Widowed</option>
                                  <option value="Divorced">Divorced</option>
                                  <option value="Separated">Separated</option>
                                </select>
                                {errors.civil_status && <p style={{ color: 'red', fontSize: '.8rem', margin: 0 }}>{errors.civil_status?.message}</p>}
                              </div>
                              <div className='d-flex w-100 flex-column mb-2'>
                                <label>Gender</label>
                                <select
                                  {...register('gender', {required: 'Civil Status is required.'})}
                                >
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                </select>
                                {errors.civil_status && <p style={{ color: 'red', fontSize: '.8rem', margin: 0 }}>{errors.civil_status?.message}</p>}
                              </div>
                              <div className='d-flex w-100 flex-column mb-2'>
                                <label>Age</label>
                                <input 
                                  type="number"
                                  minLength={10}
                                  maxLength={100}
                                  {...register('age', {required: 'Age is required.'})}
                                />
                                {errors.age && <p style={{ color: 'red', fontSize: '.8rem', margin: 0 }}>{errors.age?.message}</p>}
                              </div>

                              <h3>Contact <FaLocationDot/></h3>
                              <div className='w-100 d-flex flex-column mb-3'>
                                <div className='d-flex w-100 flex-column mb-2'>
                                  <label>Email</label>
                                  <input 
                                    type="email"
                                    readOnly
                                    {...register('email', { required: 'Email is required.' })}
                                  />
                                  {errors.email && <p style={{ color: 'red', fontSize: '.8rem', margin: 0 }}>{errors.email?.message}</p>}
                                </div>
                                <div className='d-flex w-100 flex-column mb-2'>
                                  <label>Contact</label>
                                  <input 
                                    type="tel"
                                    {...register('contact', { required: 'Contact is required.' })}
                                  />
                                  {errors.contact && <p style={{ color: 'red', fontSize: '.8rem', margin: 0 }}>{errors.contact?.message}</p>}
                                </div>
                              </div>
                          </div>
                        
                          <div className='col-md-6 d-flex flex-column align-items-start'>

                              <h3>Address <FaLocationDot/></h3>
                              <div className='d-flex w-100 flex-column mb-2'>
                                  <label>Current Address</label>
                                  <input 
                                    type="text"
                                    {...register('current_address', { required: 'Current Address is required.' })}
                                  />
                                  {errors.current_address && <p style={{ color: 'red', fontSize: '.8rem', margin: 0 }}>{errors.current_address?.message}</p>}
                              </div>
                              <div className='d-flex w-100 flex-column mb-4'>
                                  <label>Permanent Address</label>
                                  <input 
                                    type="text"
                                    {...register('permanent_address', { required: 'Permanent Address is required.' })}
                                  />
                                  {errors.permanent_address && <p style={{ color: 'red', fontSize: '.8rem', margin: 0 }}>{errors.permanent_address?.message}</p>}
                              </div>

                              <h3>Educational Background <FaLocationDot/></h3>
                              <h5 className='mt-4'>Primary School</h5>
                              <div className='d-flex w-100 flex-column mb-2 mt-2'>
                                  <label>Primary School Name</label>
                                  <input 
                                    type="text"
                                    {...register('primary_school_name', { required: 'Primary School is required.' })}
                                  />
                                  {errors.primary_school_name && <p style={{ color: 'red', fontSize: '.8rem', margin: 0 }}>{errors.primary_school_name?.message}</p>}
                              </div>
                              <div className='d-flex w-100 flex-column mb-2'>
                                  <label>Primary School Address</label>
                                  <input 
                                    type="text"
                                    {...register('primary_school_address', { required: 'Primary School Address is required.' })}
                                  />
                                  {errors.primary_school_address && <p style={{ color: 'red', fontSize: '.8rem', margin: 0 }}>{errors.primary_school_address?.message}</p>}
                              </div>
                              <div className='d-flex w-100 flex-column mb-2'>
                                  <label>Primary School Year Attended</label>
                                  <input 
                                    type="text"
                                    {...register('primary_school_year_attended', { required: 'Primary School Year Attended is required.' })}
                                  />
                                  {errors.primary_school_year_attended && <p style={{ color: 'red', fontSize: '.8rem', margin: 0 }}>{errors.primary_school_year_attended?.message}</p>}
                              </div>

                              <h5>Secondary School</h5>
                              <div className='d-flex w-100 flex-column mb-2 mt-2'>
                                  <label>Secondary School Name</label>
                                  <input 
                                    type="text"
                                    {...register('secondary_school_name', { required: 'Secondary School Name is required.' })}
                                  />
                                  {errors.secondary_school_name && <p style={{ color: 'red', fontSize: '.8rem', margin: 0 }}>{errors.secondary_school_name?.message}</p>}
                              </div>
                              <div className='d-flex w-100 flex-column mb-2'>
                                  <label>Secondary School Address</label>
                                  <input 
                                    type="text"
                                    {...register('secondary_school_address', { required: 'Secondary School Address is required.' })}
                                  />
                                  {errors.secondary_school_address && <p style={{ color: 'red', fontSize: '.8rem', margin: 0 }}>{errors.secondary_school_address?.message}</p>}
                              </div>
                              <div className='d-flex w-100 flex-column mb-2'>
                                  <label>Secondary School Year Attended</label>
                                  <input 
                                    type="text"
                                    {...register('secondary_school_year_attended', { required: 'Secondary School Year Attended is required.' })}
                                  />
                                  {errors.secondary_school_year_attended && <p style={{ color: 'red', fontSize: '.8rem', margin: 0 }}>{errors.secondary_school_year_attended?.message}</p>}
                              </div>
                              
                              
                              

                          </div>
                        </div>
                      </div>
                  </TabPane>
                  <TabPane tab={<FamilyBackground />} key="2" className='w-100 h-100 overflow-auto'>
                      <div className={style.card} style={{ height: '100%', }}>
                          <h3>Mother's Information</h3>
                          <div className='row'>
                              <div className='col-sm d-flex flex-column'>
                                  <label>Mother's First Name</label>
                                  <input 
                                    type="text" 
                                    {...register('mother_firstname', {required: 'First Name is required.'})}
                                  />
                                  {errors.mother_firstname && <p style={{ color: 'red', fontSize: '.8rem', margin: 0 }}>{errors.mother_firstname?.message}</p>}
                              </div>
                              <div className='col-sm d-flex flex-column'>
                                  <label>Mother's Middle Name</label>
                                  <input 
                                    type="text" 
                                    {...register('mother_middlename', {required: 'Middle Name is required.'})}
                                  />
                                  {errors.mother_middlename && <p style={{ color: 'red', fontSize: '.8rem', margin: 0 }}>{errors.mother_middlename?.message}</p>}
                              </div>
                              <div className='col-sm d-flex flex-column'>
                                  <label>Mother's Last Name</label>
                                  <input 
                                    type="text" 
                                    {...register('mother_lastname', {required: 'Last Name is required.'})}
                                  />
                                  {errors.mother_lastname && <p style={{ color: 'red', fontSize: '.8rem', margin: 0 }}>{errors.mother_lastname?.message}</p>}
                              </div>
                          </div>
                          <div className='col-sm d-flex flex-column'>
                              <label>Current Address</label>
                              <input 
                                type="text" 
                                {...register('mother_current_address', {required: 'Current Address is required.'})}
                              />
                              {errors.mother_current_address && <p style={{ color: 'red', fontSize: '.8rem', margin: 0 }}>{errors.mother_current_address?.message}</p>}
                          </div>
                          <div className='col-sm d-flex flex-column'>
                              <label>Permanent Address</label>
                              <input 
                                type="text" 
                                {...register('mother_permanent_address', {required: 'Permanent Address is required.'})}
                              />
                              {errors.mother_permanent_address && <p style={{ color: 'red', fontSize: '.8rem', margin: 0 }}>{errors.mother_permanent_address?.message}</p>}
                          </div>
                          <div className='row d-flex align-items-end mb-4'>
                            <div className='col-sm d-flex flex-column'>
                                <label>Contact Number</label>
                                <input 
                                  type="tel" 
                                  {...register('mother_contact_number', {required: 'Contact Number is required.'})}
                                />
                                {errors.mother_contact_number && <p style={{ color: 'red', fontSize: '.8rem', margin: 0 }}>{errors.mother_contact_number?.message}</p>}
                            </div>
                            <div className='col-sm d-flex flex-column'>
                                <div className='d-flex gap-2 align-items-center'>
                                  <input 
                                    type="checkbox" 
                                    checked={mother_registered_voter}
                                    style={{ width: '15px', margin: '0px' }}
                                    {...register('mother_registered_voter')}
                                  />
                                  <label style={{ fontSize: '.8rem' }}>Is she a registered voter of Tabuk City? If yes, how many years has she been registered?</label>
                                </div>
                                <input 
                                  type="number"
                                  disabled={!mother_registered_voter}
                                  {...register('mother_voting_years')}
                                />
                                {errors.mother_voting_years && <p style={{ color: 'red', fontSize: '.8rem', margin: 0 }}>{errors.mother_voting_years?.message}</p>}
                            </div>
                          </div>

                          <h3>Father's Information</h3>
                          <div className='row'>
                              <div className='col-sm d-flex flex-column'>
                                  <label>Father's First Name</label>
                                  <input 
                                    type="text" 
                                    {...register('father_firstname', {required: 'First Name is required.'})}
                                  />
                                  {errors.father_firstname && <p style={{ color: 'red', fontSize: '.8rem', margin: 0 }}>{errors.father_firstname?.message}</p>}
                              </div>
                              <div className='col-sm d-flex flex-column'>
                                  <label>Father's Middle Name</label>
                                  <input 
                                    type="text" 
                                    {...register('father_middlename', {required: 'Middle Name is required.'})}
                                  />
                                  {errors.father_middlename && <p style={{ color: 'red', fontSize: '.8rem', margin: 0 }}>{errors.father_middlename?.message}</p>}
                              </div>
                              <div className='col-sm d-flex flex-column'>
                                  <label>Father's Last Name</label>
                                  <input 
                                    type="text" 
                                    {...register('father_lastname', {required: 'Last Name is required.'})}
                                  />
                                  {errors.father_lastname && <p style={{ color: 'red', fontSize: '.8rem', margin: 0 }}>{errors.father_lastname?.message}</p>}
                              </div>
                          </div>
                          <div className='col-sm d-flex flex-column'>
                              <label>Current Address</label>
                              <input 
                                type="text" 
                                {...register('father_current_address', {required: 'Current Address is required.'})}
                              />
                              {errors.father_current_address && <p style={{ color: 'red', fontSize: '.8rem', margin: 0 }}>{errors.father_current_address?.message}</p>}
                          </div>
                          <div className='col-sm d-flex flex-column'>
                              <label>Permanent Address</label>
                              <input 
                                type="text" 
                                {...register('father_permanent_address', {required: 'Permanent Address is required.'})}
                              />
                              {errors.father_permanent_address && <p style={{ color: 'red', fontSize: '.8rem', margin: 0 }}>{errors.father_permanent_address?.message}</p>}
                          </div>
                          <div className='row d-flex align-items-end'>
                            <div className='col-sm d-flex flex-column'>
                                <label>Contact Number</label>
                                <input 
                                  type="tel" 
                                  {...register('father_contact_number', {required: 'Contact Number is required.'})}
                                />
                                {errors.father_contact_number && <p style={{ color: 'red', fontSize: '.8rem', margin: 0 }}>{errors.father_contact_number?.message}</p>}
                            </div>
                            <div className='col-sm d-flex flex-column'>
                                <div className='d-flex gap-2 align-items-center'>
                                  <input 
                                    type="checkbox" 
                                    checked={father_registered_voter}
                                    style={{ width: '15px', margin: '0px' }}
                                    {...register('father_registered_voter')}
                                  />
                                  <label style={{ fontSize: '.8rem' }}>Is he a registered voter of Tabuk City? If yes, how many years has she been registered?</label>
                                </div>
                                <input 
                                  type="number"
                                  disabled={!father_registered_voter}
                                  {...register('father_voting_years')}
                                />
                                {errors.mother_voting_years && <p style={{ color: 'red', fontSize: '.8rem', margin: 0 }}>{errors.mother_voting_years?.message}</p>}
                            </div>
                          </div>
                      
                      </div>
                  </TabPane>
                  <TabPane tab={<Files />} key="3">
                    <div className='w-100 h-100'>  
                        <div className='d-flex w-100'>
                            <p id={style.subtitle}>Makesure the file uploaded is pdf format @sample.pdf</p>
                        </div>
                        <div className='d-flex w-100 flex-column gap-2 align-items-center justify-content-between mt-2'>
                          <div className='row w-100 gap-2'>

                            <div className='col-sm d-flex align-items-center'>
                                <div className={style.cardUpload} style={{ border: coe_file ? '2px solid #6EC207' : 'none' }}>
                                    <p>Certificate of Enrollment</p>
                                    {coe_file && <p style={{ fontSize: '8pt' }}>Filename : {handleFileNameDisplay(coe_file)}...</p>}
                                    <input 
                                      type="file"
                                      accept='.pdf' 
                                      onChange={(e) => handleUploadFile(e, 'coe_file')}
                                    />
                                </div>
                            </div>

                            <div className='col-sm d-flex align-items-center'>
                                <div className={style.cardUpload} style={{ border: brgy_indigency ? '2px solid #6EC207' : 'none' }}>
                                    <p>Baragay Indigency</p>
                                    {brgy_indigency && <p style={{ fontSize: '8pt' }}>Filename : {handleFileNameDisplay(brgy_indigency)}...</p>}
                                    <input 
                                      type="file"
                                      accept='.pdf' 
                                      onChange={(e) => handleUploadFile(e, 'brgy_indigency')}
                                    />
                                </div>
                            </div>

                          </div>

                          <div className='row w-100 gap-2'>

                            <div className='col-sm d-flex align-items-center'>
                                <div className={style.cardUpload} style={{ border: cog_file ? '2px solid #6EC207' : 'none' }}>
                                    <p>Last Sem Certificate of Grades</p>
                                    {cog_file && <p style={{ fontSize: '8pt' }}>Filename : {handleFileNameDisplay(cog_file)}...</p>}
                                    <input 
                                      type="file"
                                      accept='.pdf' 
                                      onChange={(e) => handleUploadFile(e, 'cog_file')}
                                    />
                                </div>
                            </div>

                            <div className='col-sm d-flex align-items-center'>
                                <div className={style.cardUpload} style={{ border: school_id ? '2px solid #6EC207' : 'none' }}>
                                    <p>School ID</p>
                                    {school_id && <p style={{ fontSize: '8pt' }}>Filename : {handleFileNameDisplay(school_id)}...</p>}
                                    <input 
                                      type="file"
                                      accept='.pdf' 
                                      onChange={(e) => handleUploadFile(e, 'school_id')}
                                    />
                                </div>
                            </div>

                          </div>

                          <div className='d-flex w-100 align-items-center p-2'>
                              <div className={style.cardUpload} style={{ border: parent_id ? '2px solid #6EC207' : 'none' }}>
                                  <p>Perent ID</p>
                                  {parent_id && <p style={{ fontSize: '8pt' }}>Filename : {handleFileNameDisplay(parent_id)}...</p>}
                                  <input 
                                      type="file"
                                      accept='.pdf' 
                                      onChange={(e) => handleUploadFile(e, 'parent_id')}
                                    />
                              </div>
                          </div>

                          <div className='d-flex w-100 align-items-center p-2'>
                              <div className={style.cardUpload} style={{ border: certificate_of_registration_comelec ? '2px solid #6EC207' : 'none' }}>
                                  <p>Certificate of Registration from Comelec</p>
                                  {certificate_of_registration_comelec && <p style={{ fontSize: '8pt' }}>Filename : {handleFileNameDisplay(certificate_of_registration_comelec)}...</p>}
                                  <input 
                                      type="file"
                                      accept='.pdf' 
                                      onChange={(e) => handleUploadFile(e, 'certificate_of_registration_comelec')}
                                    />
                              </div>
                          </div>
                          
                          {
                            errorFileMessage && <p style={{ color: 'red', fontSize: '1rem' }}>No files uploaded.</p>
                          }
                            
              
                          
                        </div>
                    </div>
                  </TabPane>
                </Tabs>
        
          </form>
        </>
      }

    </div>
  )
}

export default MyProfile
