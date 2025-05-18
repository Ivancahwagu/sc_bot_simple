let theoFitur = async function ({ m, theo }) {
    m.command.toLowerCase() == "buka" ? await theo.setBukaGc(m.chat, true) : await theo.setBukaGc(m.chat, false)
}
theoFitur.tags = "admin"
theoFitur.botAdmin = true
theoFitur.admin = true
theoFitur.command = ["buka", "tutup"]
export default theoFitur