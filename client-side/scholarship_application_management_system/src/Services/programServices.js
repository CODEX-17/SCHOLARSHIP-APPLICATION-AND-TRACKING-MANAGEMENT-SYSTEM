import { message } from "antd"
import axios from "axios"

const BASE_URL = 'http://localhost:5001'

export const addPrograms = async (data) => {

    console.log('service', data)

    try {
        const result = await axios.post(`${BASE_URL}/programs/addPrograms`, data)
        
        if (result) {
            console.log('Successfull added program.')
            return result.data
        }
    } catch (error) {
        console.log('Server error:', error)
        return null
    }
    
}

export const getPrograms = async () => {

    try {
        const result = await axios.get(`${BASE_URL}/programs/getPrograms`)
        
        if (result) {
            console.log('Successfull get all program.')
            return result.data
        }
    } catch (error) {
        console.log('Server error:', error)
        return null
    }
    
}

export const editProgram = async (data) => {

    try {
        const result = await axios.put(`${BASE_URL}/programs/updatePrograms`, data)
        console.log('ok', result)
        if (result) {
            console.log('Successfull update program.')
            return {message: 'Successfull update program.'}
        }
    } catch (error) {
        console.log('Server error:', error)
        return null
    }
    
}