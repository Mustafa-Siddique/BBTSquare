import Web3 from 'web3';
import { ABI } from './ContractABI';

let selectedAccount
export const init = () => {
    let provider = window.ethereum
    let address;
    if (provider !== undefined) {
        provider.request({ method: 'eth_requestAccounts' }).then(accounts => {
            address = accounts[0]
            console.log("Connected account is: " + address)
            // return selectedAccount
        }).catch(err => {
            console.log(err)
        })
    }
    const web3 = new Web3(provider)
    return web3
}
export const getAddress = async() => {
    return await window.ethereum.selectedAddress
}
// window.ethereum.on('accountChanged', function(accounts){
//     selectedAccount = accounts[0]
//     console.log("Connected account changed to" + selectedAccount)
// })

export const getContracts = (abi, address) => {
    const web3 = init()
    console.log("web3",web3)
    const customContract = new web3.eth.Contract(abi, address)
    return customContract
}

export const getBBTContract = async() => {
    try {
        const BBTContract = await  getContracts(ABI, "0xdd4092f2B7F0f2E637F31b20D813BfF1FCa3a442")
        console.log(BBTContract)
        return BBTContract
    } catch (error) {
        console.log(error)
    }
}
export const AddProject = async(id, hash, point) => {
    try {
        const BBTContract = await getBBTContract();
        
        const data = await BBTContract.methods.addProject(id, hash, point).send({from: await getAddress()});
    } catch (error) {
        console.log(error)
    }
}
