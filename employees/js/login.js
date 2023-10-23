window.onload = init;

function init() {
    document.querySelector('.btn-primary').addEventListener('click', login);
}

function login() {
    var mail = document.getElementById('input-mail').value;
    var pass = document.getElementById('input-password').value;

    axios({
        method: 'post',
        url: 'http://localhost:3000/login', 
        data: {
            mail: mail,
            pwd: pass
        }
    }).then(function (res) {
        if (res.data.code === 200) {
            localStorage.setItem('token', res.data.message);
            window.location.href = './employees.html';
        }
    }).catch(function (error) {
        console.log(error);
    });
}