const fs = require( 'fs' )

// script should be called with positional argument for secrets dir
if ( process.argv.length < 3 ) {
  console.log( `Usage: node ${process.argv[1]} SECRETS_PATH` )
  process.exit( 1 )
}

let fsconfig

// read result (config values) from fbconfig.json
try {
  const pathToJson = `${process.argv[2]}/temp/fbconfig.json`
  const fbconfig = fs.readFileSync( pathToJson )
  const jsonFbconfig = JSON.parse( fbconfig )

  fsconfig = JSON.stringify( jsonFbconfig.result )
} catch ( err ) {
  console.error( 'error parsing JSON from fbconfig.json:', err )
  process.exit( 1 )
}

// write values to frontend-env
const pathToEnv = `${process.argv[2]}/frontend-env`
  
fs.readFile( pathToEnv, 'utf8', ( err, data ) => {
  if ( err ) {
    console.error( 'error reading frontend-env:', err )
    process.exit( 1 )
  }
  const result = data.replace( /'FIRESTORE_CONFIG'/g, fsconfig )

  fs.writeFile( pathToEnv, result, 'utf8', ( err ) => {
    if ( err ) {
      console.error( 'error writing to frontend-env:', err )
      process.exit( 1 )
    }
  } )
} )
