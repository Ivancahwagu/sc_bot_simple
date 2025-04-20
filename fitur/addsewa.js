import { int_tanggal_now } from "../tools/func.js";

let theoFitur = async function ({ m, theo }) {
    if (!m.res || (isNaN(parseInt(m.res)) && m.res !== "permanen")) {
        return await m.reply(
            `❌ *Format salah!* \n\n` +
            `Contoh: ${m.prefix}${m.command} jumlah hari`
        );
    }

    function hari(jumlah) {
        jumlah = parseInt(jumlah);
        return (1000 * 60 * 60 * 24) * jumlah;
    }

    if (!isNaN(parseInt(m.res))) {
        if (typeof db.group[m.chat].sewa === "number" && db.group[m.chat].sewa > int_tanggal_now()) {
            db.group[m.chat].sewa = db.group[m.chat].sewa + hari(m.res);
        } else {
            db.group[m.chat].sewa = int_tanggal_now() + hari(m.res);
        }
    } else {
        db.group[m.chat].sewa = "permanen";
    }

    await m.reply(`🎉 *Berhasil menambahkan sewa di grup ini!*`);
};

theoFitur.group = true;
theoFitur.owner = true;
theoFitur.tags = "owner";
theoFitur.command = ["addsewa"];

export default theoFitur;