const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const { MessageMedia } = require("whatsapp-web.js");
// import library that will help us to use regex to match strings

function whatsappClient() {
    console.log("Running whatsapp client...");
    const client = new Client({
        puppeteer: {
            headless: true, 
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        },
        authStrategy: new LocalAuth(),
    });
    
    client.initialize();

    client.on("qr", (qr) => {
        qrcode.generate(qr, { small: true });
    });

    client.on("authenticated", () => {
        console.log("AUTHENTICATED");
    });


    client.on("auth_failure", (msg) => {
        console.error("AUTHENTICATION FAILURE", msg);
    });

    client.on("ready", () => {
        console.log("Client is ready!");

        const chat = process.env.WHATSAPP_CHAT_ID;

        const message = "Hello boss, I'm alive!";
        client.sendMessage(chat, message);
    });

    client.on("message", (msg) => {
        console.log("MESSAGE RECEIVED", msg);
        if (msg.body == "!ping") {
            msg.reply("pong");
        }
        if (msg.body == "!help") {
            msg.reply("I'm here to help you, here are the commands you can use:\n\n!ping - I'll reply with pong\n");
        }
        if (msg.body == "!stupid") {
            msg.reply("ربنا يهديك");
        }
        if (msg.body == "!stop") {
            msg.reply("عمي بس اللي يوقفنيي");
        }
        if (msg.body == "!love u") {
            msg.reply("I love you too");
        }
        
    });

    client.on("message_create", (msg) => {
        console.log("MESSAGE CREATED", msg);
        if (msg.body == "!ping") {
            msg.reply("pong");
        }
    });

    client.on("disconnected", (reason) => {
        console.log("Client was logged out", reason);
    });
    return client;

}



module.exports = whatsappClient;