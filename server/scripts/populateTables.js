import { insertIntoTable } from '../services/PostGresService';
import csv from 'csv-parser'
import fs from 'fs'
import "regenerator-runtime/runtime"

const athletesData = 'DatabaseInitialization/data/athletesArchive/athlete_events.csv'
const ATHLETES_TABLE = 'athlete_events'

const readAthletesDataSource = async () => {
  const results = [];

  return await new Promise(function(resolve, reject) {
    fs.createReadStream(athletesData)
      .pipe(csv())
      .on('data', (data) => {
        return results.push(data)
      })
      .on('end', () => {
        resolve(results)
      })
      .on('error', err => {
        console.log(err)
        reject(err)
      });
  })
}

const populateAthletesTable = async () => {
  const data = await readAthletesDataSource()
  console.log(data[0])
  //for (let i = 0; i < data.length; i++) {
  await insertIntoTable(ATHLETES_TABLE, data)
  //}
}

export const main = async () => {
  try {
    await populateAthletesTable()
    process.exit()
  } catch(e) {
    console.error(e)
    process.exit(1)
  }
}
