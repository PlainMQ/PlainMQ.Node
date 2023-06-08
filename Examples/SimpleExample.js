const PlainMQ = require("@plainmq/plainmqlib");

PlainMQ.setup("127.0.0.1", 13000);

PlainMQ.onReceiveBytes(receiveMsgBytes);
PlainMQ.onReceiveStr(receiveMsgStr);

PlainMQ.sendStr("{'json': true}");
PlainMQ.sendBytes([0x17, 0x12, 0x57]);

function receiveMsgBytes(inBytes){
    console.log('received bytes:', inBytes.toString());
}

function receiveMsgStr(inStr){
    console.log('received string', inStr);
}