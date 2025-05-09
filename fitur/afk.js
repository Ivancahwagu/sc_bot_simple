let theoFitur = async function ({ m, theo }) {
    let alasan = m.res ? m.res : `Tanpa alasan`;
    db.user[m.sender].afk = alasan;

    await m.reply(`🌙 *AFK Aktif!*

📌 *Alasan:* ${alasan}
⏰ Statusmu akan ditampilkan saat ada yang menandaimu.

Ketik \`.kembali\` untuk menonaktifkan AFK.
`);
}

theoFitur.tags = "fun";
theoFitur.daftar = true;
theoFitur.command = ["afk"];
export default theoFitur;
