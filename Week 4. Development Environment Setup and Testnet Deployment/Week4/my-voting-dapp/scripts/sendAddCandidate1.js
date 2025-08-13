// import env
// tao bien vao import thu vien ethers

// thong tin cua contract_address, Abi (chuyển từ smart contract về ABI này, phải có chữ public)
// ham main 
//     provider la sepolia url 
//     wallet la private key va provider 
//     ket noi voi contract bang contract address, abi, wallet 
    
//     goi ham addCandidate voi tham so dau vao (trung voi ABI)
//     cho xac nhan 

//     kiem tra lai candidate vua them => candidate(0)

// goi lam main()

require("dotenv").config();
const {ethers} = require("ethers");

const CONTRACT_ADDRESS = process.env.SMART_CONTRACT_ADDRESS;
const ABI =[
    // =======================mapping(uint => Candidate) public candidates;============
    "function candidates(uint) public view returns (string name, uint voteCount)",
    // =========================function addCandidate(string memory _name) public;=====
    "function addCandidate(string memory _name) public"
];
async function main() {
    const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const voting = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet); // neu chi view, pure thi chi can provider, neu ghi du lieu thi phai co wallet

    const tx = await voting.addCandidate("Truong");
    await tx.wait();

    const candidate = await voting.candidates();
    console.log("Candidate: ", candidate);
}
main().catch(console.error);