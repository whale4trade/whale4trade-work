import db from '../database/index'
import bcrypt from 'bcrypt'
import config from '../config'
import Transaction from '../types/transaction.types'

class TransactionModel {
	//create user
	async create(t: Transaction): Promise<Transaction> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql =
				'INSERT INTO transaction ( userId, category, price, timeJoin) values ($1, $2, $3, $4) returning *'
			//run query
			const result = await connect.query(sql, [
				t.userId,
				t.category,
				t.price,
				t.timeJoin === '' ? (t.timeJoin = `${Date.now()}`) : t.timeJoin,
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
	async getAll(): Promise<Transaction[]> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * from transaction'
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
	async getOne(id: string): Promise<Transaction[]> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT *  from transaction WHERE id=($1)'
			//run query
			const result = await connect.query(sql, [id])
			//release connect
			connect.release()
			//return created user
			return result.rows
		} catch (err) {
			throw new Error(`.could not find user ${id}, ${err}`)
		}
	}
	async getOneByUserID(id: string): Promise<Transaction[]> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT *  from transaction WHERE userid=($1)'
			//run query
			const result = await connect.query(sql, [id])
			//release connect
			connect.release()
			//return created user
			return result.rows
		} catch (err) {
			throw new Error(`.could not find user ${id}, ${err}`)
		}
	}
}
export default TransactionModel
