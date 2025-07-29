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

// Đây là một contract đơn giản trong Solidity
// Nó có một biến trạng thái (state variable) và một hàm để lấy giá trị
// của biến đó. Biến `message` được khởi tạo với giá trị "Hello, World!".
// Hàm `getMessage` trả về giá trị của biến `message`.
// Contract này có thể được triển khai trên mạng lưới blockchain để
// người dùng có thể truy cập và lấy giá trị của biến `message` thông qua hàm `getMessage`.
// Contract này sử dụng phiên bản Solidity 0.8.0 và tuân thủ giấy     