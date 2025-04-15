import { create_qriz_noninal, decodeQr } from "../tools/kodeqr.js"

let theoFitur = async function ({ m, theo }) {
    if (!m.type.includes('image') && !m.quoted.type.includes('image')) return await m.reply(`balas / kirim qrkode`)
    if (!m.res || isNaN(parseInt(m.res))) return await m.reply(`jumlah pembayaran tidak valid`)
    let buffer_qr = await theo.download(m.media)
    let res = await decodeQr(buffer_qr)
    let hasil = await create_qriz_noninal(res, m.res)
    await theo.sendMedia(m.chat, hasil, `qriz bayar nominal ${m.res} berhasil dibuat`, m.quo)
}

theoFitur.tags = "tools"
theoFitur.command = ["createbayarqr"]
export default theoFitur