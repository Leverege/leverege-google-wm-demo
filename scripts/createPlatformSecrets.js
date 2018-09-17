const YAML = require( 'yamljs' )
const child_process = require( 'child_process' )
const fs = require( 'fs' )

const required = [
  {
    name : 'application-credentials',
    format : 'string',
    key : 'key.json'
  },
  {
    name : 'frontend-env',
    format : 'string',
    key : 'env.js'
  }
]


const secrets = fs.readdirSync( './scripts/platform-secrets' )

required.forEach( ( secret ) => {
  let command, secretObj
  switch ( secret.format ) {
    case 'yaml':
      secretObj = YAML.load( `./scripts/platform-secrets/${secret.name}` )
      command = `kubectl create secret generic ${secret.name} `
      secret.keys.forEach( ( key ) => {
        command += ` --from-literal=${key}='${secretObj[key]}'`
      } )
      child_process.exec( command, ( err, stdout, stderr ) => {
        console.log( err, stdout, stderr )
      } )
      break
    case 'string':
      fs.readFileSync( `./scripts/platform-secrets/${secret.name}` )
      child_process.exec( `kubectl create secret generic ${secret.name} --from-file=${secret.key}=./scripts/platform-secrets/${secret.name}`, ( err, stdout, stderr ) => {
        console.log( err, stdout, stderr )
      } )
      break
    case 'dockercfg':
      secretObj = YAML.load( `./scripts/platform-secrets/${secret.name}` )
      command = `kubectl create secret docker-registry dockersecret --docker-username='${secretObj['docker-username']}' --docker-password='${secretObj['docker-password']}' --docker-email='${secretObj['docker-email']}'`
      if ( secretObj['docker-server'] ) {
        command += ` --docker-server='${secretObj['docker-server']}'`
      }
      child_process.exec( command, ( err, stdout, stderr ) => {
        console.log( err, stdout, stderr )
      } )
      break
    default: 
      break
  }
  
} )
