var nodemailer = require('nodemailer');
var Web3 = require('web3');

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

web3.eth.defaultAccount = web3.eth.accounts[0];

var ContractABI = web3.eth.contract("Deployed contract ABI");

var ContractAddr = ContractABI.at('CONTRACT ADDRESS');

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

    
