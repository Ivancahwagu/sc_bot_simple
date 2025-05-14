let theoFitur = async function ({ m, theo }) {
    await theo.groupLeave(m.chat)
    delete db.group[m.chat]
}
theoFitur.owner = true
theoFitur.group = true
theoFitur.tags = "owner"
theoFitur.command = ["out", "leavegc"]
export default theoFitur