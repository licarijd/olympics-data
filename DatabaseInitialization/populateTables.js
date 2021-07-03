const csv = require('csv-parser')
const fs = require('fs')
const results = [];
const athletesData = 'DatabaseInitialization/data/athletesArchive/athlete_events.csv'
const summerMedalsData = 'data/medalsArchive/summer.csv'
const winterMedalsData = 'data/medalsArchive/winter.csv'
require("regenerator-runtime/runtime")

const createAthletesTableAsync = async () => {
  return await new Promise(function(resolve, reject) {
    fs.createReadStream(athletesData)
      .pipe(csv())
      .on('data', (data) => {
        //console.log("HERE")
        return results.push(data)
      })
      .on('end', () => {
        //console.log("DONE")
        console.log(results[0]);
        resolve(results)
        // [
        //   { NAME: 'Daffy Duck', AGE: '24' },
        //   { NAME: 'Bugs Bunny', AGE: '22' }
        // ]
      })
      .on('error', err => {
        console.log(err)
        reject(err)
      });
  })
}

/*const createAthletesTable = () => {
  console.log("HERE1")
  return fs.createReadStream(athletesData)
  .pipe(csv())
  .on('data', (data) => {
    console.log("HERE")
    return results.push(data)
  })
  .on('end', () => {
    console.log("DONE")
    console.log(results);
    return results
    // [
    //   { NAME: 'Daffy Duck', AGE: '24' },
    //   { NAME: 'Bugs Bunny', AGE: '22' }
    // ]
  })
  .on('err', err => {
    console.log(err)
  });
}*/

const createSummerMedalsTable = () => {
  fs.createReadStream(summerMedalsData)
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results);
    // [
    //   { NAME: 'Daffy Duck', AGE: '24' },
    //   { NAME: 'Bugs Bunny', AGE: '22' }
    // ]
  });
}

const createWinterMedalsTable = () => {
  fs.createReadStream(winterMedalsData)
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results);
    // [
    //   { NAME: 'Daffy Duck', AGE: '24' },
    //   { NAME: 'Bugs Bunny', AGE: '22' }
    // ]
  });
}

export const main = async () => {
  const data = process.argv[1]
  
  try {
    switch (data) {
      case('athletes'):
        console.log("HERE")
        /*const res = */await createAthletesTableAsync()
        //console.log(res)
        break

      case('summer'):
        createSummerMedalsTable()
        break

      case('winter'):
        createWinterMedalsTable()
        break

      default:
        break
    }
    
    process.exit()
  } catch(e) {
    console.error(e)
    process.exit(1)
  }
}
