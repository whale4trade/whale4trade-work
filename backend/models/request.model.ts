import db from '../database/index'
import config from '../config'
import Request from '../types/request.types'

class ReqModel {
	//create user
	async create(r: Request): Promise<Request> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql =
				'INSERT INTO request (userId, userEmail, price, timeReq, status, phone) values ($1, $2, $3, $4, $5, $6) returning *'
			//run query
			const result = await connect.query(sql, [
				r.userId,
				r.userEmail,
				r.price,
				r.timeReq,
				r.status,
				r.phone,
			])
			//release connect
			connect.release()
			//return created user
			return result.rows[0]
		} catch (err: any) {
			throw new Error(`${err}`)
		}
	}
	//get all users
	async getAll(): Promise<Request[]> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * from request'
			//run query
			const result = await connect.query(sql)
			//release connect
			connect.release()
			//return created user
			return result.rows
		} catch (err) {
			throw new Error(`${err}`)
		}
	}
	//get specific user
	async getOne(id: string): Promise<Request> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT *  from request WHERE id=($1)'
			//run query
			const result = await connect.query(sql, [id])
			//release connect
			connect.release()
			//return created user
			return result.rows[0]
		} catch (err) {
			throw new Error(`.could not find user ${id}, ${err}`)
		}
	}
	//get order from id user
	async getONFromUser(id: string): Promise<Request[]> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT *  from request WHERE userId=($1)'
			//run query
			const result = await connect.query(sql, [id])
			//release connect
			connect.release()
			//return created user
			return result.rows
		} catch (err) {
			throw new Error(`.could not find order ${id}, ${err}`)
		}
	}
	async update(r: Request): Promise<Request> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = `UPDATE request SET status=$1 WHERE id=$2 RETURNING *`
			//run query
			const result = await connect.query(sql, [r.status, r.id])
			//release connect
			connect.release()
			//return created user
			return result.rows[0]
		} catch (err) {
			throw new Error(`could not update  user ${r.id}, ${err}`)
		}
	}
}
export default ReqModel
