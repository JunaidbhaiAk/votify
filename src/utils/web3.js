// import {ethers} from 'ethers'
import { contractAddress } from './config';
import c from './abi.json'
import Web3 from "web3";
import { ethers } from 'ethers';

let contract;
export const connectWallet = async () => {
    const {ethereum} = window;
    if(ethereum){
        const address = await ethereum.request({method:'eth_requestAccounts'})
        if(address.length > 0){
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const contractAddress = c.networks["5777"].address;
            const contractABI = c.abi;
            contract = new ethers.Contract(contractAddress,contractABI,signer);
            console.log(contract);
            return Promise.resolve(address[0]);
        }
        return null;
    }
}


export const createElection = async(data) => {
    const {name,role} = data;
    // console.log(name,role);
    try{
        const res = await contract.createElection(name,role);
        const data = await res.wait();
        // console.log(data);
        if(data.status) return data;
    }catch(error){ 
        console.log(error);
    }
}


export const getAllElections = async() => {
    try{
        const data = await contract.getActiveElections();
        // console.log(data);
        return data;
    }catch(error){
        console.log(error);
    }
}

export const getElectionData = async(ename) => {
    try {
        const res = await contract.getElectionData(ename);
        return {isActive:res[0],winner:res[1],role:res[2],timestamp:res[3],status:res[4]};
    } catch (error) {
        console.error(error);
    }
}

export const regCandidate = async(data) => {
    try {
        const {name,ename,esl,caddress} = data;
        const res = await contract.registerCandidate(ename,name,caddress,esl);
        const fres = await res.wait();
        if(fres.status) return fres;
    } catch (error) {
        console.log(error);
    }
}


export const getCandidatesForElection = async(ename) => {
    try {   
        if(!contract) await connectWallet();
        const res = await contract.getCandidatesForElection(ename);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
}

export const isOwner = async() => {
    try {
        return await contract.isOwner();
    } catch (error) {
        console.log(error);
    }
}


export const startElection = async(ename) => {
    try{
        const res = await contract.startElection(ename);
        const fres = await res.wait();
        if(fres.status) return fres;
    }catch(error){
        console.error(error);
    }
}

export const stopElection = async(ename) => {
    try{
        const res = await contract.stopElection(ename);
        const fres = await res.wait();
        if(fres.status) return fres;
    }catch(error){
        console.error(error);
    }
}

export const declareWinner = async(ename) => {
    try {
        const res = await contract.declareWinner(ename);
        const fres = await res.wait();
        if(fres.status) return fres.events[0].args[1];
    } catch (error) {
        console.error(error);
    }
}

export const vote = async(data) => {
    try {
        const {id,selected,aid} = data;
        const res = await contract.vote(id,selected,aid);
        const fres = await res.wait();
        if(fres.status) return fres;
    } catch (error) {
        console.error(error);
    }
}


// export const onConnect = async () => {
//     let provider = window.ethereum;
//     if (typeof provider !== "undefined") {
//       await provider.request({ method: "eth_requestAccounts" });
//       const web3 = new Web3(provider);
//       const accounts = await web3.eth.getAccounts();
//       const account = accounts[0];
//       const contractAddress = c.networks["5777"].address;
//       const contractABI = c.abi;
//       const contract = new web3.eth.Contract(contractABI, contractAddress);
//       console.log(await contract.methods.getActiveElections().call());
//     } else {
//       console.log("Non-ethereum browser detected.Please install Metamask");
//     }
// };