import axios from "axios"
import * as cheerio from "cheerio"
import fs from "fs"

let { data, headers } = await axios.get(`https://www.npmjs.com/search/suggestions?q=baileys`)

console.log(data)

