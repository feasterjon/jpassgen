/*
Title: LocalData
Author: Jonathan Feaster, JonFeaster.com
Date: 2021-11-16
*/

class LocalData {
  constructor(data) {
    this.data = data;
    this.database = this.data.name;
    this.persistence = this.data.persistence;
    this.cookieStorage = this.data.cookieStorage;
    this.reset = this.data.reset;
    this.persistentExpiry = 36500;
    
    this.lsSupport = false;
    if (typeof(Storage) !== 'undefined') {
      try {
        sessionStorage.setItem('sessionStorage', 'true');
        this.lsSupport = true;
      } catch(err) {}
    }
    if (typeof this.cookieStorage !== 'undefined') {
      if (this.cookieStorage === true) {
        this.lsSupport = false;
      }
    }
    if (typeof this.reset !== 'undefined') {
      if (this.reset === true) {
        this.destroy();
        this.destroyCookie();
      }
    }
  }
  
  // store

  store(key, value, expiry) {
    if (typeof this.persistence !== 'undefined') {
      if (this.persistence === true) {
        expiry = this.persistentExpiry;
      }
    }
    if (this.lsSupport === true) {
      if (typeof expiry !== 'undefined') {
        if (expiry > 0) {
          localStorage.setItem(key, value);
        }
        else {
          sessionStorage.setItem(key, value);
        }
      }
      else {
        sessionStorage.setItem(key, value);
      }
    }
    else {
      if (typeof expiry !== 'undefined') {
        this.storeCookie(key, value, expiry);
      }
      else {
        this.storeCookie(key, value);
      }
    }
  }
  
  // store field
  
  storeField(key, value, expiry) {
    let data = this.read(this.database);
    let output = {};
    if (this.validateJSON(data) === true) {
      output = JSON.parse(data);
    }
    output[key] = value;
    output = JSON.stringify(output);
    this.store(this.database, output, expiry);
  }
  
  // read
  
  read(key) {
    let output;
    if (this.lsSupport === true) {
      if (localStorage.getItem(key) !== null) {
        output = localStorage.getItem(key);
      }
      else if (sessionStorage.getItem(key) !== null) {
        output = sessionStorage.getItem(key);
      }
    }
    else if (this.readCookie(key) !== null) {
      output = this.readCookie(key);
    }
    return output;
  }
  
  // read field

  readField(key) {
    let data = this.read(this.database);
    if (this.validateJSON(data) === true) {
      data = JSON.parse(data);
      return data[key];
    }
    else {
      return data;
    }
  }

  // destroy

  destroy(key) {
    if (this.lsSupport === true) {
      if (typeof key !== 'undefined') {
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
  
  // destroy field

  destroyField(key) {
    if (typeof key !== 'undefined') {
      let data = this.read(this.database);
      let output;
      if (this.validateJSON(data) === true) {
        output = JSON.parse(data);
        delete output[key];
        output = JSON.stringify(output);
        if (sessionStorage.getItem(this.database) !== null) {
          this.store(this.database, output);
        }
        else if (localStorage.getItem(this.database) !== null) {
          this.store(this.database, output, this.persistentExpiry);
        }
        else {
          this.store(this.database, output, this.persistentExpiry);
        }
      }
      else {
        this.destroy(key);
      }
    }
    else {
      this.destroy();
    }
  }
  
  // store cookie
  
  storeCookie(key, value, expiry) {
    value = encodeURIComponent(value);
    let date = new Date();
    date.setTime(date.getTime() + (expiry * 24 * 60 * 60 * 1000));
    let expires = "; expires=" + date.toGMTString();
    document.cookie = key + "=" + value + expires + "; path=/";
  }
  
  // read cookie
  
  readCookie(key) {
    let output = null;
    let nameEQ = key + "=";
    let ca = document.cookie.split(";");
    let caLength = ca.length;
    for (let i = 0, max = caLength; i < max; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) {
          output = decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
    }
    return output;
  }
  
  // destroy all cookie
  
  destroyCookie(key) {
    if (typeof key !== 'undefined') {
      this.storeCookie(key, "", -1); // destroy cookie
    }
    else {
      let cookies = document.cookie.split(";");
      let cookiesLength = cookies.length;
      for (let i = 0; i < cookiesLength; i++) {
        let cookie = cookies[i];
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
    }
  }
  
  // validate JSON
  
  validateJSON(data) {
    let output = false;
    if (typeof data !== 'undefined') {
      if (data !== null) {
        try {
          JSON.parse(data);
          output = true;
        } catch(err) {}
      }
    }
    return output;
  }
}

export { LocalData };
