import fs from "fs"
import fetch from "node-fetch"
import path from "path"
export default async function ({ m, theo }) {
    try {
        if (m.bot) return
        if (!m.owner) {
            if (db.user[m.sender]) {
                if (db.user[m.sender].banned) return
            }
            if (db.group[m.chat]) {
                if (db.group[m.chat].fitur.antilink) {
                    if (!m.admin) {
                        if (/https:\/\/chat.whatsapp.com/.test(m.text)) {
                            if (m.botAdmin) {
                                let linkgc = await theo.getLinkGc(m.chat)
                                if (!m.text.includes(linkgc)) await theo.delete(m.chat, m)
                            }
                        }
                    }
                }
                if (db.group[m.chat].fitur.antiluar) {
                    if (!m.admin) {
                        if (!m.sender.startsWith("62")) {
                            await m.reply(`orang luar ngapain join kesini🗿`)
                            if (m.botAdmin) await theo.delete(m.chat, m)
                        }
                    }
                }
                if (db.group[m.chat].banned && !db.group[m.chat].sewa) return
            }
        }
        let pluginsFile = fs.readdirSync(path.join(__dirname, `fitur`)).filter(a => a.endsWith(`.js`) || a.endsWith(`.ejs`))
        global.menu = []
        let pluginsList = {
            command: [],
            no_command: []
        }

        for (const pluginsRes of pluginsFile) {
            if (pluginsRes.startsWith(`_`)) {
                let import_file = await import(`file://${path.join(__dirname, `fitur`, pluginsRes)}?v=${Date.now()}`)
                if (import_file.default) {
                    import_file.default.fileName = pluginsRes
                    pluginsList.no_command.push(import_file.
                        default)
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
                    menu.push({
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

        if ((m.prefix || m.owner) && m.command) {
            if (!m.prefix) m.prefix = `.`
            const fileRun = pluginsList.command.filter(a => a.command.includes(m.command.toLowerCase()))[0]
            if (fileRun) {
                if (fileRun.owner) {
                    if (!m.owner) return await m.reply(`fitur ini khusus owner`)
                }
                if (fileRun.admin) {
                    if (!m.group) return await m.reply(`fitur ini khusus grup`)
                    if (!m.owner && !m.admin) {
                        return await m.reply(`fitur ini khusus admin`)
                    }
                }
                if (fileRun.group) {
                    if (!m.group) return await m.reply(`fitur ini khusus grup`)
                }
                if (fileRun.botAdmin) {
                    if (!m.group) return await m.reply(`fitur ini khusus grup`)
                    if (!m.botAdmin) return await m.reply(`fitur ini dapat digunakan ketika bot menjadi admin di group`)
                }
                if (fileRun.premium || fileRun.limit) {
                    if (!db.user[m.sender]) return await m.reply(`anda harus daftar dulu
                    
silahkan kirim pesan: *.daftar*`)
                    if (!m.owner) {
                        if (fileRun.premium) {
                            if (!db.user[m.sender].premium) return await m.reply(`fitur ini khusus premium user`)
                        }
                        if (fileRun.limit) {
                            if (!db.user[m.sender].premium && !m.owner) {
                                if (db.user[m.sender].limit <= 0) return await m.reply(`limit anda habis kak😔`)
                                db.user[m.sender].limit -= 1
                            }
                        }
                    }
                }
                if (db.user[m.sender]) {
                    if (Object.keys(db.user[m.sender].download.length == 3)) db.user[m.sender].download = {}
                    if (Object.keys(db.user[m.sender].ytdl).length == 3) db.user[m.sender].ytdl = {}
                }
                await fileRun({ m, theo })
            }
        }
        for (const run_without_command of pluginsList.no_command) {
            await run_without_command({ m, theo })
        }
    } catch (e) {
        let cek = await (await fetch(`${webApi}/check-api?apikeys=${apikeys}`)).json()
        console.error(e)
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