/*
Title: LocalData
Author: Jonathan Feaster, JonFeaster.com
Date: 2022-04-27
*/

import { Schema } from './schema.js';

export class LocalData {
  constructor(data) {
    this.data = data;
    this.database = this.data.name;
    this.persistence = this.data.persistence;
    this.cookieStorage = this.data.cookieStorage;
    this.reset = this.data.reset;
    this.JSONAPI = this.data.JSONAPI;
    this.persistentExpiry = 36500;
    this.lsSupport = false;
    this.schema = new Schema();
    if (typeof (Storage) !== 'undefined') {
      try {
        sessionStorage.setItem('sessionStorage', 'true');
        this.lsSupport = true;
      } catch(err) {}
    }
    if (this.cookieStorage) { this.lsSupport = false }
    if (this.reset) {
      this.destroy();
      this.destroyCookie();
    }
  }
  store(key, value, expiry) {
    expiry = this.persistence ? this.persistentExpiry : expiry;
    this.lsSupport ?
      expiry ?
        expiry > 0 ? localStorage.setItem(key, value)
        : sessionStorage.setItem(key, value)
      : sessionStorage.setItem(key, value)
    : expiry ? this.storeCookie(key, value, expiry)
    : this.storeCookie(key, value);
  }
  storeField(key, value, expiry) {
    let data = this.read(this.database);
    let defaultTemplate = this.JSONAPI ?
    {"data":[{"type":this.JSONAPI.type,"id":this.JSONAPI.id,"attributes":{}}]} : {};
    let output = this.schema.validateJSON(data) ? JSON.parse(data) : defaultTemplate;
    this.JSONAPI ? output.data[0].attributes[key] = value : output[key] = value;
    output = JSON.stringify(output);
    this.store(this.database, output, expiry);
  }
  read(key) {
    return this.lsSupport ?
      localStorage.getItem(key) ? localStorage.getItem(key)
      : sessionStorage.getItem(key) ? sessionStorage.getItem(key)
      : undefined
    : this.readCookie(key) ? this.readCookie(key)
    : undefined;
  }
  readField(key) {
    let data = this.read(this.database);
    return this.schema.validateJSON(data) ?
      this.JSONAPI ?
      JSON.parse(data).data[0].attributes[key]
      : JSON.parse(data)[key]
    : data;
  }
  destroy(key) {
    if (this.lsSupport) {
      if (key) {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
      }
      else {
        localStorage.clear();
        sessionStorage.clear();
      }
    }
    else {
      this.destroyCookie(key);
    }
  }
  destroyField(key) {
    if (key) {
      let data = this.read(this.database);
      if (this.schema.validateJSON(data)) {
        let output = JSON.parse(data);
        this.JSONAPI ? delete output.data[0].attributes[key] : delete output[key];
        output = JSON.stringify(output);
        sessionStorage.getItem(this.database) ? this.store(this.database, output)
        : localStorage.getItem(this.database) ? this.store(this.database, output, this.persistentExpiry)
        : this.store(this.database, output, this.persistentExpiry);
      }
      else {
        this.destroy(key);
      }
    }
    else {
      this.destroy();
    }
  }
  storeCookie(key, value, expiry) {
    value = encodeURIComponent(value);
    let date = new Date();
    date.setTime(date.getTime() + (expiry * 24 * 60 * 60 * 1000));
    let expires = '; expires=' + date.toGMTString();
    document.cookie = key + '=' + value + expires + '; path=/';
  }
  readCookie(key) {
    const cookies = document.cookie.split(';')
    .reduce((acc, cookieString) => {
      const [key, value] = cookieString.split('=').map(s => s.trim());
      if (key && value) { acc[key] = decodeURIComponent(value) }
      return acc;
    }, {});
    return key ? cookies[key] || '' : cookies;
  }
  destroyCookie(key) {
    if (key) { this.storeCookie(key, '', -1) }
    else {
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
        let eqPos = cookie.indexOf('=');
        let name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
      }
    }
  }
}