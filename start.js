import fs from "fs"
import path from 'path';
import cluster from 'cluster'
import "./setting.js"


let isRunning = false

async function start(file) {
    if (isRunning) return
    isRunning = true
    cluster.setupMaster({ exec: path.join(__dirname, file), args: [] })
    let p = cluster.fork()
    p.on(`message`, async function (data) {
        switch (data) {
            case `restart`: {
                p.process.kill()
                isRunning = false
                await start(file)
            }
        }
    })
    p.on(`exit`, async function (code) {
        start(file)
        console.log(`sistem mati dengan kode: ${code}`)
    })
}
start(`connect.js`)
