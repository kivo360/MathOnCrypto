pragma solidity ^0.4.2;
import "./oraclizeAPI.sol";

contract ExternalComputation is usingOraclize{
  uint storedData;

  function ExternalComputation() {
    
  }

  function getRandomNumber() constant returns(bytes32){
    bytes32 number = oraclize_query("WolframAlpha", "random number between 0 and 100");
    return number;
  }

  function set(uint x) {
    storedData = x;
  }

  function get() constant returns (uint) {
    return storedData;
  }
}
