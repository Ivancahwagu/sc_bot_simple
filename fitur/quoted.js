import util from 'util';
let theoFitur = async function ({ m, theo }) {
    await m.reply(`${m.quoted ? util.format(m.quoted) : `tidak terdeteksi quoted`}`)
}
theoFitur.command = ["quoted"]
export default theoFitur