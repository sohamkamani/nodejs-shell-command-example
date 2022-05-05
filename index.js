const { exec, spawn } = require('node:child_process')

function basicShellCommand() {
    // run the `ls` command using exec
    exec('ls ./', (err, output) => {
        // once the command has completed, the callback function is called
        if (err) {
            // log and return if we encounter an error
            console.error("could not execute command: ", err)
            return
        }
        // log the output received from the command
        console.log("Output: \n", output)
    })
}

function longRunningCommand() {
    const command = spawn('ping', ["google.com"])
    command.stdout.on('data', output => {
        console.log("Output: ", output.toString())
    })
}

function spawnStdin() {
    const command = spawn('grep', ["apple"])

    command.stdin.write("1. pear\n")
    command.stdin.write("2. grapes\n")
    command.stdin.write("3. apple\n")
    command.stdin.write("4. banana\n")
    command.stdin.end()

    command.stdout.on('data', output => {
        console.log("Output: ", output.toString())
    })
}

function kill() {
    const command = exec("sleep 100")

    command.on('close', (code) => {
        console.log('process has exited')
    })

    setTimeout(() => {
        command.kill()

    }, 1000)


}

kill()