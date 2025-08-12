1. Import the Ownable contract from OpenZeppelin: `npm install @openzeppelin/contracts`
2. Deploy: `npx hardhat run scripts/deploy.js --network sepolia`
3. Verify: `npx hardhat verify --network sepolia ĐỊA_CHỈ_CONTRACT "constructor arguments nếu có"`
4. Call addCandidate: `node scripts/addCandidate.js`
# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```
