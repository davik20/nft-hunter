const Moralis = require("moralis").default;

let started = false;
const startMoralis = async () => {
    if(!started){
        await Moralis.start({
            apiKey: process.env.API_KEY,
            formatEvmAddress: 'checksum',
            formatEvmChainId: 'decimal',
            logLevel: 'verbose'
        });
      started = true;
    } 

   return Moralis;
    
}

module.exports = startMoralis;


