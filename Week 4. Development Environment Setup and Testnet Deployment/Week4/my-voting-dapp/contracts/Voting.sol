// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol"; // import the Ownable contract
contract Voting{
    struct Candidate{
        string name;
        uint voteCount;
    }
    mapping(uint => Candidate) public candidates;
    uint public candidateCount;

    function addCandidate(string memory _name) public {
        candidates[candidateCount] = Candidate(_name, 0);
        candidateCount = candidateCount + 1;
    }

    mapping(address => bool) hasVoted;
    event Voted(address indexed voter, uint candidateId);

    function vote(uint _candidateId) public {
        require(_candidateId < candidateCount, "Error! Invalid candidate id.");
        require(!hasVoted[msg.sender], "Error! Already voted");
        candidates[_candidateId].voteCount++;
        hasVoted[msg.sender] = true;
        emit Voted(msg.sender, _candidateId);

    }
}