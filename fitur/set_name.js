let theoFitur = async function ({ m, theo }) {
    if (!m.res) return await m.reply(`format salah!
        
contoh: ${m.prefix}${m.command} nama`)
    await theo.name(m.res)
    await m.reply(`berhasil ubah nama bot!`)
}
theoFitur.owner = true
theoFitur.tags = "owner"
theoFitur.command = ["setname"]
export default theoFitur