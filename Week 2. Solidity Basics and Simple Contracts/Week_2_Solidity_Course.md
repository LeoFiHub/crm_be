

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

- [x] ==Ngày 2: Functions và Visibility==
**Mục tiêu**: Hiểu functions và visibility (public, private, etc.).  
**Hoạt động (30 phút)**:  
- **Lý thuyết (10 phút)**: Đọc “Functions” ([freeCodeCamp](https://www.freecodecamp.org/news/learn-solidity-handbook/#functions)). Functions định nghĩa logic, visibility kiểm soát quyền truy cập.  ==(các hàm trong contract, có thể được gọi để thực hiện logic. Này như hàm trong OOP.)==
- **Thực hành (20 phút)**: Trong Remix, tạo contract `Counter`. Deploy và gọi `increment`, `getCount` để kiểm tra.:
  ```solidity
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;
  contract Counter {
      uint count = 0; //khởi tạo biến bắt đầu là 0
    function increament() public {
        count = count + 1; // tăng giá trị lên một
    } //này đã xài gas
    function getCount() public view returns (uint) {
        return count;
    } // này không xài gas nếu gọi bằng "call", nhưng vẫn tốn phí execute vì cái gì mà gọi đến smart contract đều tốn phí này hết  

  }
  ```  
**Kết quả**: Biết viết function, hiểu public/view, và tương tác với contract.  

---

- [x] ==Ngày 3: Data Types (uint, address, string)==
**Mục tiêu**: Nắm các kiểu dữ liệu cơ bản.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (10 phút)**: Đọc “Data Types” ([freeCodeCamp](https://www.freecodecamp.org/news/learn-solidity-handbook/#data-types)). uint lưu số nguyên, address lưu địa chỉ Ethereum, string lưu chuỗi.  
    1. **uint**: Kiểu dữ liệu ==số nguyên không âm==, thường dùng để lưu trữ số lượng, giá trị. **int** là số nguyên có âm.
    2. **address**: Kiểu dữ liệu lưu trữ địa chỉ của *ví, smart contract, địa chỉ người nhận hoặc gửi trong transaction.*
    3. **string**: Kiểu dữ liệu lưu trữ chuỗi ký tự, thường dùng để lưu trữ thông tin văn bản. Không lưu địa chỉ ví bằng string vì nó không an toàn.
    4. **msg**: Biến toàn cục chứa thông tin về transaction hiện tại, bao gồm địa chỉ người gọi (*msg.sender*), giá trị gửi (*msg.value*), dữ liệu gửi kèm (*msg.data*) và thời gian (*msg.timestamp*),...
    5. **contructor**: Hàm đặc biệt được gọi khi contract được triển khai, dùng để khởi tạo giá trị ban đầu cho state variables. ==Chỉ được gọi 1 lần duy nhất khi deploy contract.==

- **Thực hành (20 phút)**: Trong Remix, tạo contract `OwnerExample` để thực hành cả việc lưu địa chỉ ví người dùng và sử dụng constructor để khởi tạo giá trị ban đầu:
    ```solidity
        // SPDX-License-Identifier: MIT
        pragma solidity ^0.8.0;
        contract OwnerExample{
                //tạo 2 địa chỉ là người owner và user mỗi lần gọi
                address public owner;
                address public userAddress;

                //tạo contructor - này chỉ được gọi 1 lần khi deploy
                constructor(){
                    owner = msg.sender; // sử dụng biến toàn cục msg để lấy địa chỉ người gọi contructor này - người deploy
                }
                
                // hàm trả về địa chỉ của owner - người deploy smart contract này - trả về kiểu dữ liệu là address
                function getOwner() public view returns (address){
                    return owner;
                }

                //hàm set địa chỉ của người gọi smart contract này
                function setUserAddress() public {
                    userAddress = msg.sender; //tương tự như trong contructor
                }

                //hàm lấy địa chỉ người gọi smart contract này
                function getUserAddress() public view returns (address){
                    return userAddress;
                }
            }
    ```
    Deploy contract, kiểm tra giá trị `owner` (địa chỉ ví deploy), gọi `setUserAddress` từ tài khoản khác rồi kiểm tra `userAddress` và các hàm `getOwner`, `getUserAddress` để hiểu rõ về `msg.sender` và constructor.



**Kết quả**: Hiểu uint, address, string, và cách dùng `msg.sender`.  

---

- [x] ==Ngày 4: Mapping và Arrays==
**Mục tiêu**: Hiểu mapping và arrays.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (10 phút)**: Đọc “Mappings” và “Arrays” ([GeeksforGeeks](https://www.geeksforgeeks.org/solidity/solidity-basics-of-contracts/)). 
    1. **Mapping**: là kiểu dữ liệu lưu trữ cặp key-value. Giống với dictionary trong Python. `mapping(keyType => valueType) public myMapping` 
    2. **Arrays**: danh sách các phần tử cùng kiểu. Có thể có 2 loại là mảng cố định (fixed-size) và mảng động (dynamic). `uint[] public myArray` là mảng động chứa các số nguyên không âm.
- **Thực hành (20 phút)**: Trong Remix, tạo contract `SimpleStorage` .Deploy, gọi `setBalance`, `addNumber`, kiểm tra kết quả:
  ```solidity
  // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;
    contract SimpleStorage{
        //===================MAPPING===================
        //biến lưu số dư của từng địa chỉ ví
        mapping(address => uint) public listBalanceOfUser;
        //hàm setBalance để lưu số dư của từng địa chỉ ví
        // _value là biến truyền hàm, phân biệt với biến toàn cục 
        function setBalance(uint _value) public {
            listBalanceOfUser[msg.sender] = _value;
        }
        //hàm getBalance để lấy số dư của từng địa chỉ ví
        function getBalance(address _address) public view returns (uint){
            return listBalanceOfUser[_address];
        }

        //===================ARRAY===================
        uint[] public listNumber;
        //hàm thêm 1 số vào listNumber
        function addNumber(uint _numb) public {
            listNumber.push(_numb);
        }
        //hàm in ra thứ tự của một phần tử trong mảng listNumber
        function getListNumber(uint _index) public view returns (uint){
            return listNumber[_index];
        }
        //hàm in ra toàn bộ nguyên cái listNumber
        //uint[] là kiểu dữ liệu phức tạp nên cần từ khóa memory
        function getAllListNumber() public view returns (uint[] memory){
            return listNumber;
        }

    }
  ```
 
**Kết quả**: Biết dùng mapping và arrays để lưu dữ liệu.  

---

- [x] ==Ngày 5: Structs==
**Mục tiêu**: Hiểu và sử dụng structs.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (10 phút)**: Đọc “Structs” ([freeCodeCamp](https://www.freecodeCamp.org/news/learn-solidity-handbook/#structs)). Gần giống với class trong OOP, chỉ khác là không có function/method.
    ```solidity
    struct User {
        string name;
        uint balance;
    }
    ```
- **Thực hành (20 phút)**: Trong Remix, tạo contract `UserRegistry`. Deploy, gọi `register`, kiểm tra dữ liệu trong `users`. :
  ```solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;
    contract UserRegistry{
        //struct về user
        struct User {
            string userName;
            uint balance;
        }
        address userAddress;
        //mapping lưu thông tin của users
        mapping(address=>User) public users;

        //hàm đăng ký user
        function registry(string memory _username, uint _balance) public {
            userAddress = msg.sender;
            users[userAddress] = User(_username, _balance);
        }

        //hàm lấy thông tin user bằng address
        function getInfo(address _userAddress) public view returns (User memory){
            return users[_userAddress];
        }
        
    }
  ```
 
**Kết quả**: Biết tạo và sử dụng struct trong contract.  

---

- [x] ==Ngày 6: Modifier, Require và Payable==
**Mục tiêu**: Hiểu modifier, require và payable.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (10 phút)**:  
    - Đọc “Modifiers” ([DappUniversity](https://www.dappuniversity.com/articles/solidity-tutorial)). Modifier kiểm soát quyền truy cập, require kiểm tra điều kiện.
        1. ==**Modifier**== là hàm đặc biệt dùng để kiểm tra điều kiện trước khi thực hiện hàm chính. Giúp tái sử dụng logic kiểm tra. Như if statement nhưng có thể dùng nhiều lần. Ví dụ về setRole `Financer` và `Manager`. Luồng đi:
            1. Contructor set owner.
            2. Một modifier `onlyOwner` kiểm tra người gọi có phải owner không.
            3. Một modifier `onlyFinancer` kiểm tra người gọi có phải financer không.
            4. Một modifier `onlyManager` kiểm tra người gọi có phải manager không.
            5. Hàm `setFinancer` chỉ owner mới gọi được, dùng modifier `onlyOwner`.
        ```solidity
        //existing code 
        // mot bien mapping lưu trữ địa chỉ của Financer
        mapping(address => bool) public isFinancer;
        //cần một contructor set owner
        constructor() {
            owner = msg.sender;
        }
        // 1 modifier dành cho owner
        modifier onlyOwner() {
            require(msg.sender == owner, "Not owner");
            _;
        }
        // 1 modifier dành cho Financer
        modifier onlyFinancer() {
            require(isFinancer[msg.sender], "Not financer");
            _;
        }
        // 1 modifier dành cho Manager
        modifier onlyManager() {
            require(msg.sender == manager, "Not manager");
            _;
        }
        //hàm set role Financer
        function setFinancer(address _financer) public onlyOwner {
            isFinancer[_financer] = true; // đánh dấu địa chỉ là Financer
        }
        // hàm Approve chỉ Financer mới gọi được
        function approve() public onlyFinancer {
            // logic approve
        }
        ```
        2. **Require**: hàm kiểm tra điều kiện, nếu sai sẽ tự động dừng hàm và hoàn trả gas chưa dùng. `Require` là chuẩn bảo vệ logic, kiểm tra điều kiện. 
        ```solidity
        // với IF
        function withdraw(uint _amount) public {
            if (balance < _amount) {
                // chỉ cảnh báo, function vẫn chạy tiếp!
            }
            balance -= _amount; // vẫn bị trừ tiền dù không đủ!
        }
        // với Require
        function withdraw(uint _amount) public {
            require(balance >= _amount, "Insufficient balance"); // nếu không đủ tiền, dừng hàm và hoàn trả gas
            balance -= _amount; // chỉ chạy nếu đủ tiền
        }
        ```
    - Đọc “Payable” ([freeCodeCamp](https://www.freecodecamp.org/news/learn-solidity-handbook/#payable)). Hàm/payable address cho phép contract nhận Ether từ bên ngoài.
        1. **Payable**: là từ khóa cho phép contract nhận Ether. Nếu không có từ khóa này, contract sẽ không thể nhận Ether.
        2. **payable(address)**: là kiểu dữ liệu cho phép lưu địa chỉ ví có thể nhận Ether.
        ```solidity
        // Hàm nạp tiền vào contract
        function deposit() public payable {
            // msg.value là số Ether gửi vào
        }
        // hàm kiểm tra số dư của contract
        function getBalance() public view returns (uint) {
            return address(this).balance; // trả về số dư của contract
        }
        // hàm rút tiền, chỉ owner mới được phép rút
        function withdraw(uint _amount) public onlyOwner {
            require(address(this).balance >= _amount, "Insufficient balance");
            payable(owner).transfer(_amount); // chuyển tiền cho owner
        }
        // hàm chuyển tiền cho một địa chỉ bất kỳ
        function transfer(address payable _to, uint _amount) public onlyOwner{
            require(address(this).balance >= _amount, "Insufficient balance");
            _to.transfer(_amount); // chuyển tiền cho địa chỉ _to
        }
        
        ```

- **Thực hành (20 phút)**: Trong Remix, tạo contract `NTBank` để thêm chức năng nạp tiền (deposit) và rút tiền (withdraw) chỉ cho owner, chuyển tiền lương `PaySalary` dành cho `Financer`. Deploy, thử nạp tiền vào contract bằng nút "value" trên Remix, kiểm tra số dư với `getBalance`, thử rút tiền bằng `withdraw` từ owner và tài khoản khác để thấy lỗi.:
    ```solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;
    import "hardhat/console.sol"; // import thư viện
    contract NTBank{
        address public owner;
        // biến lưu các địa chỉ của finances
        mapping(address => bool) public finances;
        // này để set role Owner - người làm trùm cái smart contract này
        constructor(){
            owner = msg.sender;
        }
        //=======================MODIFIER===================
        // modifier dành cho owner
        modifier onlyOwner(){
            require(msg.sender == owner, "Not Owner");
            _;
        }
        //modifier dành cho financer
        modifier onlyFinancer(){
            require(finances[msg.sender], "Not Financer");
            _;
        }
        //=======================XÀI MODIFIER=====================
        //hàm addFinancer để Owner add vào danh sách
        function addFinancer(address _financer) public onlyOwner{
            finances[_financer] = true;
        }
        //=============================PAYABLE====================
        //hàm nạp tiền vào contract
        function deposit() public payable{
            //=============================REQUIRE=============
            //kiểm tra chuyển vào phải lớn hơn 0
            require(msg.value > 0, "You must send some ETH");
            console.log("Amount ETH", msg.value);
        }
        //hàm kiểm tra số dư
        function getBalance() public view returns (uint){
            return address(this).balance;
        }
        //hàm chuyển tiền cho một địa chỉ cụ thể
        //address _to phải có payable
        //==============XÀI PAYABLE==============
        function paySalary(address payable _to, uint _amount) public{
            _to.transfer(_amount);
        }

    }
    ```

**Kết quả**: Hiểu cách dùng modifier, require để kiểm soát logic, và sử dụng payable để nhận/rút Ether trong contract.

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

