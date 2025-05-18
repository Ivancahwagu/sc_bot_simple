import { selisih_waktu_now } from "../tools/func.js"

let theoFitur = async function ({ m, theo }) {
    if (!db.user[m.sender].premium) {
        return await m.reply(`🚫 Maaf, kamu *bukan pengguna Premium*.\n\n💎 Upgrade sekarang untuk menikmati fitur eksklusif!`)
    } else {
        let sisa_waktu = db.user[m.sender].premium === "permanen"
            ? "♾️ *Permanen*"
            : `⏳ *${selisih_waktu_now(db.user[m.sender].premium)}*`

        await m.reply(
            `💠 *Status Premium*
────────────────────
👤 Pengguna: @${m.sender.split("@")[0]}
${sisa_waktu === "♾️ *Permanen*" ? "💎 Masa aktif: " + sisa_waktu : "💎 Sisa premium: " + sisa_waktu}

✨ Terima kasih telah menjadi bagian dari pengguna Premium!
Bot ini hadir berkat dukunganmu 🙏`
            , {
                contextInfo: {
                    mentionedJid: [m.sender]
                }
            })
    }
}
theoFitur.daftar = true
theoFitur.tags = "main"
theoFitur.command = ["cekpremium"]
export default theoFitur
