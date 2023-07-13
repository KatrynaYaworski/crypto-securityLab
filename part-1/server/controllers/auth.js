const bcrypt = require('bcryptjs')

const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && bcrypt.compareSync(password, users[i].password)) {
          res.status(200).send(users[i])
          return
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')
        const savedUser = {...req.body, password: bcrypt.hashSync(req.body.password, 10)}
        req.body.password = ''
        users.push(savedUser)
        res.status(200).send(req.body)
    }
}