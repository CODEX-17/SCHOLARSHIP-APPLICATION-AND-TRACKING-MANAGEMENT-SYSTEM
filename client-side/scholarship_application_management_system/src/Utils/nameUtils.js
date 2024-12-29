

export const getFullname = () => {
    if (localStorage.getItem('user')) {
        const userDetails = JSON.parse(localStorage.getItem('user'))
        return userDetails.firstname.toUpperCase() + " " + userDetails.middlename.substring(0,1).toUpperCase() + ". " + userDetails.lastname.toUpperCase()
    }
}