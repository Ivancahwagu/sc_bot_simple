import fs from "fs"
import path from "path"
import cluster from "cluster"
import "./setting.js"

let isRunning = false

async function start(file) {
    if (isRunning) return
    isRunning = true

    cluster.setupMaster({ exec: path.join(__dirname, file), args: [] })
    let p = cluster.fork()

    p.on("message", async (data) => {
        if (data === "restart") {
            p.process.kill()
            isRunning = false
            await start(file)
        }
    })

    p.on("exit", async (code) => {
        console.log("sistem mati dengan kode:", code)
        if (!code || parseInt(code) === 0) return
        console.log("start ulang")
        isRunning = false
        await start(file)
    })
}

start("connect.js")
