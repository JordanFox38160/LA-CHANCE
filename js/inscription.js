let pseudo = document.getElementById('name')
let email = document.getElementById("email")
let password = document.getElementById("password")

const btn_signup = document.querySelector('.inscription_input')

btn_signup.onclick = () => {
    let account = {
        pseudo: pseudo.value,
        email: email.value,
        password: password.value,
    }
    console.log(account)
    fetch('http://localhost:4000/api/account', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(account)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data)
        })
        .catch((error) => {
            console.error('Error:', error)
        });

}
