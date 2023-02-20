const btn_signup = document.querySelector('.inscription_input')
let email = document.getElementById('email')
let password = document.getElementById("password")

btn_signup.onclick = (e) => {
    e.preventDefault();
    let account = {
        email: email.value,
        password: password.value,
    }

    fetch('http://localhost:4000/api/connexion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(account)
    })
        .then((response) => {
            if (response.status === 200) {
                console.log('Requête acceptée !');
                console.log(response)
                const response_data = response.json()
                    .then((data) => {
                        console.log(data)
                        const token = data.token
                        const userId = data.userId
                        const setTokenInStorage = localStorage.setItem('token', token)
                        const setUserIdInStorage = localStorage.setItem('userId', userId)
                    })
                window.location = 'forum.html'
            } else {
                const formulaireInscription = document.querySelector('.formulaire_inscription')
                const errormessage = document.createElement('div')
                const errormessageh3 = document.createElement('h3')
                errormessageh3.innerText = 'Pseudo ou mot de passe invalide'
                errormessageh3.style.color = 'red';

                formulaireInscription.appendChild(errormessage)
                formulaireInscription.appendChild(errormessage)
                errormessage.appendChild(errormessageh3)
                console.log(formulaireInscription)
                console.log(`La requête a échoué avec le code de statut ${response.status}`);
            }

        })
        .catch((err) => {
            console.log(err);
        });
};