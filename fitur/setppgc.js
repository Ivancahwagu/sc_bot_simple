let theoFitur = async function ({ m, theo }) {
    if (!/image/.test(m.media?.type)) return await m.reply(`kirim gambar/balas gambar`)
    let pp = await theo.download(m.media)
    await theo.setpp(m.chat, pp)
    await m.reply(`berhasil ${m.command}`)
}
theoFitur.tags = "admin"
theoFitur.admin = true
theoFitur.botAdmin = true
theoFitur.command = ["setppgc"]
export default theoFitur