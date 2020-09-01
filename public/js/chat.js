const socket = io()

//elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocation = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')


//Template

const messageTemplate = document.querySelector('#message-template').innerHTML
const urlTemplate = document.querySelector('#url-template').innerHTML

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    $messageFormButton.setAttribute('disabled', 'disabled')

    //disable
    const message = e.target.elements.message.value
    socket.emit('sendMessage', message, (error) => {
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value =''
        $messageFormInput.focus()
        if (error) {
            return console.log(error)
        }
        console.log('Message delivered!')
    })
})


socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(messageTemplate, {
        message
    })
    $messages.insertAdjacentHTML('beforeend', html)
    
})

socket.on('locationMessage', (url) => {
    console.log(url)
    const html = Mustache.render(urlTemplate, {
        url
    })
    $messages.insertAdjacentHTML('beforeend', html)
    
})

$sendLocation.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }

    $sendLocation.setAttribute('disabled','disabled')

    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)
        socket.emit('sendLocation', {
            latitude: position.coords.longitude,
            longitude: position.coords.longitude
        }, () => {
            console.log('Location Shared!')
            $sendLocation.removeAttribute('disabled')
        })

    })
})  
