import { Pool } from 'pg'
import databaseCredentials from '../../PostGres.info.json'
import 'regenerator-runtime'
import fs from 'fs'

let pool = null

const getPool = () => {
  if (pool)
    return pool

    pool = new Pool({
      user: databaseCredentials.username,
      host: databaseCredentials.host,
      database: databaseCredentials.database,
      password: databaseCredentials.password,
      port: databaseCredentials.port,
      ssl: { ca: fs.readFileSync('server/repositories/ca-cert/ca-certificate.crt') }
    })

    pool.on('error', async (err) => {
      console.error("Error initializing PostGres pool: ", err)
      await pool.end()
      pool = null
    })

    return pool
}

export const getSqlClient = async () => {
  try {
    const pool = getPool()
    const client = await pool.connect()
    return client
  } catch (err) {
    console.error('Error occured attempting to connect to PostGres server')
    throw err
  }
}

export const queryPool = async (query) => {
  try {
    const pool = getPool(query)
    return await pool.query(query)
  } catch(err) {
    console.error('Error while initializing PostGres client')
    throw err
  }
}