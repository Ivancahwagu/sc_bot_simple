import { decodeQr } from "../tools/kodeqr.js"

let theoFitur = async function ({ m, theo }) {
    if (!m.media?.type.includes('image')) return await m.reply(`balas / kirim qrkode`)
    let buffer_qr = await theo.download(m.media)
    let res = await decodeQr(buffer_qr)
    await m.reply(`data qr:`)
    await m.reply(res)
}

theoFitur.tags = "tools"
theoFitur.command = ["readqr"]
export default theoFitur