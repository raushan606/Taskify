require('../src/db/mongoose')
const User = require('../src/models/user')

// 5e765980811bcb033824c7f5

// User.findByIdAndUpdate('5e75fccaa863a3476c7334e2', {age: 1}).then((user) => {
//     console.log(user)

//     return User.countDocuments({age: 1})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)

// })

const updateAgeAndCount = async (id, age) => {

    const user = await User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({age})
    return count


}

updateAgeAndCount('5e75fccaa863a3476c7334e2', 2).then((count)=> {
    console.log(count)
}).catch((e) => {
    console.log(e)
})