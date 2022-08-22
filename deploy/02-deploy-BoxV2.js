const { getNamedAccounts, deployments, network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
module.exports = async () => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    console.log("--------------------")
    const arguments = []
    const BoxV2 = await deploy("BoxV2", {
        from: deployer,
        log: true,
        args: arguments
    })
    log("deployed...")
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("verifying...")
        await verify(BoxV2.address, arguments)
        log("verified successfully...")
    }
}
module.exports.tags = ["all", "v2"]