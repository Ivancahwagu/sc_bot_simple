let theoFitur = async function ({ m, theo }) {
    let nomor
    if (m.quoted) {
        nomor = m.quoted.sender
    } else if (!m.res) {
        return await m.reply(`format salah!
        
contoh: ${m.prefix}${m.command} @tag`)
    }
    if (m.res) nomor = m.res.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    let [on_wa] = await theo.onWhatsApp(nomor)
    if (!on_wa.exists || !m.metadata.participants.map(a => a.id).includes(nomor)) return await m.reply(`nomor tidak tersedia di group ini`)
    let member = m.metadata?.participants
    if (member.map(a => a.id).includes(nomor)) {
        let command = m.command.toLowerCase()
        switch (command) {
            case `kick`: {
                if (m.listAdmin.includes(nomor) || owner.includes(nomor.replace(/[^0-9]/g, ''))) return await m.reply(`maaf, *${m.command}* tidak bisa dipakaikan ke nomor admin dan owner`)
                await theo.updateGc(m.chat, nomor, "remove")
                await m.reply(`berhasil ${m.command} user`)
            }
                break
            case `promote`: {
                await theo.updateGc(m.chat, nomor, "promote")
                await m.reply(`berhasil ${m.command} user`)
            }
                break
            case `demote`: {
                if (owner.includes(nomor.replace(/[^0-9]/g, ''))) return await m.reply(`maaf, *${m.command}* tidak bisa dipakaikan ke nomor owner`)
                await theo.updateGc(m.chat, nomor, "demote")
                await m.reply(`berhasil ${m.command} user`)
            }
                break
        }
    }
}
theoFitur.tags = "admin"
theoFitur.botAdmin = true
theoFitur.admin = true
theoFitur.command = ["kick", "promote", "demote"]
export default theoFitur
