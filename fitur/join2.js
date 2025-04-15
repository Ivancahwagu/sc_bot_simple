let theoFitur = async ({ m, theo }) => {
    await theo.groupAcceptInviteV4(m.quoted.sender, m.quoted[m.quoted.type].message)
    await m.reply(`berhasil join ke grup`)
}
theoFitur.owner = true
theoFitur.tags = "owner"
theoFitur.command = ["join2"]
export default theoFitur