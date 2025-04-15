let theoFitur = async function ({ m, theo }) {
    await theo.groupLeave(m.chat)
}
theoFitur.owner = true
theoFitur.group = true
theoFitur.tags = "owner"
theoFitur.command = ["out"]
export default theoFitur