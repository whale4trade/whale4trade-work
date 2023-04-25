import db from '../database/index'
import Orders from '../types/orders.types'
import bcrypt from 'bcrypt'
import config from '../config'
import Error from '../interface/error.interface'

class OrdersModel {
	//create user
	async create(o: Orders): Promise<Orders> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql =
				'INSERT INTO orders ( bundleId, userId, name, price, win, timeBuy) values ($1, $2, $3, $4, $5, $6) returning *'
			//run query
			const result = await connect.query(sql, [
				o.bundleId,
				o.userId,
				o.name,
				o.win,
				o.price,
				o.timeBuy,
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
	async getAll(): Promise<Orders[]> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * from orders'
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
	async getOne(id: string): Promise<Orders> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT *  from orders WHERE id=($1)'
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
	async getONFromUser(id: string): Promise<Orders[]> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT *  from orders WHERE userid=($1)'
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
}
export default OrdersModel
