pragma solidity ^0.5.16;

contract Time{

    uint256 public currentTime;
    uint256 temp1;
    uint256 temp2;

    event timeMatch(bool res);

    function getTime () public returns(bool) {

        currentTime = now;

        //  14400 = 3600 *4 for 4AM
        //  57600 = 3600 *16 for  4PM
        temp1 = currentTime/86400;
        temp2 = currentTime - (temp1*86400);

        if (temp2 == 14400 || temp2 == 57600){
            emit timeMatch(true);
            return true;
        }
        else
            return false;
    }

}
