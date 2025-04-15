import { writeExif } from "../tools/convert_sticker.js"
import { textImageAdvanced } from "../tools/image.js"
import { cekMetadata, toImage_kotak } from './../tools/file.js';

let theoFitur = async function ({ m, theo }) {
    let [atas, bawah] = m.res.split("|")
    if (!/image|sticker/.test(m.media?.type)) return await m.reply(`kirim stiker atau gambar
    
contoh: ${m.prefix}${m.command} text atas|text bawah`)
    if (!m.res) return await m.reply(`kirim stiker atau gambar
    
contoh: ${m.prefix}${m.command} text atas|text bawah`)
    let image = await theo.download(m.media)
    image = await toImage_kotak(image)
    atas ? image = await textImageAdvanced(image, atas, null, null, `./font/smeme.fnt`, "center", "top", 5, 5, 5, 5) : null
    bawah ? image = await textImageAdvanced(image, bawah, null, null, `./font/smeme.fnt`, "center", "bottom", 5, 5, 5, 5) : null
    let exif = {
        packName: `[ ${namaBot} ] Sticker Dibuat Oleh : `, packPublish: `Ivan`, isAiSticker: 1, isLottie: 1
    }
    let mime = await cekMetadata(image)
    let res = await writeExif({ mimetype: mime.mimetype, data: image }, exif)
    await m.reply({ sticker: res })
}
theoFitur.command = ["smeme"]
theoFitur.limit = true
theoFitur.tags = "sticker"
export default theoFitur