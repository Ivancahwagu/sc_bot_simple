export default function get_StrukturDb() {
    return {
        user: {
            limit: 30,
            premium: false,
            banned: false,
            download: {},
            ytdl: {},
            ai: [],
            afk: false
        },
        group: {
            fitur: {
                antilink: false,
                antiluar: false,
                detect: false,
                antibot: false,
                antifoto: false,
                antisticker: false,
                antivideo: false,
                antiaudio: false,
                antimedia: false
            },
            banned: true,
            premium: false,
            sewa: false
        },
        config: {
            anticall: true,
            silent: false
        }
    }
}