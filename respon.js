import fs from "fs"
import path from "path"
export default async function ({ m, theo }) {
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
                            } else {
                                await m.reply(`⚠️ *Link grup lain terdeteksi!*\nNamun bot tidak bisa menghapusnya karena belum menjadi admin.`);
                            }
                        }
                    }
                }
                if (group.fitur.antiluar && !m.admin) {
                    if (!m.sender.startsWith('62')) {
                        await m.reply(`🚫 Maaf, hanya pengguna dengan nomor +62 (Indonesia) yang diperbolehkan.\nOrang luar ngapain join kesini? 🗿`);
                        if (m.botAdmin) await theo.delete(m.chat, m);
                    }
                }
                if (group.fitur.antibot) {
                    if (m.bot && !m.fromMe) {
                        await m.reply(`🚫 Maaf, Bot lain tidak diizinkan masuk disini`)
                        if (m.botAdmin) await theo.updateGc(m.chat, m.sender, 'remove')
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
        m.read()
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

                await fileRun({ m, theo })
            }
        }

        for (const run_without_command of pluginsList.no_command) {
            await run_without_command({ m, theo })
        }
    } catch (e) {
        console.error(e)
        let cek = await (await fetch(`${webApi}/check-api?apikeys=${apikeys}`)).json()
        if (!cek.valid) await m.reply(`apikeys anda tidak valid`)
        if (!m.owner) {
            if (cek.limit === 0 && !cek.premium) await m.reply(`limit apikeys bot ini habis
    
silahkan lapor owner untuk beli premium apikeys`)
        }
        else {
            if (cek.limit === 0 && !cek.premium) await m.reply(`limit apikeys kamu habis
    
silahkan beli premium apikeys`)
        }
    }
}