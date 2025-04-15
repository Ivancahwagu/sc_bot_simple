import fs from "fs"
import path from "path"
let theoFitur = async function ({ m, theo }) {
    if (!m.res) return await m.reply(`format salah!
            
contoh: ${m.prefix}${m.command} tes.js`)
    if (!fs.existsSync(path.join(__dirname, m.res))) return await m.reply(`file tidak ada!`)
    let text = fs.readFileSync(path.join(__dirname, m.res), `utf-8`)
    await m.reply(text)
}
theoFitur.owner = true
theoFitur.tags = "owner"
theoFitur.command = ["read"]
export default theoFitur