import { getSqlClient, queryPool } from '../repositories/PostGresRepository'
import pgFormat from 'pg-format'

const getAthletes = () => {

}

const getSport = () => {

}

const getCountry = () => {

}

const getOlympics = () => {

}

export const insertIntoTable = async (table, rows) => {
  const client = await getSqlClient()
  try {
    await client.query('BEGIN')
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
  const {
    ID,
    Name,
    Sex,
    Age,
    Height,
    Weight,
    Team,
    NOC,
    Games,
    Year,
    Season,
    City,
    Sport,
    Event,
    Medal
  } = row
  const args = [
    parseInt(ID),
    Name,
    Sex,
    parseInt(Age),
    Sex,
    parseInt(Height),
    Sex,
    parseInt(Weight),
    Team,
    NOC,
    Games,
    Sex,
    parseInt(Year),
    Season,
    City,
    Sport,
    Event,
    Medal
  ]
  console.log(row)
  const queryTemplate = `INSERT INTO ${table}
    (id, athleteid, name, sex, age, height, weight, team, noc, games, year, season, city, sport, event, medal)
    VALUES (
      ${i},
      ${parseInt(ID)},
      '${Name.replace(/'/g, '\'\'')}',
      '${Sex.replace(/'/g, '\'\'')}',
      ${Age != 'NA' ? parseInt(Age) : -1},
      ${Height != 'NA' ? parseInt(Height) : -1},
      ${Weight  != 'NA' ? parseInt(Weight) : -1},
      '${Team.replace(/'/g, '\'\'')}',
      '${NOC.replace(/'/g, '\'\'')}',
      '${Games.replace(/'/g, '\'\'')}',
      ${parseInt(Year)},
      '${Season.replace(/'/g, '\'\'')}',
      '${City.replace(/'/g, '\'\'')}',
      '${Sport.replace(/'/g, '\'\'')}',
      '${Event.replace(/'/g, '\'\'')}',
      '${Medal != 'NA' ? Medal.replace(/'/g, '\'\'') : -1}'
    )`
  const query = pgFormat(
    queryTemplate,
    args
  )
  

  console.log(queryTemplate)

  
    await client.query(queryTemplate)
}
await client.query('COMMIT')
client.release()
} catch (err) {
await client.query('ROLLBACK')
console.error(err)
}
}