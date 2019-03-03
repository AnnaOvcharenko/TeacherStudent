const { Router } = require('express')
const { create, index, show, update, destroy, search} = require('./controller')

const router = new Router()

router.post('/',
    create)

router.get('/',
    index)

router.get('/:id',
    show)

router.get('/search/:myId',
    search)

router.put('/:id',
    update)

router.delete('/:id',
    destroy)


module.exports = router