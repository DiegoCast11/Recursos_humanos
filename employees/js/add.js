window.onload = init;
var headers = {};
var url = 'http://localhost:3000';

function init() {
    if (localStorage.getItem('token')) {
        headers = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')} `
            }
        };
        document.getElementById('addButton').addEventListener('click', addEmployee);
    } else {
        window.location.href = './index.html';
    }
}
function addEmployee(){
    var name = document.getElementById('nameInput').value;
    var lastname = document.getElementById('lastnameInput').value;
    var mail = document.getElementById('emailInput').value;
    var phone = document.getElementById('phoneInput').value;
    var address = document.getElementById('addressInput').value;
    var pwd = document.getElementById('passwordInput').value;

    if (!name || !lastname || !mail || !phone || !address || !pwd) {
        alert("Llene todos los campos");
    } else{
        var newEmployee = {
            name: name,
            lastname: lastname,
            mail: mail,
            phone: phone,
            address: address,
            pwd: pwd
        };
        axios.post(url + "/employee", newEmployee, headers).then(function (res) {
            alert(res.data.message);
            window.location.href = './employees.html';
        }).catch(function (error) {
            console.log(error);
        });
    }

    
}