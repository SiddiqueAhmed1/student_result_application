const student_data = document.getElementById('student_data');
const roll = document.querySelector('input[name="roll"]');
const msg = document.querySelector('.msg');
const single_student_data = document.querySelector('.single_student_data');
const single_student = document.querySelector('.single_student');
const editForm = document.getElementById('edit_student_data');
const add_result_form = document.getElementById('add_result_form');
const add_result_msg = document.querySelector('.add_result_msg');
const edit_result_form = document.getElementById('edit_result_form');

// Show students data
const showStudents = () => {
    const students = getDataLS('students');
    let content = '';
    if(students.length > 0){
        students.map((item, index) => {
            content += `
            <tr class="align-middle">
                        <td>${index + 1}.</td>
                          <td><img style="width: 40px;height: 40px;object-fit: cover; border-radius: 50%;" src="${item.photo}" alt=""></td>
                                                     <td>${item.name}</td>
                                                     <td>${item.roll}</td>
                                                     <td>${item.reg}</td>
                                                     <td>${timeAgo(item.createTime)}</td>
                                                     <td>
                                                     ${item.results === null ? `<button class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#add_result_button" onclick="addResult('${item.id}')">Add result</button>` : `<button class="btn btn-sm btn-info" data-bs-toggle="modal" data-bs-target="#edit_result_button" onclick="editResult('${item.id}')">View result</button>`}
                                                     </td>
                                                     <td>
                                                     <button onclick="studentQuickView('${item.roll}')" data-bs-toggle="modal" data-bs-target="#single_student_view" class="btn btn-sm btn-warning" ><i class="fa fa-eye"></i></button>
                                                     <button onclick="editStudentData('${item.id}')"  class="btn btn-sm btn-info" data-bs-toggle="modal" data-bs-target="#modal_edit_content" ><i class="fa fa-edit"></i></button>
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

// student quick view
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

// edit student function FIXME:
const editStudentData = (id) => {
    const getOldStudents = getDataLS('students');
    const data = getOldStudents.find((item) => item.id === id)
    
    editForm.querySelector('input[name="name"]').value = data.name;
    editForm.querySelector('input[name="id"]').value = data.id;
    editForm.querySelector('input[name="roll"]').value = data.roll;
   editForm.querySelector('input[name="photo"]').value = data.photo;
    editForm.querySelector('input[name="reg"]').value = data.reg;
    const prevImg = document.getElementById('prevImg').setAttribute('src', data.photo);
}

// edit form submit TODO:
editForm.onsubmit = (e) => {
    e.preventDefault();

    const form_Data = new FormData(e.target);
    const data = Object.fromEntries(form_Data.entries());

    const getOldData = getDataLS('students');
    const editedIndex = getOldData.findIndex((item) => item.id === data.id);

    // Check if the edited roll number already exists (excluding the current entry)
    const rollNumberExists = getOldData.some((item) => item.roll === data.roll && item.id !== data.id);
    const regNumberExists = getOldData.some((item) => item.reg === data.reg && item.id !== data.id);

    if (rollNumberExists || regNumberExists) {
        const edit_msg = document.querySelector('.edit_msg').innerHTML = creatAlert('Roll or Reg number already exists');
        return;
    }

    // Update the data for the specified ID
    getOldData[editedIndex] = {
        ...getOldData[editedIndex],
        ...data,
    };

    sendDataLS('students', getOldData);
    showStudents();
    setTimeout(() => {
        location.reload();
    }, 1000);
};

// students add form submit FIXME:
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
            // roll number check
      
                if((prevStudents.find((item) => item.roll === data.roll))){
                    msg.innerHTML = creatAlert('Roll number already exists');
                    return;
                }
                if((prevStudents.find((item) => item.reg === data.reg))){
                    msg.innerHTML = creatAlert('Reg number already exists');
                    return;
                }

        prevStudents.push({
            ...data,
            createTime : Date.now(),
            results: null,
            id : generateUniqueId(),
        });
        sendDataLS('students', prevStudents);
        e.target.reset();
        showStudents();
        location.reload();
    }
    }

// editResult funciton
const editResult = (id) => {
    const getOldData = getDataLS('students');
    const data = getOldData.find((item) => item.id === id);
   

    edit_result_form.querySelector('input[name="bangla"]').value = data.results.bangla;
    edit_result_form.querySelector('input[name="english"]').value = data.results.english;
    edit_result_form.querySelector('input[name="math"]').value = data.results.math;
    edit_result_form.querySelector('input[name="religion"]').value = data.results.religion;
    edit_result_form.querySelector('input[name="science"]').value = data.results.science;
    edit_result_form.querySelector('input[name="social_science"]').value = data.results.social_science;
    edit_result_form.querySelector('input[name="id"]').value = data.results.id;
    edit_result_form.querySelector('.student_name').innerHTML = (data.name);

}
// edit_result_form submit
edit_result_form.onsubmit = (e) => {
    e.preventDefault();

    const form_data = new FormData(e.target);
    const data = Object.fromEntries(form_data.entries());
    
    const getOldData = getDataLS('students');
    getOldData[getOldData.findIndex((item) => item.id === data.id)] = {
        ...getOldData[getOldData.findIndex((item) => item.id === data.id)],
        results : data,
    }
    sendDataLS('students', getOldData );
    showStudents();
    location.reload();

}
    // add result function
const addResult = (id) => {
    add_result_form.querySelector('input[name="id"]').value = id;
}
// add result submit
add_result_form.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if(!data.bangla || !data.english || !data.math || !data.religion){
        add_result_msg.innerHTML = creatAlert('All fields are required');
    }else if(Number(data.bangla) > 100  || Number(data.english) > 100  || Number(data.math) > 100  || Number(data.religion) > 100 ){
        add_result_msg.innerHTML = creatAlert('Marks must be between 1 to 100');
    }else if(!Number(data.bangla) || !Number(data.english) || !Number(data.math) || !Number(data.religion)){
        add_result_msg.innerHTML = creatAlert('Marks must be neumeric value');
    }else{
        const getOldData = getDataLS('students');
        getOldData[getOldData.findIndex((item) => item.id === data.id)] = {
            ...getOldData[getOldData.findIndex((item) => item.id === data.id)],
            results : data,
        }
        sendDataLS('students', getOldData);
        showStudents();
        e.target.reset();
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
        alert('Your data is safe!')
    }
}   
