let theoFitur = async function ({ m, theo }) {
    let new_code = await theo.setLinkGc(m.chat)
    await m.reply(`berhasil reset link group
        
link group baru: ${new_code}`)
}
theoFitur.tags = "admin"
theoFitur.botAdmin = true
theoFitur.admin = true
theoFitur.command = ["resetlinkgc", "revoke"]
export default theoFitur