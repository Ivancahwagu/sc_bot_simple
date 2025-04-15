import { toImage } from './../tools/file.js';
let theoFitur = async function ({ m, theo }) {
    if (!m.media || !/sticker/.test(m.media.type)) return await m.reply(`balas stikernya`)
    let buffer = await theo.download(m.media)
    let image = await toImage(buffer)
    await theo.sendMedia(m.chat, image, ``, m.quo)
}
theoFitur.tags = "convert"
theoFitur.command = ["toimg"]
export default theoFitur