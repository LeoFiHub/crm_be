

# Giáo trình Tuần 3: Nâng cao Solidity và bảo mật cơ bản (30 phút/ngày)

## Mục tiêu
- Hiểu inheritance, function overriding, và abstract contracts trong Solidity.
- Làm quen với events và cách sử dụng trong smart contract.
- Áp dụng bảo mật cơ bản với OpenZeppelin (Ownable).
- Viết và debug contract Voting trên Remix IDE.

## Lịch trình học (7 ngày, 30 phút/ngày)

### Ngày 1: Inheritance và Function Overriding
**Mục tiêu**: Hiểu cách sử dụng inheritance và overriding.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (10 phút)**: Đọc “Inheritance” ([Alchemy](https://www.alchemy.com/overviews/learn-solidity)). Inheritance cho phép contract kế thừa code từ contract khác, overriding thay đổi hàm.  
- **Thực hành (20 phút)**: Trong [Remix IDE](https://remix.ethereum.org), tạo hai contract:  
  ```solidity
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;
  contract Base {
      uint public number = 10;
      function getNumber() public view virtual returns (uint) {
          return number;
      }
  }
  contract Child is Base {
      function getNumber() public view override returns (uint) {
          return number + 5;
      }
  }
  ```
  Deploy `Child`, gọi `getNumber`, kiểm tra kết quả (15).  
**Kết quả**: Hiểu cách kế thừa và ghi đè hàm trong Solidity.  

---

### Ngày 2: Abstract Contracts
**Mục tiêu**: Hiểu và sử dụng abstract contracts.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (10 phút)**: Đọc “Abstract Contracts” ([Alchemy](https://www.alchemy.com/overviews/learn-solidity)). Abstract contract định nghĩa hàm mà không triển khai, dùng cho kế thừa.  
- **Thực hành (20 phút)**: Trong Remix, tạo abstract contract:  
  ```solidity
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;
  abstract contract Animal {
      function makeSound() public pure virtual returns (string memory);
  }
  contract Dog is Animal {
      function makeSound() public pure override returns (string memory) {
          return "Woof!";
      }
  }
  ```
  Deploy `Dog`, gọi `makeSound`, kiểm tra kết quả ("Woof!").  
**Kết quả**: Biết tạo và sử dụng abstract contract.  

---

### Ngày 3: Events trong Solidity
**Mục tiêu**: Hiểu và sử dụng events để ghi log.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (10 phút)**: Đọc “Events” ([OpenZeppelin](https://docs.openzeppelin.com/learn/developing-smart-contracts)). Events lưu trữ dữ liệu trên blockchain, dùng để theo dõi hoạt động.  
- **Thực hành (20 phút)**: Trong Remix, tạo contract với event:  
  ```solidity
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;
  contract Counter {
      uint public count;
      event CountUpdated(uint newCount, address indexed updater);
      function increment() public {
          count += 1;
          emit CountUpdated(count, msg.sender);
      }
  }
  ```
  Deploy, gọi `increment`, kiểm tra log event trong Remix.  
**Kết quả**: Biết dùng event để ghi lại hành động trong contract.  

---

### Ngày 4: Bảo mật với OpenZeppelin (Ownable)
**Mục tiêu**: Sử dụng OpenZeppelin để thêm bảo mật.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (10 phút)**: Đọc “Access Control” ([OpenZeppelin](https://docs.openzeppelin.com/learn/developing-smart-contracts)). `Ownable` giới hạn quyền truy cập cho owner.  
- **Thực hành (20 phút)**: Trong Remix, dùng OpenZeppelin:  
  ```solidity
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;
  import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
  contract MyContract is Ownable {
      uint public value;
      function setValue(uint _value) public onlyOwner {
          value = _value;
      }
  }
  ```
  Deploy, thử gọi `setValue` từ non-owner, kiểm tra lỗi.  
**Kết quả**: Hiểu cách dùng `Ownable` để bảo mật hàm.  

---

### Ngày 5: Viết contract Voting (Phần 1)
**Mục tiêu**: Bắt đầu viết contract Voting với struct và mapping.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (10 phút)**: Ôn lại struct, mapping ([freeCodeCamp](https://www.freecodecamp.org/news/learn-solidity-handbook/#structs)).  
- **Thực hành (20 phút)**: Trong Remix, tạo contract Voting:  
  ```solidity
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;
  contract Voting {
      struct Candidate {
          string name;
          uint voteCount;
      }
      mapping(uint => Candidate) public candidates;
      uint public candidateCount;
      function addCandidate(string memory _name) public {
          candidates[candidateCount] = Candidate(_name, 0);
          candidateCount++;
      }
  }
  ```
  Deploy, gọi `addCandidate`, kiểm tra dữ liệu trong `candidates`.  
**Kết quả**: Viết được contract Voting với struct và mapping.  

---

### Ngày 6: Viết contract Voting (Phần 2)
**Mục tiêu**: Thêm tính năng vote và event.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (10 phút)**: Ôn lại events ([OpenZeppelin](https://docs.openzeppelin.com/learn/developing-smart-contracts)).  
- **Thực hành (20 phút)**: Trong Remix, mở rộng contract Voting:  
  ```solidity
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;
  contract Voting {
      struct Candidate {
          string name;
          uint voteCount;
      }
      mapping(uint => Candidate) public candidates;
      mapping(address => bool) public hasVoted;
      uint public candidateCount;
      event Voted(address indexed voter, uint candidateId);
      function addCandidate(string memory _name) public {
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
  Deploy, thêm candidate, vote, kiểm tra `voteCount` và log event.  
**Kết quả**: Contract Voting hỗ trợ bỏ phiếu, có event theo dõi.  

---

### Ngày 7: Debug và bảo mật Voting
**Mục tiêu**: Debug contract và thêm bảo mật với OpenZeppelin.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (10 phút)**: Đọc “Debugging” ([OpenZeppelin](https://docs.openzeppelin.com/learn/developing-smart-contracts)). Dùng Remix để tìm lỗi (VD: revert).  
- **Thực hành (20 phút)**: Trong Remix, thêm `Ownable` vào contract Voting:  
  ```solidity
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;
  import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
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
  Deploy, thử gọi `addCandidate` từ non-owner (lỗi), vote, và debug nếu có lỗi (VD: revert).  
**Kết quả**: Biết debug contract và bảo mật với `Ownable`.  

---

## Bài tập cuối tuần
1. Viết đoạn ngắn (100 từ):  
   - Inheritance và events trong Solidity là gì?  
   - OpenZeppelin giúp bảo mật contract như thế nào?  
2. Trong Remix, deploy contract Voting, thêm 2 candidate, vote cho 1 candidate, kiểm tra `voteCount` và log event.  
3. Chụp ảnh màn hình Remix sau khi deploy và gọi hàm `vote`.  

## Kết quả mong đợi
- Hiểu inheritance, abstract contracts, events, và bảo mật với OpenZeppelin.  
- Viết và debug được contract Voting phức tạp hơn.  
- Biết dùng Remix để kiểm tra lỗi và log event.  

## Tài liệu tham khảo
- [Alchemy: Learn Solidity](https://www.alchemy.com/overviews/learn-solidity)  
- [OpenZeppelin: Developing Smart Contracts](https://docs.openzeppelin.com/learn/developing-smart-contracts)  
- [freeCodeCamp: Solidity Handbook](https://www.freecodecamp.org/news/learn-solidity-handbook/)  
- [Remix IDE](https://remix.ethereum.org)  

