const fs = require('fs')

// Check if the correct number of command line arguments are provided
if (process.argv.length !== 6) {
  console.log('Usage: node script.js file1.ts file2.ts keyword target')
  process.exit(1)
}

// Get command line arguments
const [, , inputFile, outputFile, keyword, target] = process.argv

// Read the content of the input file
fs.readFile(inputFile, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading file ${inputFile}: ${err.message}`)
    process.exit(1)
  }

  // Replace words starting with the keyword with the target
  const modifiedContent = data.replace(
    new RegExp(`\\b${keyword}(\\w*|_)\\b`, 'g'),
    `${target}$1`,
  )

  // Write the modified content to the output file
  fs.writeFile(outputFile, modifiedContent, 'utf8', (err) => {
    if (err) {
      console.error(`Error writing to file ${outputFile}: ${err.message}`)
      process.exit(1)
    }

    console.log(`File successfully modified. Output written to ${outputFile}`)
  })
})
