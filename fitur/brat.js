import path from "path";
import { writeExif } from "../tools/convert_sticker.js"
import { textImageAdvanced } from "../tools/image.js"
import { cekMetadata, toImage_kotak } from './../tools/file.js';
import fs from 'fs';

let theoFitur = async function ({ m, theo }) {
    if (!m.res) return await m.reply(`format salah!
    
contoh: ${m.prefix}${m.command} text`)
    let image = fs.readFileSync(path.join(__dirname, `img`, `bgputih.jpg`))
    image = await toImage_kotak(image)
    image = await textImageAdvanced(image, m.res, null, null, `./font/brat.fnt`, "center", "middle", 5, 5, 5, 5)
    let exif = {
        packName: `[ ${namaBot} ] Sticker Dibuat Oleh : `, packPublish: `Ivan`, isAiSticker: 1, isLottie: 1
    }
    let mime = await cekMetadata(image)
    let res = await writeExif({ mimetype: mime.mimetype, data: image }, exif)
    await m.reply({ sticker: res })
}
theoFitur.command = ["brat"]
theoFitur.limit = true
theoFitur.tags = "sticker"
export default theoFitur