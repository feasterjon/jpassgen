/*
Title: LocalData Admin
Author: Jonathan Feaster, JonFeaster.com
Date: 2021-12-02
*/

import { LocalData } from './index.js';

class LocalDataAdmin extends LocalData {
  constructor(data) {
    super(data);
    this.viewId = this.data.viewId;
  }
  
  // update view
  
  updateView() {
    if (this.viewId) {
      let el = document.getElementById(this.viewId);
      if (el !== 'undefined') {
        let output = this.read(this.database);
        if (!output) {
          output = '';
          el.placeholder = 'No Data';
        }
        el.value = output;
      }
    }
  }
  
  // save view
  
  saveView(validate) {
    if (this.viewId) {
      let valid = true;
      let el = document.getElementById(this.viewId);
      if (el !== 'undefined') {
        let data = el.value.toString();
        if (validate) {
          if (!this.validateJSON(data)) {
            valid = false;
          }
        }
        else if (!this.validateJSON(data)) {
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
