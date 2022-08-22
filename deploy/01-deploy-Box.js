const { getNamedAccounts, deployments, network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
module.exports = async () => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    console.log("--------------------")
    const arguments = []
    const Box = await deploy("Box", {
        from: deployer,
        log: true,
        args: arguments,
        proxy: {
            proxyContract: "OpenZeppelinTransparentProxy",
            viaAdminContract: {
                name: "BoxProxyAdmin",
                artifact: "BoxProxyAdmin"

            }
        }
    })
    log("deployed...")
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("verifying...")
        await verify(Box.address, arguments)
        log("verified successfully...")
    }
}
module.exports.tags = ["all", "box"]