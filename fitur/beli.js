
import fs from 'fs';
import path from 'path';
import { create_qriz_noninal, decodeQr } from '../tools/kodeqr.js';
let theoFitur = async function ({ m, theo }) {
    let harga = {
        limit: 100,
        premium: 1000,
        sewa: 1000
    }
    let [item, jumlah] = m.res.split(" ")
    if (!item || !jumlah || !Object.keys(harga).includes(item) || isNaN(parseInt(jumlah))) return await m.reply(`format salah!

contoh: ${m.prefix}${m.command} item jumlah

item yang dapat di beli:
${Object.keys(harga).join('\n')}`)

    let baseQR = fs.readFileSync(path.join(__dirname, `img`, `qris.png`))
    let kodeQR = await decodeQr(baseQR)
    jumlah = parseInt(jumlah)
    let total_harga = harga[item] * jumlah
    let result = await create_qriz_noninal(kodeQR, total_harga.toString())
    await theo.sendMedia(m.chat, result, `harga ${item} ${jumlah}: Rp${total_harga}
        
silahkan scan qris ini untuk membayar`, m.quo)
}
theoFitur.tags = "main"
theoFitur.command = ["beli", "buy"]
export default theoFitur