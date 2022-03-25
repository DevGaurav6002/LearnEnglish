const express = require('express')
const router = express.Router()

const {
    saveWord,
    getWords,
    deleteWord,
    updateWord
} = require('../controllers/user')

router.post('/save', saveWord)
router.get('/words', getWords)
router.delete('/words/:id', deleteWord)
router.patch('words/:id', updateWord)

module.exports = router