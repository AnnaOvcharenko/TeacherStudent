const mongoose = require('mongoose')
const {Schema} = require('mongoose')

// https://mongoosejs.com/docs/schematypes.html
const teacherSchema = new Schema({
    cardNumber: {
        type: Number,
        required: true,
        index: {unique: true}
    },
    firstName: {
        type: String,
        required: true
    },
    secondName: {
        type: String,
        required: true
    },
    faculty: {
        type: String,
        //required: true
    },
    scienceDegree: {
        type: String,
        //required: true
    }
}, {
    timestamps: true,
})

teacherSchema.methods = {
    view(full) {
        const view = {
            // simple view
            id: this._id,
            cardNumber: this.cardNumber,
            firstName: this.firstName,
            secondName: this.secondName
        }

        return full ? {
            ...view,
            faculty: this.faculty,
            scienceDegree: this.scienceDegree
        } : view
    }
}

const model = mongoose.model('Teacher', teacherSchema)

module.exports = {model, teacherSchema}

