import Mail from "../lib/Mail.js"
import mailQueue from "../lib/Queue.js"
import Queue from "../lib/Queue.js"

export default {
    async store(req, res) {
        const {name, email, password} = req.body

        const user = {
            name,
            email,
            password
        }

        await Queue.add("RegistrationMail", {user})
        await Queue.add("PrintData", {user})

        return res.json(user)
    }
}