const User = require('../../models/usersModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
    Mutation: {
        async register(parent, args, context, info) {
            const {registerInput} = args
            const {username, email, password, confirmPassword} = registerInput

            password = await bcrypt.hash(password, 10)

            const newUser = new User({
                email,
                username,
                password
            })

            const response = await newUser.save()

            const token = jwt.sign({
                id: response.id,
                email: response.email,
                username: response.username,
            }, process.env.SECRET_KEY)
        }
    }
}