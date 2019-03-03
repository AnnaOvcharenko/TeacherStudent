const { success, notFound } = require('../../services/response/')
const Teacher = require('./model').model

const create = ({ body }, res, next) =>
    Teacher.create(body)
        .then((teacher) => teacher.view(true))
        .then(success(res, 201))
        .catch(next)

const index = ({ query }, res, next) =>
    Teacher.find()
        .then((teacher) => teacher.map((teacher) => teacher.view(true)))
        .then(success(res))
        .catch(next)

const show = ({ params }, res, next) =>
    Teacher.findById(params.id)
        .then(notFound(res))
        .then((teacher) => teacher ? teacher.view(true) : null)
        .then(success(res))
        .catch(next)
const search = ({ params }, res, next) =>
    Teacher.findOne({cardNumber:params.mojid})
        .then(notFound(res))
        .then((teacher) => teacher ? teacher.view(true) : null)
        .then(success(res))
        .catch(next)

const update = ({ body, params }, res, next) =>
    Teacher.findById(params.id)
        .then(notFound(res))
        .then((teacher) => teacher ? Object.assign(teacher, body).save() : null)
        .then((teacher) => teacher ? teacher.view(true) : null)
        .then(success(res))
        .catch(next)

const destroy = ({ params }, res, next) =>
    Teacher.findById(params.id)
        .then(notFound(res))
        .then((teacher) => teacher ? teacher.remove() : null)
        .then(success(res, 204))
        .catch(next)

module.exports = {
    create, index, show, update, destroy, search
}