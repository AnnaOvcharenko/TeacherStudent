const { success, notFound } = require('../../services/response/')
const Student = require('./model').model

const create = ({ body }, res, next) =>
    Student.create(body)
        .then((student) => student.view(true))
        .then(success(res, 201))
        .catch(next)

const index = ({ query }, res, next) =>
    Student.find()
        .then((student) => student.map((student) => student.view(true)))
        .then(success(res))
        .catch(next)

const show = ({ params }, res, next) =>
    Student.findById(params.id)
        .then(notFound(res))
        .then((student) => student ? student.view(true) : null)
        .then(success(res))
        .catch(next)
const search = ({ params }, res, next) =>
    Student.findOne({cardNumber:params.myId})
        .then(notFound(res))
        .then((student) => student ? student.view(true) : null)
        .then(success(res))
        .catch(next)

const update = ({ body, params }, res, next) =>
    Student.findById(params.id)
        .then(notFound(res))
        .then((student) => student ? Object.assign(student, body).save() : null)
        .then((student) => student ? student.view(true) : null)
        .then(success(res))
        .catch(next)

const destroy = ({ params }, res, next) =>
    Student.findById(params.id)
        .then(notFound(res))
        .then((student) => student ? student.remove() : null)
        .then(success(res, 204))
        .catch(next)

module.exports = {
    create, index, show, update, destroy, search
}