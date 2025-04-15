let theoFitur = async function ({ m, theo }) {
    db.user[m.sender].ai = []
    await m.reply(`berhasil hapus ingatan ai`)
}
theoFitur.limit = true
theoFitur.command = [`resetai`]
theoFitur.tags = "ai"
export default theoFitur