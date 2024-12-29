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