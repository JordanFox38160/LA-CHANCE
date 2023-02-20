const userId = localStorage.getItem('userId')
const username = document.querySelector('.username')
const token = localStorage.getItem('token')

fetch('http://localhost:4000/api/topic', {
    method: 'GET',
})
    .then((response) => {
        const response_data = response.json()
            .then((data) => {
                data.forEach(post => {
                    const section_topic = document.querySelector('.section_topic')
                    const topic_message = document.querySelector('.topic_message')

                    const topic_agencement = document.createElement('div')
                    topic_agencement.classList.add('topic_agencement')

                    const topic = document.createElement('div')
                    topic.classList.add('topic')
                    topic.id = post._id

                    const folderImage = document.createElement('i')
                    folderImage.innerHTML = '<i class="fa-solid fa-folder"></i>'

                    const title_topic = document.createElement('h3')
                    title_topic.innerText = post.title

                    const info_topic = document.createElement('div')
                    info_topic.classList.add('info_topic')

                    const topic_auteur = document.createElement('h4')
                    topic_auteur.innerText = post.pseudo

                    const message = post.comments
                    console.log(message)

                    const number_of_message = message.length
                    console.log(number_of_message)

                    const topic_message_number = document.createElement('h4')
                    topic_message_number.innerText = number_of_message

                    section_topic.appendChild(topic)
                    section_topic.appendChild(topic_agencement)
                    topic_message.appendChild(topic)
                    topic_agencement.appendChild(folderImage)
                    topic_agencement.appendChild(title_topic)
                    topic.appendChild(topic_agencement)
                    topic.appendChild(topic_auteur)
                    topic.appendChild(topic_message_number)
                    topic.appendChild(info_topic)
                    info_topic.appendChild(topic_auteur)
                    info_topic.appendChild(topic_message_number)

                    topic.onclick = () => {
                        window.location = 'topic.html?id=' + post._id
                    }
                });
            })
    })


if (userId === null) {
    const forum_info = document.querySelector('.forum_info')

    const no_connected_text = document.createElement('h3')
    no_connected_text.innerText = 'Non connecter'
    no_connected_text.style.color = '#f00021'
    no_connected_text.style.cursor = 'pointer'

    no_connected_text.onclick = () => {
        window.location = 'connexion.html'
    }

    forum_info.appendChild(no_connected_text)
} else {

    const forum_info = document.querySelector('.forum_info')

    const no_connected_text = document.createElement('h3')
    no_connected_text.innerText = 'Connecter :'
    no_connected_text.style.color = '#32CD32'
    no_connected_text.style.cursor = 'pointer'
    forum_info.appendChild(no_connected_text)

    fetch('http://localhost:4000/' + userId)
        .then(response => {
            const response_data = response.json()
                .then((data) => {
                    const button_pseudo_container = document.querySelector('.forum_info')
                    const votrePseudoContainer = document.createElement('div')
                    votrePseudoContainer.innerText = 'Votre pseudo : ' + data.pseudo
                    votrePseudoContainer.classList = 'votrePseudoContainer'

                    //Ici on enlêve le bouton connexion et le bouton inscription quand l'utilisateur est connecté
                    const btn_header = document.querySelector('.btn_header')
                    if (btn_header) {
                        btn_header.remove()
                    }

                    //ici ont centre le mot "Forum" au milieu de la page
                    const nav = document.querySelector('nav')
                    nav.classList.add("nav_center")

                    //Ici on crée le bouton pour accédez au profil utilisateur
                    const btn_profil = document.createElement('button')
                    btn_profil.innerText = 'Votre profil'
                    btn_profil.classList.add('btn_profil')

                    btn_profil.onclick = () => {
                        // Récupération de la chaîne de requête de l'URL
                        window.location = 'profil.html?id=' + userId

                        const profilContainer = document.createElement('div')
                        profilContainer.classList.add('profilContainer')

                    }

                    button_pseudo_container.appendChild(votrePseudoContainer)
                    button_pseudo_container.appendChild(btn_profil)
                })

        })
}

const inputTitle = document.querySelector('.input_make_topic')

const inputMessage = document.querySelector('.message_container')

const btnSendTopic = document.querySelector('.btn_post')


btnSendTopic.onclick = () => {
    const inputTitleTitle = document.querySelector('.input_make_topic').value
    const inputMessageInput = document.querySelector('.message_container').value
    if (inputTitleTitle === '' || inputMessageInput === '') {
        alert('Veuillez remplir tout les champs')
        inputTitle.style.border = '3px solid #f00021';
        inputMessage.style.border = '3px solid #f00021';
    } else {
        if (userId == null) {
            alert('Veuillez vous connecter')
        } else {
            fetch('http://localhost:4000/' + userId)
                .then(response => {

                    const response_data = response.json()
                        .then((data) => {
                            const pseudo = data.pseudo

                            let topic = {
                                title: inputTitle.value,
                                message: inputMessage.value,
                                userId: userId,
                                pseudo: pseudo
                            }
                            fetch('http://localhost:4000/api/topic', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer ' + token
                                },
                                body: JSON.stringify(topic),
                            })

                                .then(response => response.json())
                                .then(data => {
                                    console.log('Success:', data)
                                    const postId = data._id
                                    window.location = 'topic.html?id=' + postId
                                })
                                .catch((error) => {
                                    console.error('Error:', error)
                                });
                        })
                })
        }
    }

}