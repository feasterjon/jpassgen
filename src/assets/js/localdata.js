/*
Title: LocalData
Author: Jonathan Feaster, JonFeaster.com
Date: 2021-10-20
*/

class LocalData {
  constructor() {
    this.lsSupport = false;
    
    if (typeof(Storage) !== 'undefined') {
      try {
        sessionStorage.setItem('sessionStorage', 'true');
        this.lsSupport = true;
      }
      catch(err) {};
    }
  }

  // store

  store(key, value, expiry) {
    if(this.lsSupport === true) {
      if (expiry) {
        sessionStorage.setItem(key, value);
      }
      else {
        localStorage.setItem(key, value);
      }
    }
    else {
      if (expiry) {
        this.storeCookie(key, value, expiry);
      }
      else {
        this.storeCookie(key, value);
      }
    }
  }

  // read

  read(key) {
    if(this.lsSupport === true) {
      if (sessionStorage.getItem(key)) {
        return sessionStorage.getItem(key);
      }
      else if (localStorage.getItem(key)) {
        return localStorage.getItem(key);
      }
    }
    else {
      return this.readCookie(key);
    }
  }

  // destroy

  destroy(key) {
    if(this.lsSupport === true) {
      if (key) {
        localStorage.removeItem(key);
      }
      else {
        localStorage.clear();
      }
    }
    else {
      if (key) {
        this.storeCookie(key, "", -1); // destroy cookie
      }
      else {
        this.destroyCookies();
      }
    }
  }
  
  // store cookie
  
  storeCookie(key, value, expiry) {
    let date = new Date();
    date.setTime(date.getTime() + (expiry * 24 * 60 * 60 * 1000));
    let expires = "; expires=" + date.toGMTString();
    document.cookie = key + "=" + value + expires + "; path=/";
  }
  
  // read cookie
  
  readCookie(key) {
    let nameEQ = key + "=";
    let ca = document.cookie.split(";");
    let caLength = ca.length;
    for (let i = 0, max = caLength; i < max; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  
  // destroy all cookies
  
  destroyCookies() {
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

export { LocalData };
