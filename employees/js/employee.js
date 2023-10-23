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
        loadEmployee();
    } else {
        window.location.href = './index.html';
    }
}

function loadEmployee(){
    axios.get(url + "/employee", headers).then(function (res) {
        displayEmployees(res.data.message);
    }).catch(function (error) {
        console.log(error);
    });
}

function displayEmployees(employees) {
    var body = document.querySelector("body");
    for (let i = 0; i < employees.length; i++) {
        var div = document.createElement("div");
        var h1 = document.createElement("h1");
        var p1 = document.createElement("p");
        var p2 = document.createElement("p");
        var p3 = document.createElement("p");
        var p4 = document.createElement("p");
        var p5 = document.createElement("p");
        h1.innerHTML = employees[i].id;
        p1.innerHTML = `Name: <a href="edit.html?id=${employees[i].id}">${employees[i].name}</a>`;
        p2.innerHTML = `Lastname: ${employees[i].lastname}`;
        p3.innerHTML = `Email: ${employees[i].mail}`;
        p4.innerHTML = `Phone: ${employees[i].phone}`;
        p5.innerHTML = `Address: ${employees[i].address}`;
        div.appendChild(h1);
        div.appendChild(p1);
        div.appendChild(p2);
        div.appendChild(p3);
        div.appendChild(p4);
        div.appendChild(p5);
        body.appendChild(div);
    }
}

function searchEmployee() {
    var searchInput = document.getElementById('searchInput').value;
    axios.get(url + `/employee/${searchInput}`,headers).then(function (res) {
        clearUI();
        displayEmployees(res.data);
    }).catch(function (error) {
        console.log(error);
    });
}

function clearUI() {
    var body = document.querySelector("body");
    body.innerHTML = '';
}