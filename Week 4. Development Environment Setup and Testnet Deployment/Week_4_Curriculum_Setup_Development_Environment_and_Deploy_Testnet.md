- Giáo trình Tuần 4: Thiết lập môi trường phát triển và deploy testnet (30 phút/ngày)

## Mục tiêu

- Cài đặt môi trường phát triển: VS Code, Hardhat, MetaMask.
- Viết script để compile và deploy smart contract.
- Deploy contract Voting lên testnet Sepolia.
- Viết unit test cơ bản cho contract.

## Lịch trình học (7 ngày, 30 phút/ngày)

- [x] ==Ngày 1: Cài đặt VS Code và Node.js==

**Mục tiêu**: Chuẩn bị môi trường phát triển cơ bản.\
**Hoạt động (30 phút)**:

- **Lý thuyết (5 phút)**: Đọc nhanh “Setting up Hardhat” (Hardhat Docs). Hardhat là framework để compile, deploy, test contract.
- **Thực hành (25 phút)**:
  - Cài VS Code (VS Code).
  - Cài Node.js (phiên bản LTS) (Node.js).
  - Kiểm tra cài đặt: Mở terminal, chạy `node -v` và `npm -v`.
  - Cài extension Solidity cho VS Code (RapidInnovation).\
    **Kết quả**: VS Code và Node.js được cài đặt, sẵn sàng cho Hardhat.

---

- [x] ==Ngày 2: Cài đặt Hardhat==

**Mục tiêu**: Thiết lập dự án Hardhat.\
**Hoạt động (30 phút)**:

- **Lý thuyết (5 phút)**: Đọc “Getting Started” (Hardhat Docs).
  1. **Hardhat** là framework giúp tự động hóa các bước phát triển smart contract: compile, deploy, test, debug.
  2. Chỉ hỗ trợ chủ yếu **Solidity**, không hỗ trợ tất cả.
- **Thực hành (25 phút)**:
  - Mở terminal, tạo thư mục dự án: `mkdir my-voting-dapp && cd my-voting-dapp`.
  - Khởi tạo dự án: `npm init -y`.
  - Cài Hardhat: `npm install --save-dev hardhat` => này cho phép sử dụng Hardhat trong dự án.
  - Chạy `npx hardhat` và chọn “Create a JavaScript project”.
  - Kiểm tra cấu trúc thư mục: `contracts/`, `scripts/`, `test/`. Chỉ có thư mục `contracts/`, `test/` được tạo, `scripts/` không có.
    **Kết quả**: Dự án Hardhat được thiết lập, sẵn sàng viết contract.

---

- [x] ==Ngày 3: Viết contract Voting trong Hardhat==

**Mục tiêu**: Chuyển contract Voting sang Hardhat.\
**Hoạt động (30 phút)**:

- **Lý thuyết (5 phút)**: Ôn lại contract Voting (Solidity_Learning_Roadmap.md).
- **Thực hành (25 phút)**: Trong thư mục `contracts/`, tạo file `Voting.sol`:

  ```solidity
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;
  import "@openzeppelin/contracts/access/Ownable.sol";
  contract Voting is Ownable {
      struct Candidate {
          string name;
          uint voteCount;
      }
      mapping(uint => Candidate) public candidates;
      mapping(address => bool) public hasVoted;
      uint public candidateCount;
      event Voted(address indexed voter, uint candidateId);
      function addCandidate(string memory _name) public onlyOwner {
          candidates[candidateCount] = Candidate(_name, 0);
          candidateCount++;
      }
      function vote(uint _candidateId) public {
          require(_candidateId < candidateCount, "Invalid candidate");
          require(!hasVoted[msg.sender], "Already voted");
          candidates[_candidateId].voteCount++;
          hasVoted[msg.sender] = true;
          emit Voted(msg.sender, _candidateId);
      }
  }
  ```

  Cài OpenZeppelin: `npm install @openzeppelin/contracts`.\
  Compile contract: `npx hardhat compile`.\
  **Kết quả**: Contract Voting được viết và compile trong Hardhat.

---

- [x] Ngày 4: Cấu hình MetaMask và Testnet Sepolia

**Mục tiêu**: Kết nối MetaMask với testnet Sepolia.\
**Hoạt động (30 phút)**:

- **Lý thuyết (5 phút)**: Đọc “Testnets” (RapidInnovation). Sepolia là testnet để thử nghiệm.
- **Thực hành (25 phút)**:
  - Cài MetaMask (MetaMask Docs).
  - Thêm mạng Sepolia: RPC URL (`https://rpc.sepolia.org`), Chain ID (`11155111`).
  - Lấy test ETH từ Sepolia Faucet.
  - Kiểm tra số dư trong MetaMask.\
    **Kết quả**: MetaMask kết nối Sepolia, có test ETH.

---

- [x] ==Ngày 5: Viết script deploy lên Sepolia==

**Mục tiêu**: Deploy contract Voting lên Sepolia.\
**Hoạt động (30 phút)**:

