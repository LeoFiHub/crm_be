// import express, ethers
// chay app bang app = express()

// phan ethers gom provider, dia chi contract, abi (lay cai candidateCount), goi contract

// phan express: tao mot cai get api 
// chay app

const express = require("express");
const {ethers} = require("ethers");
require("dotenv").config();
const app = express()

const PROVIDER = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const CONTRACT_ADDRESS = process.env.SMART_CONTRACT_ADDRESS;
const ABI = [
    "function candidateCount() view returns (uint)"
];
// console.log(CONTRACT_ADDRESS, ABI, PROVIDER);
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, PROVIDER);

app.get("/candidate-count", async(req, res) =>{
    const count = await contract.candidateCount();
    res.json({
        candidateCount: count.toString()
    })
});
app.listen(3000, () => 
    console.log("Server running on port 3000")
);