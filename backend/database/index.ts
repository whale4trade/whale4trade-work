import {Pool} from 'pg'
import config from '../config'

const pool = new Pool({
	host: config.host,
	port: parseInt(config.dbPort as string, 10),
	database: config.database,
	user: config.user,
	password: config.pass,
	max: 10,
})
// const pool = new Pool({
// 	connectionString: config.ConnLink,
// 	ssl: {
// 		rejectUnauthorized: false,
// 	},
// })

pool.on('error', (error: Error) => {
	console.log(error)
})

export default pool
