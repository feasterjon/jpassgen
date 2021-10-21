/*
Title: JPassGen
Author: Jonathan Feaster, JonFeaster.com
Date: 2021-10-21
*/

class JPassGen {

  // validate
  
  validate(str, strTest) {

    let output = false;

    if (strTest !== '') {
      let strTestLength = strTest.length;
      for (let i = 0; i < strTestLength; i++) {
        if (str.indexOf(strTest.charAt(i)) >= 0) {
          output = true;
          break;
        }
      }
    }
    else {
      output = true;
    }
    return output;
  }

  // generate random password
  
  generate(length, characters) {

    let output = '';

    length = Math.abs(parseInt(length)); // convert length to positive integer
    if (Number.isInteger(length) && characters !== '') {
      for (let i = 0; i < length; i++) {
        output += characters.charAt(Math.floor(Math.random() * characters.length));
      }
    }
    return output;
  }
}

export { JPassGen };
