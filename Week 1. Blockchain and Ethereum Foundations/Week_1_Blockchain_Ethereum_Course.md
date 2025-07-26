# Giáo trình Tuần 1: Nền tảng Blockchain và Ethereum (30 phút/ngày)

## Mục tiêu

- Hiểu cơ bản blockchain, Ethereum, và smart contract.
- Nắm cách hoạt động của transaction, EVM, và gas.
- Biết dùng Etherscan và MetaMask với testnet.

## Lịch trình học (7 ngày, 30 phút/ngày)

- [x] ==Ngày 1: Blockchain và Ethereum cơ bản==

**Mục tiêu**: Hiểu blockchain và Ethereum là gì.\
**Hoạt động (30 phút)**:

- [x] **Lý thuyết (10 phút)**: *Xem video “Blockchain Basics” (YouTube) để nắm blockchain, Ethereum, và dApp.*

1.  **Blockchain**: Sổ cái chung, database chung. 
2. **Ethereum**: Blockchain + Smart Contract (mã tự động thực thi khi đáp ứng điều kiện)
3. **dApp**: Ứng dụng được xây trên Ethereum, tận dụng smart contract để tự động hóa và bảo mật.

- [x] **Thực hành (20 phút)**: *Truy cập Sepolia Etherscan, xem một giao dịch bất kỳ, ghi chú Transaction Hash, From, To, Value.*

  - https://sepolia.etherscan.io/tx/0x4e0f5cdbb730f0768123a6300ab8a6d7b8184e9aa0f3fce3f4ee76cea820405a
  - TransactionHash: 0x4e0f5cdbb730f0768123a6300ab8a6d7b8184e9aa0f3fce3f4ee76cea820405a
  - From: 0x51bC128CE2Cc205f4b96BafB9b83a01f5dCDD848
  - Interacted With (To): 0x3eDF60dd017aCe33A0220F78741b5581C385A1BA
  - Value: 0 ETH \
    **Kết quả**: Biết blockchain là sổ cái phi tập trung, Ethereum hỗ trợ dApp qua smart contract.

---

- [x] ==Ngày 2: Transaction và Block==

**Mục tiêu**: Hiểu transaction và block.\
**Kết quả**: Hiểu transaction/block hoạt động, biết tra cứu trên Etherscan.
**Hoạt động (30 phút)**:

- [x] **Lý thuyết (10 phút)**: *Đọc nhanh “Transactions” (ethereum.org). Transaction là yêu cầu thay đổi trạng thái blockchain, được nhóm vào block.*
1. **Transaction**: Là một hành động cụ thể, ví dụ như chuyển ETH, tương tác với smart contract.
2. **Block**: Nhóm các transaction, chứa thông tin như Block Number, Transactions, Miner. Nó chứa các transaction của nhiều smart contract khác nhau, điều này tạo ra tính phi tập trung.


- [x] **Thực hành (20 phút)**: Trên Sepolia Etherscan, tìm một block, ghi chú Block Number, Transactions, và Miner.\
  - **URL:** https://sepolia.etherscan.io/block/8832721
  - **Block Number:** 8832721 -> thứ tự của block trong chuỗi.
  - **Transactions:** 456 transactions and 88 contract internal transactions in this block -> tổng số giao dịch trong block
  - **Miner:** 0x3826539Cbd8d68DCF119e80B994557B4278CeC9f -> người khai thác block này.\
---

- [x] ==Ngày 3: Ethereum Virtual Machine (EVM)==

**Mục tiêu**: Hiểu EVM thực thi smart contract.\
**Kết quả**: Biết EVM là gì, vai trò trong việc chạy smart contract.
**Hoạt động (30 phút)**:

- **Lý thuyết (10 phút)**: Đọc “What is EVM” (dydx.xyz). 
1. **Ethereum**: là một cái blockchain chung.
2. **EVM**: là một cái "CPU" mà Ethereum cung cấp, nơi hỗ trợ thực thi tất cả các hoạt động của smart contact: deloy, tương tác với contract và thực hiện tính toán. Ethereum lấy phí là ETH.
3. **Smart Contract**: Ai cũng có thể xem code và dữ liệu trong smart contract. Mỗi smart contract đều có một địa chỉ riêng.
4. **Gas fee**: xài trong lúc deloy smart contract, thực thi smart contract, gom transaction vào block.

- **Thực hành (20 phút)**: Trên Sepolia Etherscan, tìm giao dịch gọi smart contract (có “Contract” trong chi tiết), ghi chú Transaction Hash và Gas Used.

  - ***Ví dụ:*** https://sepolia.etherscan.io/tx/0x09f271ed00ab7ff545694f1f9282d6c8a357aea142429dd22d9c8a006edbbe5b
    - **Transaction Hash**: `0x09f271ed00ab7ff545694f1f9282d6c8a357aea142429dd22d9c8a006edbbe5b`
    - **Gas Used**: `33,679` / `40,844`
      - Phí gas là phí để thực hiện 1 transaction. Không phải trong transaction.
      - Người gửi là người quyết định ==gas limit== và ==gas price==, Ethereum chỉ cung cấp cơ chế ước lượng phí gas gọi là `gas estimate`.
      - Nếu đặt phí gas quá thấp, transaction sẽ không được thực hiện (revert). Nếu đặt quá cao, bạn sẽ mất phí không cần thiết.
    - **Trong giao dịch này**: hàm `mint(address to)` được gọi tại địa chỉ smart contract `0x3eDF60dd017aCe33A0220F78741b5581C385A1BA`.Địa chỉ nhận sẽ được truyền vào tham số `to` của hàm mint để nhận 10 USDZ.


