import { remove_bg } from "../tools/scrape.js"

let theoFitur = async function ({ m, theo }) {
    if (!m.media || !m.media?.type?.includes('image')) return await m.reply(`kirim atau balas gambar dengan perintah: ${m.prefix}${m.command}`)
    let buffer = await theo.download(m.media)
    let hasil = await remove_bg(buffer)
    await theo.sendMedia(m.chat, hasil, `Hapus background ${namaBot}`, m.quo)
}

theoFitur.limit = true
theoFitur.command = ["removebg", "rmbg"]
theoFitur.tags = "image"
export default theoFitur