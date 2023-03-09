import http from '../utils/http';


export const getNfts = async (address, chain="ETHEREUM", limit=10, cursor=null) => {
   return await http(`/api/get_collection?address=${address}&chain=${chain}&limit=${limit}&cursor=${cursor}`);
}