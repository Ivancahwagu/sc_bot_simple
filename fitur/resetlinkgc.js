let theoFitur = async function ({ m, theo }) {
    let new_code = await theo.setLinkGc(m.chat);

    await m.reply(
        `✅ *Berhasil mereset tautan grup!* \n\n` +
        `🔗 *Tautan grup baru:* \n` +
        `${new_code}`
    );
};

theoFitur.tags = "admin";
theoFitur.botAdmin = true;
theoFitur.admin = true;
theoFitur.command = ["resetlinkgc", "revoke"];

export default theoFitur;