require('../src/db/mongoose')
const Task = require('../src/models/task')

// 5e75f2c92c51093c6e21b2e9

Task.findByIdAndDelete('5e75ff0f476e1e4a8d88e8fc').then((task) => {
    console.log(task)
    return Task.countDocuments({completed: false})
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: false})
    return count
}

deleteTaskAndCount('5e75ff23c12ca64ab76bf2fc').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})