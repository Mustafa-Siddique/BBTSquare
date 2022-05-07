import { Alert } from 'bootstrap';
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
    await window.ethereum.enable();
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
        const BBTContract = await  getContracts(ABI, "0xC39BE040Fe65b71070A306AAaFEb21d288AE4BE0")
        console.log(BBTContract)
        return BBTContract
    } catch (error) {
        console.log(error)
    }
}
export const AddProject = async(id, hash, point) => {
    try {
        const BBTContract = await getBBTContract();
        console.log(getAddress(),window.ethereum)
        const data = await BBTContract.methods.addProject(id, hash, point).send({from: await getAddress()});
        return data
        // if (data.status === true) {
        //     alert("Posted successfull on Blockchain.")
        // } else {
        //     alert("Failed to Post on Blockchain.")
        // }
    } catch (error) {
        console.log(error)
    }
}
export const verifyProject = async (_id) => {
    try {
        const BBTContract = await getBBTContract();
        const data = await BBTContract.methods.getProject(_id).call()
        return data
    } catch (err) {
        console.log(err)
    }
}
export const offerProject = async (cost, _id, wallet, instructions) => {
    try {
        const BBTContract = await getBBTContract();
        console.log("offer data",cost,instructions,wallet,await getAddress())
        const data = await BBTContract.methods.offer(_id, wallet, instructions).send({from: await getAddress(), value: cost*(10**18)});
        return data
    } catch (error) {
        console.log(error)
    }
}
