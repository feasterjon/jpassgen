/*
Title: LocalData Admin
Author: Jonathan Feaster, JonFeaster.com
Date: 2022-04-27
*/

import { LocalData } from './index.js';

export class LocalDataAdmin extends LocalData {
  constructor(data) {
    super(data);
    this.viewId = this.data.viewId;
  }
  updateView() {
    if (this.viewId) {
      let el = document.getElementById(this.viewId);
      if (el) {
        let output = this.read(this.database);
        if (!output) {
          output = '';
          el.placeholder = 'No Data';
        }
        el.value = output;
      }
    }
  }
  saveView(validate = true) {
    if (this.viewId) {
      let el = document.getElementById(this.viewId);
      if (el) {
        let valid = true;
        let data = el.value.toString();
        if (validate && !this.schema.validateJSON(data)) {
          valid = false;
        }
        if (this.JSONAPI && !this.schema.validateJSONAPI(data)) {
          valid = false;
        }
        if (valid) {
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