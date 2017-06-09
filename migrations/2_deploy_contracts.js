var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var ExternalComputation = artifacts.require("./ExternalComputation.sol");
module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(ExternalComputation);
};
