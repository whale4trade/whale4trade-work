import db from '../database/index'
import config from '../config'
import Phones from '../types/phones.types'

class PhonesModel {
	//create Phones
	async create(ph: Phones): Promise<Phones> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'INSERT INTO phones ( phonenumber) values ($1) returning *'
			//run query
			const result = await connect.query(sql, [ph.phonenumber])
			//release connect
			connect.release()
			//return created Phones
			return result.rows[0]
		} catch (err: any) {
			throw new Error(`${err}`)
		}
	}
	//get all users
	async getAll(): Promise<Phones[]> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * from phones'
			//run query
			const result = await connect.query(sql)
			//release connect
			connect.release()
			//return created Phones
			return result.rows
		} catch (err) {
			throw new Error(`${err}`)
		}
	}
	//get specific Phones
	async getOne(id: string): Promise<Phones> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT *  from phones WHERE id=($1)'
			//run query
			const result = await connect.query(sql, [id])
			//release connect
			connect.release()
			//return created Phones
			return result.rows[0]
		} catch (err) {
			throw new Error(`.could not find Phones ${id}, ${err}`)
		}
	}
	async update(ph: Phones): Promise<Phones> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = `UPDATE phones SET phonenumber=$1 WHERE id=$2 RETURNING *`
			//run query
			const result = await connect.query(sql, [ph.phonenumber, ph.id])
			//release connect
			connect.release()
			//return created Phones
			return result.rows[0]
		} catch (err) {
			throw new Error(`could not update  Phones ${ph.phonenumber}, ${err}`)
		}
	}
	async delete(id: string): Promise<Phones> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'DELETE from phones  WHERE id=($1) RETURNING *'
			//run query
			const result = await connect.query(sql, [id])
			//release connect
			connect.release()
			//return created Phones
			return result.rows[0]
		} catch (err) {
			throw new Error(`could not delete  Phones ${id}, ${err}`)
		}
	}
}
export default PhonesModel
