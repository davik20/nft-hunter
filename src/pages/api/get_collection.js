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
  
console.log(req.query);

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
  // const address =req.address;
  // const chain = req.chain;
  // const response = await Moralis.EvmApi.nft.getContractNFTs({
  // address,
  // chain,
  // });
  
  // console.log(response.toJSON());
  //   // console.log(Moralis);
  //   res.send(response);
  } catch (error) {
    console.log(error)
  }

}
