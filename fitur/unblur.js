import { image_unblur } from "../tools/scrape.js"
import Jimp from 'jimp';

let theoFitur = async function ({ m, theo }) {
    if (!m.media?.type.includes('image')) return await m.reply(`kirim atau balas gambar dengan perintah: ${m.prefix}${m.command}`)
    let buffer = await theo.download(m.media)
    let size = {
        width: (await Jimp.read(buffer)).bitmap.width,
        height: (await Jimp.read(buffer)).bitmap.height
    }
    if (size.width > 2000 || size.height > 2000) return await m.reply(`Ukuran gambar melebihi batas!`)
    let hasil = await image_unblur(buffer)
    await theo.sendMedia(m.chat, hasil, `unblur gambar ${namaBot}`, m.quo)
}

theoFitur.limit = true
theoFitur.command = ["unblur"]
theoFitur.tags = "image"
export default theoFitur