let theoFitur = async function ({ m, theo }) {
    let linkGc = await theo.getLinkGc(m.chat);
    await m.reply(
        `🔗 *Tautan Grup:* \n\n` +
        `${linkGc}`
    );
};

theoFitur.botAdmin = true;
theoFitur.tags = "group";
theoFitur.group = true;
theoFitur.command = ["linkgc"];

export default theoFitur;