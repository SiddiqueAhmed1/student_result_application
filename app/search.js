const search_student_result = document.getElementById('search_student_result');
const student_result = document.querySelector('.student_result');
const loading_image = document.querySelector('.loading-image');
const find_result_msg = document.querySelector('.find_result_msg');

// search result form submit
search_student_result.onsubmit = (e) => {
    e.preventDefault();
    
    const form_data = new FormData(e.target);
    const data = Object.fromEntries(form_data.entries());
    
    // roll and reg validation
    if(!data.roll || !data.reg){
        find_result_msg.innerHTML = creatAlert('All fields are required');
    }else if(!isRoll(data.roll)){
        find_result_msg.innerHTML = creatAlert('Invalid roll number');
    }else if(!isRoll(data.reg)){
        find_result_msg.innerHTML = creatAlert('Invalid reg number');
    }else{
    
    let getOldData = getDataLS('students');

    const students = getOldData.find((item) => item.roll === data.roll && item.reg === data.reg)
    
    let content;

    loading_image.style.display = 'block';

    
    setTimeout(() => {
        if(students){
            loading_image.style.display = 'none';
            content = `
            <div class="card shadow ">
                <div class="card-body">
                    <div class="card-header d-flex justify-content-around align-items-center   ">
                    <div class="student-info">
                    <h4 >${students.name}</h4>
                    <span>Roll : ${students.roll} , Reg : ${students.reg}</span><br>
                    ${finalResult({
                        bangla : students.results.bangla,
                        english : students.results.english,
                        math : students.results.math,
                        religion : students.results.religion,
                        science : students.results.science,
                        social_science : students.results.social_science,
                    }).result === "F"  ? "<h2 style='color:red;'>Failed</h2>" : "<h2 style='color:green;'>Passed</h2>"}
                    </div>
                    <img style="width: 100px; height: 100px; border-radius:50%; object-fit:cover;border:2px solid green" src="${students.photo}" alt="">
                    </div>
                              <table class="table table-bordered text-center ">
                                <tr>
                                    <td>#</td>
                                    <td>Subject</td>
                                    <td>Marks</td>
                                    <td>GPA</td>
                                    <td>GRADE</td>
                                    <td>CGPA</td>
                                    <td>Final Result</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Bangla</td>
                                    <td>${students.results.bangla}</td>
                                    <td>${gpaGrade(students.results.bangla).gpa}</td>
                                    <td>${gpaGrade(students.results.bangla).grade}</td>
                                    <td style="width: 150px;" class="text-center align-middle " rowspan="6">
                                        ${finalResult({
                                            bangla : students.results.bangla,
                                            english : students.results.english,
                                            math : students.results.math,
                                            religion : students.results.religion,
                                            science : students.results.science,
                                            social_science : students.results.social_science,
                                        }).cgpa.toFixed(2)}
                                    </td>
                                    <td rowspan="6" class="text-center align-middle " >
                                    ${finalResult({
                                        bangla : students.results.bangla,
                                        english : students.results.english,
                                        math : students.results.math,
                                        religion : students.results.religion,
                                        science : students.results.science,
                                        social_science : students.results.social_science,
                                    }).result}
                                    </td>
                                </tr>
                                <tr>
                                <td>2</td>
                                <td>English</td>
                                <td>${students.results.english}</td>
                                    <td>${gpaGrade(students.results.english).gpa}</td>
                                    <td>${gpaGrade(students.results.english).grade}</td>
                                    
                                </tr>
                                <tr>
                                <td>3</td>
                                <td>Math</td>
                                <td>${students.results.math}</td>
                                    <td>${gpaGrade(students.results.math).gpa}</td>
                                    <td>${gpaGrade(students.results.math).grade}</td>
                                    
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Religion</td>
                                    <td>${students.results.religion}</td>
                                    <td>${gpaGrade(students.results.religion).gpa}</td>
                                    <td>${gpaGrade(students.results.religion).grade}</td>
                                    
                                </tr>
                                <tr>
                                <td>5</td>
                                <td>Science</td>
                                <td>${students.results.science}</td>
                                    <td>${gpaGrade(students.results.science).gpa}</td>
                                    <td>${gpaGrade(students.results.science).grade}</td>
                                    
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>S Science</td>
                                    <td>${students.results.social_science}</td>
                                    <td>${gpaGrade(students.results.social_science).gpa}</td>
                                    <td>${gpaGrade(students.results.social_science).grade}</td>
                                    
                                </tr>
                              </table>
    </div>
    </div>
    </div>
    </div>
    </div>        
            `
        }else{
            loading_image.style.display = 'none';
            content = `
            <div class="card shadow text-center py-2 ">
            <h3>Results not found</h3>
            </div>
            `
            
        }
        e.target.reset();
        student_result.innerHTML = content;
    }, 1500);
}

    student_result.innerHTML = '';

}
