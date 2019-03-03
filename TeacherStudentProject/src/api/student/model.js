const mongoose = require('mongoose')
const {Schema} = require('mongoose')

// https://mongoosejs.com/docs/schematypes.html
const studentSchema = new Schema({
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
    specialization: {
        type: String,
        //required: true
    }
}, {
    timestamps: true,
})

studentSchema.methods = {
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
            specialization: this.specialization,
            subjects: this.subjects

        } : view
    }
}

const model = mongoose.model('Student', studentSchema)

module.exports = {model, studentSchema}

