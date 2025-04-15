import { toMp3 } from "../tools/file.js"

let theoFitur = async function ({ m, theo }) {
    if (!/video|audio/.test(m.media?.type)) return await m.reply(`balas video/audio`)
    let media = await theo.download(m.media)
    media = await toMp3(media)
    await theo.sendMedia(m.chat, media, ``, m.quo)
}

theoFitur.tags = "convert"
theoFitur.command = ["tomp3"]
export default theoFitur