import { int_tanggal_now } from "../tools/func.js"

let theoFitur = async function ({ m, theo }) {
    let [nomor, jumlah_hari] = m.res.split('|')
    if (!nomor || isNaN(parseInt(nomor)) || !jumlah_hari || (isNaN(parseInt(jumlah_hari)) && jumlah_hari !== "permanen")) {
        return await m.reply(`format salah!
        
contoh: ${m.prefix}${m.command} @tag|jumlah hari`)
    }
    nomor = nomor.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    jumlah_hari = parseInt(jumlah_hari)
    if (!db.user[nomor]) return await m.reply(`nomor yang anda msukkan belum terdaftar di bot ini!`)
    function hari(jumlah) {
        jumlah = parseInt(jumlah)
        return (1000 * 60 * 60 * 24) * jumlah
    }

    if (!isNaN(parseInt(jumlah_hari))) {
        if (typeof db.user[nomor].premium === "number" && db.user[nomor].premium > int_tanggal_now()) {
            db.user[nomor].premium = db.user[nomor].premium + hari(jumlah_hari)
        } else {
            db.user[nomor].premium = int_tanggal_now() + hari(jumlah_hari)
        }
    } else {
        db.user[nomor].premium = "permanen"
    }
    await m.reply(`berhasil menambahkan premium`)
    await theo.sendText(nomor, `anda menjadi user premium`)
}
theoFitur.owner = true
theoFitur.tags = "owner"
theoFitur.command = ["addprem"]
export default theoFitur