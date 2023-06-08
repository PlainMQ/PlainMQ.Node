<p align="left">
	<img src="imgs/packlogo.png" width="150" height="200" alt="plainmqlogo">
</p>

# PlainMQLib JS

## Intro

PlainMQ is a simple broadcast only messaging queue which runs off a [server](https://github.com/PlainMQ/PlainMQServer). This library helps to connect to that server in a simple manner in order to send and receive messages using your favourite language, _NodeJS_.

## Features

- Fast, plain and simple
- Any messaging pattern is possible to implement on the client side
- Open source
- Easy programming interface to get started on (see below)

## Simple Example

```js
const PlainMQ = require("@plainmq/plainmqlib");

PlainMQ.setup("127.0.0.1", 13000);

PlainMQ.onReceiveBytes(receiveMsgBytes);
PlainMQ.onReceiveStr(receiveMsgStr);

PlainMQ.sendStr("{'json': true}");
PlainMQ.sendBytes([0x17, 0x12, 0x57]);

function receiveMsgBytes(inBytes) {
	console.log("received bytes:", inBytes.toString());
}

function receiveMsgStr(inStr) {
	console.log("received string", inStr);
}
```

## Contact & Collab

Reach out via [Github](https://github.com/PlainMQ) on the main organization or any sub-project.
