import { writeExif } from "../tools/convert_sticker.js"
import { cekMetadata } from "../tools/file.js";
import { emojiMix } from "../tools/scrape.js";

let theoFitur = async function ({ m, theo }) {
    let [emoji1, emoji2] = m.res.split(`+`)
    if (!emoji1 || !emoji2) return await m.reply(`format salah!
        
contoh: ${m.prefix}${m.command} 😅+😙`)
    let exif = {
        packName: `[ ${namaBot} ] Sticker Dibuat Oleh : `, packPublish: `Ivan`, isAiSticker: 1, isLottie: 1
    }
    let result = await emojiMix(emoji1.replace(/ /, ''), emoji2.replace(/ /, ''))
    let mime = await cekMetadata(await getBuffer(result))
    let res = await writeExif({ mimetype: mime.mimetype, data: mime.buffer }, exif)
    await m.reply({ sticker: res })
}

theoFitur.command = ["emojimix"]
theoFitur.tags = "sticker"
theoFitur.limit = true
export default theoFitur