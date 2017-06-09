pragma solidity ^0.4.2;
import "./oraclizeAPI.sol";

contract SimpleStorage is usingOraclize{

  event newOraclizeQuery(string description);
  event newRandomNumber(string number);

  function SimpleStorage() {
    // OAR = OraclizeAddrResolverI(0x0983c64806544e78612622c0a9d28feaeeb533e2);
    update()
  }
  
  uint storedData = 10;
  string public number;


  function set(uint x) {
    storedData = x;
  }

  function __callback(bytes32 myid, string result) {
      if (msg.sender != oraclize_cbAddress()) throw;
      number = result;
      newRandomNumber(number);
      // do something with the temperature measure..
  }

  function getRandomNumber() constant returns(string){
    return number;
  }

  function get() constant returns (uint) {
    return storedData;
  }

  function update() payable {
        newOraclizeQuery("Oraclize query was sent, standing by for the answer..");
        oraclize_query("WolframAlpha", "random number between 0 and 100");
    }

}
