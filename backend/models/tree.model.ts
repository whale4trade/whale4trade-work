import db from '../database/index'
import bcrypt from 'bcrypt'
import config from '../config'
import Tree from '../types/tree.types'

class TreeModel {
	//create user
	async create(tr: Tree): Promise<Tree> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql =
				'INSERT INTO tree ( userId, iamEmail, timeJoin) values ($1, $2, $3) returning *'
			//run query
			const result = await connect.query(sql, [
				tr.userId,
				tr.iamEmail,
				tr.timeJoin,
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
	async getAll(): Promise<Tree[]> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT *from tree'
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
	async getOne(id: string): Promise<Tree[]> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT *  from tree WHERE userid=($1)'
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
	async updateBundle(u: any): Promise<Tree> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = `UPDATE tree SET  bundle=$1  WHERE iamemail=$2 RETURNING *`
			//run query
			const result = await connect.query(sql, [u.bundle, u.iamemail])
			//release connect
			connect.release()
			//return created user
			return result.rows[0]
		} catch (err) {
			throw new Error(`could not update  user ${u.bundle}, ${err}`)
		}
	}
}
export default TreeModel
