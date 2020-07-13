/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
"use strict";
import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native'
const bodyParser = require("body-parser");
const express = require("express");
const blockchain_1 = require("./blockchain");
const p2p_1 = require("./p2p");

class App extends Component {
  //super();
  state = {
    count: 0
  }
   httpPort =  3001;
   p2pPort =  6001;

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);

    //Object.defineProperty(exports, "__esModule", { value: true });

    // rn_bridge.channel.send("httpPort was parsed.");

    //rn_bridge.channel.send("p2pPort was parsed.");

    initHttpServer(httpPort);
    //rn_bridge.channel.send("httpPort was initialized.");

    p2p_1.initP2PServer(p2pPort);
    //rn_bridge.channel.send("p2pPort was initialized.");

//# sourceMappingURL=main.js.map
  }

   initHttpServer(myHttpPort){
     const app = express();
       app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
       app.use(bodyParser.json())
           //app.use(bodyParser.json());
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

  onPress = () => {
    this.setState({
      count: this.state.count + 1,
      //main = require(./main.js)
    })
  }


  render() {
    return (
        <View style={styles.container}>
          <TouchableOpacity
              style={styles.button}
              onPress={this.onPress}
          >
            <Text>Click me</Text>
          </TouchableOpacity>
          <View>
            <Text>
              You clicked { this.state.count } times
            </Text>
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10
  }
})
export default App;
