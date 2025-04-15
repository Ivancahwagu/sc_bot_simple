import { encjs } from "../tools/scrape.js"

let theoFitur = async function ({ m, theo }) {
    if (!m.res) return await m.reply(`format salah!
    
contoh: ${m.prefix}${m.command} kode js`)
    let hasil = await encjs(m.res)
    if (!hasil) return await m.reply(`kode anda tidak bisa di enc`)
    await m.reply(hasil)
}

theoFitur.limit = true
theoFitur.command = ["enc"]
theoFitur.tags = "tools"
export default theoFitur