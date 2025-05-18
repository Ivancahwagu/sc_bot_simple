import { selisih_waktu_now } from "../tools/func.js"

let theoFitur = async function ({ m, theo }) {
    if (!db.group[m.chat].sewa) {
        return await m.reply(`💸 Grup ini *belum terdaftar* sebagai penyewa bot.\n\n🚀 Ingin bot aktif di grup ini?\nHubungi admin untuk menyewa sekarang!`)
    } else {
        let sisa_waktu = selisih_waktu_now(db.group[m.chat].sewa)
        await m.reply(`📦 Grup: *${theo.group[m.chat].subject}*\n⏳ Sisa masa sewa bot: *${sisa_waktu}*\n\nTerima kasih telah menggunakan layanan bot ini! 🙌`)
    }
}
theoFitur.group = true
theoFitur.tags = "group"
theoFitur.command = ["ceksewa"]
export default theoFitur
