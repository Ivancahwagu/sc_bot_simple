import fs from 'fs';
import PhoneNumber from 'awesome-phonenumber';
import { selisih_waktu_now } from '../tools/func.js';


let theoFitur = async function ({ m, theo }) {
    await m.reply(`╭「 *👤 PROFIL PENGGUNA* 」
│ 📱 Nomor   : ${PhoneNumber(`+` + m.sender.split(`@`)[0]).getNumber('international')}
│ 💎 Premium : ${typeof db.user[m.sender].premium === "number" ? selisih_waktu_now(db.user[m.sender].premium) : db.user[m.sender].premium ? `✅ Aktif` : `❌ Tidak aktif`}
│ 🚫 Banned  : ${db.user[m.sender].banned ? `✅ Ya` : `❌ Tidak`}
│ 🎯 Limit   : ${db.user[m.sender].limit}
│ 👑 Owner   : ${m.owner ? `✅ Ya` : `❌ Bukan`}
╰───────────────────╯`)
}
theoFitur.daftar = true
theoFitur.tags = "main"
theoFitur.command = ["profile", "me"]
export default theoFitur