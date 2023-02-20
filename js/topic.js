const userId = localStorage.getItem('userId')

const pseudoAuteurTopic = document.querySelector('.pseudo_auteur_topic')

const title = document.querySelector('.title')

const contentText = document.querySelector('.content_texte')

// on récupère l'url courante
const url = new URL(document.location);

// la propriété "searchParams" de "url" nous retourne un objet de type "URLSearchParams"
const searchParams = url.searchParams;


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

// et même itérer sur toutes les valeurs
for (const param of searchParams.entries()) {

    const id = param[1]
    console.log(id)

    fetch('http://localhost:4000/api/topic/' + id, {
        method: 'GET',
    })
        .then((response) => {
            const response_data = response.json()
                .then((data) => {

                    pseudoAuteurTopic.innerHTML = data.pseudo
                    title.innerHTML = data.title
                    contentText.innerHTML = data.message
                });
        }, 1000)

}

const send_comment = document.querySelector('.send_comment')

for (const param of searchParams.entries()) {
    send_comment.onclick = () => {

        const id = param[1]
        console.log(id)
        const getToken = localStorage.getItem('token')

        const commenterId = localStorage.getItem('userId')
        console.log(getToken)

        const message = document.querySelector('.reponse').value
        console.log(message)

        fetch('http://localhost:4000/' + userId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken
            },
        })

            .then((user_info) => {
                const user_info_data = user_info.json()
                    .then((user_info_data) => {
                        console.log(user_info_data._id)
                        let comment = {
                            commenterId: user_info_data._id,
                            commenterPseudo: user_info_data.pseudo,
                            text: message,
                        }
                        fetch('http://localhost:4000/api/topic/' + id, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + getToken
                            },
                            body: JSON.stringify(comment),
                        })
                        console.log(comment),
                            location.reload();

                    })

            })
    }

}

for (const param of searchParams.entries()) {

    const id = param[1]
    console.log(id)

    fetch('http://localhost:4000/api/topic/' + id, {
        method: 'GET',
    })
        .then((response) => {
            const response_data = response.json()
                .then((data) => {
                    const commentList = data.comments
                    const commentContainerMain = document.querySelector('.commentContainerMain')
                    console.log(commentContainerMain)

                    commentList.forEach(comment => {
                        const commentContainer = document.createElement('div')
                        commentContainer.classList.add('commentContainer')
                        commentContainer.id = comment.commenterId

                        const commentPseudo = document.createElement('h3')
                        commentPseudo.innerText = comment.commenterPseudo

                        const commentText = document.createElement('h3')
                        commentText.innerText = comment.text

                        const pseudo_and_message_container = document.createElement('div')
                        pseudo_and_message_container.classList.add('pseudo_and_message_container')


                        const ligne = document.createElement('div')
                        ligne.classList.add('ligne')

                        const message_logo = document.createElement('i')
                        message_logo.innerHTML = '<i class="fa-solid fa-envelope"></i>'
                        message_logo.style.cursor = 'pointer'

                        message_logo.onclick = () => {
                            window.location = 'message_page.html?id=' + comment.commenterId
                        }

                        commentContainerMain.appendChild(commentContainer)
                        commentContainer.appendChild(commentPseudo)
                        commentContainer.appendChild(message_logo)
                        commentContainer.appendChild(pseudo_and_message_container)
                        pseudo_and_message_container.appendChild(commentPseudo)
                        pseudo_and_message_container.appendChild(message_logo)
                        commentContainer.appendChild(ligne)
                        commentContainer.appendChild(commentText)
                    })
                })
        })

}