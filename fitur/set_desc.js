let theoFitur = async function ({ m, theo }) {
    if (!m.res) return await m.reply(`format salah!
        
contoh: ${m.prefix}${m.command} bio`)
    await theo.desc(m.res)
    await m.reply(`berhasil ubah bio bot!`)
}
theoFitur.owner = true
theoFitur.tags = "owner"
theoFitur.command = ["setdesc"]
export default theoFitur