let theoFitur = async function ({ m, theo }) {
    let alasan = m.res ? m.res : `tanpa alasan`
    db.user[m.sender].afk = alasan
    await m.reply(`Berhasil AFk

Alasan: ${alasan}`)
}
theoFitur.tags = "fun"
theoFitur.daftar = true
theoFitur.command = ["afk"]
export default theoFitur