let theoFitur = async function ({ m, theo }) {
    let nomor;

    if (m.quoted) {
        nomor = m.quoted.sender;
    } else if (!m.res) {
        return await m.reply(
            `❌ *Format salah!*\n\n` +
            `Contoh: ${m.prefix}${m.command} @tag`
        );
    }

    let member = m.metadata?.participants;
    let command = m.command.toLowerCase();

    if (command === "add") {
        let member_list = m.res
            .split(",")
            .map(n => n.replace(/[^0-9]/g, ""))
            .filter(n => !isNaN(parseInt(n)) && n.length > 4)
            .map(n => n + "@s.whatsapp.net");

        if (member_list.length === 0) {
            return await m.reply("❌ Tidak ditemukan nomor yang mau ditambahkan.");
        }

        if (theo.addMember) {
            return await m.reply("⏳ Fitur ini sedang cooldown, silakan coba lagi nanti.");
        }

        theo.addMember = true;
        let res = [];

        for (const membernya of member_list) {
            try {
                if (!member.map(a => a.id).includes(membernya)) {
                    let [{ status }] = await theo.updateGc(m.chat, membernya, "add");
                    if (status === '200') {
                        res.push(`✅ Berhasil menambahkan ${membernya}`);
                    } else {
                        res.push(`⚠️ Tidak bisa menambahkan ${membernya}`);
                    }
                } else {
                    res.push(`ℹ️ Nomor ${membernya} sudah ada di dalam grup`);
                }
            } catch (e) {
                res.push(`❌ Error saat menambahkan ${membernya}`);
            }
            await delay(5000);
        }

        theo.addMember = false;
        await m.reply(`📋 *Catatan:*\n\n${res.join("\n\n")}`);
    } else {
        if (m.res) {
            nomor = m.res.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        }

        let [on_wa] = await theo.onWhatsApp(nomor);
        let isMember = member.map(a => a.id).includes(nomor);

        if (!on_wa.exists || !isMember) {
            return await m.reply("⚠️ *Nomor tidak tersedia di grup ini!*");
        }

        if (isMember) {
            switch (command) {
                case "kick":
                    if (m.listAdmin.includes(nomor) || owner.includes(nomor.replace(/[^0-9]/g, ""))) {
                        return await m.reply(`❌ *Maaf, tidak dapat mengeluarkan admin atau owner.*`);
                    }
                    await theo.updateGc(m.chat, nomor, "remove");
                    await m.reply("✅ *User berhasil dikeluarkan dari grup!*");
                    break;

                case "promote":
                    await theo.updateGc(m.chat, nomor, "promote");
                    await m.reply("🎉 *User berhasil dipromosikan menjadi admin!*");
                    break;

                case "demote":
                    if (owner.includes(nomor.replace(/[^0-9]/g, ""))) {
                        return await m.reply(`❌ *Maaf, tidak dapat menurunkan owner.*`);
                    }
                    await theo.updateGc(m.chat, nomor, "demote");
                    await m.reply("👑 *User berhasil diturunkan dari admin!*");
                    break;
            }
        }
    }
};

theoFitur.tags = "admin";
theoFitur.botAdmin = true;
theoFitur.admin = true;
theoFitur.command = ["add", "kick", "promote", "demote"];

export default theoFitur;
