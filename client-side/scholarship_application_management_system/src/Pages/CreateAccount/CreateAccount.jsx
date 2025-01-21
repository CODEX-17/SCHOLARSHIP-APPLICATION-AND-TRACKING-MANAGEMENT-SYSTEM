import React, { useState, useRef, useEffect } from 'react'
import style from './CreateAccount.module.css'
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { FaCircleCheck } from "react-icons/fa6";
import { MdOutlineErrorOutline } from "react-icons/md";
import { FallingLines } from 'react-loader-spinner'
import { useForm } from 'react-hook-form'
import { getAllEmail } from './Services/emailServices';
import { Steps, ConfigProvider } from 'antd';
import { FaFile } from "react-icons/fa";
import { AiOutlineArrowRight, AiOutlineArrowLeft  } from "react-icons/ai";
import { createAccount } from '../../Services/accountServices';

const CreateAccount = () => {

    const { handleSubmit, reset, setValue, watch, register, getValues, formState: { errors } } = useForm()

    const [isBtnDisabled, setIsBtnDisabled] = useState(true)
    const [renderDisplay, setRenderDisplay] = useState('form')
    const [message, setMessage] = useState('')

    const fileInput = useRef(null)
    const imageInput = useRef(null)

    const { Step } = Steps;

    const navigate = useNavigate()
    const [emailList, setEmailList] = useState([])

    const [valid_id, setValid_id] = useState(null)
    const [profile_pic, setProfile_pic]= useState(null)


    useEffect(() => {

        const fetchData = async () => {
            try {
                const result = await getAllEmail()
                if (result) {
                    setEmailList(result)
                }

            } catch (error) {
                console.log('error fetchData', error)
            }
        }

        fetchData()

    },[])


    const firstname = watch('firstname', '')
    const middlename = watch('middlename', '')
    const lastname = watch('lastname', '')
    const contact = watch('contact', '')
    const address = watch('address', '')

    const email = watch('email', '')
    const password = watch('password', '')
    const re_password = watch('re_password', '')

    const [stepOne, setStepOne] = useState('wait') 
    const [stepTwo, setStepTwo] = useState('wait')
    const [stepThree, setStepThree] = useState('wait')
    const [currentStep, setCurrentStep] = useState(1)

    const [errorFileType, setErrorFileType] = useState(false)

    // Validation checks
    const validLengthChar = password.length >= 12;
    const mixChar = /[a-z]/.test(password) && /[A-Z]/.test(password);
    const specialChar = /\d/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    
  
    const handleValidateEmail = (email) => {
      const emailExists = emailList.some((data) => data.email === email);
      return emailExists ? "Email is already taken." : true;
    };
  
    const handleValidIDUpload = (data, type) => {
        console.log(data)
        if (
            data.type === 'application/pdf' &&
            type === 'file'
        ) {
            setValid_id(data)
        }else if ( 
            (data.type === 'image/jpeg' || data.type === 'image/png' || data.type === 'image/JPG') &&
            type === 'image'
        ) {
            console.log(data)
            setProfile_pic(data)
        }else {
            setErrorFileType(true)
            setTimeout(() => {
                setErrorFileType(false)
            }, 3000);
        }
        
        
    }
  
    const handleNavigatePage = (type) => {
      if (type === 'next' && currentStep < 3) {
          setCurrentStep((old) => old + 1 )
      }else if (type === 'prev' && currentStep > 0) {
          setCurrentStep((old) => old - 1 )
      }
    }

  useEffect(() => {

    setStepOne('wait')

    if (
        firstname.length > 0 || 
        middlename.length > 0 || 
        lastname.length > 0 ||
        address.length > 0 ||
        contact.length > 0
    ) {
        setStepOne('process')
    }

    if (
        firstname.length > 0 && 
        middlename.length > 0 && 
        lastname.length > 0 &&
        address.length > 0 &&
        contact.length > 0
    ) {
        setStepOne('finish')
    }

    if (
        email.length > 0 || 
        password.length > 0 || 
        re_password.length > 0
    ) {
        setStepTwo('process')
    }

    //handle errors
    if (
        errors?.contact || 
        errors?.firstname ||
        errors?.middlename ||
        errors?.lastname ||
        errors?.address
    ) {
        setStepOne('error')
    }

    if (
        errors?.email ||
        errors?.password ||
        errors?.re_password
    ) {
        setStepTwo('error')
    }

    if (
        (email.length > 0 && handleValidateEmail(email)) &&
        (password.length > 0 && validLengthChar && mixChar && specialChar) &&
        (re_password.length > 0 && re_password === password)
    ) {
        console.log('yes')
        setStepTwo('finish')
    }

    if (
        profile_pic && valid_id
    ) {
        setStepThree('finish')
    }

    if (
        stepOne === 'finish' && 
        stepTwo === 'finish' && 
        stepThree === 'finish'
    ) {
        setIsBtnDisabled(false)
    }
    
  },[
    firstname, 
    middlename, 
    lastname, 
    contact, 
    address,
    email,
    password,
    re_password,
    profile_pic,
    valid_id,
    isBtnDisabled,
    stepOne,
    stepTwo,
    stepThree,
    currentStep,
])


    const finalSubmit = async () => {
        const data = getValues()
        const formData = new FormData()
        formData.append('firstname', data.firstname)
        formData.append('middlename', data.middlename)
        formData.append('lastname', data.lastname)
        formData.append('contact', data.contact)
        formData.append('email', data.email)
        formData.append('address', data.address)
        formData.append('password', password)
        formData.append('valid_id', valid_id)
        formData.append('profile_pic', profile_pic)


        try {
           const result = await createAccount(formData)
           if (result) {
            setMessage(result.message)
            setRenderDisplay('loading')
            setTimeout(() => {
                setRenderDisplay('success')
            }, 3000);
           }

        } catch (error) {
            console.log(error)
        }

        

    }

  return (
    <div className={style.container}>
        <div className={style.card}>
            {
                renderDisplay === 'loading' && (
                    <div className={style.loadingDiv}>
                       <FallingLines
                            color="#6EC207"
                            width="200"
                            visible={true}
                            ariaLabel="falling-circles-loading"
                        />
                        <h1>Creating your account, please wait...</h1>
                    </div>
                ) ||

                renderDisplay === 'success' && (
                    <div className={style.successDiv}>
                        <FaCircleCheck size={150} color='#6EC207'/>
                        <div className='d-flex flex-column align-items-center justify-content-center'>
                            <h1>Successfully created account.</h1>
                            <p>Check your email of your approval of your account.</p>
                        </div>
                        <button className='mt-5 w-50' onClick={() => window.location.href='https://mail.google.com/'}>Check Email</button>
                    </div>
                ) ||

                renderDisplay === 'form' && (
                    <div className={style.content}>
                         
                         <form onSubmit={handleSubmit(finalSubmit)}>
                            <div className='d-flex w-100 mt-2 align-items-center justify-content-between mb-5'>
                                <h1 id={style.subtitle} style={{ color: '#6EC207' }}>Create Account</h1>
                                <FaArrowRight cursor={'pointer'} title='back to login' onClick={() => navigate('/')}/>
                            
                            </div>
                            <div className='d-flex w-100 mb-4'>
                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorPrimary: '#6EC207',
                                        fontFamily: 'normal',
                                        fontSize: 11,
                                    },
                                }}
                                
                                >
                                <Steps current={currentStep}>
                                    <Step title="Step 1" description="Pesonal Info" status={stepOne} style={{ cursor: 'pointer' }} onClick={() => setCurrentStep(1)}/>
                                    <Step title="Step 2" description="Account Info" status={stepTwo} style={{ cursor: 'pointer' }}  onClick={() => setCurrentStep(2)}/>
                                    <Step title="Step 3" description="Upload File" status={stepThree} style={{ cursor: 'pointer' }}  onClick={() => setCurrentStep(3)}/>
                                </Steps>
                            </ConfigProvider>
                            </div>
                            <div className='d-flex flex-column w-100 gap-5'>
                                <div className='d-flex flex-column gap-2 w-100 align-items-center justify-content-center'>
                                   
                                        <div   
                                            className='w-100 gap-2 mb-2 align-items-center justify-content-center'  
                                            style={{ display: currentStep === 1 ? 'flex' : 'none'}}
                                        >
                                            <div className='d-flex flex-column w-100 gap-2 mb-2'>
                                                <div className='d-flex gap-2 flex-column align-items-start w-100'>
                                                    <label>First Name <b>*</b></label>
                                                    <input 
                                                        type="text"  
                                                        placeholder='Juan' 
                                                        {...register('firstname', { required: 'First Name is required.' })}
                                                    />
                                                    {
                                                        errors.firstname && 
                                                        <p id={style.errorMessage}>
                                                            <MdOutlineErrorOutline/>
                                                            {errors.firstname.message}
                                                        </p>
                                                    }
                                                    
                                                </div>
                                                <div className='d-flex gap-2 flex-column align-items-start w-100'>
                                                    <label>Middle Name <b>*</b></label>
                                                    <input 
                                                        type="text"  
                                                        placeholder='Reyes' 
                                                        {...register('middlename', { required: 'Middle Name is required.' })}
                                                    />
                                                    {
                                                        errors.middlename && 
                                                        <p id={style.errorMessage}>
                                                            <MdOutlineErrorOutline/>
                                                            {errors.middlename.message}
                                                        </p>
                                                    }
                                                    
                                                </div>
                                                <div className='d-flex gap-2 flex-column align-items-start w-100'>
                                                    <label>Last Name <b>*</b></label>
                                                    <input 
                                                        type="text"  
                                                        placeholder='Dela Cruz' 
                                                        {...register('lastname', { required: 'Last Name is required.' })}
                                                    />
                                                    {
                                                        errors.lastname && 
                                                        <p id={style.errorMessage}>
                                                            <MdOutlineErrorOutline/>
                                                            {errors.lastname.message}
                                                        </p>
                                                    }
                                                </div>
                                                <div className='d-flex gap-2 flex-column align-items-start w-100'>
                                                    <label>Complete Address <b>*</b></label>
                                                    <input 
                                                        type="text"  
                                                        placeholder='Street / Barangay / Municipality or City / Province' 
                                                        {...register('address', { required: 'Address is required.' })}
                                                    />
                                                    {
                                                        errors.address && 
                                                        <p id={style.errorMessage}>
                                                            <MdOutlineErrorOutline/>
                                                            {errors.address.message}
                                                        </p>
                                                    }
                                                </div>
                                                <div className='d-flex gap-2 flex-column align-items-start w-100'>
                                                    <label>Contact Number <b>*</b></label>
                                                    <input 
                                                        type="text"  
                                                        placeholder='ex. 09********' 
                                                        {...register('contact', { required: 'Contact number is required.' })}
                                                    />
                                                    {
                                                        errors.contact && 
                                                        <p id={style.errorMessage}>
                                                            <MdOutlineErrorOutline/>
                                                            {errors.contact.message}
                                                        </p>
                                                    }
                                                </div>
                                                
                                            </div>
                                        </div> 

                                        <div 
                                            className='w-100 flex-column gap-2 mb-2 align-items-center justify-content-center'
                                            style={{ display: currentStep === 2 ? 'flex' : 'none'}}
                                        >
                                            <div className='d-flex gap-2 flex-column align-items-start w-100 mb-2'>
                                                <label>Email <b>*</b></label>
                                                <input
                                                    type="email"
                                                    placeholder="sample@email.com"
                                                    {...register("email", {
                                                        required: "Email is required.",
                                                        validate: handleValidateEmail
                                                    })}
                                                />
                                                {
                                                    errors.email && 
                                                    <p id={style.errorMessage}>
                                                        <MdOutlineErrorOutline/>
                                                        {errors.email.message}
                                                    </p>
                                                }
                                            </div>
                                            <div className='d-flex gap-2 flex-column align-items-start w-100'>
                                                <label>Password <b>*</b></label>
                                                <input 
                                                    type="text"
                                                    {...register('password', { 
                                                        required: 'Password is required.',
                                                        validate: (value) => 
                                                            validLengthChar && mixChar && specialChar || 
                                                            'Password must meet all criteria.'
                                                    })}
                                                />
                                                {
                                                    errors.password && 
                                                    <p id={style.errorMessage}>
                                                        <MdOutlineErrorOutline/>
                                                        {errors.password.message}
                                                    </p>
                                                }
                                            </div>

                                            <div className='d-flex flex-column w-100'>
                                                <p>
                                                    <FaCircleCheck color={validLengthChar ? '#6EC207' : 'gray'} /> 
                                                    at least 12 characters long.
                                                </p>
                                                <p>
                                                    <FaCircleCheck color={mixChar ? '#6EC207' : 'gray'} /> 
                                                    contains a mix of uppercase and lowercase letters.
                                                </p>
                                                <p>
                                                    <FaCircleCheck color={specialChar ? '#6EC207' : 'gray'} /> 
                                                    includes numbers and special characters.
                                                </p>
                                            </div>

                                            <div className='d-flex gap-2 flex-column align-items-start w-100 mt-2'>
                                                <label>Re-enter Password</label>
                                                <input 
                                                    type="text" 
                                                    {...register('re_password', { 
                                                        required: 'Re-enter the password.',
                                                        validate: (value) => 
                                                            password !== value && 
                                                            "Password must doesn't match."
                                                    })}
                                                />
                                                {
                                                    errors.re_password && 
                                                    <p id={style.errorMessage}>
                                                        <MdOutlineErrorOutline/>
                                                        {errors.re_password.message}
                                                    </p>
                                                }
                                            </div>
                                        </div>

                                        <div 
                                            className='w-100 flex-column gap-2 mb-2 align-items-center justify-content-center'
                                            style={{ display: currentStep === 3 ? 'flex' : 'none'}}
                                        >
                                            <div className='d-flex flex-column w-100 align-items-center mb-2'>
                                                <div className='d-flex flex-column p-2'>
                                                    <h2>Profile Picture</h2>
                                                    {
                                                        profile_pic ? 
                                                        <>
                                                            <img 
                                                                id={style.profile_pic} 
                                                                src={URL.createObjectURL(profile_pic)} 
                                                                alt="profile"
                                                                onClick={() => imageInput.current.click()}
                                                            /> 
                                                            <input 
                                                                type="file" 
                                                                accept='image/*'
                                                                ref={imageInput} 
                                                                style={{ display: 'none' }} 
                                                                onChange={(e) => handleValidIDUpload(e.target.files[0], 'image')}
                                                            />
                                                         </>
                                                        :
                                                        <div className={style.imgDiv} onClick={() => imageInput.current.click()}>
                                                            <div className='d-flex flex-column align-items-center justify-content-center'>
                                                                <p>Upload image here.</p>
                                                            </div>
                                                            <input 
                                                                type="file" 
                                                                ref={imageInput} 
                                                                accept='image/*'
                                                                style={{ display: 'none' }} 
                                                                onChange={(e) => handleValidIDUpload(e.target.files[0], 'image')}
                                                            />
                                                        </div>

                                                    }
                                
                                                </div>
                                                <div className='d-flex w-100 flex-column p-2'>
                                                    <h2>Valid ID</h2>
                                                    <p>PDF file format.</p>
                                                    {
                                                        valid_id ? 
                                                        <div className={style.fileCard}>
                                                            <FaFile/>
                                                            <p>{valid_id.name}</p>
                                                        </div> :
                                                        <div className={style.fileDiv} onClick={() => fileInput.current.click()}>
                                                            <div className='d-flex flex-column align-items-center justify-content-center'>
                                                                <h3><FaFile/>Upload Valid ID here.</h3>
                                                                <p>Only PDF file are accepted.</p>
                                                            </div>
                                                            <input 
                                                                type="file" 
                                                                ref={fileInput} 
                                                                accept='application/pdf'
                                                                style={{ display: 'none' }} 
                                                                onChange={(e) => handleValidIDUpload(e.target.files[0], 'file')}
                                                            />
                                                        </div>

                                                    }
                                      
                    
                                                </div>
                                            </div>

                                            {errorFileType && <p id={style.errorMessage}>Invalid File Type</p>}

                                            <div className='d-flex gap-2 flex-column align-items-start w-100 mt-2'>
                                                <button type='submit' disabled={isBtnDisabled} onClick={() =>finalSubmit()}>Create Account</button>
                                            </div>
                                        </div>
                                 

                                    <div className='d-flex align-items-center justify-content-center gap-2 w-100 mt-4'>
                                        <div 
                                            className={style.navigateButton} 
                                            style={{ display: currentStep === 1 ? 'none' : 'flex'}}
                                            onClick={() => handleNavigatePage('prev')}
                                            title='Prev Step'
                                        >
                                            <AiOutlineArrowLeft/>
                                        </div>
                                        <div 
                                            className={style.navigateButton}
                                            style={{ display: currentStep === 3 ? 'none' : 'flex'}}
                                            onClick={() => handleNavigatePage('next')}
                                            title='Next Step'
                                        >
                                            <AiOutlineArrowRight />
                                        </div>
                                    </div>


                                    
                                </div>
                            
                                
                            </div>  
                        </form>
                    </div>
                )


            }

        </div>
    </div>
  )
}

export default CreateAccount