const { expect } = require("chai");
describe("Voting", function(){ // Tạo nhóm test cho contract Voting.
    let Voting, voting, owner, addr1;
    beforeEach(async function () {
        Voting = await ethers.getContractFactory("Voting"); // chữ "Voting này là trong thư mục contracts, trùng với tên của contract luôn => này là lấy contract chứ không phải file, nếu file tên Voting mà contract là MyVoting thì lấy là MyVoting"
        [owner, addr1] = await ethers.getSigners();
        voting = await Voting.deploy();
        await voting.waitForDeployment();
    });

    //unit test 1
    it("Should add candidate", async function () {
        await voting.addCandidate("Alice"); //them 1 candidate co ten la Alice
        const candidate = await voting.candidates(0); // lay candidate vua moi them
        expect(candidate.name).to.equal("Alice"); //kiem tra coi ten cua candidate vua them co trung voi Alice hay khong
    });
    //unit test 2
    it("Should allow voting", async function(){
        await voting.addCandidate("Alice"); // them 1 candidate la Alice
        await voting.vote(0); //goi ham vote cho candidate co id =0
        const candidate = await voting.candidates(0); // lay lay thong tin cua candidate co id = 0
        expect(candidate.voteCount).to.equal(1); //so sanh so phieu co bang 1 hay khong
    });
    //unit test 3 - kiem tra viec 1 dia chi co vote 2 lan khong
    it("Should not allow double voting", async function () {
    await voting.addCandidate("Alice");
    await voting.vote(0); // lần 1, thành công
    // lần 2, sẽ bị revert vì đã vote rồi
    // await expect(voting.vote(0)).to.be.revertedWith("Already voted");
    });

});