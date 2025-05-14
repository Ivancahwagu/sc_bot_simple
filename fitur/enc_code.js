import { encjs } from "../tools/scrape.js";

let theoFitur = async function ({ m, theo }) {
    if (!m.res && !m.quoted) {
        return await m.reply(
            `❌ *Format salah!* \n\n` +
            `Contoh: ${m.prefix}${m.command} kode js`
        );
    }

    let hasil = await encjs(m.res ? m.res : m.quoted.text);
    if (!hasil) {
        return await m.reply(`⚠️ *Kode Anda tidak dapat dienkripsi.*`);
    }
    await theo.sendMessage(m.chat, { document: Buffer.from(hasil, "utf-8"), mimetype: global.doc.js, fileName: `enc.js` }, m.quo)
};

theoFitur.limit = true;
theoFitur.command = ["enc"];
theoFitur.tags = "tools";

export default theoFitur;