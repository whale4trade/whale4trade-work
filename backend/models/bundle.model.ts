import db from '../database/index'
import Bundle from '../types/bundle.types'
import bcrypt from 'bcrypt'
import config from '../config'

class BundleModel {
	//create user
	async create(b: Bundle): Promise<Bundle> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql =
				'INSERT INTO bundle ( name, price, win, timeCreated, ImgBundle, category, description) values ($1, $2, $3, $4, $5, $6, $7) returning *'
			//run query
			const result = await connect.query(sql, [
				b.name,
				b.price,
				b.win,
				b.timeCreated,
				b.ImgBundle,
				b.category,
				b.description,
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
	async getAll(): Promise<Bundle[]> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * from bundle'
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
	async getOne(id: string): Promise<Bundle> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql =
				'SELECT name, price, win, timeCreated, ImgBundle, category , description from bundle WHERE id=($1)'
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

	//update user

	async update(u: Bundle): Promise<Bundle> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = `UPDATE bundle SET name=$1, price=$2,  win=$3, ImgBundle=$4, category=$5, description=$6  WHERE id=$7 RETURNING *`
			//run query
			const result = await connect.query(sql, [
				u.name,
				u.price,
				u.win,
				u.ImgBundle,
				u.description,
				u.category,
				u.id,
			])
			//release connect
			connect.release()
			//return created user
			return result.rows[0]
		} catch (err) {
			throw new Error(`could not update  bundle ${u.name}, ${err}`)
		}
	}
	async delete(id: string): Promise<Bundle> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'DELETE from bundle  WHERE id=($1) RETURNING *'
			//run query
			const result = await connect.query(sql, [id])
			//release connect
			connect.release()
			//return created user
			return result.rows[0]
		} catch (err) {
			throw new Error(`could not delete  bundle ${id}, ${err}`)
		}
	}
}
export default BundleModel
