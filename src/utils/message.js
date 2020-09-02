
const generateMessage  = (text) =>{
    console.log('generateMessage')

    return {
        text,
        createdAt: new Date().getTime()
    }
}

const generateLocationMessage  =(url) =>{
    return {
        url,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    generateMessage,
    generateLocationMessage
}