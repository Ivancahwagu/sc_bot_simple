import fs from 'fs'
import path from 'path'
import { create_qriz_noninal, decodeQr } from '../tools/kodeqr.js'

let theoFitur = async function ({ m, theo }) {
    let item_jual = {
        limit: { harga: 100, tipe: 'buah' },
        premium: { harga: 1000, tipe: 'hari' },
        sewa: { harga: 1000, tipe: 'hari' },
        apikeys: { harga: 1000, tipe: 'hari' },
        server: { harga: 20000, tipe: 'bulan' },
    }

    let [item, jumlah] = m.res.split(" ")
    if (!item || !jumlah || !item_jual[item] || isNaN(parseInt(jumlah))) {
        return await m.reply(`❌ *Format salah!*
        
💡 Contoh:
*${m.prefix}${m.command} premium 3*

🛍️ *Item yang tersedia:*
${Object.entries(item_jual).map(([nama, info]) => `• ${nama} → Rp${info.harga}/${info.tipe}`).join('\n')}`)
    }

    jumlah = parseInt(jumlah)
    let data_item = item_jual[item]
    let total_harga = data_item.harga * jumlah

    let baseQR = fs.readFileSync(path.join(__dirname, 'img', 'qris.png'))
    let kodeQR = await decodeQr(baseQR)
    let result = await create_qriz_noninal(kodeQR, total_harga.toString())

    await theo.sendMedia(m.chat, result, `🧾 *Pembelian ${item.toUpperCase()}*
📦 Jumlah: ${jumlah} ${data_item.tipe}
💰 Total: Rp${total_harga.toLocaleString('id-ID')}

Silakan scan QRIS di atas untuk melakukan pembayaran ya kak.
Terima kasih telah menggunakan ${namaBot} 👌`, m.quo)
}

theoFitur.tags = "store"
theoFitur.command = ["beli", "buy", "toko", "store"]
export default theoFitur
