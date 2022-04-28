/*
Title: Schema
Author: Jonathan Feaster, JonFeaster.com
Date: 2022-04-27
*/

export class Schema {
  constructor(data = {"dataArray": true}) {
    this.data = data;
    this.dataArray = this.data.dataArray;
  }
  validateJSON(data) {
    let output = false;
    if (data) {
      try {
        JSON.parse(data);
        output = true;
      } catch(err) {}
    }
    return output;
  }
  validateJSONAPI(data, dataArray = this.dataArray) {
    let output = false;
    if (this.validateJSON(data)) {
      const JSONData = JSON.parse(data);
      if (JSONData.data) {
        if (dataArray && Array.isArray(JSONData.data)) {
          if (typeof JSONData.data[0].type === 'string'
            && typeof JSONData.data[0].id === 'string'
            && typeof JSONData.data[0].attributes === 'object'
          ) { output = true }
        }
        else if (!dataArray && typeof JSONData.data === 'object') {
          if (typeof JSONData.data.type === 'string'
            && typeof JSONData.data.id === 'string'
            && typeof JSONData.data.attributes === 'object'
          ) { output = true }
        } 
      }
    }
    return output;
  }
}