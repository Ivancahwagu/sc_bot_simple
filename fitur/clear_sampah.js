
import fs from 'fs';
import path from 'path';

let theoFitur = async function ({ m, theo }) {
    let sampah = fs.readdirSync(sampahPath)
    await m.reply(`file sampah:
${sampah.join(`\n`)}`)
    sampah.forEach(a => {
        fs.unlinkSync(path.join(sampahPath, a))
    })
    await m.reply(`sampah telah di bersihkan...`)
}
theoFitur.owner = true
theoFitur.tags = "owner"
theoFitur.command = ["csampah", "bersihkan"]
export default theoFitur