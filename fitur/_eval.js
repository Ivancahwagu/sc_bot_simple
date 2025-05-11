import { generateWAMessageFromContent, prepareWAMessageMedia } from "baileys"
import axios from "axios"
import * as cheerio from "cheerio"
import fs from "fs"
import * as file from "../tools/file.js"
import path from "path"
import util from "util"
import { exec } from "child_process"
export default async function theoFitur({ m, theo }) {
    let scrape = await import(`file://${__dirname}/tools/scrape.js?v=${Date.now()}`)
    if (m.owner) {
        if (!m.command) return
        switch (m.command.toLowerCase()) {
            case ">": case "=>": case "eval": case ")": {
                let hasil
                try {
                    hasil = m.res.includes(`await`) ? await eval(`(async ()=>{ ${m.res} })()`) : await eval(`${m.res}`)
                } catch (e) {
                    hasil = `${e}`
                }
                await m.reply(util.format(hasil))
            }
                break
            case "$": case "cmd": {
                let hasil = await exec(m.res)
                await m.reply(hasil)
            }
                break
        }
    }
}