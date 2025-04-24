import path from "path"
import fs from "fs"
import url from "url"
import fetch from "node-fetch"

global.__dirname = path.dirname(url.fileURLToPath(import.meta.url))
global.namaBot = `TheoBot`
global.owner = [`6285876830674`, `6285809011357`, /*`201027441522`*/].map(a => a.replace(/[^0-9]/g, ``))
global.ownerPrefix = true // Ubah menjadi false agar owner bisa pakai bot tanpa prefix atau awalan seperti . ? dan lain-lain
global.apikeys = "your apikeys" // APIKEYS KAMU.  Jika belum ada, hubungi 085876830674
global.nomorBot = `+20 102 744 1522`.replace(/[^0-9]/g, ``)// Nomor bot kamu
global.sesiPath = path.join(__dirname, `SESSION`)
global.dataPath = path.join(__dirname, `data.json`)
global.sampahPath = path.join(__dirname, `sampah`)
global.surahPath = path.join(__dirname, 'surah')
global.webApi = `https://party-mc.fun`
global.youtube_chanel = `https://www.youtube.com/channel/UCNLkbDNckYj1GpJ-7x5fnMQ`
global.instagram = `https://www.instagram.com/ivantheo159/`
global.github = `https://github.com/Ivancahwagu`
global.prefix = [`.`, `!`, `/`, `?`]
if (!fs.existsSync(surahPath)) {
    fs.mkdirSync(surahPath)
}
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, `{}`)
}
if (!fs.existsSync(sampahPath)) {
    fs.mkdirSync(sampahPath)
}
global.db = JSON.parse(fs.readFileSync(dataPath, `utf-8`))

global.savedb = async function () {
    return fs.writeFileSync(dataPath, JSON.stringify(db, null, 2))
}


global.getBuffer = async function (url) {
    try {
        return Buffer.from(await (await fetch(url)).arrayBuffer())
    } catch (e) {
        return await (await import("axios")).default.get(url, { responseType: "arraybuffer" })
    }
}
global.delay = async function (ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}