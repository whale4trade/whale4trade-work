import dotenv from 'dotenv'
dotenv.config()

const {
	NODE_ENV,
	PORT,
	DB_HOST,
	DB_PORT,
	DB_DATABASE,
	DB_DATABASE_TEST,
	DB_DATABASE_USER,
	DB_DATABASE_PASS,
	BCRYPT_PASSWORD,
	SALT_ROUNDS,
	TOKEN_SECRET,
	UE,
	PE,
	DBConnLink,
} = process.env
export default {
	port: PORT,
	host: DB_HOST,
	dbPort: DB_PORT,
	database: NODE_ENV === 'dev' ? DB_DATABASE : DB_DATABASE_TEST,
	user: DB_DATABASE_USER,
	pass: DB_DATABASE_PASS,
	pepper: BCRYPT_PASSWORD,
	salt: SALT_ROUNDS,
	tokenSecret: TOKEN_SECRET,
	uE: UE,
	pU: PE,
	ConnLink: DBConnLink,
}
