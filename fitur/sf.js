import fs from "fs"
import path from "path"
let theoFitur = async function ({ m, theo }) {
    if (!m.quoted) return await m.reply(`balas pesannyaa!`)
    if (!m.quoted.text) return await m.reply(`pensan harus ada textnya!`)
    if (!m.res) return await m.reply(`format salah!
            
contoh: ${m.prefix}${m.command} tes.js`)
    fs.writeFileSync(path.join(__dirname, m.res), m.quoted.text)
    await m.reply(`berhasil simpan`)
}
theoFitur.owner = true
theoFitur.tags = "owner"
theoFitur.command = ["sf"]
export default theoFitur