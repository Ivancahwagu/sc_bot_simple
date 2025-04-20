let theoFitur = async function ({ m, theo }) {
    let fitur = Object.keys(db.group[m.chat].fitur);

    if (!m.res) {
        return await m.reply(
            `❌ *Format salah!* \n\n` +
            `Contoh: ${m.prefix}${m.command} fitur \n\n` +
            `📋 *Daftar fitur yang tersedia:* \n` +
            `${fitur.join(`\n`)}`
        );
    }

    let fitur_input = m.res.toLowerCase();

    if (!fitur.includes(fitur_input)) {
        return await m.reply(
            `⚠️ *Fitur "${m.res}" tidak tersedia!*`
        );
    }

    let command = m.command.toLowerCase();
    if (command === "on") {
        db.group[m.chat].fitur[fitur_input] = true;
        await m.reply(`✅ *Berhasil mengaktifkan fitur "${m.res}"!*`);
    } else {
        db.group[m.chat].fitur[fitur_input] = false;
        await m.reply(`✅ *Berhasil mematikan fitur "${m.res}"!*`);
    }
};

theoFitur.tags = "admin";
theoFitur.admin = true;
theoFitur.command = ["on", "off"];

export default theoFitur;