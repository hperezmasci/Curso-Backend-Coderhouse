function showChat(req, res) {
    console.log('email: ', req.params.email)
    res.render('chat.hbs', {})
}

export default {
    showChat
}