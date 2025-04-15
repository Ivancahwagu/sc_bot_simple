let theoFitur = async function ({ m, theo }) {
    await theo.sendKontak(m.chat, owner, m.quo)
}

theoFitur.tags = "main"
theoFitur.command = ["owner"]
export default theoFitur