pragma solidity ^0.4.2;
import "./oraclizeAPI.sol";

contract SimpleStorage is usingOraclize{

  event newOraclizeQuery(string description);
  event newRandomNumber(string number);

  function SimpleStorage() {
  }
  
  uint storedData = 10;
  string public number;


  function set(uint x) {
    storedData = x;
  }


  function get() constant returns (uint) {
    return storedData;
  }

}
