import axios from "axios"

const BASE_URL = 'http://localhost:5001'

export const sendPasswordLink = async (email) => {
    try {
        const result = await axios.post(`${BASE_URL}/accounts/forgotPassword`, {email})
        return result.data

    } catch (error) {
        console.log(error)
        return null
    }
    
}

export const resetPassword = async (data) => {
    try {

        console.log(data)

        const { token } = data
        const { password } = data
        const result = await axios.post(`${BASE_URL}/accounts/reset-password/${token}`, { password })

        if (result) {
            console.log(result.data)
            return result.data
        }

    } catch (error) {
        console.log(error)
        return null
    }
}