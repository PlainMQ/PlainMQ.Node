const tcp = require('net');
const { urlToHttpOptions } = require('url');
const PlainMessage = require('./plainmessage');

client_sock: tcp.Socket;
buf: Buffer;
recvBytesFn: Function;
recvStrFn: Function;

async function setup(host, port){       
    this.client_sock = new tcp.Socket();    
    classClosure = this;
    this.mq = [];
    this.writeWait = 25;
    this.canWrite = true;
    this.client_sock.connect(port, host, () =>{                
        this.client_sock.on('data', async (data) => {
            buf = Buffer.from(data);
            if(buf[4]){
                await invokeRecvStrFunction(classClosure.recvStrFn);
            } else await invokeRecvBytesFunction(classClosure.recvBytesFn);
        });     
    });
}

async function sendStr(inStr){
    if(this.client_sock !== undefined){
        let plainStrMsg = new PlainMessage(inStr.length);
        plainStrMsg.fromString(inStr);
        this.mq.push(plainStrMsg.toMessageBuffer());
        sendWait(this);
    } else throw("cannot write to plainMQ")
}

async function sendBytes(inBuffer){
    if(this.client_sock !== undefined){
        let plainByteMsg = new PlainMessage(null, inBuffer, null);        
        this.mq.push(plainByteMsg.toMessageBuffer());
        sendWait(this);
    } else throw("cannot write to plainMQ")
}

async function sendWait(ctx) {
    if(ctx.canWrite){
        if(ctx.mq.length > 0){
            ctx.canWrite = false;
            ctx.writeWait = 25;
            ctx.client_sock.write(ctx.mq.pop(), (err) => ctx.canWrite = true);
        }
    } else {
        setTimeout(() => sendWait(ctx), ctx.writeWait);
        ctx.writeWait += ctx.writeWait;
    }
}

async function onReceiveBytes(onBytesFn){
    this.recvBytesFn = onBytesFn;    
}

async function onReceiveStr(inStrFn){
    this.recvStrFn = inStrFn;
}

async function destroy(){
    this.client_sock.close();
}

async function invokeRecvStrFunction(callback){
    const strBuf = this.buf.slice(5);
    const retStr = strBuf.toString();
    callback(retStr);    
}

async function invokeRecvBytesFunction(callback){
    const bufLen = this.buf.slice(0, 4);
    const len = bufLen.readInt32LE(0);
    callback(this.buf.slice(5));    
}

module.exports = {
    setup,
    sendStr,
    sendBytes,
    onReceiveBytes,
    onReceiveStr,
    sendWait
};