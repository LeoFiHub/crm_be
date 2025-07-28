

# Giáo trình Tuần 2: Làm quen với Solidity và viết contract cơ bản (30 phút/ngày)

## Mục tiêu
- Hiểu cú pháp cơ bản của Solidity: contract, state variables, functions, visibility.
- Nắm các kiểu dữ liệu: uint, address, mapping, arrays, structs.
- Viết và triển khai (deploy) smart contract đơn giản trên Remix IDE.
- Hiểu modifier, require, và cách tương tác với contract.

## Lịch trình học (7 ngày, 30 phút/ngày)

- [x]  ==Ngày 1: Cú pháp cơ bản Solidity==
**Mục tiêu**: Hiểu cấu trúc contract và state variables.  
**Hoạt động (30 phút)**:  
- [x] **Lý thuyết (10 phút)**: Đọc “Solidity Basics” ([DappUniversity](https://www.dappuniversity.com/articles/solidity-tutorial)). Contract là đơn vị code trên Ethereum, state variables lưu trữ dữ liệu trên blockchain.  
    1. **Solidity** là ngôn ngữ lập trình chính để viết smart contract trên Ethereum.
    2. **Contract** là đơn vị code cơ bản trên Ethereum, tương tự như class trong OOP.
    3. **State variables** là biến lưu trữ dữ liệu trên blockchain, có thể truy cập từ bên ngoài. Lưu lại vĩnh viễn trên blockchain.
    4. **Function** là các hàm trong contract, có thể được gọi để thực hiện logic. Này như hàm trong OOP.
    5. **Visibility** (==public, private, internal, external==) xác định quyền truy cập vào state variables và functions.
    6. **Constructor** là hàm đặc biệt được gọi khi contract được triển khai, dùng để khởi tạo state variables.
- [x] **Thực hành (20 phút)**: Mở [Remix IDE](https://remix.ethereum.org), tạo contract `HelloWorld`.   Compile và deploy trên Remix (JavaScript VM). Gọi hàm `getMessage` để xem kết quả: (==trong thư mục Day1 có ảnh minh họa==)
  ```solidity
  // HelloWorld.sol
   // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0; // phiên bản solidity
  //này là contract 
  //mỗi file có thể có nhiều contract, nhưng khuyến nghị 1 file 1 contract
  contract HelloWorld { 
      // biến message là state variable có kiểu dữ liệu string
      string public message = "Hello, World!"; 
      //getMessage là function với visibility là public view
      function getMessage() public view returns (string memory) {
          return message;
      }
  }
  ```

**Kết quả**: Hiểu cấu trúc contract, state variables, và cách deploy trên Remix.  

---

- [ ] ==Ngày 2: Functions và Visibility==
**Mục tiêu**: Hiểu functions và visibility (public, private, etc.).  
**Hoạt động (30 phút)**:  
- **Lý thuyết (10 phút)**: Đọc “Functions” ([freeCodeCamp](https://www.freecodecamp.org/news/learn-solidity-handbook/#functions)). Functions định nghĩa logic, visibility kiểm soát quyền truy cập.  
- **Thực hành (20 phút)**: Trong Remix, tạo contract `Counter`:
  ```solidity
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;
  contract Counter {
      uint public count = 0;
      function increment() public {
          count += 1;
      }
      function getCount() public view returns (uint) {
          return count;
      }
  }
  ```
  Deploy và gọi `increment`, `getCount` để kiểm tra.  
**Kết quả**: Biết viết function, hiểu public/view, và tương tác với contract.  

---

### Ngày 3: Data Types (uint, address, string)
**Mục tiêu**: Nắm các kiểu dữ liệu cơ bản.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (10 phút)**: Đọc “Data Types” ([freeCodeCamp](https://www.freecodecamp.org/news/learn-solidity-handbook/#data-types)). uint lưu số nguyên, address lưu địa chỉ Ethereum, string lưu chuỗi.  
- **Thực hành (20 phút)**: Trong Remix, sửa contract `HelloWorld` thêm address:
  ```solidity
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;
  contract HelloWorld {
      string public message = "Hello, World!";
      address public owner;
      constructor() {
          owner = msg.sender;
      }
      function getOwner() public view returns (address) {
          return owner;
      }
  }
  ```
  Deploy và kiểm tra `owner`, `getOwner`.  
**Kết quả**: Hiểu uint, address, string, và cách dùng `msg.sender`.  

---

### Ngày 4: Mapping và Arrays
**Mục tiêu**: Hiểu mapping và arrays.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (10 phút)**: Đọc “Mappings” và “Arrays” ([GeeksforGeeks](https://www.geeksforgeeks.org/solidity/solidity-basics-of-contracts/)). Mapping là bảng băm, arrays là danh sách.  
- **Thực hành (20 phút)**: Trong Remix, tạo contract `SimpleStorage`:
  ```solidity
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;
  contract SimpleStorage {
      mapping(address => uint) public balances;
      uint[] public numbers;
      function setBalance(uint _value) public {
          balances[msg.sender] = _value;
      }
      function addNumber(uint _num) public {
          numbers.push(_num);
      }
  }
  ```
  Deploy, gọi `setBalance`, `addNumber`, kiểm tra kết quả.  
**Kết quả**: Biết dùng mapping và arrays để lưu dữ liệu.  

---

### Ngày 5: Structs
**Mục tiêu**: Hiểu và sử dụng structs.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (10 phút)**: Đọc “Structs” ([freeCodeCamp](https://www.freecodecamp.org/news/learn-solidity-handbook/#structs)). Structs nhóm dữ liệu liên quan.  
- **Thực hành (20 phút)**: Trong Remix, tạo contract `UserRegistry`:
  ```solidity
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;
  contract UserRegistry {
      struct User {
          string name;
          uint balance;
      }
      mapping(address => User) public users;
      function register(string memory _name, uint _balance) public {
          users[msg.sender] = User(_name, _balance);
      }
  }
  ```
  Deploy, gọi `register`, kiểm tra dữ liệu trong `users`.  
**Kết quả**: Biết tạo và sử dụng struct trong contract.  

---

### Ngày 6: Modifier và Require
**Mục tiêu**: Hiểu modifier và require.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (10 phút)**: Đọc “Modifiers” ([DappUniversity](https://www.dappuniversity.com/articles/solidity-tutorial)). Modifier kiểm soát quyền truy cập, require kiểm tra điều kiện.  
- **Thực hành (20 phút)**: Trong Remix, sửa contract `Counter`:
  ```solidity
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;
  contract Counter {
      uint public count = 0;
      address public owner;
      constructor() {
          owner = msg.sender;
      }
      modifier onlyOwner() {
          require(msg.sender == owner, "Not owner");
          _;
      }
      function increment() public onlyOwner {
          count += 1;
      }
  }
  ```
  Deploy, thử gọi `increment` từ tài khoản khác để thấy lỗi.  
**Kết quả**: Hiểu cách dùng modifier và require để kiểm soát logic.  

---

### Ngày 7: Ôn tập và thực hành
**Mục tiêu**: Củng cố kiến thức và viết contract tổng hợp.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (10 phút)**: Ôn lại cú pháp Solidity ([DappUniversity](https://www.dappuniversity.com/articles/solidity-tutorial)).  
- **Thực hành (20 phút)**: Trong Remix, tạo contract `Payroll`:
  ```solidity
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;
  contract Payroll {
      struct Employee {
          string name;
          uint salary;
      }
      mapping(address => Employee) public employees;
      address public owner;
      constructor() {
          owner = msg.sender;
      }
      modifier onlyOwner() {
          require(msg.sender == owner, "Not owner");
          _;
      }
      function addEmployee(address _employee, string memory _name, uint _salary) public onlyOwner {
          employees[_employee] = Employee(_name, _salary);
      }
  }
  ```
  Deploy, gọi `addEmployee`, kiểm tra dữ liệu trong `employees`.  
**Kết quả**: Viết được contract tổng hợp với struct, mapping, modifier.  

---

## Bài tập cuối tuần
1. Viết đoạn ngắn (100 từ):  
   - Contract, state variables, và functions trong Solidity là gì?  
   - Modifier và require dùng để làm gì?  
2. Trong Remix, deploy contract `Payroll`, thêm một nhân viên, và kiểm tra dữ liệu qua mapping `employees`.  
3. Chụp ảnh màn hình Remix sau khi deploy và gọi hàm `addEmployee`.  

## Kết quả mong đợi
- Viết được smart contract cơ bản (`HelloWorld`, `Counter`, `SimpleStorage`, `Payroll`).  
- Hiểu và sử dụng được uint, address, mapping, arrays, structs, modifier, require.  
- Biết compile, deploy, và tương tác với contract trên Remix IDE.  

## Tài liệu tham khảo
- [DappUniversity: Solidity Tutorial](https://www.dappuniversity.com/articles/solidity-tutorial)  
- [freeCodeCamp: Solidity Handbook](https://www.freecodecamp.org/news/learn-solidity-handbook/)  
- [GeeksforGeeks: Solidity Basics](https://www.geeksforgeeks.org/solidity/solidity-basics-of-contracts/)  
- [Remix IDE](https://remix.ethereum.org)  

