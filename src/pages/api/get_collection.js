// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


const startMoralis = require('./startMoralis');
const { EvmChain } = require("@moralisweb3/common-evm-utils");
let started = false;
export default async function handler(req, res) {
  if(req)
  try {
    const Moralis = await startMoralis();




  let {address, chain, limit, cursor} = req.query;
  if(cursor === "null"){
    cursor = null;
  }

  console.log(address)
  

  let _chain;

  console.log(EvmChain)

 switch (chain) {
  case "ETHEREUM":
    _chain = EvmChain.create(1);
    break;
  case "BSC":
    _chain = EvmChain.create(56);
    break;
  case "MATIC":
    _chain = EvmChain.create(137);
    break;
  case "AVALANCHE":
    _chain = EvmChain.create(43114);
    break;
  default:
    break;
 }



  const response = await Moralis.EvmApi.nft.getContractNFTs({
    address,
    chain: _chain,
    limit,
    cursor:cursor 
});



res.status(200).send(response.toJSON())

  } catch (error) {
    console.log(error)
    res.status(500).send();
  }

}
