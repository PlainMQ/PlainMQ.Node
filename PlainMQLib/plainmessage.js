class PlainMessage {
    constructor(length = null, body = null, isStr = null){
        if(length === null && isStr === null && body !== null){
            this.constructFromBytes(body);
        } else if(body === null && isStr === null && length !== null){
            this.constructFromLen(length);
        } else if(body === null && length !== null && isStr !== null){
            this.constructFromLenIsStr(length, isStr);
        } else if(body !== null && length !== null && isStr !== null){
            construct(length, body, isStr);
        }
    } 

    constructFromBytes(bytes){
        this.length = bytes.length;
        this.body = Buffer.from(bytes);
        this.isStr = false;
    }

    constructFromLen(len){
        this.length = len;
        this.body = Buffer.alloc(this.length);
        this.isStr = false;
    }

    constructFromLenIsStr(len, isStr){
        this.length = len;
        this.isStr = isStr;
        this.body = Buffer.alloc(len);
    }

    construct(len, body, isStr){
        this.length = len;
        this.isStr = isStr;
        this.body = Buffer.from(body);
    }

    fromString(str){
        this.body = Buffer.from(str);
        this.length = this.body.length;
        this.isStr = true;
    }

    toMessageBuffer(){        
        const retBuffer = Buffer.alloc(this.length + 4 + 1); //body + sizeof(int) + sizeof(bool)
        retBuffer.writeInt32LE(this.length, 0);
        retBuffer[4] = this.isStr;        
        this.body.copy(retBuffer, 5);
        //retBuffer[this.length + 4 + 1] = '\0';

        return retBuffer;
    }
}

module.exports = PlainMessage;