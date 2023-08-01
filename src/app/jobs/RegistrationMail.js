import Mail from '../lib/Mail'

export default {
    //key == nome do job
    key: 'RegistrationMail',
    options: {
        
    },
    //handle == função do job
    async handle({data}) {
        const {user} = data
        await Mail.sendMail({
            from: "Queue Test <queue@queuetest.com.br>",
            to: `${user.name} <${user.email}>`,
            subject: "Cadastro de usuário",
            html: "Olá, seja nem vindo a fila de testes"
        })
    }
}