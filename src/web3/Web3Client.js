import { Alert } from 'bootstrap';
import Web3 from 'web3';
import { ABI } from './ContractABI';

let selectedAccount
export const init = async() => {
    let provider = window.ethereum
    // let address;
    // if (provider !== undefined) {
    //     provider.request({ method: 'eth_requestAccounts' }).then(accounts => {
    //         address = accounts[0]
    //         console.log("Connected account is: " + address)
    //         // return selectedAccount
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }
    const web3 = new Web3(window.ethereum)
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

export const getContracts = async(abi, address) => {
    const web3 = await init()
    
    const customContract = new web3.eth.Contract(abi, address)
    
    return customContract
}

export const getBBTContract = async() => {
    try {
        const BBTContract = await getContracts(ABI, "0xf61278cc4238a08c945a0085F578689494C50afc");
        
        return BBTContract
    } catch (error) {
        console.log(error)
    }
}
export const AddProject = async(id, hash, point) => {
    try {
        const BBTContract = await getBBTContract();
       
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
export const getAssignee = async (_id) => {
    try {
        const BBTContract = await getBBTContract();
        const data = await BBTContract.methods.getOfferedAssignee(_id).call()
        return data
    } catch (err) {
        console.log(err)
    }
}

export const getAssigneeProjects = async (add) => {
    try {
        const BBTContract = await getBBTContract();
        const data = await BBTContract.methods.getAssigneeProjects(add).call()
        return data
    } catch (err) {
        console.log(err)
    }
}

export const acceptOffer = async (_id) => {
    try {
        const BBTContract = await getBBTContract();
        const data = await BBTContract.methods.acceptOffer(_id).send({from: await getAddress()})
        return data
    } catch (err) {
        console.log(err)
    }
}
export const offerProject = async (cost, _id, wallet, instructions) => {
    try {
        const BBTContract = await getBBTContract();
       
        const data = await BBTContract.methods.offer(_id, wallet, instructions).send({from: await getAddress(), value: cost*(10**18)});
        return data
    } catch (error) {
        console.log(error)
    }
}
export const milestone = async (_id, index) => {
    try {
        const BBTContract = await getBBTContract();
        const data = await BBTContract.methods.checkpointCompleted(_id, index).send({from: await getAddress()});
        return data
    } catch (error) {
        console.log(error)
    }
}
export const revoke = async (_id) => {
    try {
        const BBTContract = await getBBTContract();
        const data = await BBTContract.methods.revokeOffer(_id).send({from: await getAddress()});
        return data
    } catch (error) {
        console.log(error)
    }
}
