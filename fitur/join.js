let theoFitur = async ({ m, theo }) => {
    if (!m.res.includes(`https://chat.whatsapp.com/`)) return await m.reply(`format salah!
        
cara pakai: ${m.prefix}${m.command} https://chat.whatsapp.com/invitecode`)
    let res = await theo.groupAcceptInvite(m.res.split("https://chat.whatsapp.com/")[1])
    await m.reply(`berhasil join ke grup`)
}

theoFitur.help = "link grup"
theoFitur.tags = "owner"
theoFitur.owner = true
theoFitur.command = ["join"]
export default theoFitur