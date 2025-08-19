

# Giáo trình Tuần 5: Kết nối smart contract với backend (Node.js) (30 phút/ngày)

## Mục tiêu
- Cài đặt Node.js và ethers.js để tương tác với smart contract.
- Viết script Node.js đọc state và gửi transaction cho contract Voting.
- Tạo API cơ bản bằng Express để gọi hàm contract.
- Xử lý lỗi cơ bản (gas, network).

## Lịch trình học (7 ngày, 30 phút/ngày)

- [x] ==Ngày 1: Cài đặt Node.js và ethers.js==
**Mục tiêu**: Thiết lập môi trường Node.js và ethers.js.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (5 phút)**: Đọc “What is ethers.js” ([QuickNode](https://www.quicknode.com/guides/ethereum-development/getting-started/what-is-the-ethereum-virtual-machine-evm)). Ethers.js là thư viện để tương tác với blockchain Ethereum.  
- **Thực hành (25 phút)**:  
  - Đảm bảo Node.js đã cài (từ Tuần 4). Kiểm tra: `node -v`.  
  - Trong thư mục dự án `my-voting-dapp` (từ Tuần 4), cài ethers.js: `npm install ethers`.  
  - Tạo file `index.js`:  
    ```javascript
    const { ethers } = require("ethers");
    console.log("Ethers.js installed successfully!");
    ```
  - Chạy: `node index.js`, kiểm tra console.  
**Kết quả**: Môi trường Node.js và ethers.js sẵn sàng.  

---

- [x] ==Ngày 2: Đọc state từ contract Voting==
**Mục tiêu**: Dùng ethers.js đọc state từ contract.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (5 phút)**: Đọc “Reading from Contracts” ([DappUniversity](https://www.dappuniversity.com/articles/solidity-tutorial)). 
  1. Dùng ethers.js để gọi hàm view.  
- **Thực hành (25 phút)**: Trong `index.js`, viết script đọc `candidateCount`:  
  ```javascript
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
  ```
  Chạy: `node index.js`, kiểm tra kết quả.  
**Kết quả**: Đọc được `candidateCount` từ contract Voting trên Sepolia.  

---

- [x] ==Ngày 3: Gửi transaction đến contract Voting==
**Mục tiêu**: Gửi transaction (vote) bằng ethers.js.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (5 phút)**: Đọc “Writing to Contracts” ([QuickNode](https://www.quicknode.com/guides/ethereum-development/smart-contracts/an-overview-of-how-smart-contracts-work-on-ethereum)). Cần signer để gửi transaction.  
- **Thực hành (25 phút)**: Sửa `index.js` để gọi hàm `vote`:  
  ```javascript
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
  ```
  Chạy: `node index.js`, kiểm tra console và [Sepolia Etherscan](https://sepolia.etherscan.io/).  
**Kết quả**: Gửi transaction `vote`, kiểm tra `voteCount` cập nhật.  

---

- [x] ==Ngày 4: Tạo API cơ bản với Express==
**Mục tiêu**: Tạo API để đọc `candidateCount`.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (5 phút)**: Đọc “Express Basics” ([DappUniversity](https://www.dappuniversity.com/articles/solidity-tutorial)). Express là framework để tạo API.  
- **Thực hành (25 phút)**:  
  - Cài Express: `npm install express`.  
  - Tạo file `server.js`:  
    ```javascript
    const express = require("express");
    const { ethers } = require("ethers");
    const app = express();
    const provider = new ethers.providers.JsonRpcProvider("https://rpc.sepolia.org");
    const contractAddress = "YOUR_CONTRACT_ADDRESS";
    const abi = ["function candidateCount() view returns (uint)"];
    const contract = new ethers.Contract(contractAddress, abi, provider);
    app.get("/candidate-count", async (req, res) => {
      const count = await contract.candidateCount();
      res.json({ candidateCount: count.toString() });
    });
    app.listen(3000, () => console.log("Server running on port 3000"));
    ```
  - Chạy: `node server.js`. Truy cập `http://localhost:3000/candidate-count` trên trình duyệt.  
**Kết quả**: API trả về `candidateCount` từ contract.  

---

### Ngày 5: Mở rộng API để vote
**Mục tiêu**: Thêm endpoint để gửi transaction `vote`.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (5 phút)**: Ôn lại transaction ([QuickNode](https://www.quicknode.com/guides/ethereum-development/smart-contracts/an-overview-of-how-smart-contracts-work-on-ethereum)).  
- **Thực hành (25 phút)**: Sửa `server.js`:  
  ```javascript
  const express = require("express");
  const { ethers } = require("ethers");
  const app = express();
  app.use(express.json());
  const provider = new ethers.providers.JsonRpcProvider("https://rpc.sepolia.org");
  const wallet = new ethers.Wallet("YOUR_PRIVATE_KEY", provider);
  const contractAddress = "YOUR_CONTRACT_ADDRESS";
  const abi = [
    "function vote(uint _candidateId) public",
    "function candidateCount() view returns (uint)"
  ];
  const contract = new ethers.Contract(contractAddress, abi, wallet);
  app.get("/candidate-count", async (req, res) => {
    const count = await contract.candidateCount();
    res.json({ candidateCount: count.toString() });
  });
  app.post("/vote", async (req, res) => {
    const { candidateId } = req.body;
    try {
      const tx = await contract.vote(candidateId);
      await tx.wait();
      res.json({ message: `Voted for candidate ${candidateId}` });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  app.listen(3000, () => console.log("Server running on port 3000"));
  ```
  Test endpoint `/vote` bằng Postman hoặc curl:  
  ```bash
  curl -X POST http://localhost:3000/vote -H "Content-Type: application/json" -d '{"candidateId":0}'
  ```
**Kết quả**: API hỗ trợ đọc và gửi transaction `vote`.  

---

### Ngày 6: Xử lý lỗi (gas, network)
**Mục tiêu**: Debug lỗi khi tương tác với contract.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (5 phút)**: Đọc “Error Handling” ([DappUniversity](https://www.dappuniversity.com/articles/solidity-tutorial)). Lỗi phổ biến: gas limit, revert, network.  
- **Thực hành (25 phút)**:  
  - Trong `server.js`, cố ý gửi `vote` với `candidateId` không hợp lệ (VD: 999). Quan sát lỗi trong console.  
  - Thêm kiểm tra trước khi gửi transaction:  
    ```javascript
    app.post("/vote", async (req, res) => {
      const { candidateId } = req.body;
      try {
        const count = await contract.candidateCount();
        if (candidateId >= count) {
          return res.status(400).json({ error: "Invalid candidate ID" });
        }
        const tx = await contract.vote(candidateId);
        await tx.wait();
        res.json({ message: `Voted for candidate ${candidateId}` });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
    ```
  - Test lại endpoint `/vote` với ID hợp lệ và không hợp lệ.  
**Kết quả**: Biết xử lý lỗi cơ bản khi gửi transaction.  

---

### Ngày 7: Ôn tập và kiểm tra API
**Mục tiêu**: Củng cố và kiểm tra API.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (5 phút)**: Ôn lại ethers.js và Express ([QuickNode](https://www.quicknode.com/guides/ethereum-development/smart-contracts/an-overview-of-how-smart-contracts-work-on-ethereum)).  
- **Thực hành (25 phút)**:  
  - Chạy `server.js`, test cả hai endpoint:  
    - GET `/candidate-count` trên trình duyệt.  
    - POST `/vote` với Postman/curl cho candidate hợp lệ.  
  - Kiểm tra transaction trên [Sepolia Etherscan](https://sepolia.etherscan.io/) bằng hash từ console.  
  - Ghi chú lỗi gặp phải (nếu có) và cách khắc phục.  
**Kết quả**: API hoạt động ổn định, tương tác được với contract Voting.  

---

## Bài tập cuối tuần
1. Viết đoạn ngắn (100 từ):  
   - Ethers.js giúp tương tác với smart contract như thế nào?  
   - API Express dùng để làm gì trong dApp?  
2. Chạy API, test endpoint `/vote` với candidate hợp lệ, lưu transaction hash từ [Sepolia Etherscan](https://sepolia.etherscan.io/).  
3. Chụp ảnh màn hình console khi chạy `server.js` và kết quả API.  

## Kết quả mong đợi
- Viết script Node.js đọc state và gửi transaction cho contract Voting.  
- Tạo API Express để gọi hàm contract (`candidateCount`, `vote`).  
- Xử lý được lỗi cơ bản (gas, invalid input).  
- Tương tác thành công với contract trên Sepolia qua backend.  

## Tài liệu tham khảo
- [QuickNode: Ethers.js Guide](https://www.quicknode.com/guides/ethereum-development/smart-contracts/an-overview-of-how-smart-contracts-work-on-ethereum)  
- [DappUniversity: Solidity Tutorial](https://www.dappuniversity.com/articles/solidity-tutorial)  
- [Sepolia Etherscan](https://sepolia.etherscan.io/)  

