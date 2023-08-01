import Queue from 'bull'
import redisConfig from '../../config/redis'

import * as jobs from '../jobs/index'

//retorna um array contendo os valores dos jobs, que são um objeto
const queues = Object.values(jobs).map(job => {
    return {
        bull: new Queue(job.key, redisConfig),
        name: job.key,
        handle: job.handle,
        options: job.options
    }
})

// console.log(Object.values(jobs))

export default {
    queues,
    add(name, data) {
        const queue = this.queues.find(queue => queue.name == name)
        return queue.bull.add(data, queue.options)
    },
    process() {
        return this.queues.forEach(queue => {
            queue.bull.process(queue.handle)
        
            queue.bull.on("failed", (job, err)=> {
                console.log("Job failed", job.name, job.data)
                console.log(err)
            })
        })
    }
}

// import RegistrationMail from '../jobs/RegistrationMail'

// const mailQueue = new Queue(RegistrationMail.key, redisConfig)
// mailQueue.on('failed', (job, err)=> {
//     console.log("Job failed", job.name, job.data)
//     console.log(err)
// })

// export default mailQueue