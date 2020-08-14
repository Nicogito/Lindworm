const https = require('https');
const Discord = require('discord.js');
const client = new Discord.Client();
var isPlaying=false;

function askStatus(){
    https.get('https://lichess.org/api/users/status?ids=Lindworm', (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received.
    resp.on('end', () => {
        if (JSON.parse(data)[0]["online"]==true){
            
            if (JSON.parse(data)[0]["playing"]==true){
                isPlaying=true;
            }
            else{
                isPlaying=false;
            }
            client.user.setStatus('online');
        }
        else{
            client.user.setPresence({ status: 'idle', afk:true })
        }
        
    });
    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });

}

function main(){
    askStatus();
    if (isPlaying){
        client.user.setActivity('https://lichess.org/');
    }
    else{
        client.user.setActivity('le temps qui passe',{ type: 'WATCHING' });
    }
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
    setInterval(main,5000);
});


client.login('NzQzNzU1ODE2NzM3NDM5ODE0.XzZSlQ.mPbV_SmhXMU8FyyMa6mgqBO6tMI');