/*
Title: JPassGen
Author: Jonathan Feaster, JonFeaster.com
Date: 2021-11-02
*/

import config from './config.js';
import * as jmodules from './modules/jmodules/index.js';
import { JPassGen } from './modules/jpassgen/index.js';

class Main {
  constructor() {
    this.data = config;
    this.effects = new jmodules.Effects();
    this.events = new jmodules.Events();
    this.interaction = new jmodules.Interaction();
    this.jPassGen = new JPassGen();
    this.localData = new jmodules.LocalData(this.data.localData);
  }
  
  // mount interface
  
  mount() {
    if (typeof this.data !== 'undefined') {
      document.body.innerHTML = document.getElementById(this.data.templateId).innerHTML;
      this.events.click(this.data.templateButtons.submitId, () => {
        this.gen();
      });
      this.events.click(this.data.templateButtons.copyId, () => {
        this.interaction.copyClip(this.data.outputId, this.data.templateButtons.copyId);
      });
      this.events.click(this.data.templateButtons.resetId, () => {
        this.reset();
      });
      if (this.data.enableHelp === true) {
        document.getElementById(this.data.helpContentId).style.display = 'none';
        this.events.click(this.data.templateButtons.helpId, () => {
          this.effects.toggle(this.data.helpContentId);
        });
      }
      if (typeof this.localData.readField(this.data.saveId) !== 'undefined') {
        if (this.localData.readField(this.data.saveId) === true) {
          let query;
          let values = Object.values(this.data.templateFields);
          for (let value of values) {
            query = this.localData.readField(value);
            if (typeof query !== 'undefined') {
              document.getElementById(value).value = query;
            }
          }
          document.getElementById(this.data.saveId).checked = true;
        }
      }
      if (this.data.autoStart === true) {
        this.gen(); // generate random password
      }
      if (this.data.enableCreds === true) {
        try {
          document.getElementById('description').innerHTML = document.getElementsByName('description')[0].getAttribute('content');
        } catch(err) {}
        try {
          document.getElementById('author').innerHTML = document.getElementsByName('author')[0].getAttribute('content');
        } catch(err) {}
      }
    }
  }
  
  // remove spaces
  
  removeSpaces(str) {

    let output = '';

    if (str) {
     output = str.replace(/\s/g, ''); // remove spaces
    }
    return output;
  }
  
  // reset
  
  reset() {

    let values = Object.values(this.data.templateFields);
    for (let value of values) {
      this.localData.destroyField(value); // destroy templateFields in browser
      document.getElementById(value).value = document.getElementById(value).defaultValue;
    }
    this.localData.destroyField(this.data.saveId); // destroy save in browser
    document.getElementById(this.data.saveId).checked = document.getElementById(this.data.saveId).defaultChecked;
    document.getElementById(this.data.outputId).value = document.getElementById(this.data.outputId).defaultValue;
    document.getElementById(this.data.templateButtons.submitId).focus();
  }
  
  // generate random password
  
  gen() {

    let password = "";
    let output = "";
    let length = document.getElementById(this.data.templateFields.lengthId).value;
    let lettersLower = document.getElementById(this.data.templateFields.lettersLowerId).value;
    let lettersUpper = document.getElementById(this.data.templateFields.lettersUpperId).value;
    let numbers = document.getElementById(this.data.templateFields.numbersId).value;
    let symbols = document.getElementById(this.data.templateFields.symbolsId).value;
    let amount = document.getElementById(this.data.templateFields.amountId).value;
    let save = document.getElementById(this.data.saveId).checked;

    if (length >= 5 && (lettersLower !== '' || lettersUpper !== '' || numbers !== '' || symbols !== '') && amount >= 1) {
      lettersLower = this.removeSpaces(lettersLower); // remove spaces
      lettersUpper = this.removeSpaces(lettersUpper); // remove spaces
      numbers = this.removeSpaces(numbers); // remove spaces
      symbols = this.removeSpaces(symbols); // remove spaces
      let characters = lettersLower+lettersUpper+numbers+symbols; // concatenate all characters
      for (let i = 0; i < amount; i++) { // iterate through amount
        password = this.jPassGen.generate(length, characters); // generate random password
        while (this.jPassGen.validate(password, lettersLower) === false || this.jPassGen.validate(password, lettersUpper) === false || this.jPassGen.validate(password, numbers) === false || this.jPassGen.validate(password, symbols) === false) {
          password = this.jPassGen.generate(length, characters); // generate random password
        }
        if (i === 0) {
          output = password;
        }
        else {
          output += "\r" + password;
        }
      }
      if (save === true) {
        let values = Object.values(this.data.templateFields);
        for (let value of values) {
          this.localData.storeField(value, document.getElementById(value).value); // set templateFields in browser
        }
        this.localData.storeField(this.data.saveId, save); // set save in browser
      }
    }
    else {
      alert('Error: One or more fields contains an invalid value.');
    }
    document.getElementById(this.data.outputId).value = output;
    document.getElementById(this.data.outputId).select();
  }
}

const main = new Main();
main.mount();
