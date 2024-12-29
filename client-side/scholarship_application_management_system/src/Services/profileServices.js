import axios from "axios"

const BASE_URL = 'http://localhost:5001'

export const getProfileByUserID = async (user_id) => {

    try {
        const result = await axios.get(`${BASE_URL}/profiles/getProfileByUserID/${user_id}`,)

        if (result) {
            console.log('Successfully get profile details.')
            return result.data
        }
        
    } catch (error) {
        console.log('Server error:', error)
        return null
    }
}