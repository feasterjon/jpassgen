/*
Title: JPassGen
Author: Jonathan Feaster, JonFeaster.com
Date: 2022-04-28
*/

export class JPassGen {
  validate(str, strTest) {
    if (strTest) {
      for (let i = 0; i < strTest.length; i++) {
        return (str.indexOf(strTest.charAt(i)) >= 0) ? true : false;
      }
    }
    else { return true }
  }
  generate(length, characters) {
    let output = '';
    length = Math.abs(parseInt(length)); // convert length to positive integer
    if (Number.isInteger(length) && characters) {
      for (let i = 0; i < length; i++) {
        output += characters.charAt(Math.floor(Math.random() * characters.length));
      }
    }
    return output;
  }
}