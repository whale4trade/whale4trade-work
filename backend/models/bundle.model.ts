import db from '../database/index'
import Bundle from '../types/bundle.types'
import bcrypt from 'bcrypt'
import config from '../config'
import Error from '../interface/error.interface'

class BundleModel {
	//create user
	async create(b: Bundle): Promise<Bundle> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql =
				'INSERT INTO bundle ( name, price, win, timeCreated, ImgBundle, category) values ($1, $2, $3, $4, $5, $6) returning *'
			//run query
			const result = await connect.query(sql, [
				b.name,
				b.price,
				b.win,
				b.timeCreated,
				b.ImgBundle === ''
					? (b.ImgBundle =
							'http://localhost:3000/static/media/photo_2023-03-13_11-36-42.74c4371cb195df821b4f.jpg')
					: b.ImgBundle,
				b.category,
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
			const sql =
				'SELECT id, name, price, win, timeCreated, ImgBundle, category from bundle'
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
				'SELECT name, price, win, timeCreated, ImgBundle, category  from bundle WHERE id=($1)'
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
			const sql = `UPDATE bundle SET name=$1, price=$2,  win=$3, ImgBundle=$4, category=$5  WHERE id=$6 RETURNING *`
			//run query
			const result = await connect.query(sql, [
				u.name,
				u.price,
				u.win,
				u.ImgBundle === ''
					? (u.ImgBundle =
							'http://localhost:3000/static/media/photo_2023-03-13_11-36-42.74c4371cb195df821b4f.jpg')
					: u.ImgBundle,

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
	//delete user
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
