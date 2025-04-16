export default async function theoFitur({ m, theo }) {
    if (m.quoted) {
        if (!theo.menu[m.sender]) return
        let menu_res = theo.menu[m.sender][m.quoted.id]
        if (menu_res) {
            let nomor = parseInt(m.text)
            if (isNaN(nomor)) return await m.reply(`tolong masukkan nomor menu yang kamu inginkan`)
            if (menu_res.length < nomor || nomor < 1) return await m.reply(`maksimal nomor menu adalah ${menu_res.length} dan nomor tidak boleh kurang dari 1`)
            let tags_menu = menu_res.tags[nomor - 1]
            let fiturList = menu.filter(b => b.tags === tags_menu).map(c => `│• *${menu_res.prefix}${c.command}* ${c.limit ? '💠' : c.premium ? '💎' : ''}`).join('\n')

            await m.reply(`╭─❖  *${tags_menu.toUpperCase()}*
│ Berikut daftar fitur:
${fiturList}
╰───────────────`);

        }
    }
}