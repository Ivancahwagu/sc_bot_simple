import path from "path";
import fs from "fs"

let theoFitur = async function ({ m, theo }) {
    let qris = fs.readFileSync(path.join(__dirname, 'img', 'qris.png'))
    await theo.sendMedia(m.chat, qris, `
╭─❏ *DONASI DUKUNG BOT*
│
├─ 📱 *DANA*
${payment['dana'].map((v, i) => `│ ${v}`).join('\n')}
├─ 🛍️ *ShopeePay*
${payment['shopee'].map((v, i) => `│ ${v}`).join('\n')}
├─ 📞 *Pulsa*
${payment['pulsa'].map((v, i) => `│ ${v}`).join('\n')}
├─ 🏦 *Bank Transfer*
${payment['bank'].map((v, i) => `│ ${v.name} – ${v.no_rek}`).join('\n')}
╰─
🙏 Terima kasih atas dukungan Anda!`, m.quo)

}

theoFitur.tags = "support"
theoFitur.command = ["donasi"]
export default theoFitur