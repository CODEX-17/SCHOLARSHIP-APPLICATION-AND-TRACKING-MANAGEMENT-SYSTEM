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

export const getRequestJoinProfileJoinAccount = async () => {

    try {
        const result = await axios.get(`${BASE_URL}/requests/getRequestJoinProfileJoinAccount`)
        if (result) {
            console.log('Successfully get all request.')
            return result.data
        }
    } catch (error) {
        console.log('Failed get all request:', error)
        return null
    }
    
}

export const addRequest = async (data) => {

    try {
        const result = await axios.post(`${BASE_URL}/requests/addRequest`, data)
        if (result) {
            console.log('Successfully added request.')
            return result.data
        }
    } catch (error) {
        console.log('Failed add request:', error)
        return null
    }
    
}

export const updateRequestStatus = async (data) => {

    try {
        const result = await axios.patch(`${BASE_URL}/requests/updateRequestStatus`, data)
        if (result) {
            console.log('Successfully update request status.')
            return result.data
        }
    } catch (error) {
        console.log('Failed update request status:', error)
        return null
    }
    
}

export const archivedRequest = async (data) => {
    try {
        const result = await axios.patch(`${BASE_URL}/requests/archivedRequest/${data}`)
        if (result) {
            console.log('Successfully archived request.')
            return result.data
        }

    } catch (error) {
        console.log('Failed archive request:', error)
        return null
    }
    
}