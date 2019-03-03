const { success, notFound } = require('../../services/response/')
const Subject = require('./model').model

const create = ({ body }, res, next) =>
    Subject.create(body)
        .then((subject) => subject.view(true))
        .then(success(res, 201))
        .catch(next)

const index = (req, res, next) =>
    Subject.find()
        .then((subject) => subject.map((subject) => subject.view(true)))
        .then(success(res))
        .catch(next)

const show = ({ params }, res, next) =>
    Subject.findById(params.id)
        .then(notFound(res))
        .then((subject) => subject ? subject.view(true) : null)
        .then(success(res))
        .catch(next)

const update = ({ body , params }, res, next) =>
    Subject.findById(params.id)
        .then(notFound(res))
        .then((subject) => subject ? Object.assign(subject, body).save() : null)
        .then((subject) => subject ? subject.view(true) : null)
        .then(success(res))
        .catch(next)

const destroy = ({ params }, res, next) =>
    Subject.findById(params.id)
        .then(notFound(res))
        .then((subject) => subject ? subject.remove() : null)
        .then(success(res, 204))
        .catch(next)

const search = ({ params }, res, next) =>
    Subject.findOne({subjectName:params.myName})
        //.then(notFound(res))
        .then((subject) => subject ? subject.view(true) : null)
        .then(success(res))
        .catch(next)

const sortECTS = ({ params }, res, next) =>
    Subject.find({}).sort({ECTS: params.how})
        .then((subject) => subject.map((subject) => subject.view(true)))
        .then(success(res))
        .catch(next)

const sortName = ({ params }, res, next) =>
    Subject.find({}).sort({subjectName: params.how})
        .then((subject) => subject.map((subject) => subject.view(true)))
        .then(success(res))
        .catch(next)


/*const search = ({query}, res, next) => {
    let dbquery = []
    for(const key in query){
        switch (key) {
            case 'model':
                dbquery.push({"model": {$regex: new RegExp(`${query['model']}`), $options: 'i'}})
                break;
            case 'yearmin':
                dbquery.push({"year": {$gte: parseInt(query['yearmin']) }})
                break;
            case 'yearmax':
                dbquery.push({"year": {$lte: parseInt(query['yearmax']) }})
                break;
        }
    }

    if(dbquery.length === 0) return res.json([])

    return Carmodel.find({$and : dbquery}).sort({year: -1}).limit(10)
        .then(notFound(res))
        .then((carmodel) => carmodel ? carmodel.map(carmodel => carmodel.view(true)) : null)
        .then(success(res))
        .catch(next)
}
*/
module.exports = {
    create, index, show, update, destroy, search, sortECTS, sortName
}
