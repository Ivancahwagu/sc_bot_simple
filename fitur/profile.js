import fs from 'fs';
import { textImageAdvanced } from '../tools/image.js';
import PhoneNumber from 'awesome-phonenumber';


let theoFitur = async function ({ m, theo }) {
    if (!db.user[m.sender]) return m.reply(`anda belum terdaftar di bot ini`)
    await m.reply(`INFO USER

Premium : ${db.user[m.sender].premium ? `✅` : `❌`}
Banned : ${db.user[m.sender].banned ? `✅` : `❌`}
Limit : ${db.user[m.sender].limit}
Owner : ${m.owner ? `✅` : `❌`}
`)
}

theoFitur.tags = "main"
theoFitur.command = ["profile", "me"]
export default theoFitur