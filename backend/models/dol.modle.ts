import db from '../database/index'
import config from '../config'
import Dollar from '../types/dol.types'

class Dol {
	async createDol(d: any): Promise<Dol> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'INSERT INTO dol (  dollar ) values ($1) returning *'
			//run query
			const result = await connect.query(sql, [d.dollar])
			//release connect
			connect.release()
			//return created user
			return result.rows[0]
		} catch (err: any) {
			throw new Error(`${err} `)
		}
	}
	async getDol(d: any): Promise<Dol[]> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * FROM dol'
			//run query
			const result = await connect.query(sql)
			//release connect
			connect.release()
			//return created user
			return result.rows[0]
		} catch (err: any) {
			// throw new Error(`email already exists! `)
			throw new Error(`${err} `)
		}
	}
	async updateDol(d: any): Promise<Dol> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'UPDATE  dol SET  dollar=$1 WHERE id=$2 returning *'
			//run query
			const result = await connect.query(sql, [d.dollar, d.id])
			//release connect
			connect.release()
			//return created user
			return result.rows[0]
		} catch (err: any) {
			// throw new Error(`email already exists! `)
			throw new Error(`${err} `)
		}
	}
}
export default Dol
