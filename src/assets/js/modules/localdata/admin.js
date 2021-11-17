/*
Title: LocalData Admin
Author: Jonathan Feaster, JonFeaster.com
Date: 2021-11-16
*/

import { LocalData } from './index.js';

class LocalDataAdmin extends LocalData {
  constructor(data) {
    super(data);
    this.viewId = this.data.viewId;
  }
  
  // update view
  
  updateView() {
    if (typeof this.viewId !== 'undefined') {
      let el = document.getElementById(this.viewId);
      if (el !== 'undefined') {
        let output = this.read(this.database);
        if (typeof output === 'undefined') {
          output = '';
          el.placeholder = 'No Data';
        }
        el.value = output;
      }
    }
  }
  
  // save view
  
  saveView(validate) {
    if (typeof this.viewId !== 'undefined') {
      let valid = true;
      let el = document.getElementById(this.viewId);
      if (el !== 'undefined') {
        let data = el.value.toString();
        if (typeof validate !== 'undefined') {
          if (validate === true) {
            if (this.validateJSON(data) === false) {
              valid = false;
            }
          }
        }
        else if (this.validateJSON(data) === false) {
          valid = false;
        }
        if (valid === true) {
          this.store(this.database, data, this.persistentExpiry);
        }
        else {
          el.value = '';
          el.placeholder = 'Error: Invalid Data';
          setTimeout(function(){
            el.value = data;
          }, 3000);
        }
      }
    }
  }
}

export { LocalDataAdmin };