---

- [x] ==Ngày 4: Gas trong Ethereum==

**Mục tiêu**: Hiểu gas và vai trò của nó.\
**Kết quả**: Hiểu gas là gì, tại sao cần để duy trì mạng Ethereum.
==Chuyển ETH xài ít gas hơn gọi smart contract.==
**Hoạt động (30 phút)**:

- **Lý thuyết (10 phút)**: Đọc “Gas” (ethereum.org). Gas là phí để thực thi giao dịch/smart contract. ==(Trên ngày 3 có nhắc)==
- **Thực hành (20 phút)**: Trên Sepolia Etherscan, so sánh Gas Used của giao dịch chuyển ETH và gọi smart contract.
1. **Chuyển ETH**: https://sepolia.etherscan.io/tx/0x33de6de7d6095781d5f81aa652119ed4c487d982b6b1228682bcb42d2bfd6126
    - **Địa chỉ gửi**: 0x413b84D3E93901C2c103DA3a10A074a69dd1Bb42
    - **Địa chỉ nhận**: 0x675B4429FcdF076C01fF149620f4F009C558dAaE => này là địa chỉ của người nhận (nhấn vào sẽ thấy cột ==Amount khác 0==)
    - **Value**: 0.00000151 ETH
    - **Gas Used**: ==21,000 | 21,000== (100%)
  2. **Gọi Smart Contract**: https://sepolia.etherscan.io/tx/0x33b8f09b4c1a26efc8a921e366d8dd13d99c280db7942710cb7f24c1f9f7d0bd
      - **Địa chỉ nhận**: 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238 => này là địa chỉ của smart contract (nhấn vào sẽ thấy cột ==Amount nhiều số 0==)
      - **Gas Used**: ==50,235 | 40,271== (80.17%)
---

- [ ] ==Ngày 5: Nodes và Testnet==

**Mục tiêu**: Hiểu nodes và testnet.\
**Kết quả**: Biết nodes đồng bộ blockchain, testnet dùng để thử nghiệm.
**Hoạt động (30 phút)**:

- **Lý thuyết (10 phút)**: Đọc nhanh “Nodes and Clients” (ethereum.org). Nodes lưu trữ blockchain, testnet (như Sepolia) dùng để thử nghiệm.
- **Thực hành (20 phút)**: Cài MetaMask (MetaMask Docs), kết nối testnet Sepolia.\
  

---

- [ ] ==Ngày 6: Thực hành với Testnet==

**Mục tiêu**: Làm quen MetaMask và test ETH.\
**Kết quả**: Kết nối MetaMask với Sepolia, nhận test ETH thành công.
**Hoạt động (30 phút)**:

- **Lý thuyết (5 phút)**: Xem nhanh cách dùng MetaMask (MetaMask Docs).
- **Thực hành (25 phút)**: Yêu cầu test ETH từ Sepolia Faucet, kiểm tra số dư trên MetaMask.\
  

---

- [ ] ==Ngày 7: Ôn tập và thực hành==

**Mục tiêu**: Củng cố kiến thức và thực hành.\
**Kết quả**: Hiểu rõ các khái niệm cốt lõi, tra cứu thành thạo trên Etherscan.
**Hoạt động (30 phút)**:

- **Lý thuyết (10 phút)**: Ôn lại các khái niệm: blockchain, transaction, EVM, gas, nodes (ethereum.org).
- **Thực hành (20 phút)**: Trên Sepolia Etherscan, tìm một giao dịch smart contract, viết mô tả ngắn (50 từ) về giao dịch đó (Transaction Hash, Gas Used, mục đích).\
  

---

## Bài tập cuối tuần

1. Viết đoạn ngắn (100 từ):
   - Blockchain là gì? Ethereum hỗ trợ dApp như thế nào?
   - EVM và gas có vai trò gì?
2. Trên Sepolia Etherscan, tìm giao dịch smart contract, ghi lại Transaction Hash, Gas Used, và mô tả ngắn.
3. Chụp ảnh số dư test ETH trong MetaMask (sau khi lấy từ Sepolia Faucet).

## Kết quả mong đợi

- Hiểu blockchain, Ethereum, EVM, gas, và testnet.
- Biết tra cứu giao dịch/block trên Etherscan.
- Cấu hình MetaMask và nhận test ETH trên Sepolia.

## Tài liệu tham khảo

- Ethereum Docs
- Dydx: What is EVM
- YouTube: Blockchain Basics
- Sepolia Faucet
- MetaMask Docs