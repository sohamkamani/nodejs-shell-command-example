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
    // start the `ping google.com` command
    const command = spawn('ping', ["google.com"])
    // const command = spawn('ping', ["google.com"])

    // the `data` event is fired every time data is
    // output from the command
    command.stdout.on('data', output => {
        // the output data is captured and printed in the callback
        console.log("Output: ", output.toString())
    })
}

function spawnStdin() {
    // run the grep command
    const command = spawn('grep', ["apple"])

    // use the stdin stream from the command to
    // send data to the spawned command
    command.stdin.write("1. pear\n")
    command.stdin.write("2. grapes\n")
    command.stdin.write("3. apple\n")
    command.stdin.write("4. banana\n")
    // once we're done sending input, call the `end` method
    command.stdin.end()

    // similar to the previous example, print the output whenever it's 
    // received
    command.stdout.on('data', output => {
        console.log("Output: ", output.toString())
    })
}

function kill() {
    // execute the sleep command - this will
    // wait for 100 seconds before exiting
    const command = exec("sleep 100")

    // when a child process exits, it fires
    // the "close" event
    command.on('close', (code) => {
        console.log('process has exited')
    })

    // Since we don't want to wait for 100 seconds,
    // we can send a kill command after a 1 second timeout
    setTimeout(() => {
        command.kill()
    }, 1000)


}

longRunningCommand()