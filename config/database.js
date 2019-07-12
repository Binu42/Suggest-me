if(process.env.NODE_ENV === 'production'){
    module.exports = {
        mongoURI: 'mongodb+srv://admin-Binu:'+ process.env.password +'@cluster0-9npsv.mongodb.net/suggestionDB'
    }
}else{
    module.exports = {
        mongoURI: 'mongodb://localhost/suggestionDB'
    }
}