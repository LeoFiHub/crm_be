const hre = require("hardhat");
async function main() {
    const Voting = await hre.ethers.getContractFactory("Voting");
     // Tăng gas price lên 30 gwei (hoặc giá trị bạn muốn)
    const overrides = { gasPrice: hre.ethers.parseUnits("5", "gwei") };
    const voting = await Voting.deploy(overrides);
    await voting.waitForDeployment(); // Sửa lại dòng này
    console.log("Voting deployed to:", await voting.getAddress());
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});