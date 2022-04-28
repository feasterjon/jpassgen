/*
Title: URL
Author: Jonathan Feaster, JonFeaster.com
Date: 2022-04-27
*/

export class URL {
  constructor(
    data = {
      "hashType": "string",
      "hashLimit": 4,
      "querystringField": "id",
      "querystringType": "string"
    }
  ) {
    this.data = data;
    this.hashType = this.data.hashType;
    this.hashLimit = this.data.hashLimit;
    this.querystringField = this.data.querystringField;
    this.querystringType = this.data.querystringType;
  }
  getHash(field, type = this.hashType, limit = this.hashLimit) {
    const separator = field ? '/' + field + '/' : '/';
    const hashParams = location.hash ? location.hash.substring(0).split(separator, limit) : [];
    const hashField = hashParams[1] ? hashParams[1] : null;
    return type === 'int' ? Math.abs(Math.floor(hashField)) : hashField;
  }
  getQuerystring(field = this.querystringField, type = this.querystringType) {
    const searchParams = new URLSearchParams(location.search);
    const searchField = searchParams.get(field);
    return type === 'int' ? Math.abs(Math.floor(searchField)) : searchField;
  }
}