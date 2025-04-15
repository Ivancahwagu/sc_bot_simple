let theoFitur = async function ({ m, theo }) {
    let data_db = Object.keys(db)
    data_db.forEach((isi, index) => {
        db[isi] = {}
    })
    await m.reply(`berhasil mulai ulang databases`)
}
theoFitur.owner = true
theoFitur.tags = "owner"
theoFitur.command = ["resetdb"]
export default theoFitur