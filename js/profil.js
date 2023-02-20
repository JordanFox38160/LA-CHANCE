const userId = localStorage.getItem('userId')
const username = document.querySelector('.username')
console.log(username)


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


fetch('http://localhost:4000/' + userId)
    .then(response => {
        const response_data = response.json()
            .then((data) => {
                const main = document.querySelector('main')
                console.log(data)
                const profil_container = document.createElement('div')
                profil_container.classList.add('profilContainer')

                const username_container = document.createElement('h1')
                username_container.innerText = data.pseudo
                username_container.classList.add('username')

                const email_container = document.createElement('h3')
                email_container.innerText = 'Votre email : ' + data.email
                email_container.classList.add('username')

                const bio_container = document.createElement('div')
                bio_container.classList.add('bio_container')
                const bio_text = document.createElement('p')
                bio_text.innerText = 'Bio : ' + data.bio

                const bio_btn_create = document.createElement('button')
                bio_btn_create.classList.add('bio_btn_create')
                bio_btn_create.innerText = 'Ajouter une bio'

                bio_btn_create.onclick = () => {
                    window.location = 'bio_create.html'
                }


                const image_btn_create = document.createElement('input')
                image_btn_create.type = "file"
                image_btn_create.id = "file-upload"
                image_btn_create.accept = 'jpg, jpeg, png'
                image_btn_create.classList.add('image_btn_create')
                image_btn_create.innerText = 'Ajouter une photo de profil'


                const image_btn_send = document.createElement('button')
                image_btn_send.innerText = 'Envoyez !'

                image_btn_send.onclick = (e) => {
                    let picture = [
                    ]
                    console.log(e.target.files)
                }

                main.appendChild(profil_container)
                profil_container.appendChild(username_container)
                profil_container.appendChild(email_container)
                profil_container.appendChild(bio_container)
                bio_container.appendChild(bio_text)
                bio_container.appendChild(bio_btn_create)
                bio_container.appendChild(image_btn_create)
                bio_container.appendChild(image_btn_send)
            })

    })