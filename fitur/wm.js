import { writeExif } from "../tools/convert_sticker.js"

let theoFitur = async function ({ m, theo }) {
    if (/image|video|sticker/.test(m.media?.type)) {
        let media = await theo.download(m.media)
        let [packName, packPublish] = m.res.split(`|`)

        let exif = {
            packName: packName ? packName : `[ ${namaBot} ] Sticker Dibuat Oleh : `, packPublish: packPublish ? packPublish : ``, isAiSticker: 1, isLottie: 1
        }
        let sticker = await writeExif({ mimetype: m.media.message[m.media.type]?.mimetype, data: media }, exif)
        await theo.sendMessage(m.chat, { sticker }, m.quo)
    } else {
        return m.reply("balas atau kirim gambar/video/sticker dengan caption " + m.prefix + m.command)
    }
}
theoFitur.tags = `sticker`
theoFitur.limit = true
theoFitur.command = ["wm"]

export default theoFitur