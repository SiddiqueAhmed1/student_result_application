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

// random unique id

function generateUniqueId() {
    // Use a counter (you can use a global counter variable for this)
    // For simplicity, we're using a static counter in this example
    let counter = 0;
  
    // Convert the counter to a hexadecimal string
    const counterHex = counter.toString(16).padStart(6, '0');
  
    // Get the current time in microseconds (this is just an example, not a timestamp)
    const timeMicroseconds = performance.now() * 1000;
  
    // Convert the time to a hexadecimal string
    const timeHex = timeMicroseconds.toString(16);
  
    // Combine all parts to form the unique ID
    const uniqueId = timeHex + counterHex;
  
    return uniqueId;
  }

// //   gpa return function FIXME:
// const gpa = (marks) => {
//     if(marks > 0 && marks < 33){
//         return "0";
//     }else if(marks > 32 && marks < 40){
//         return "1"
//     }else if(marks > 40 && marks < 50){
//         return "2"
//     }else if(marks > 50 && marks < 60){
//         return "3"
//     }else if(marks > 60 && marks < 70){
//         return "3.5"
//     }else if(marks > 70 && marks < 80){
//         return "4"
//     }else if(marks > 80 && marks <= 100){
//         return "5"
//     }
// }

// gpa & grade function
const gpaGrade = (marks) => {
   let gpa;
   let grade;
    
    if(marks >= 0 && marks < 33){
        gpa = 0;
        grade = 'F';
    }else if(marks >= 33 && marks < 40){
        gpa = 1;
        grade = 'D';
    }else if(marks >= 40 && marks < 50){
        gpa = 2;
        grade = 'C';
    }else if(marks >= 50 && marks < 60){
        gpa = 3;
        grade = 'B';
    }else if(marks >= 60 && marks < 70){
        gpa = 3.5;
        grade = 'A-';
    }else if(marks >= 70 && marks < 80){
        gpa = 4;
        grade = 'A';
    }else if(marks >= 80 && marks <= 100){
        gpa = 5;
        grade = 'A+';
    }
        return{
            gpa,
            grade,
        }
}

// cgpa find out function

const finalResult = (marks) => {
    let totalGpa = gpaGrade(marks.bangla).gpa +
     gpaGrade(marks.english).gpa +  
     gpaGrade(marks.math).gpa + 
     gpaGrade(marks.religion).gpa + 
     gpaGrade(marks.science).gpa +
     gpaGrade(marks.social_science).gpa ;
    
     let cgpa = totalGpa / 6;
     let result;

if(marks.bangla >= 33 &&
    marks.english >= 33 &&
    marks.math >= 33 &&
    marks.religion >= 33 &&
    marks.science >= 33 &&
    marks.social_science >= 33 
){

    if(cgpa >= 1 && cgpa < 2){
        result = "D";
    }else if(cgpa >= 2 && cgpa < 3){
        result = 'C';
    }else if(cgpa >= 3 && cgpa < 3.5){
        result = 'B';
    }else if(cgpa >= 3.5 && cgpa < 4){
        result = 'A-';
    }else if(cgpa >= 4 && cgpa < 5){
        result = 'A';
    }else if(cgpa >= 5){
        result = 'A+';
    }

    return{
        cgpa : cgpa,
        result : result,
    }

}else{
    return{
        cgpa : cgpa,
        result : "F",
    }
}
    
}