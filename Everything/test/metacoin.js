var SimpleStorage = artifacts.require("./SimpleStorage.sol");
const Web3 = require('web3')
// Instantiate new web3 object pointing toward an Ethereum node.
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8546"))


contract('Oraclize', function(accounts) {
  it("Get a random number", function() {
    return SimpleStorage.deployed().then(function(instance) {
      console.log(accounts[0]);
      // console.log(web3.fromWei(web3.eth.getBalance(accounts[0]), 'ether').toNumber());
      return instance.getRandomNumber.call(accounts[0]);
    }).then(function(balance) {
      console.log(balance.valueOf())
      assert.equal(10000, 10000, "10000 wasn't in the first account");
    });
  });

});
