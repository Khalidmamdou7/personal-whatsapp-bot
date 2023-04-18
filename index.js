const whatsappClient = require('./whatsapp-client');
const { pingForever } = require('./ping-forever');
const dotenv = require('dotenv');
dotenv.config();

whatsappClient();

pingForever();