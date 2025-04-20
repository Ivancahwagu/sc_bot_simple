let theoFitur = async function ({ m, theo }) {
    if (m.quoted) {
        if (db.user[m.quoted.sender]) {
            db.user[m.quoted.sender].banned = false;
        }
    } else {
        if (m.group) {
            db.group[m.chat].banned = false;
        }
        if (db.user[m.chat]) {
            db.user[m.chat].banned = false;
        }
    }
    await m.reply(`✅ *Berhasil membuka banned chat di grup ini!*`);
};

theoFitur.owner = true;
theoFitur.tags = "owner";
theoFitur.command = ["unbnc", "unbanchat"];

export default theoFitur;