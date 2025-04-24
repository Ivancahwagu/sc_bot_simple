let theoFitur = async function ({ m, theo }) {
    if (!process.send) return await m.reply(`gagal restart...`)
    await m.reply('```R E S T A R T . . .```')
    process.send('restart')
}
theoFitur.owner = true
theoFitur.tags = "owner"
theoFitur.command = ["restart"]
export default theoFitur
