import fs from "fs"

let theoFitur = async function ({ m, theo }) {
    if (!m.media || !m.media.type.includes(`image`)) return await m.reply(`balas gambar atau kirim gambar dengan caption ${m.prefix + m.commad}`)
    fs.writeFileSync(__dirname + `/img/thumb.png`, await theo.download(m.media))
    await m.reply(`brhasil ubah thumbnail menu`)
}
theoFitur.owner = true
theoFitur.tags = "owner"
theoFitur.command = ["set_thumb_menu"]
export default theoFitur