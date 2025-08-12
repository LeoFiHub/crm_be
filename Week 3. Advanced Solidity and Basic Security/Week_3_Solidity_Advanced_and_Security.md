

# Giáo trình Tuần 3: Nâng cao Solidity và bảo mật cơ bản (30 phút/ngày)

## Mục tiêu
- Hiểu inheritance, function overriding, và abstract contracts trong Solidity.
- Làm quen với events và cách sử dụng trong smart contract.
- Áp dụng bảo mật cơ bản với OpenZeppelin (Ownable).
- Viết và debug contract Voting trên Remix IDE.

## Lịch trình học (7 ngày, 30 phút/ngày)

- [x] ==Ngày 1: Inheritance và Function Overriding==
**Mục tiêu**: Hiểu cách sử dụng inheritance và overriding.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (10 phút)**: Đọc “Inheritance” ([Alchemy](https://www.alchemy.com/overviews/learn-solidity)).         
    1. **Inheritance** cho phép contract kế thừa code, biến và hàm từ contract khác.
    2. **Contract con** có thể ghi đè hàm của contract cha bằng từ khóa `override`. **Contract cha** phải đánh dấu hàm là `virtual` để cho phép ghi đè.
- **Thực hành (20 phút)**: Trong [Remix IDE](https://remix.ethereum.org), tạo hai file contract là `Base.sol` và `Child.sol`. Deploy `Base` trước, sau đó deploy `Child` kế thừa từ `Base`. Gọi hàm `getNumber` từ `Child` để kiểm tra kết quả (15).  :  
    ```solidity
  //Base.sol
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;
    contract Base{
        uint public count = 10;
        //phải có từ khóa virtual
        function getNumber() public view virtual returns (uint) {
            return count;
        }
    }
    ```
    ```solidity
    //Child.sol
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;
    import 'contracts/Week3/Base.sol'; // import file contract
    contract Child is Base{
        //phải có từ khóa override
        function getNumber() public view override returns (uint){
            return count + 10; //lấy biến count bên Base + 10
        }
    }
    ```
  
    **Kết quả**: Hiểu cách kế thừa và ghi đè hàm trong Solidity.  
---

- [x] ==Ngày 2: Abstract Contracts==
**Mục tiêu**: Hiểu và sử dụng abstract contracts.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (10 phút)**: Đọc “Abstract Contracts” ([Alchemy](https://www.alchemy.com/overviews/learn-solidity)). 
    1. **Abstract contract** là contract **không thể deploy** trực tiếp, ==chứa ít nhất một hàm== chưa được định nghĩa (abstract function). Chứa `abstract` trước từ khóa `contract` và `virtual` trước hàm chưa định nghĩa.
    2. **Contract con** phải định nghĩa lại hàm abstract bằng từ khóa `override`.
    ```solidity
    // abstract contract Animal.sol
    abstract contract Animal {
        function makeSound() public pure virtual returns (string memory);
    }
    // contract con Dog.sol
    contract Dog is Animal {
        function makeSound() public pure override returns (string memory) {
            return "Woof!";
        }
    }
    ```    
- **Thực hành (20 phút)**: Trong Remix, tạo abstract contract.  Deploy `Dog`, gọi `makeSound`, kiểm tra kết quả ("Woof!").:  
  ```solidity
  // SPDX-License-Identifier: MIT
  // Animal.sol
    pragma solidity ^0.8.0;
    abstract contract Animal{ // có từ khóa abstract - contract cha
        function makeSound() public pure  virtual returns (string memory){ //có từ khóa virtual
            //không có thân hàm
        }
    }
  ```
    ```solidity
    // SPDX-License-Identifier: MIT
    // Dog.sol
    import 'contracts/Week3/Animal.sol';
    pragma solidity ^0.8.0;
    //kế thừa có chữ is
    contract Dog is Animal{
        function makeSound() public pure  override returns (string memory){ // có chữ override
            return "GAU GAU GAU";
        }
    }
    ```
- [x] ==Ngày 3: Events trong Solidity==
**Mục tiêu**: Hiểu và sử dụng events để ghi log.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (10 phút)**: Đọc “Events” ([OpenZeppelin](https://docs.openzeppelin.com/learn/developing-smart-contracts)).
    1. **Event** là cầu nối giữa smart contract và ứng dụng bên ngoài (frontend, backend). 
    2. **Event** không thay đổi dữ liệu.
    3. **Event** chỉ được ghi ==khi **transaction** thành công.==
    4. Khai báo event với từ khóa `event`, có thể chỉ định `indexed` để lọc dễ dàng hơn. Phát ra event bằng từ khóa `emit`.
    5. Một transaction có thể phát nhiều event.
    ```solidity
- **Thực hành (20 phút)**: Trong Remix, tạo contract với event. Deploy, gọi `increment`, kiểm tra log event trong Remix.  :  
    ```solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;
    contract Counter{
        uint public count; //biến đếm
        
        // event là từ khóa dùng để khai báo
        // CountUpdated là tên hàm
        // indexed dùng để dễ lọc log
        event CountUpdated(uint newCount, address indexed caller); 
        
        //hàm tăng giá trị
        function increment() public {
            count = count + 1;
            //emit là từ khóa dùng để phát emit
            emit CountUpdated(count, msg.sender); 
        }
    }
    //==================output===============
    // Khi gọi hàm increment lần 1:
    [
        {
            "from": "0x1c91347f2A44538ce62453BEBd9Aa907C662b4bD",
            "topic": "0xd48bf218b0b7d9728853fd07bbded14323db759dce9fb46adcacf119fdb15cfd",
            "event": "CountUpdated",
            "args": {
                "0": "1", // chú ý chỗ này
                "1": "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4" //chú ý chỗ này
            }
        }
    ]
    // Khi gọi increment lần 2:
    [
        {
            "from": "0x1c91347f2A44538ce62453BEBd9Aa907C662b4bD",
            "topic": "0xd48bf218b0b7d9728853fd07bbded14323db759dce9fb46adcacf119fdb15cfd",
            "event": "CountUpdated",
            "args": {
                "0": "2", //chú ý chỗ này
                "1": "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4" //chú ý chỗ này
            }
        }
    ]
    ```
**Kết quả**: Biết dùng event để ghi lại hành động trong contract.

---
- [x] ==Ngày 4: Bảo mật với OpenZeppelin (Ownable)==
**Mục tiêu**: Sử dụng OpenZeppelin để thêm bảo mật.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (10 phút)**: Đọc “Access Control” ([OpenZeppelin](https://docs.openzeppelin.com/learn/developing-smart-contracts)). 
    1. `Ownable` giới hạn quyền truy cập cho owner.
- **Thực hành (20 phút)**: Trong Remix, dùng OpenZeppelin:  
  ```solidity
  // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;
    import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
    contract MyContract is Ownable{
        uint public value;
        constructor(address initialOwner) Ownable(initialOwner){
            initialOwner = msg.sender;
        }

        function setValue(uint _value) public onlyOwner{
            value = _value;
        }
    }

  ```
  Deploy, thử gọi `setValue` từ non-owner, kiểm tra lỗi.  
**Kết quả**: Hiểu cách dùng `Ownable` để bảo mật hàm.  

---

- [x] ==Ngày 5: Viết contract Voting (Phần 1)==
**Mục tiêu**: Bắt đầu viết contract Voting với struct và mapping.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (10 phút)**: Ôn lại struct, mapping ([freeCodeCamp](https://www.freecodecamp.org/news/learn-solidity-handbook/#structs)).  
    1. **Struct** là kiểu dữ liệu tùy chỉnh, chứa nhiều trường khác nhau.
        ```solidity
            //khai báo
            struct Person {
                string name;
                uint age;
            }
            //khởi tạo
            Person memory newPerson = Person("Alice", 30);
        ```
    2. **Mapping** là cấu trúc dữ liệu ánh xạ khóa đến giá trị, giống như dictionary trong Python.
        ```solidity
            //khai báo
            mapping(address => uint) public balances;
            //khởi tạo
            balances[msg.sender] = 100; //gán giá trị
        ```
- **Thực hành (20 phút)**: Trong Remix, tạo contract Voting. Deploy, gọi `addCandidate`, kiểm tra dữ liệu trong `candidates`:  
    ```solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;
    contract Voting{
        // tạo 1 struct Candidate
        // tạo 1 mapping (mảng) lưu thông tin của từ candidate
        // tạo 1 biến đếm số lượng candidate
        // tạo 1 function addCandidate gồm số thứ tự và địa chỉ có ví đó
        // tạo 1 function getAllCandidate 

        struct Candidate{
            string name;
            uint voteCount;
        }
        mapping(uint => Candidate) public candidates; // một mảng lưu các đối tượng Candidate
        uint public candidatesCount;

        function addCandidate(string memory _name) public {
            candidates[candidatesCount] = Candidate(_name, 0);
            candidatesCount = candidatesCount + 1;
        }

        function getAllCandidate() public view returns (Candidate[] memory) {
            //mapping không thể duyệt và trả về toàn bộ dữ liệu, nên phải tạo một mảng tạm
            Candidate[] memory result = new Candidate[](candidatesCount);
            for (uint i = 0; i < candidatesCount; i++) {
                result[i] = candidates[i];
            }
            return result;
        }

    }
    ```
**Kết quả**: Viết được contract Voting với struct và mapping.  

---

- [ ] ==Ngày 6: Viết contract Voting (Phần 2)==
**Mục tiêu**: Thêm tính năng vote và event.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (10 phút)**: Ôn lại events ([OpenZeppelin](https://docs.openzeppelin.com/learn/developing-smart-contracts)).  
- **Thực hành (20 phút)**: Trong Remix, mở rộng contract Voting:  
  ```solidity
  // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;
    contract Voting{
        // tạo 1 struct Candidate
        // tạo 1 mapping (mảng) lưu thông tin của từ candidate
        // tạo 1 biến đếm số lượng candidate (candidateCount)
        // tạo 1 function addCandidate (nhận vào tên của candidate)
        // tạo 1 function getAllCandidate 

        //tạo 1 biến mapping hasVoted để kiểm tra người dùng đã có vote hay chưa. thông tin là address của người đó
        // tạo 1 event người nào vote (voter), vote cho người nào (candidateId)
        // hàm vote nhận vào giá trị id của candidate cần vote (candidateId) 
        //=> kiểm tra id có lớn hơn số lượng hiện có không, có vote rồi chưa (biến hasVoted), cộng số phiếu cho candidate đó, đổi status lại là true cho hasVoted, emit thông tin msg.sender và candidateId


        struct Candidate{
            string name;
            uint voteCount;
        }
        mapping(uint => Candidate) public candidates; // một mảng lưu các đối tượng Candidate
        uint public candidatesCount;
        mapping(address => bool) public hasVoted; // mapping (type_data => type_data)
        event Voted(address indexed voter, uint candidateId);

        function addCandidate(string memory _name) public {
            candidates[candidatesCount] = Candidate(_name, 0); // tạo đối tượng Candidate với tên và số phiếu = 0 ban đầu
            candidatesCount = candidatesCount + 1;
        }

        function vote(uint _candidateId) public {
            require(_candidateId < candidatesCount, "Error! Invalid candidate");
            require(!hasVoted[msg.sender], "Error! Already voted");
            candidates[_candidateId].voteCount++; //candidates là mảng -> thêm [] thành 1 đối tượng Candidate -> mới truy vấn được biến voteCount
            hasVoted[msg.sender] = true; // đánh dấu địa chỉ đã vote
            emit Voted(msg.sender, _candidateId); // phát sự kiện Voted

        }

        function getAllCandidate() public view returns (Candidate[] memory) {
            //mapping không thể duyệt và trả về toàn bộ dữ liệu, nên phải tạo một mảng tạm
            Candidate[] memory result = new Candidate[](candidatesCount);
            for (uint i = 0; i < candidatesCount; i++) {
                result[i] = candidates[i];
            }
            return result;
        }

    }
  ```
  Deploy, thêm candidate, vote, kiểm tra `voteCount` và log event.  
**Kết quả**: Contract Voting hỗ trợ bỏ phiếu, có event theo dõi.  

---

- [x] ==Ngày 7: Debug và bảo mật Voting==
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

