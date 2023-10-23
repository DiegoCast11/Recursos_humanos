window.onload = init;
var headers = {};
var url = 'http://localhost:3000';
var actualUrl = new URL(window.location.href);

function init() {
    if (localStorage.getItem('token')) {
        headers = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')} `
            }
        };
    } else {
        window.location.href = './index.html';
        return;
    }

    fillEmployeeData();
    editButton.addEventListener('click', enableEdit);
    saveButton.addEventListener('click', saveEmployeeChanges); 
    document.getElementById('deleteButton').addEventListener('click', confirmDelete);
}

function fillEmployeeData() {
    //obtener elementos del HTML
    var employeeIdElement = document.getElementById('employeeId');
    var nameInput = document.getElementById('nameInput');
    var lastnameInput = document.getElementById('lastnameInput');
    var emailInput = document.getElementById('emailInput');
    var phoneInput = document.getElementById('phoneInput');
    var addressInput = document.getElementById('addressInput');
    var passwordInput = document.getElementById('passwordInput');
    var editButton = document.getElementById('editButton');
    var saveButton = document.getElementById('saveButton');

    axios.get(url + "/employee/" + actualUrl.searchParams.get("id") , headers).then(function (res) {
        var employee = res.data;
        console.log(employee);
        employeeIdElement.innerText = employee[0].id;
        nameInput.value = employee[0].name;
        lastnameInput.value = employee[0].lastname;
        emailInput.value = employee[0].mail;
        phoneInput.value = employee[0].phone;
        addressInput.value = employee[0].address;
        passwordInput.value = employee[0].pwd;
        editButton.style.display = 'block';
        
    }).catch(function (error) {
        console.log(error);
    });
}

function enableEdit() {
    nameInput.disabled = false;
    lastnameInput.disabled = false;
    emailInput.disabled = false;
    phoneInput.disabled = false;
    addressInput.disabled = false;
    editButton.style.display = 'none';
    saveButton.style.display = 'block';
}

function saveEmployeeChanges() {
    const employeeId = actualUrl.searchParams.get("id");
    const name = nameInput.value;
    const lastname = lastnameInput.value;
    const mail = emailInput.value;
    const phone = phoneInput.value;
    const address = addressInput.value;
    const pwd = passwordInput.value;
    console.log("Datos" + employeeId + name + lastname + mail + phone + address + pwd);
    axios.put(url + `/employee/${employeeId}`, {
        name: name,
        lastname: lastname,
        mail: mail,
        phone: phone,
        address: address,
        pwd: pwd
    }, headers).then(function (res) {
        alert("Cambios guardados exitosamente");
        window.location.href = `employees.html?id=${employeeId}`;
    }).catch(function (error) {
        console.log(error);
        alert("Error al guardar cambios");
    });
}

function confirmDelete() {
    if (confirm("¿Está seguro de eliminar este empleado?")) {
        const employeeId = actualUrl.searchParams.get("id");
        deleteEmployee(employeeId);
    }
}

function deleteEmployee(employeeId){
    axios.delete(url + `/employee/${employeeId}`, headers).then(function (res) {
        alert("Empleado eliminado exitosamente");
        window.location.href = `employees.html`;
    }).catch(function (error) {
        console.log(error);
        alert("Error al eliminar empleado");
    });
}