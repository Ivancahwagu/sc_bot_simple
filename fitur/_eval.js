import * as scrape from "../tools/scrape.js"
import axios from "axios"
import * as cheerio from "cheerio"
import fs from "fs"
import path from "path"
import util from "util"
export default async function theoFitur({ m, theo }) {
    if (m.owner) {
        if (!m.command) return
        switch (m.command.toLowerCase()) {
            case ">": case "=>": case "eval": {
                let hasil
                try {
                    hasil = m.res.includes(`await`) ? await eval(`(async ()=>{ ${m.res} })()`) : await eval(`${m.res}`)
                } catch (e) {
                    hasil = `${e}`
                }
                await m.reply(util.format(hasil))
            }
                break
        }
    }
}