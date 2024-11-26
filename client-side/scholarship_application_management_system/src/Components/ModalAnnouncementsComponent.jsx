import React, { useEffect, useRef, useState } from 'react'
import style from './ModalAnnouncementsComponent.module.css'
import { useForm } from "react-hook-form";
import { BiExit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { FaImage } from "react-icons/fa6";
import axios from 'axios';
import LoadingComponents from './LoadingComponents';


const ModalAnnouncementsComponent = ({ modalType, selectedData, setSelectedData, setIsShowModal, notificationConfig }) => {
  
    const {
        handleSubmit,
        reset,
        watch,
        register,
        setValue,
        formState: { errors }
    } = useForm({
        defaultValues: {
            anc_title: selectedData?.anc_title,
            anc_content: selectedData?.anc_content,
        }
    })

    const inputImage = useRef(null)
    const [image, setImage] = useState(selectedData?.anc_image || null)
    const url = 'http://localhost:5001'

    const textAreaContent = watch('anc_content', selectedData?.anc_content || '')
    const [isLoading, setIsLoading] = useState(false)
 
  
    const handleImageChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            setValue('anc_image', file)
            setImage(file)
        }
    }

    const getCurrentDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Add 1 because months are 0-indexed
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    }

    const getCurrentTime = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }
    

    const isObject = (variable) => {
        return typeof variable === 'object' && variable !== null;
    }

    const onSubmit = (data) => {
    
        setIsLoading(true)
        const formData = new FormData

        if (modalType === 'edit') {

            formData.append('anc_id', selectedData?.anc_id)
            formData.append('anc_title', data.anc_title)
            formData.append('anc_content', data.anc_content)

            if (image) {
                formData.append('anc_image', image)
            }else {
                formData.append('anc_image', selectedData?.anc_image)
            }

            
            axios.post(`${url}/announcements/updateAnnouncements`, formData)
            .then((res) => {
                const result = res.data
                const message = result.message
                
                setTimeout(() => {
                    notificationConfig(message, true)
                    setIsShowModal(false)
                    setIsLoading(false)
                }, 3000);
                
            })
            .catch(err => console.log(err))

        }else if (modalType === 'add') {

            formData.append('anc_title', data.anc_title)
            formData.append('anc_content', data.anc_content)
            formData.append('date', getCurrentDate())
            formData.append('time', getCurrentTime())

            if (image) formData.append('anc_image', image)

            axios.post(`${url}/announcements/addAnnouncements`, formData)
            .then((res) => {
                const result = res.data
                const message = result.message
                
                setTimeout(() => {
                    notificationConfig(message, true)
                    setIsShowModal(false)
                    setIsLoading(false)
                }, 3000);
                
            })
            .catch(err => console.log(err))
        }
    }

    return (
    <div className={style.container}>
      <div className={style.modal}>
        {
            isLoading ? 
            <div className='d-flex w-100 h-100 align-items-center justify-content-center'>
                <LoadingComponents message={modalType === 'edit' ? 'Updating information...' :  'Adding information...'}/>
            </div> :
            <>
                <div className={style.modalHead}>
                    <h3>
                        { modalType === 'edit' ? 'Edit Announcement' : 'Add Announcement' }
                    </h3>
                    <BiExit size={25} cursor={'pointer'} onClick={() => { reset(), setSelectedData(null), setIsShowModal(false)}}/>
                </div>
                <div className={style.body}>
                    <div className={style.content}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='w-100 d-flex flex-column mb-2'>
                                <label>Title <b>*</b></label>
                                <input 
                                    type="text" 
                                    placeholder='ex. For Scholars'
                                    {...register('anc_title', {required: 'Title is required.'})}
                                />
                                {errors.anc_title && <p>{errors.anc_title.message}</p>}
                            </div>
                            <div className={style.contentBody}>
                                <div className='w-100 d-flex flex-column'>
                                    <label>Content <b>*</b></label>
                                    <textarea 
                                        type="text" 
                                        placeholder='Announcements caption...'
                                        rows="5"
                                        cols="40"
                                        maxLength={255}
                                        {...register('anc_content', {required: 'Content is required.'})}
                                    />
                                    <div className='d-flex align-items-center justify-content-between'>
                                        {errors.anc_content && <p>{errors.anc_content.message}</p>}
                                        <p style={{ textAlign: 'end', color: 'gray' }}>{`${textAreaContent.length} / 255 characters.`}</p>
                                    </div>
                                </div>
                                <div className='d-flex flex-column'>
                                    <div className={style.imageContainer} onClick={() => inputImage.current.click()}>
                                        {
                                            image &&
                                            <AiFillDelete 
                                                title='delete image.' 
                                                size={20} 
                                                style={{ position: 'absolute', top: '10px', right: '10px' }} 
                                                onClick={() => { setImage(null) }}
                                            />
                                        }
                                        
                                        {
                                            image ? 
                                            <>
                                                {
                                                    isObject(image) ? 
                                                        <img src={URL.createObjectURL(image)} alt="image" /> :
                                                        <img src={`http://localhost:5001/${image}`} alt="image" />   
                                                }
                                            </> :
                                            <>
                                                <FaImage size={30}/>
                                                <p>Add Image here</p> 
                                                (image size recommended 500 x 500 pixel).
                                            </>
                                        }
                                        
                                    </div>
                                    <input {...register('anc_image')}  type="file" ref={inputImage} style={{ display: 'none'}} onChange={handleImageChange}/>
                                </div>
                            </div>
                            <button type='submit'>Submit</button>
                        </form>
                    </div>
                </div>
            </>
        }
        
        </div>
    </div>
  )
}

export default ModalAnnouncementsComponent
