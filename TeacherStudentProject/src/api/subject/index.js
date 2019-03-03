const { Router } = require('express')
const { create, index, show, update, destroy, search, sortECTS, sortName } = require('./controller')

const router = new Router()

router.post('/',
    create)

router.get('/',
    index)


router.get('/:id',
    show)

router.get('/search/:myName',
    search)

router.get('/sort/ECTS/:how',
    sortECTS)

router.get('/sort/:name/:how',
    sortName)


router.put('/:id',
    update)

router.delete('/:id',
    destroy)

module.exports = router