

# Lộ trình học Solidity trong 6 tuần

## Tuần 1: Nền tảng Blockchain và Ethereum
**Mục tiêu chính**: Hiểu các khái niệm cơ bản về blockchain, Ethereum, và vai trò của smart contract.  
**Nội dung học**:  
- Giới thiệu về blockchain, Ethereum, dApp, Web2 vs Web3 ([ethereum.org](https://ethereum.org/en/developers/docs/intro-to-ethereum/)).  
- Hiểu account (EOA vs contract), transaction, block ([QuickNode](https://www.quicknode.com/guides/ethereum-development/smart-contracts/an-overview-of-how-smart-contracts-work-on-ethereum)).  
- Ethereum Virtual Machine (EVM): Cách hoạt động, tại sao cần EVM ([dydx.xyz](https://www.dydx.xyz/crypto-learning/what-is-evm)).  
- Gas, nodes, consensus mechanism (PoS), testnet ([ethereum.org](https://ethereum.org/en/developers/docs/nodes-and-clients/)).  
- Thực hành: Phân tích một giao dịch trên [Sepolia Etherscan](https://sepolia.etherscan.io/) để hiểu transaction và block.  

**Kết quả mong đợi**:  
- Hiểu cách hoạt động của dApp và vai trò của smart contract.  
- Giải thích được khái niệm EVM, gas, và tại sao blockchain cần consensus.  
- Biết cách tra cứu giao dịch trên Etherscan.  

**Tài liệu tham khảo**:  
- [Ethereum Docs](https://ethereum.org/en/developers/docs/)  
- [QuickNode: How Smart Contracts Work](https://www.quicknode.com/guides/ethereum-development/smart-contracts/an-overview-of-how-smart-contracts-work-on-ethereum)  
- [Dydx: What is EVM](https://www.dydx.xyz/crypto-learning/what-is-evm)  
- [YouTube: Blockchain Basics](https://www.youtube.com/watch?v=-1GB6m39-rM)  

---

## Tuần 2: Làm quen với Solidity và viết contract cơ bản
**Mục tiêu chính**: Nắm vững cú pháp Solidity và viết các smart contract đơn giản.  
**Nội dung học**:  
- Cú pháp cơ bản: contract, state variables, functions, constructors, visibility ([DappUniversity](https://www.dappuniversity.com/articles/solidity-tutorial)).  
- Data types: uint, address, string, mapping, arrays, structs ([freeCodeCamp](https://www.freecodecamp.org/news/learn-solidity-handbook/)).  
- Thực hành trên Remix IDE: Viết contract `HelloWorld`, `Counter`, `SimpleStorage` ([Remix](https://remix.ethereum.org)).  
- Hiểu modifier, require, và event trong Solidity ([GeeksforGeeks](https://www.geeksforgeeks.org/solidity/solidity-basics-of-contracts/)).  
- Thực hành: Deploy contract `Counter` trên Remix và tương tác qua giao diện Remix.  

**Kết quả mong đợi**:  
- Viết được smart contract cơ bản (Counter, SimpleStorage).  
- Hiểu cách compile, deploy, và tương tác với contract trên Remix IDE.  
- Biết sử dụng modifier và require để kiểm soát logic contract.  

**Tài liệu tham khảo**:  
- [DappUniversity: Solidity Tutorial](https://www.dappuniversity.com/articles/solidity-tutorial)  
- [freeCodeCamp: Solidity Handbook](https://www.freecodecamp.org/news/learn-solidity-handbook/)  
- [Remix IDE](https://remix.ethereum.org)  

---

## Tuần 3: Nâng cao Solidity và bảo mật cơ bản
**Mục tiêu chính**: Hiểu các khái niệm nâng cao trong Solidity và các vấn đề bảo mật cơ bản.  
**Nội dung học**:  
- Inheritance, function overriding, và abstract contract ([Alchemy](https://www.alchemy.com/overviews/learn-solidity)).  
- Sự kiện (event) và cách sử dụng trong contract ([OpenZeppelin](https://docs.openzeppelin.com/learn/developing-smart-contracts)).  
- Bảo mật cơ bản: Tránh reentrancy, kiểm tra input/output, sử dụng OpenZeppelin library ([OpenZeppelin](https://docs.openzeppelin.com/learn/developing-smart-contracts)).  
- Thực hành: Viết contract `Voting` với các hàm như `vote`, `getResults`, sử dụng OpenZeppelin’s `Ownable` ([Cyfrin](https://www.cyfrin.io/blog/how-to-become-a-blockchain-solidity-developer)).  
- Debug contract trên Remix khi gặp lỗi (VD: gas limit, revert).  

**Kết quả mong đợi**:  
- Viết được contract phức tạp hơn (VD: Voting) với tính năng bảo mật cơ bản.  
- Hiểu cách sử dụng thư viện OpenZeppelin để tăng tính an toàn.  
- Biết cách debug contract khi gặp lỗi trên Remix.  

**Tài liệu tham khảo**:  
- [Alchemy: Learn Solidity](https://www.alchemy.com/overviews/learn-solidity)  
- [OpenZeppelin: Developing Smart Contracts](https://docs.openzeppelin.com/learn/developing-smart-contracts)  
- [Cyfrin: Become a Solidity Developer](https://www.cyfrin.io/blog/how-to-become-a-blockchain-solidity-developer)  

---

## Tuần 4: Thiết lập môi trường phát triển và deploy testnet
**Mục tiêu chính**: Cài đặt môi trường phát triển chuyên nghiệp và triển khai contract lên testnet.  
**Nội dung học**:  
- Cài đặt VS Code, Hardhat, và MetaMask ([RapidInnovation](https://www.rapidinnovation.io/post/how-to-create-a-smart-contract-on-ethereum)).  
- Cấu hình Hardhat: Viết script để compile và deploy contract ([Hardhat Docs](https://hardhat.org/docs)).  
- Lấy test ETH từ faucet (VD: [Sepolia Faucet](https://sepoliafaucet.com/)) và cấu hình MetaMask cho testnet Sepolia.  
- Thực hành: Deploy contract `Voting` từ tuần 3 lên testnet Sepolia, lấy địa chỉ contract.  
- Viết unit test cơ bản cho contract bằng Hardhat ([Hardhat Docs](https://hardhat.org/docs)).  

**Kết quả mong đợi**:  
- Cài đặt thành công môi trường phát triển (VS Code, Hardhat, MetaMask).  
- Deploy được contract lên testnet Sepolia và xác minh địa chỉ trên Etherscan.  
- Viết được unit test cơ bản để kiểm tra contract.  

**Tài liệu tham khảo**:  
- [RapidInnovation: Create a Smart Contract](https://www.rapidinnovation.io/post/how-to-create-a-smart-contract-on-ethereum)  
- [Hardhat Documentation](https://hardhat.org/docs)  
- [Sepolia Faucet](https://sepoliafaucet.com/)  

---

## Tuần 5: Kết nối smart contract với backend (Node.js)
**Mục tiêu chính**: Tương tác với smart contract từ backend bằng ethers.js.  
**Nội dung học**:  
- Cài đặt Node.js và ethers.js ([QuickNode](https://www.quicknode.com/guides/ethereum-development/getting-started/what-is-the-ethereum-virtual-machine-evm)).  
- Viết script Node.js để đọc state (VD: get vote count) và gửi transaction (VD: vote) ([DappUniversity](https://www.dappuniversity.com/articles/solidity-tutorial)).  
- Thực hành: Tạo API đơn giản bằng Node.js/Express để gọi hàm trong contract `Voting`.  
- Xử lý lỗi phổ biến: gas estimation, network issues.  

**Kết quả mong đợi**:  
- Viết được script Node.js để tương tác với contract (đọc và gửi transaction).  
- Tạo được API cơ bản để gọi hàm contract từ backend.  
- Hiểu cách xử lý lỗi khi tương tác với blockchain.  

**Tài liệu tham khảo**:  
- [QuickNode: Ethers.js Guide](https://www.quicknode.com/guides/ethereum-development/smart-contracts/an-overview-of-how-smart-contracts-work-on-ethereum)  
- [DappUniversity: Solidity Tutorial](https://www.dappuniversity.com/articles/solidity-tutorial)  

---

## Tuần 6: Xây dựng dApp hoàn chỉnh với React
**Mục tiêu chính**: Kết nối smart contract với frontend React và hoàn thiện một dApp đơn giản.  
**Nội dung học**:  
- Cài đặt React, ethers.js, và Tailwind CSS ([Webisoft](https://webisoft.com/articles/how-to-create-a-smart-contract/)).  
- Viết giao diện React để tương tác với contract `Voting`: hiển thị kết quả, gửi vote ([Alchemy](https://www.alchemy.com/overviews/learn-solidity)).  
- Thực hành: Xây dựng dApp hoàn chỉnh, kết nối MetaMask để người dùng vote qua giao diện.  
- Tối ưu UX: Hiển thị loading state, thông báo lỗi khi transaction thất bại.  
- Triển khai dApp lên Vercel hoặc Netlify ([Vercel Docs](https://vercel.com/docs)).  

**Kết quả mong đợi**:  
- Hoàn thiện dApp Voting với giao diện React, cho phép người dùng tương tác qua MetaMask.  
- Deploy dApp lên Vercel/Netlify để chia sẻ.  
- Hiểu quy trình phát triển full-stack Web3 (smart contract → backend → frontend).  

**Tài liệu tham khảo**:  
- [Webisoft: Create a Smart Contract](https://webisoft.com/articles/how-to-create-a-smart-contract/)  
- [Alchemy: Learn Solidity](https://www.alchemy.com/overviews/learn-solidity)  
- [Vercel Docs](https://vercel.com/docs)  

---

## Lưu ý bổ sung
- **Bảo mật**: Luôn kiểm tra bảo mật contract (dùng OpenZeppelin, tránh reentrancy).  
- **Thực hành liên tục**: Làm lại các bài tập từ tuần 2-3 để củng cố kiến thức.  
- **Dự án cuối khóa**: Sau tuần 6, thử xây dựng một dApp khác (VD: Crowdfunding, Marketplace) để áp dụng kiến thức.  
- **Cộng đồng**: Tham gia các diễn đàn như [Ethereum StackExchange](https://ethereum.stackexchange.com/) hoặc Discord của Hardhat/OpenZeppelin để hỏi đáp.  

