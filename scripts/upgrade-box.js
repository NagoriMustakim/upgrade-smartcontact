const { ethers, upgrades } = require("hardhat")
const proxyaddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
async function main() {
    const BoxV2 = await ethers.getContractFactory("BoxV2")
    let box = await upgrades.upgradeProxy(proxyaddress, BoxV2)
    console.log("Your upgraded proxy is done!", box.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })