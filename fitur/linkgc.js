let theoFitur = async function ({ m, theo }) {
    m.reply(await theo.getLinkGc(m.chat))
}
theoFitur.botAdmin = true
theoFitur.tags = "group"
theoFitur.group = true
theoFitur.command = ["linkgc"]
export default theoFitur