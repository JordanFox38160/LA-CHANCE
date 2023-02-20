const userId = localStorage.getItem('userId')
const username = document.querySelector('.username')
const token = localStorage.getItem('token')
const messageInput = document.querySelector('.input_message')

const send_message = document.querySelector('.send_message')


if (userId != null) {
    //Ici on enlêve le bouton connexion et le bouton inscription quand l'utilisateur est connecté
    const btn_header = document.querySelector('.btn_header')
    if (btn_header) {
        btn_header.remove()
    }

    //ici ont centre le mot "Forum" au milieu de la page
    const nav = document.querySelector('nav')
    nav.classList.add("nav_center")
}

// on récupère l'url courante
const url = new URL(document.location);

// la propriété "searchParams" de "url" nous retourne un objet de type "URLSearchParams"
const searchParams = url.searchParams;

for (const param of searchParams.entries()) {
    const id = param[1]
    console.log(id)
    const title_message_private_container = document.querySelector('.title_message_private_container')
    fetch('http://localhost:4000/' + id)
        .then((userdata) => {
            const res = userdata.json()
                .then((response) => {
                    const name_of_user_to_send = document.createElement('h2')
                    name_of_user_to_send.innerText = 'Envoyez un message privée à ' + response.pseudo
                    title_message_private_container.appendChild(name_of_user_to_send)
                })
        })
}


for (const param of searchParams.entries()) {
    const id = param[1]
    send_message.onclick = () => {
        fetch('http://localhost:4000/' + userId)
            .then(response => {
                const response_data = response.json()
                    .then((data) => {
                        const pseudo = data.pseudo
                        console.log(data)
                        let message_private = {
                            text: messageInput.value,
                            commenterId: userId,
                            commenterPseudo: pseudo,
                        }
                        fetch('http://localhost:4000/api/private_message/' + id, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + token
                            }, body: JSON.stringify(message_private),
                        }).then(response => response.json())
                            .then(data => {
                                console.log('Success:', data)

                            })
                            .catch((error) => {
                                console.error('Error:', error)
                            });
                        console.log(message_private)
                    })
            })
    }
}