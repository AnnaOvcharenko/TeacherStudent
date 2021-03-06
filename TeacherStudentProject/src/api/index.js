const { Router } = require('express')
const student = require('./student')
const teacher = require('./teacher')
const subject = require('./subject')
const user = require('./user')
const _ = require('lodash')

const router = new Router()

router.use('/students', student)
router.use('/teachers', teacher)
router.use('/subjects', subject)
router.use('/users', user)

// 404 Error handler
router.use((req, res, next) =>  res.status(404).send({errors: ['Routing not found']}))

// Error handler
router.use((err, req, res, next) =>  {
    if(err.name === 'ValidationError'){
        const errors = _.map(err.errors, (v) => v.message )
        return res.status(400).send({errors})
    }

    console.error(err)
    res.status(500).send({errors: ['Application error']})
})


module.exports = router
