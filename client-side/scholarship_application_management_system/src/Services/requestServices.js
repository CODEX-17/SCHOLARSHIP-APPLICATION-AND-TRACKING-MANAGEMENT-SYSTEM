import axios from "axios"

const BASE_URL = 'http://localhost:5001'

export const getAllRequest = async () => {

    try {
        const result = await axios.get(`${BASE_URL}/requests/getAllRequest`)
        if (result) {
            console.log('Successfully get all request.')
            return result.data
        }
    } catch (error) {
        console.log('Failed get all request:', error)
        return null
    }
    
}