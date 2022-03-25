const saveWord = (req,res) => {
    res.send('save word')
}

const getWord = (req,res) => {
    res.send('get single word')
}

const getWords = (req,res) => {
    res.send('get All words')
}

const deleteWord = (req, res) => {
    res.send('deleteWord')
}

const updateWord = (req,res) => {
    res.send('update Word')
}

module.exports = {
    saveWord,
    getWord,
    getWords,
    deleteWord,
    updateWord
}