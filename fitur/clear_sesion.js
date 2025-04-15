import fs from "fs"
import path from "path"

let theoFitur = async function ({ m, theo }) {
    let file_sesi = fs.readdirSync(sesiPath)
    file_sesi.forEach((file, index) => {
        if (file !== `creds.json`) {
            fs.unlinkSync(path.join(sesiPath, file))
        }
    })
    await m.reply(`session berhasil dibersihkan...`)
}
theoFitur.tags = "owner"
theoFitur.owner = true
theoFitur.command = ["csesi"]
export default theoFitur