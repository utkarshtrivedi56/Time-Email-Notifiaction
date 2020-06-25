const nodemailer = require('nodemailer');
const Web3 = require('web3');


if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

web3.eth.defaultAccount = web3.eth.accounts[0];

var ContractABI = web3.eth.contract("[
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bool",
          "name": "res",
          "type": "bool"
        }
      ],
      "name": "timeMatch",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "currentTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "getTime",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]");

var ContractAddr = ContractABI.at('0x776f8d6a7e8570a943d2102f84c85878deeb2684'); //contract address deployed at ropsten network
var Event = ContractAddr.timeMatch();

Event.watch(function(error, result){
    if (!error)
        {
            email();
        } else {
            console.log(error);
        }
});

function email(){

    var transporter = nodemailer.createTransport({
    service: 'gmail',  //you can choose any other
    auth: {
        user: 'utkarshtrivedi56@gmail.com',
        pass: 'xxxx'   //your password
    }
    });

    var mailOptions = {
    from: 'utkarshtrivedi56@gmail.com',
    to: 'smartherd@gmail.com',
    subject: 'Sending Email using smart contracts',
    text: "Email verification from smart contracts"       
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
}

    
