require("dotenv").config();
const { ethers } = require("ethers");

// Thông tin contract
// const CONTRACT_ADDRESS = "ĐỊA_CHỈ_CONTRACT_CỦA_BẠN"; // Thay bằng địa chỉ contract Voting đã deploy
const CONTRACT_ADDRESS = process.env.SMART_CONTRACT_ADDRESS; // Thay bằng địa chỉ contract Voting đã deploy
const ABI = [
  "function addCandidate(string memory _name) public",
  "function candidates(uint) public view returns (string name, uint voteCount)"
];

async function main() {
  // Kết nối tới Sepolia qua Infura/Alchemy hoặc RPC
  const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  // Kết nối contract
  const voting = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

  // Gọi hàm addCandidate
  const tx = await voting.addCandidate("Nguyen"); // hàm addCandidate trùng với trên ABI
  await tx.wait(); // Chờ xác nhận

  // Kiểm tra lại candidate vừa thêm
  const candidate = await voting.candidates(0);
  console.log("Candidate:", candidate);
}

main().catch(console.error);