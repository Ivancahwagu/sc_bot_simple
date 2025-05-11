let theoFitur = async function ({ m, theo }) {
    let list_user = Object.keys(db.user);

    let top_banyak = list_user
        .sort((a, b) => db.user[b].limit - db.user[a].limit)
        .slice(0, 10);

    let top_sedikit = list_user
        .sort((a, b) => db.user[a].limit - db.user[b].limit)
        .slice(0, 10);

    let teks = `
📊 *LEADERBOARD PENGGUNA* 📊

🏆 *Top 10 Pengguna dengan Limit Terbanyak:*
${top_banyak.map((v, i) => `${i + 1}. @${v.split("@")[0]} — *${db.user[v].limit} limit*`).join("\n")}

🥀 *Top 10 Pengguna dengan Limit Tersedikit:*
${top_sedikit.map((v, i) => `${i + 1}. @${v.split("@")[0]} — *${db.user[v].limit} limit*`).join("\n")}
    `.trim();

    await m.reply(teks, {
        contextInfo: {
            mentionedJid: [...top_banyak, ...top_sedikit]
        }
    });
};

theoFitur.command = ["lb", "leaderboard"];
theoFitur.tags = "main";
export default theoFitur;