- **Lý thuyết (5 phút)**: Đọc “Deploying Contracts” (Hardhat Docs). 
1. Script deploy tự động hóa triển khai.
2. SEPOLIA_RPC_URL: lấy ở trang `https://developer.metamask.io/key/active-endpoints`
3. ETHERSCAN_API_KEY: lấy ở trang `https://etherscan.io/apidashboard`.
- **Thực hành (25 phút)**:
  - Trong `hardhat.config.js`, thêm cấu hình Sepolia:

    ```javascript
    require('dotenv').config();
    require("@nomicfoundation/hardhat-toolbox");
    require("@nomicfoundation/hardhat-verify");

    /** @type import('hardhat/config').HardhatUserConfig */
    module.exports = {
      solidity: "0.8.28",
      networks:{
        sepolia: {
          url: process.env.SEPOLIA_RPC_URL, // lấy dữ liệu bên .env file
          accounts: [process.env.PRIVATE_KEY],
        }
      },
      etherscan:{
        apiKey: process.env.ETHERSCAN_API_KEY
      }
    };
    ```
  - Trong `scripts/`, tạo file `deploy.js`:

    ```javascript
    const hre = require("hardhat");
    async function main() {
        const Voting = await hre.ethers.getContractFactory("Voting");
        // Tăng gas price lên 30 gwei (hoặc giá trị bạn muốn)
        const overrides = { gasPrice: hre.ethers.parseUnits("5", "gwei") };
        const voting = await Voting.deploy(overrides);
        await voting.waitForDeployment(); // Sửa lại dòng này
        console.log("Voting deployed to:", await voting.getAddress());
    }
    main().catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
    ```
  - **Chạy để deploy**: `npx hardhat run scripts/deploy.js --network sepolia`.
  - **Verify code**: `npx hardhat verify --network sepolia ĐỊA_CHỈ_CONTRACT "constructor arguments nếu có"`
  - Lưu địa chỉ contract từ console.\
    **Kết quả**: Deploy contract Voting lên Sepolia, có địa chỉ contract.

---

- [x] ==Ngày 6: Viết unit test cho contract==

**Mục tiêu**: Viết unit test cơ bản cho Voting.\
**Hoạt động (30 phút)**:

- **Lý thuyết (5 phút)**: Đọc “Testing Contracts” (Hardhat Docs). 
1. Unit test kiểm tra logic contract.
2. Deploy contract trong môi trường test (local để test) để kiểm tra.
    1. Chạy Hardhat node local: `npx hardhat node`
    2. Deploy contract lên node local: `npx hardhat run scripts/deploy.js --network localhost`
    3. Kiểm tra: `npx hardhat console --network localhost`
    4. Chạy test: `npx hardhat test`
- **Thực hành (25 phút)**: Trong `test/`, tạo file `Voting.test.js`:

  ```javascript
  const { expect } = require("chai");
  describe("Voting", function () {
    let Voting, voting, owner, addr1;
    beforeEach(async function () {
      Voting = await ethers.getContractFactory("Voting");
      [owner, addr1] = await ethers.getSigners();
      voting = await Voting.deploy();
      await voting.deployed();
    });
    it("Should add candidate", async function () {
      await voting.addCandidate("Alice");
      const candidate = await voting.candidates(0);
      expect(candidate.name).to.equal("Alice");
    });
    it("Should allow voting", async function () {
      await voting.addCandidate("Alice");
      await voting.vote(0);
      const candidate = await voting.candidates(0);
      expect(candidate.voteCount).to.equal(1);
    });
  });
  ```

  Chạy test: `npx hardhat test`.\
  **Kết quả**: Viết và chạy được unit test cho contract Voting.

---

### Ngày 7: Kiểm tra và debug trên Sepolia

**Mục tiêu**: Kiểm tra contract trên Sepolia và debug lỗi.\
**Hoạt động (30 phút)**:

- **Lý thuyết (5 phút)**: Đọc “Debugging” (RapidInnovation). Dùng Etherscan để kiểm tra contract.
- **Thực hành (25 phút)**:
  - Truy cập Sepolia Etherscan, nhập địa chỉ contract từ Ngày 5, kiểm tra giao dịch deploy.
  - Trong Remix, import contract Voting, kết nối MetaMask (Sepolia), gọi `addCandidate`, `vote`, kiểm tra kết quả.
  - Nếu gặp lỗi (VD: gas limit, revert), debug bằng Remix (xem log lỗi).\
    **Kết quả**: Xác minh contract trên Sepolia, biết debug lỗi cơ bản.

---

## Bài tập cuối tuần

1. Viết đoạn ngắn (100 từ):
   - Hardhat giúp gì trong phát triển smart contract?
   - Tại sao cần testnet như Sepolia?
2. Deploy contract Voting lên Sepolia, lưu địa chỉ contract, kiểm tra trên Sepolia Etherscan.
3. Chạy unit test trong Hardhat, chụp ảnh màn hình kết quả test thành công.

## Kết quả mong đợi

- Cài đặt thành công VS Code, Hardhat, MetaMask.
- Deploy contract Voting lên Sepolia, có địa chỉ contract.
- Viết và chạy được unit test cơ bản.
- Biết kiểm tra contract trên Etherscan và debug lỗi.

## Tài liệu tham khảo

- Hardhat Docs
- RapidInnovation: Create a Smart Contract
- Sepolia Faucet
- MetaMask Docs
- Sepolia Etherscan