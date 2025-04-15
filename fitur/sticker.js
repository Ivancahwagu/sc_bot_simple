import { writeExif } from "../tools/convert_sticker.js"

let theoFitur = async function ({ m, theo }) {
    if (/image|video|sticker/.test(m.media?.type)) {
        let media = await theo.download(m.media)
        if (m.media.message[m.media.type]?.seconds >= 11) return m.reply("Video diatas durasi 10 detik gabisa")
        let exif
        if (m.command.includes("savatar")) {
            exif = {
                packName: `[ ${namaBot} ]
    Sticker Dibuat Oleh : `, packPublish: `
    Ivan`, isAvatar: 1
            }
        } else {
            exif = {
                packName: `[ ${namaBot} ] Sticker Dibuat Oleh : `, packPublish: `Ivan`, isAiSticker: 1, isLottie: 1
            }
        }
        let sticker = await writeExif({ mimetype: m.media.message[m.media.type]?.mimetype, data: media }, exif)
        await theo.sendMessage(m.chat, { sticker }, m.quo)
    } else {
        return m.reply("balas atau kirim gambar/video/sticker dengan caption " + m.prefix + m.command)
    }
}
theoFitur.tags = `sticker`
theoFitur.limit = true
theoFitur.command = ["sticker", "s"]

export default theoFitur