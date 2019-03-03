const mongoose = require('mongoose')
const {Schema} = require('mongoose')

// https://mongoosejs.com/docs/schematypes.html
const subjectSchema = new Schema({
    subjectName: {
        type: String,
        required: true,
        index: {unique: true}
    },
    hours: {
        type: Number,
        required: true
    },
    ECTS: {
        type: Number,
        required: true
    },
    teacher: {
        type: Schema.ObjectId,
        ref: 'Teacher',
        required: true
    }
}, {
    timestamps: true,
})

subjectSchema.methods = {
    view(full) {
        const view = {
            // simple view
            id: this._id,
            subjectName: this.subjectName
        }

        return full ? {
            ...view,
            hours: this.hours,
            ECTS: this.ECTS,
            teacher: this.teacher

        } : view
    }
}

const model = mongoose.model('Subject', subjectSchema)

module.exports = {model, subjectSchema}

