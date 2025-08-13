require("dotenv").config();
const { ethers } = require("ethers");

//Ket noi voi Sepolia
const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
//dia chi contract
const contractAddress = process.env.SMART_CONTRACT_ADDRESS;
//dia chi ABI
const abi = [
    "function candidateCount() view returns (uint)" //này 1 là hàm, 2 là biến có chữ public => biến nó sẽ parse ra hàm như này
];
//tao instance cho contract 
const contract = new ethers.Contract(contractAddress, abi, provider);

async function main(){
    const count = await contract.candidateCount();
    console.log("Candidate Count: ", count.toString());
}
main();