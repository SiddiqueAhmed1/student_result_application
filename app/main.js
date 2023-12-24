const student_data = document.getElementById('student_data');
const msg = document.querySelector('.msg');
const single_student_data = document.querySelector('.single_student_data');
const single_student = document.querySelector('.single_student');

const studentQuickView = (roll) => {
    const oldStudents = getDataLS('students');
    const singleData = oldStudents.find((data, index) => data.roll === roll);
    
    if(roll % 2 === 0){
        single_student.innerHTML = `
    <img style="width: 200px;height: 200px;border-radius:10px; object-fit:cover;" src="${singleData.photo}" alt="">
    <div class="info mt-3 ">
     <h3>${singleData.name}</h3>
     <span>Roll: ${singleData.roll}</span>
     <p>Reg: ${singleData.reg}</p>
     <p style="color:green;font-weight:bold;">Student of Intermediate level.</p>
 </div>
    `
    }else{
        single_student.innerHTML = `
    <img style="width: 200px;height: 200px;border-radius:10px; object-fit:cover;" src="${singleData.photo}" alt="">
    <div class="info mt-3   ">
     <h3>${singleData.name}</h3>
     <span>Roll: ${singleData.roll}</span>
     <p>Reg: ${singleData.reg}</p>
     <p style="color:blue;font-weight:bold;">Student of Beginner level.</p>
 </div>
    `
    }
    
}

// Show students data
const showStudents = () => {
    const students = getDataLS('students');
    let content = '';
    if(students.length > 0){
        students.map((item, index) => {
            content += `
            <tr class="align-middle">
                        <td>${index + 1}</td>
                          <td><img style="width: 50px;height: 50px;object-fit: cover; border-radius: 50%;" src="${item.photo}" alt=""></td>
                                                     <td>${item.name}</td>
                                                     <td>${item.roll}</td>
                                                     <td>${item.reg}</td>
                                                     <td>${timeAgo(item.createTime)}</td>
                                                     <td><button class="btn btn-sm btn-primary">Add result</button></td>
                                                     <td>
                                                     <button onclick="studentQuickView('${item.roll}')" data-bs-toggle="modal" data-bs-target="#single_student_edit" class="btn btn-sm btn-warning" ><i class="fa fa-eye"></i></button>
                                                     <button  class="btn btn-sm btn-info" ><i class="fa fa-edit"></i></button>
                                                         <button  class="btn btn-sm btn-danger" onclick="deleteStudents('${item.roll}')"><i class="fa fa-trash text-white"></i></button>
                                                     </td>
                                                 </tr>`
         })
    }else{
        content = `<tr>
            <td colspan="8" class="text-center ">No data found</td>
        </tr>`
    }
    

    single_student_data.innerHTML = content;
}
showStudents();

student_data.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if(!data.name || !data.roll || !data.reg){
        msg.innerHTML = creatAlert('All fields are required');
    }else if(!isRoll(data.roll)){
        msg.innerHTML = creatAlert('Invalid roll number');
    }else if(!isRoll(data.reg)){
        msg.innerHTML = creatAlert('Invalid reg number');
    }else{
       
            const prevStudents = getDataLS('students');
        prevStudents.push({
            ...data,
            createTime : Date.now(),
            results: null,
        });
        sendDataLS('students', prevStudents);
        e.target.reset();
        showStudents();
        location.reload();
    }
    }


//  students delete 
function deleteStudents(roll){

    const conf = confirm(" Are you sure?");

    if(conf){
        const oldStudents = getDataLS('students');
        const updateStudents = oldStudents.filter((data => data.roll !== roll))
        sendDataLS('students', updateStudents);
        showStudents(); 
    }else{
        alert('Your data is safe')
    }
}   
