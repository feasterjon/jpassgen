/*
Title: JPassGen
Author: Jonathan Feaster, JonFeaster.com
Date: 2022-04-28
*/

import * as jmodules from './modules/jmodules/index.js';
import { JPassGen } from './modules/jpassgen/index.js';
import { LocalData } from './modules/localdata/index.js';

export class Main {
  constructor(data) {
    this.data = data.data[0].attributes;
    this.effects = new jmodules.Effects();
    this.events = new jmodules.Events();
    this.interaction = new jmodules.Interaction();
    this.jPassGen = new JPassGen();
    this.localData = new LocalData(this.data.localData);
  }
  render() {
    if (this.data) {
      document.body.innerHTML = document.getElementById(this.data.templateId).innerHTML;
      this.events.click(this.data.templateButtons.submitId, () => {
        this.gen();
      });
      this.events.click(this.data.templateButtons.copyId, () => {
        this.interaction.copyClip(this.data.outputId, this.data.templateButtons.copyId, 'Copied');
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
      if (this.localData.readField(this.data.saveId)) {
        let query;
        let values = Object.values(this.data.templateFields);
        for (let value of values) {
          query = this.localData.readField(value);
          if (query !== 'undefined') {
            document.getElementById(value).value = query;
          }
        }
        document.getElementById(this.data.saveId).checked = true;
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
  removeSpaces(str) {
    return str ? str.replace(/\s/g, '') : '';
  }
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
        output = (i === 0) ? password : output += "\r" + password;
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