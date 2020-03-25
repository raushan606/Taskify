const mongoose = require('mongoose')

const Task = mongoose.model("Task", {
    description: {
        required: true,
        type: String,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})



module.exports = Task



// const Task = mongoose.model("Task", {
//     description: {
//       type: String,
//       trim: true,
//       required: true,
//     },
//     completed: {
//       type: Boolean,
//       default: false,
//     }
//   });