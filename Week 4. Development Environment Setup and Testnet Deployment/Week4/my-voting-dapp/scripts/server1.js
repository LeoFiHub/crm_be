// import dotenv, epress, ethers va khoi tao app express va app.use(expres.json)

// phan contract gom 
//     provider
//     wallet (private_key, provider)
//     contract_address
//     abi (function vote - public, function candidateCount - public view)
//     ket noi voi contract (contract_address, abi, wallet)

// phan api
//     api get so luong candidate -> goi contract.candidateCount()
//     api post vote
//         so candidateCount trong req.body
//         goi contract.vote(candidate_id) -> wait -> res.json(...)

// run app

require("dotenv").config();
const express = require("express");
const {ethers} = require("ethers")
const app = express()
app.use(express.json())

const PROVIDER = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const WALLET = new ethers.Wallet(process.env.PRIVATE_KEY, PROVIDER);
const CONTRACT_ADDRESS = process.env.SMART_CONTRACT_ADDRESS;
const ABI = [
    "function vote(uint _candidateId) public", // ham vote
    "function candidateCount() public view returns (uint)"
];
const CONTRACT = new ethers.Contract(CONTRACT_ADDRESS, ABI, WALLET);

app.get("/candidate-count", async(req, res) => {
    const count = await CONTRACT.candidateCount();
    res.json({
        candidateCount: count.toString()
    });
});
app.post("/vote", async(req, res) => {
    const {candidateId} = req.body;
    try{
        const tx = await CONTRACT.vote(candidateId);
        await tx.wait()
        res.json({
            message: `Voted for candidate: ${candidateId}`
        });
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.get("/", async(req,res) => {
    res.json({
        message : "Server running!"
    })
});
app.listen(3001, () => 
    console.log("Server running on port 3001")
);

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
});