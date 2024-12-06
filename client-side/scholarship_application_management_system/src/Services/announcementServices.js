import axios from "axios"

const BASE_URL = 'http://localhost:5001'

export const getAnnouncements = async () => {
    try {

        const result = await axios.get(`${BASE_URL}/announcements/getAnnouncements`)

        if (result) return result.data
        console.log('Successfully get announcements.')

    } catch (error) {
        console.log(error)
        return null
    }
}

export const deleteAnnouncements = async (anc_id) => {
    try {

        const result = await axios.post(`${BASE_URL}/announcements/deleteAnnouncements`, { anc_id })

        if (result) return result.data
        console.log('Successfully delete announcements.')

    } catch (error) {
        console.log(error)
        return null
    }
}