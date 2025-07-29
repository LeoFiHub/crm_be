// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract Counter{
    uint count = 0; //khởi tạo biến bắt đầu là 0
    function increament() public {
        count = count + 1; // tăng giá trị lên một
    } //này đã xài gas
    function getCount() public view returns (uint) {
        return count;
    } // này không xài gas nếu gọi bằng "call", nhưng vẫn tốn phí execute vì cái gì mà gọi đến smart contract đều tốn phí này hết  

}