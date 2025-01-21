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

export const createAccount = async (formData) => {
    try {
        const result = await axios.post(`${BASE_URL}/accounts/createAccount`, formData)
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

export const getAccountByUserID = async (user_id) => {
    try {
        const result = await axios.get(`${BASE_URL}/accounts/getAccountByUserID/${user_id}`)

        if (result) {
            console.log('Successfully get account info.')
            return result.data
        }

    } catch (error) {
        console.log(error)
        return null
    }
}

export const getAccounts = async () => {
    try {
        const result = await axios.get(`${BASE_URL}/accounts/getAccounts`)

        if (result) {
            console.log('Successfully get all accounts.')
            return result.data
        }

    } catch (error) {
        console.log(error)
        return null
    }
}

export const updateAccountStatus = async (user_id, account_status, request_id) => {
    try {
        
        const result = await axios.post(`${BASE_URL}/accounts/updateAccountStatus`, { user_id, account_status, request_id })

        if (result) {
            console.log('Successfully update account status.')
            return result.data
        }

    } catch (error) {
        console.log(error)
        return null
    }
}

export const getUpdatedAccountByUserID = async (user_id) => {
    try {
        
        const result = await axios.get(`${BASE_URL}/accounts/getUpdatedAccountByUserID/${user_id}`)

        if (result) {
            console.log('Successfully get account info.')
            return result.data
        }

    } catch (error) {
        console.log(error)
        return null
    }
}