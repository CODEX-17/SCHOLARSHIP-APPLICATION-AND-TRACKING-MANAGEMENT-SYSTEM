

export const convertDateFormatIntoString = (date) => {

    if (date) {
      let [ year, month, day ] = date.split('-')
      month = 
        month === '1' && 'Jan' || 
        month === '2' && 'Feb' || 
        month === '3' && 'Mar' ||
        month === '4' && 'Apr' || 
        month === '5' && 'May' || 
        month === '6' && 'Jun' ||
        month === '7' && 'Jul' || 
        month === '8' && 'Aug' || 
        month === '9' && 'Sep' ||
        month === '10' && 'Oct' || 
        month === '11' && 'Nov' || 
        month === '12' && 'Dec' 

      return `${month}. ${day}, ${year}`
    }

    return null
}

export const convertTimeTo12HourFormat = (time) => {
    if (time) {
      const [hours, minutes] = time.split(':').map(Number);
      const period = hours >= 12 ? 'PM' : 'AM';
      const twelveHour = hours % 12 || 12;
      return `${twelveHour}:${minutes.toString().padStart(2, '0')} ${period}`;
    }
    return null
}

export const getCurrentDateString = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0') // Add leading zero
    const day = String(today.getDate()).padStart(2, '0') // Add leading zero
    return `${year}-${month}-${day}`
}

export const getCurrentTimeString = () => {
    const now = new Date()
    const hours = now.getHours().toString().padStart(2, '0') // Ensure 2 digits
    const minutes = now.getMinutes().toString().padStart(2, '0') // Ensure 2 digits
    return `${hours}:${minutes}`
}