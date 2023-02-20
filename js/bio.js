const userId = localStorage.getItem('userId')
const username = document.querySelector('.username')
console.log(username)

const token = localStorage.getItem('token')
console.log(token)

fetch('http://localhost:4000/' + userId)
    .then(response => {
        const response_data = response.json()
            .then((data) => {
                const main = document.querySelector('main')
                const bio_container = document.createElement('div')
                bio_container.classList.add('profilContainer')

                const bio_text = document.createElement('h1')
                bio_text.innerText = 'Votre bio :'

                const bio_input = document.createElement('textarea')
                bio_input.classList.add('bio')
                bio_input.style = "resize: none;"

                const btn_send_bio = document.createElement('button')
                btn_send_bio.classList.add('btn_send_bio')
                btn_send_bio.innerText = ('Envoyez !')

                btn_send_bio.onclick = () => {
                    let bio = {
                        bio: bio_input.value
                    }
                    console.log(bio)
                    fetch('http://localhost:4000/' + userId, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        },
                        body: JSON.stringify(bio)
                    })
                }


                main.appendChild(bio_container)
                bio_container.appendChild(bio_text)
                bio_container.appendChild(bio_input)
                bio_container.appendChild(btn_send_bio)
            })

    })