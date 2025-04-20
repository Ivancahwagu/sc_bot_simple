export default async function theoFitur({ m, theo }) {
    if (m.owner) {
        if (!m.command) return
        switch (m.command.toLowerCase()) {
            case ">": case "=>": case "eval": {
                let hasil
                try {
                    hasil = m.res.includes(`await`) ? await eval(`async()=>{${m.res} }();`) : await eval(`${m.res}`)
                    console.log(hasil)
                } catch (e) {
                    hasil = `${e}`
                }
                await m.reply(`${typeof hasil === "object" ? JSON.stringify(hasil, null, 2) : hasil}`)
            }
                break
        }
    }
}