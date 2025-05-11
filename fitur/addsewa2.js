import { int_tanggal_now } from "../tools/func.js";

let theoFitur = async function ({ m, theo }) {
    let [link, jumlah_hari] = m.res?.split('|')
    if (!m.res || !link || !jumlah_hari || (isNaN(parseInt(jumlah_hari)) && jumlah_hari !== "permanen")) {
        return await m.reply(
            `❌ *Format salah!* \n\n` +
            `Contoh: ${m.prefix}${m.command} link group|jumlah hari`
        );
    }

    function hari(jumlah) {
        jumlah = parseInt(jumlah);
        return (1000 * 60 * 60 * 24) * jumlah;
    }
    let sewa
    let info_gc = await theo.infoLinkGc(link)
    if (!info_gc) return await m.reply(`❗ Gagal mendapatkan info group`)
    if (!db.group[info_gc]) db.group[info_gc.id] = struktur_db.group
    if (!isNaN(parseInt(jumlah_hari))) {
        sewa = hari(jumlah_hari);
        if (typeof db.group[info_gc.id].sewa === "number" && db.group[info_gc.id].sewa > int_tanggal_now()) {
            db.group[info_gc.id].sewa = sewa + db.group[info_gc.id].sewa
            sewa = `selama ${jumlah_hari} hari`
        } else {
            db.group[info_gc.id].sewa = int_tanggal_now() + sewa
            sewa = `selama ${jumlah_hari} hari`
        }
    } else {
        sewa = "permanen";
        db.group[info_gc.id].sewa = sewa
    }

    await m.reply(`🎉 *Berhasil menambahkan sewa di grup ${info_gc.subject} ${sewa}*`);
    await theo.sendText(info_gc.id, `*akses sewa di grup ${info_gc.subject} dibuka ${sewa}*`);
};

theoFitur.owner = true;
theoFitur.tags = "owner";
theoFitur.command = ["addsewa2"];

export default theoFitur;