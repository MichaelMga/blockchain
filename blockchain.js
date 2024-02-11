const crypto = require("crypto");


class Block {

   constructor(data, previousHash){
      this.data = data;
      this.previousHash = previousHash;
      this.nonce = 0;
      this.hash = this.calculateHash();
      this.timeStamp = Date.now();
   }

   calculateHash(){
      return crypto.createHash('sha256').update(this.data + this.nonce + this.previousHash + this.timeStamp).digest('hex');
   }

   mineBlock(){

      while(!this.hash.startsWith('0000')){
        this.nonce++;
        this.hash = this.calculateHash();
      }

   }

}


class Blockchain {

   constructor(){
      const originBlock = this.createOriginBlock();
      originBlock.mineBlock();
      this.chain = [originBlock]
   }

   createOriginBlock(){
     return new Block("origin block", "0000");
   };

   addBlock(data){
      if(this.chain.length === 0){
         console.log("votre chaine ne devrait pas être vide")
         return;
      }
      const lastBlock = this.chain[this.chain.length - 1];
      const block = new Block(data, lastBlock.hash);
      block.mineBlock();
      this.chain.push(block);
   }



    checkForChainValidity(){

         for(let index = 0; index < this.chain.length; index++) {

            const block = this.chain[index];
 
            if(block.hash !== block.calculateHash() || !block.hash.startsWith('0000') || index > 0 && block.previousHash !== this.chain[index - 1].hash ){
               return false;
            } 

         }
         
      return true;

    }
}
