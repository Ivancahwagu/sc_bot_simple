let theoFitur = async ({ m, theo }) => {
    await m.reply(`mengambil data orang yang mau bergabung ke grup...`)
    let request = await theo.groupRequestParticipantsList(m.chat)
    if (request.length === 0) return await m.reply(`tidak ada orang yang meminta bergabung ke grup ini`)
    for (const member of request) {
        console.log(request)
        await delay(1000)
        await theo.groupRequestParticipantsUpdate(
            m.chat,
            [member.jid],
            "approve"
        )
    }
    await m.reply("selesai")
}
theoFitur.admin = true
theoFitur.botAdmin = true
theoFitur.tags = "admin"
theoFitur.command = ["acc"]
export default theoFitur