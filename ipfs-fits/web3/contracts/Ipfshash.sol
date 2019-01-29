pragma solidity ^0.4.24;

contract IpfsHash {

    string ipfsHash;
    uint256 count=0;

    constructor(string x) public {
        ipfsHash = x;
    }

    function getHash() public returns (string x) {
        count++;
        return ipfsHash;
    }

    function getCount() public view returns (uint256 x) {
        return count;
    }
}
