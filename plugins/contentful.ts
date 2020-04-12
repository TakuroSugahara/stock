const contentful = require('contentful')

const config = {
  env: process.env.CTF_ENVIRONMENT,
  space: process.env.CTF_SPACE_ID,
  accessToken: process.env.CTF_CDA_ACCESS_TOKEN
}

export default contentful.createClient(config)
