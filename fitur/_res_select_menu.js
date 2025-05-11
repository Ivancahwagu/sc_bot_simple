export default async function theoFitur({ m, theo }) {
    if (m.quoted) {
        if (m.prefix) return
        if (!theo.menu[m.sender]) return

        let menu_res = theo.menu[m.sender][m.quoted.id]
        if (!menu_res) return

        let teks = (m.text || '').toLowerCase()
        let nomor = parseInt(teks)

        if (isNaN(nomor)) {
            if (menu_res.tags.includes(teks)) {
                let fiturList = menu
                    .filter(b => b.tags === teks)
                    .map(c => `│• *${menu_res.prefix}${c.command}* ${c.limit ? '🪙' : c.premium ? '🔑' : c.admin ? '⚙️' : c.owner ? '👑' : ''}`)
                    .join('\n')

                return await m.reply(`╭─❖  *${teks.toUpperCase()}*\n│ Berikut daftar fitur:\n${fiturList}\n╰───────────────`)
            } else {
                return await m.reply(`❗ Masukkan nomor atau nama menu yang valid.`)
            }
        }

        if (!Array.isArray(menu_res.tags)) return await m.reply('❗ Format menu tidak valid.')
        if (nomor < 1 || nomor > menu_res.tags.length)
            return await m.reply(`❗ Nomor harus antara 1 sampai ${menu_res.tags.length}`)

        let tags_menu = menu_res.tags[nomor - 1]
        let fiturList = menu
            .filter(b => b.tags === tags_menu)
            .map(c => `│• *${menu_res.prefix}${c.command}* ${c.limit ? '💠' : c.premium ? '💎' : ''}`)
            .join('\n')

        await m.reply(`╭─❖  *${tags_menu.toUpperCase()}*\n│ Berikut daftar fitur:\n${fiturList}\n╰───────────────`)
    }
}
