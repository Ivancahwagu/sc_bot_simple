import { audioChanger } from "../tools/file.js";

let theoFitur = async function ({ m, theo }) {
    if (!m.quoted || !m.quoted.message.audioMessage) return m.reply("Balas audio untuk mengubahnya");
    let effectKey = m.command.toLowerCase();
    let effect = global.effects[effectKey];

    if (!effect) {
        const availableEffects = Object.keys(effects).join(", ");
        return m.reply(`Efek "${effectKey}" tidak ditemukan. Efek yang tersedia: ${availableEffects}...`);
    }

    try {
        await m.reply(`🎧 Memproses audio dengan efek *${effectKey}*... Mohon tunggu sebentar.`);
        let inputBuffer = await theo.download(m.quoted);
        if (!inputBuffer || !(inputBuffer instanceof Buffer)) {
            throw new Error("Gagal mengunduh media audio atau format unduhan tidak valid.");
        }
        if (inputBuffer.length === 0) {
            throw new Error("File audio yang diunduh kosong.");
        }
        let outputBuffer = await audioChanger(inputBuffer, effect);
        await theo.sendMedia(m.chat, outputBuffer, null, { quoted: m }); // Sesuaikan parameter m.quo jika diperlukan

    } catch (error) {
        console.error(`Error processing audio effect [${effectKey}]:`, error);
        let errorMessage = `❌ Maaf, terjadi kesalahan saat memproses audio dengan efek *${effectKey}*.\n`;
        if (error instanceof Error) {
            errorMessage += error.message;
            if (error.message.includes("FFmpeg error") && error.message.includes("Stderr:")) {
                errorMessage += "\n(Detail kesalahan FFmpeg tercatat di log server)";
            }
        } else {
            errorMessage += String(error);
        }
        await m.reply(errorMessage);
    }
};

theoFitur.tags = "voicechanger";
theoFitur.command = Object.keys(effects);

export default theoFitur;