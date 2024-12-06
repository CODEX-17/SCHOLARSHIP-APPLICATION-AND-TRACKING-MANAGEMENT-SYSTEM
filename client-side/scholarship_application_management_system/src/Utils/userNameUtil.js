
export const getCurrentUserFullname = () => {
    const userDetails = JSON.parse(localStorage.getItem('user')) || null
    const fullname = `${userDetails.firstname} ${userDetails.lastname}`
    return fullname.toUpperCase()
}