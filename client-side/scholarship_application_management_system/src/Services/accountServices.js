import axios from "axios"

const BASE_URL = 'http://localhost:5001'

export const updateAccount = async (formData) => {
    try {
        
        const result = await axios.post(`${BASE_URL}/accounts/updateAccounts`, formData)
        if (result) return result.data

    } catch (error) {
        console.log(error)
        return null
    }
}

export const resetPassword = async (data) => {
    try {
        const { token } = data.token
        const { password } = data.password
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