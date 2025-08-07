# Giáo trình Tuần 7: Audit Smart Contract cơ bản (30 phút/ngày)

## Mục tiêu
- Hiểu các lỗ hổng bảo mật phổ biến trong smart contract (reentrancy, access control, etc.).
- Làm quen với công cụ audit Slither để phân tích code.
- Thực hành audit contract Voting, tìm và sửa lỗi.
- Nắm quy trình audit cơ bản trước khi deploy lên mainnet.

## Lịch trình học (7 ngày, 30 phút/ngày)

### Ngày 1: Giới thiệu về bảo mật smart contract
**Mục tiêu**: Hiểu các lỗ hổng bảo mật phổ biến.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (10 phút)**: Đọc “Common Vulnerabilities” ([OpenZeppelin](https://docs.openzeppelin.com/learn/developing-smart-contracts#security-considerations)). Các lỗ hổng chính: reentrancy, access control, integer overflow, uninitialized storage.  
- **Thực hành (20 phút)**: Xem lại contract Voting từ Tuần 4 trên Remix IDE. Ghi chú các hàm có rủi ro (VD: `vote`, `addCandidate`) có thể bị tấn công nếu thiếu kiểm tra.  
**Kết quả**: Nhận diện được các lỗ hổng tiềm ẩn trong contract.  

---

### Ngày 2: Lỗ hổng Reentrancy
**Mục tiêu**: Hiểu và phát hiện lỗ hổng reentrancy.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (10 phút)**: Đọc “Reentrancy” ([Consensys](https://consensys.github.io/smart-contract-best-practices/attacks/reentrancy/)). Reentrancy xảy ra khi contract gọi hàm ngoài trước khi cập nhật trạng thái.  
- **Thực hành (20 phút)**: Trong Remix, tạo contract có lỗ hổng reentrancy:  
  ```solidity
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;
  contract Vulnerable {
      mapping(address => uint) public balances;
      function deposit() public payable {
          balances[msg.sender] += msg.value;
      }
      function withdraw() public {
          uint amount = balances[msg.sender];
          (bool success,) = msg.sender.call{value: amount}("");
          require(success, "Transfer failed");
          balances[msg.sender] = 0;
      }
  }
  ```
  Ghi chú: Hàm `withdraw` dễ bị reentrancy vì gửi ETH trước khi cập nhật `balances`.  
**Kết quả**: Hiểu reentrancy và nhận diện rủi ro trong code.  

---

### Ngày 3: Sử dụng OpenZeppelin để tránh Reentrancy
**Mục tiêu**: Sửa lỗi reentrancy bằng OpenZeppelin.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (10 phút)**: Đọc “ReentrancyGuard” ([OpenZeppelin](https://docs.openzeppelin.com/contracts/4.x/api/security#ReentrancyGuard)). `ReentrancyGuard` ngăn chặn gọi lại hàm.  
- **Thực hành (20 phút)**: Sửa contract `Vulnerable` trong Remix:  
  ```solidity
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;
  import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
  contract Safe is ReentrancyGuard {
      mapping(address => uint) public balances;
      function deposit() public payable {
          balances[msg.sender] += msg.value;
      }
      function withdraw() public nonReentrant {
          uint amount = balances[msg.sender];
          require(amount > 0, "No balance");
          balances[msg.sender] = 0;
          (bool success,) = msg.sender.call{value: amount}("");
          require(success, "Transfer failed");
      }
  }
  ```
  Deploy, thử gọi `withdraw`, kiểm tra lỗi.  
**Kết quả**: Biết dùng `ReentrancyGuard` để bảo vệ contract.  

---

### Ngày 4: Cài đặt và sử dụng Slither
**Mục tiêu**: Làm quen với công cụ audit Slither.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (5 phút)**: Đọc “Slither Docs” ([Trail of Bits](https://github.com/crytic/slither)). Slither là công cụ phân tích tĩnh tìm lỗi trong Solidity.  
- **Thực hành (25 phút)**:  
  - Cài Slither: `pip install slither-analyzer`.  
  - Lưu contract Voting (Tuần 4) vào file `Voting.sol` trong thư mục `my-voting-dapp`.  
  - Chạy: `slither Voting.sol`. Xem output để tìm lỗi (VD: missing access control).  
**Kết quả**: Cài đặt và chạy được Slither để phân tích contract.  

---

### Ngày 5: Audit contract Voting
**Mục tiêu**: Audit contract Voting bằng Slither và tay.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (5 phút)**: Ôn “Access Control” ([Consensys](https://consensys.github.io/smart-contract-best-practices/recommendations/)). Kiểm tra quyền truy cập và logic hàm.  
- **Thực hành (25 phút)**:  
  - Chạy Slither trên `Voting.sol` (Tuần 4), ghi chú lỗi (VD: `addCandidate` cần `onlyOwner`).  
  - Kiểm tra tay: Hàm `vote` có kiểm tra `hasVoted` và `candidateId` hợp lệ.  
  - Thêm cải tiến: Giới hạn thời gian bỏ phiếu. Ví dụ:  
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
        uint public votingEndTime;
        event Voted(address indexed voter, uint candidateId);
        constructor(uint _votingDuration) {
            votingEndTime = block.timestamp + _votingDuration;
        }
        function addCandidate(string memory _name) public onlyOwner {
            candidates[candidateCount] = Candidate(_name, 0);
            candidateCount++;
        }
        function vote(uint _candidateId) public {
            require(block.timestamp < votingEndTime, "Voting ended");
            require(_candidateId < candidateCount, "Invalid candidate");
            require(!hasVoted[msg.sender], "Already voted");
            candidates[_candidateId].voteCount++;
            hasVoted[msg.sender] = true;
            emit Voted(msg.sender, _candidateId);
        }
    }
    ```
  Deploy trên Remix, kiểm tra `vote` sau `votingEndTime`.  
**Kết quả**: Audit và cải thiện contract Voting với giới hạn thời gian.  

---

### Ngày 6: Kiểm tra lỗi Access Control
**Mục tiêu**: Phát hiện và sửa lỗi access control.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (5 phút)**: Đọc “Access Control Issues” ([OpenZeppelin](https://docs.openzeppelin.com/learn/developing-smart-contracts#security-considerations)). Lỗi access control xảy ra khi hàm không giới hạn quyền.  
- **Thực hành (25 phút)**:  
  - Trong contract Voting (Ngày 5), thử gọi `addCandidate` từ non-owner trên Remix, xác nhận lỗi `onlyOwner`.  
  - Tạo contract lỗi access control:  
    ```solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;
    contract BadVoting {
        mapping(uint => uint) public votes;
        function addVote(uint _candidateId) public {
            votes[_candidateId]++;
        }
    }
    ```
  - Chạy Slither: `slither BadVoting.sol`, ghi chú lỗi missing access control. Sửa bằng `Ownable`.  
**Kết quả**: Hiểu và sửa lỗi access control trong contract.  

---

### Ngày 7: Quy trình audit trước deploy mainnet
**Mục tiêu**: Thực hành quy trình audit cơ bản.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (5 phút)**: Đọc “Smart Contract Audit Checklist” ([Cyfrin](https://www.cyfrin.io/blog/how-to-become-a-blockchain-solidity-developer)). Quy trình: kiểm tra code, chạy công cụ, test manual.  
- **Thực hành (25 phút)**:  
  - Audit contract Voting (Ngày 5):  
    - Chạy Slither, kiểm tra lỗi (reentrancy, access control, uninitialized variables).  
    - Manual check: Đảm bảo `require` trong `vote`, `onlyOwner` trong `addCandidate`.  
    - Test trên Remix: Thử các trường hợp lỗi (VD: vote sau `votingEndTime`, non-owner gọi `addCandidate`).  
  - Ghi chú các cải tiến cần thiết trước deploy mainnet (VD: thêm `ReentrancyGuard` nếu cần).  
**Kết quả**: Hiểu quy trình audit cơ bản, sẵn sàng chuẩn bị contract cho mainnet.  

---

## Bài tập cuối tuần
1. Viết đoạn ngắn (100 từ):  
   - Reentrancy và access control là gì? Tại sao cần audit trước deploy mainnet?  
2. Chạy Slither trên contract Voting, liệt kê ít nhất 2 lỗi/cảnh báo và đề xuất cách sửa.  
3. Chụp ảnh màn hình output Slither hoặc Remix khi test lỗi trong contract.  

## Kết quả mong đợi
- Hiểu các lỗ hổng phổ biến (reentrancy, access control).  
- Sử dụng Slither để phân tích contract Voting.  
- Audit và cải thiện contract trước khi deploy mainnet.  
- Biết quy trình audit cơ bản và chuẩn bị cho môi trường thực tế.  

## Tài liệu tham khảo
- [OpenZeppelin: Security Considerations](https://docs.openzeppelin.com/learn/developing-smart-contracts#security-considerations)  
- [Consensys: Smart Contract Best Practices](https://consensys.github.io/smart-contract-best-practices/)  
- [Trail of Bits: Slither](https://github.com/crytic/slither)  
- [Cyfrin: Become a Solidity Developer](https://www.cyfrin.io/blog/how-to-become-a-blockchain-solidity-developer)