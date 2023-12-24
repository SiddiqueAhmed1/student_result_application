// Send data to LS
const sendDataLS = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
}

// get data from LS
const getDataLS = (key) => {
    if(localStorage.getItem(key)){
       return JSON.parse(localStorage.getItem(key))
    }
    return [];
}

// create alert
const creatAlert = (msg, type = 'danger',) => {
    return `<p class="alert alert-${type} d-flex justify-content-between text-primary">${msg}
    <button   class="btn-close" data-bs-dismiss="alert"></button>
    </p>`
}    

// Roll number checking
 const isRoll = (roll) => {
    const pattern = /^[0-9]{6}$/; 
    return pattern.test(roll);
 }

// time ago funciton

const timeAgo = (timeStamp) => { 
    const now = Date.now();
    const miliseconds = now - new Date(timeStamp);
    const seconds = Math.floor(miliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const month = Math.floor(days / 30);

    if(seconds < 60){
        return seconds + ' second' + (seconds === 0 && 1 ? "" : "s") + " ago";
    }else if(minutes < 60){
        return minutes + ' minute' + (minutes === 1 ? "" : "s") + " ago"; 
    }else if(hours < 24){
        return hours + ' hour' + (hours === 1 ? "" : "s") + " ago"; 
    }else if(days < 30){
        return days + " day" + (days === 1 ? "" : "s") + " ago";
    }else{  
        return month + " month" + (month === 1 ? "" : "") + " ago";
    }

}