// This file is used to inject environment variables into the static build for GitHub Pages

const fs = require('fs')
const path = require('path')

// Read the .env file if exists
const envFilePath = path.resolve(process.cwd(), '.env')
let envConfig = {}

if (fs.existsSync(envFilePath)) {
  const envFile = fs.readFileSync(envFilePath, 'utf8')

  // Parse the .env file content
  envFile.split('\n').forEach((line) => {
    const match = line.match(/^([^#=]+)=(.*)$/)
    if (match) {
      const key = match[1].trim()
      const value = match[2].trim().replace(/^['"](.*)['"]$/, '$1') // Remove quotes if present

      // Only include NEXT_PUBLIC_ variables
      if (key.startsWith('NEXT_PUBLIC_')) {
        envConfig[key] = value
      }
    }
  })
}

// Write environment variables to a JavaScript file that will be included in the build
const outputFilePath = path.resolve(process.cwd(), 'public', 'env-config.js')
const outputContent = `
// This file is auto-generated at build time
window.ENV = ${JSON.stringify(envConfig, null, 2)};
`

fs.writeFileSync(outputFilePath, outputContent)
console.log(`Environment config written to ${outputFilePath}`)
