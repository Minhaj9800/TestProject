"use strict";

var rn_bridge = require('rn-bridge');

// Echo every message received from react-native.
rn_bridge.channel.on('message', (msg) => {
  rn_bridge.channel.send(msg);
} );

// Inform react-native node is initialized.
rn_bridge.channel.send("Node was initialized.");


Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");


const blockchain_1 = require("./blockchain");
const p2p_1 = require("./p2p");

const httpPort = parseInt(process.env.HTTP_PORT) || 3001;
rn_bridge.channel.send("httpPort was parsed.");

const p2pPort = parseInt(process.env.P2P_PORT) || 6001;
rn_bridge.channel.send("p2pPort was parsed.");

const initHttpServer = (myHttpPort) => {
    const app = express();
    app.use(bodyParser.json());
    app.get('/blocks', (req, res) => {
        res.send(blockchain_1.getBlockchain());
    });
    app.post('/mineBlock', (req, res) => {
        const newBlock = blockchain_1.generateNextBlock(req.body.data);
        res.send(newBlock);
    });
    app.get('/peers', (req, res) => {
        res.send(p2p_1.getSockets().map((s) => s._socket.remoteAddress + ':' + s._socket.remotePort));
    });
    app.post('/addPeer', (req, res) => {
        p2p_1.connectToPeers(req.body.peer);
        res.send();
    });
    app.listen(myHttpPort, () => {
        console.log('Listening http on port: ' + myHttpPort);
    });
};

initHttpServer(httpPort);
rn_bridge.channel.send("httpPort was initialized.");

p2p_1.initP2PServer(p2pPort);
rn_bridge.channel.send("p2pPort was initialized.");

//# sourceMappingURL=main.js.map