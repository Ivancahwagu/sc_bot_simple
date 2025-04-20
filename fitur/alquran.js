let theoFitur = async function ({ m, theo }) {
    // Menampilkan daftar surah kepada pengguna
    let { key } = await m.reply(`📖 *Mau baca surah apa?*
        
${theo.list_surah.map((surah, index) => `${index + 1}. ${surah.surah}`).join(`\n`)}

Balas dengan nomor surah yang anda inginkan`
    );

    // Menyimpan pilihan pengguna
    theo.use_surah[m.sender] = {};
    theo.use_surah[m.sender][key.id] = true;
};

theoFitur.command = [`alquran`];
theoFitur.tags = "islami";

export default theoFitur;