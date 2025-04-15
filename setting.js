import path from "path"
import fs from "fs"
import url from "url"
import fetch from "node-fetch"

global.__dirname = path.dirname(url.fileURLToPath(import.meta.url))
global.namaBot = `nama bot kamu` //nama bot kamu
global.owner = [`6282322199300`, `6288801110333`].map(a => a.replace(/[^0-9]/g, ``)) //ganti dengan nomor kamu
global.apikeys = "axurw81xuv4" //isi dengan api anda, kalo belum ada silahkan minta admin webApi
global.webApi = `https://store.berapi.my.id`//jangan di ubah ini bawaan nanti kalo diubah eror
global.nomorBot = `+62 896-7609-0900`.replace(/[^0-9]/g, ``) //isi dengan nomor bot kamu
global.sesiPath = path.join(__dirname, `SESSION`)
global.dataPath = path.join(__dirname, `data.json`)
global.sampahPath = path.join(__dirname, `sampah`)
global.prefix = [`.`, `!`, `/`, `?`]
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