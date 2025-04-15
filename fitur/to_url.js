import { upload_to_url } from "../tools/scrape.js"

let theoFitur = async function ({ m, theo }) {
    if (!m.media || !/image|video|audio|sticker/.test(m.media.type)) return await m.reply(`balas pesan medianya
        
note: hanya support untuk image/audio/video/sticker`)
    let hasil = await upload_to_url(await theo.download(m.media))
    await m.reply(`file id: ${hasil.id}
        
        
hasil url: ${hasil.result}`)
}
theoFitur.command = ["upload", "tourl"]
theoFitur.tags = "tools"
export default theoFitur