const getDayGreeting = () => {
    const date = new Date()
    const hours = date.getHours()
    if (hours >= 5 && hours < 12) {
        return 'Morning'
    } else if (hours >= 12 && hours < 18) {
        return 'Afternoon'
    } else if (hours >= 17 && hours < 21) {
        return 'Evening'
    } else {
        return 'Night'
    }
}

export default getDayGreeting