const fs = require( 'fs' )
const path = require( 'path' )

const dirs = p => fs.readdirSync( p ).filter( f => fs.statSync( path.join( p, f ) ).isDirectory() )

let folders = dirs( './' )

folders = folders.filter( f => !f.startsWith( '.' ) && f !== 'node_modules' && f !== 'scripts' && f !== 'readme-images' && f !== 'helm-elasticsearch' )

let superValues = fs.readFileSync( 'values.yaml', { encoding : 'utf-8' } )
superValues = superValues.replace( '[PROJECT_ID]', process.argv[2] )

folders.forEach( ( folder ) => { fs.writeFileSync( `./${folder}/values.yaml`, superValues ) } )
