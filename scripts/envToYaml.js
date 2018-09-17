const lineReader = require('line-reader');
lineReader.eachLine('.env', function(line, last) {
  const lineItems = line.split('=')
  if(lineItems.length > 1){
    console.log("- name: ", lineItems[0])
    console.log("  value: ", lineItems[1])
  }
});