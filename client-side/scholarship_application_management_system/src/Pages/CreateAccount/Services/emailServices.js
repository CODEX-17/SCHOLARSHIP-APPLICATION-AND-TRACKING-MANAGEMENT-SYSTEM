import axios from "axios"

const BASE_URL = "http://localhost:5001"

export const getAllEmail = async () => {
    try {
        const result = await axios.get(`${BASE_URL}/accounts/getAllEmails`)
        if (result) {
            console.log('Successfully get all emails.')
            return result.data
        }

        console.log('No email fetch.')
        return null

    } catch (error) {
        console.log('error service', error)
        return null
    }
}