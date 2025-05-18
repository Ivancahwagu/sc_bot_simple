import fs from "fs"
import path from "path"
export default async function ({ m, theo }) {
    sinkronkanData(db.user, global.struktur_db.user)
    sinkronkanData(db.group, global.struktur_db.group)
    if (!m.sender) return
    if (!m.name) return
    try {
        if (!m.owner) {
            const user = db.user[m.sender];
            const group = db.group[m.chat];
            if (group) {
                if (group.banned && !group.sewa) return;
                if (group.fitur.antilink && !m.admin) {
                    const isLink = /https:\/\/chat\.whatsapp\.com/.test(m.text);
                    if (isLink) {
                        const linkGc = await theo.getLinkGc(m.chat);
                        if (!m.text.includes(linkGc)) {
                            if (m.botAdmin) {
                                await theo.delete(m.chat, m);
                                await theo.sendText(m.chat, `🚫 Selain *Admin* dan *Pemilik Bot* Dilarang kirim link ggrup lain di grup ini`)
                            } else {
                                await m.reply(`⚠️ *Link grup lain terdeteksi!*\nNamun bot tidak bisa menghapusnya karena belum menjadi admin.`);
                            }
                        }
                    }
                }
                if (group.fitur.antiluar && !m.admin) {
                    let nomor = m.sender.replace(/[^0-9]/g, '')
                    if (m.sender && !nomor.startsWith('62')) {
                        await m.reply(`🚫 Maaf, hanya pengguna dengan nomor +62 (Indonesia) yang diperbolehkan.\nOrang luar ngapain join kesini? 🗿`);
                        if (m.botAdmin) await theo.delete(m.chat, m);
                    }
                }
                if (group.fitur.antibot && !m.admin) {
                    if (m.bot && !m.fromMe) {
                        await m.reply(`🚫 Maaf, Bot lain tidak diizinkan masuk disini`)
                        if (m.botAdmin) await theo.updateGc(m.chat, m.sender, 'remove')
                    }
                }
                const tipeTerlarang = ["foto", "sticker", "video", "audio"]
                for (const tipe of tipeTerlarang) {
                    if (group.fitur["anti" + tipe] && !m.admin && new RegExp(tipe).test(m.type)) {
                        if (m.botAdmin) {
                            await theo.delete(m.chat, m)
                            await theo.sendText(m.chat, `🚫 Selain *Admin* dan *Pemilik Bot* Dilarang kirim pesan ${tipe} di grup ini`)
                        }
                    }
                }
            }
            if (user?.banned) return;
        }
        if (m.bot) return

        let pluginsFile = fs.readdirSync(path.join(__dirname, `fitur`)).filter(a => a.endsWith(`.js`) || a.endsWith(`.ejs`))
        global.menu = []
        let pluginsList = {
            command: [],
            no_command: []
        }

        for (const pluginsRes of pluginsFile) {
            if (pluginsRes.startsWith(`_`)) {
                let import_file = await import(`file://${path.join(__dirname, `fitur`, pluginsRes)}?v=${Date.now()}`).catch(e => {
                    console.log(e)
                    return false
                })
                if (import_file.default) {
                    import_file.default.fileName = pluginsRes
                    pluginsList.no_command.push(import_file.default)
                }
            } else {
                let import_file = await import(`file://${path.join(__dirname, `fitur`, pluginsRes)}?v=${Date.now()}`).catch(e => {
                    console.log(e)
                    return false
                })
                if (import_file.default) {
                    import_file.default.fileName = pluginsRes
                    pluginsList.command.push(import_file.default)
                }
            }
        }
        for (const isi_file of pluginsList.command) {
            try {
                for (const list_command of isi_file.command) {
                    await menu.push({
                        command: list_command,
                        tags: isi_file.tags,
                        limit: isi_file.limit,
                        premium: isi_file.premium,
                        owner: isi_file.owner,
                        admin: isi_file.admin,
                        botAdmin: isi_file.botAdmin
                    })
                }
            } catch (e) {
                console.log(e)
                console.log(`error di file: ${isi_file.fileName}`)
            }
        }
        await m.read()
        for (const run_without_command of pluginsList.no_command) {
            await run_without_command({ m, theo }).catch(e => { console.log(`plugins tanpa command ada yang error`, e) })
        }
        if (m.prefix || (m.owner && !ownerPrefix)) {
            if (!m.prefix) m.prefix = "."
            const fileRun = pluginsList.command.find(a => a.command.includes(m.command.toLowerCase()))
            if (fileRun) {
                if (fileRun.owner && !m.owner) {
                    return await m.reply(`🚫 *Akses ditolak!*\nFitur ini hanya bisa digunakan oleh *Owner* bot.`)
                }
                if (fileRun.admin) {
                    if (!m.group) return await m.reply(`🚫 Fitur ini hanya bisa digunakan di *grup*.`)
                    if (!m.owner && !m.admin) {
                        return await m.reply(`🚫 *Khusus Admin!*\nKamu bukan admin grup ini.`)
                    }
                }
                if (fileRun.group && !m.group) {
                    return await m.reply(`🚫 Fitur ini hanya dapat digunakan di *grup*.`)
                }
                if (fileRun.private && m.group) {
                    return await m.reply(`🚫 Fitur ini hanya dapat digunakan di *private chat*.`)
                }
                if (fileRun.botAdmin) {
                    if (!m.group) return await m.reply(`🚫 Fitur ini hanya dapat digunakan di *grup*.`)
                    if (!m.botAdmin) {
                        return await m.reply(`🚫 Bot harus menjadi *Admin* untuk menggunakan fitur ini.`)
                    }
                }
                if (fileRun.premium || fileRun.limit || fileRun.daftar) {
                    if (!db.user[m.sender]) {
                        return await m.reply(`🚫 Kamu belum terdaftar!
        
📌 Kirim pesan: *.daftar* untuk mendaftar.`)
                    }

                    if (!m.owner) {
                        if (fileRun.premium && !db.user[m.sender].premium) {
                            return await m.reply(`✨ *Fitur Premium!*\nKhusus untuk user premium.`)
                        }
                        if (fileRun.limit && !db.user[m.sender].premium) {
                            if (db.user[m.sender].limit <= 0) {
                                return await m.reply(`🚫 *Limit Habis!*\nSilakan tunggu limit terisi 1 setiap 30 detik / beli premium / beli limit.`)
                            }
                            db.user[m.sender].limit -= 1
                        }
                    }
                }
                if (db.user[m.sender]) {
                    if (Object.keys(db.user[m.sender].download || {}).length >= 3) {
                        db.user[m.sender].download = {}
                    }
                    if (Object.keys(db.user[m.sender].ytdl || {}).length >= 3) {
                        db.user[m.sender].ytdl = {}
                    }
                }
                await m.react('🟡'); // Mulai proses

                try {
                    await fileRun({ m, theo });
                    await m.react('🟢'); // Berhasil
                } catch (e) {
                    console.error(`❌ Error saat menjalankan fileRun dengan command:`, e);
                    await m.react('🔴');
                    let res = await (await fetch(`${webApi}/user/cek?apikey=${global.apikey}`)).json()

                    if (res.failed) {
                        await m.reply(`❌ *API Key Tidak Valid!*

🔒 Kunci API yang kamu gunakan *tidak ditemukan* atau *tidak valid*.

🏪 Toko Admin: ${webApi}/store

${m.owner
                                ? `🔁 Silakan *perbarui API key* kamu secepatnya!`
                                : `📞 Minta *owner bot* untuk memperbarui API key-nya.`}`);
                        return;
                    }

                    res = res.data;

                    if (res.limit <= 0) {
                        await m.reply(`🚫 *Limit API Key Telah Habis!*

💡 API key kamu sudah *tidak memiliki sisa limit* untuk digunakan.

${m.owner
                                ? `🛒 Silakan hubungi *admin API key* untuk membeli limit baru.

🏪 Toko Admin: ${webApi}/store`
                                : `📞 Minta *owner bot* untuk membeli ulang limit API key-nya.`}`);
                    }
                }

            }
        }
    } catch (e) {
        console.error(e)
        let res = await (await fetch(`${webApi}/user/cek?apikey=${global.apikey}`)).json()

        if (res.failed) {
            await m.reply(`❌ *API Key Tidak Valid!*

🔒 Kunci API yang kamu gunakan *tidak ditemukan* atau *tidak valid*.

🏪 Toko Admin: ${webApi}/store

${m.owner
                    ? `🔁 Silakan *perbarui API key* kamu secepatnya!`
                    : `📞 Minta *owner bot* untuk memperbarui API key-nya.`}`);
            return;
        }

        res = res.data;

        if (res.limit <= 0) {
            await m.reply(`🚫 *Limit API Key Telah Habis!*

💡 API key kamu sudah *tidak memiliki sisa limit* untuk digunakan.

${m.owner
                    ? `🛒 Silakan hubungi *admin API key* untuk membeli limit baru.

🏪 Toko Admin: ${webApi}/store`
                    : `📞 Minta *owner bot* untuk membeli ulang limit API key-nya.`}`);
        }
    }
}
function sinkronkanData(data, struktur) {
    for (const id in data) {
        // Hapus properti yang tidak ada di struktur
        for (const key in data[id]) {
            if (!(key in struktur)) delete data[id][key]
        }

        // Isi properti yang kurang
        for (const key in struktur) {
            if (typeof struktur[key] === "object") {
                if (!data[id][key]) data[id][key] = {}
                for (const value of Object.keys(struktur[key])) {
                    if (!data[id][key][value]) data[id][key][value] = struktur[key][value]
                }
            } else {
                if (!(key in data[id])) {
                    data[id][key] = struktur[key]
                }
            }
        }
    }
}
