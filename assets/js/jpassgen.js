<!--

/*
Title: JPassGen
Author: Jonathan Feaster, JonFeaster.com
Date: 2021-09-06
*/

window.main = window.main || {}; // namespace

main.App = (function() { // class

  'use strict';

  // init
  function init(data) {

    if (typeof data !== 'undefined') {
      document.body.innerHTML = document.getElementById(data.templateId).innerHTML;
      main.Events.click(data.templateButtons.submitId, gen);
      main.Events.click(data.templateButtons.copyId, function(){
        main.Tasks.copyClip(data.outputId, data.templateButtons.copyId);
      });
      main.Events.click(data.templateButtons.resetId, reset);
      main.Events.click(data.templateButtons.helpId, function() {
        main.Effects.toggle(data.helpContentId);
      });
      if (typeof main.Data.read(data.localDB + '-' + data.saveId) !== 'undefined') {
        let query;
        let values = Object.values(data.templateFields);
        for (let value of values) {
          query = main.Data.read(data.localDB + '-' + value);
          if (typeof query !== 'undefined') {
            document.getElementById(value).value = query;
          }
        }
        document.getElementById(data.saveId).checked = true;
      }
      if (data.autoStart === true) {
        gen(); // generate random password
      }
      if (data.enableCreds === true) {
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
  function removeSpaces(str) {

    let output = '';

    if (str) {
     output = str.replace(/\s/g, ''); // remove spaces
    }
    return output;
  }

  // validate
  function validate(str, strTest) {

    let output = false;

    if (strTest !== '') {
      for (let i = 0; i < strTest.length; i++) {
        if (str.indexOf(strTest.charAt(i)) >= 0) {
          output = true;
          break;
        }
      }
    }
    else {
      output = true;
    }
    return output;
  }

  // random password
  function randomPass(length, characters) {

    let output = '';

    length = Math.abs(parseInt(length)); // convert length to positive integer
    if (Number.isInteger(length) && characters !== '') {
      for (let i = 0; i < length; i++) {
        output += characters.charAt(Math.floor(Math.random() * characters.length));
      }
    }
    return output;
  }

  // reset
  function reset() {

    let values = Object.values(data.templateFields);
    for (let value of values) {
      main.Data.destroy(data.localDB + '-' + value); // destroy templateFields in browser
      document.getElementById(value).value = document.getElementById(value).defaultValue;
    }
    main.Data.destroy(data.localDB + '-' + data.saveId); // destroy save in browser
    document.getElementById(data.saveId).checked = document.getElementById(data.saveId).defaultChecked;
    document.getElementById(data.outputId).value = document.getElementById(data.outputId).defaultValue;
    document.getElementById(data.templateButtons.submitId).focus();
  }

  // generate random password
  function gen() {

    let password = "";
    let output = "";
    let length = document.getElementById(data.templateFields.lengthId).value;
    let lettersLower = document.getElementById(data.templateFields.lettersLowerId).value;
    let lettersUpper = document.getElementById(data.templateFields.lettersUpperId).value;
    let numbers = document.getElementById(data.templateFields.numbersId).value;
    let symbols = document.getElementById(data.templateFields.symbolsId).value;
    let amount = document.getElementById(data.templateFields.amountId).value;
    let save = document.getElementById(data.saveId).checked;

    if (length >= 5 && (lettersLower !== '' || lettersUpper !== '' || numbers !== '' || symbols !== '') && amount >= 1) {
      lettersLower = removeSpaces(lettersLower); // remove spaces
      lettersUpper = removeSpaces(lettersUpper); // remove spaces
      numbers = removeSpaces(numbers); // remove spaces
      symbols = removeSpaces(symbols); // remove spaces
      let characters = lettersLower+lettersUpper+numbers+symbols; // concatenate all characters
      for (let i = 0; i < amount; i++) { // iterate through amount
        password = randomPass(length, characters); // generate random password
        while (validate(password, lettersLower) === false || validate(password, lettersUpper) === false || validate(password, numbers) === false || validate(password, symbols) === false) {
          password = randomPass(length, characters); // generate random password
        }
        if (i === 0) {
          output = password;
        }
        else {
          output += "\r" + password;
        }
      }
      if (save === true) {
        let values = Object.values(data.templateFields);
        for (let value of values) {
          main.Data.store(data.localDB + '-' + value, document.getElementById(value).value); // set templateFields in browser
        }
        main.Data.store(data.localDB + '-' + data.saveId, save); // set save in browser
      }
    }
    else {
      alert('Error: One or more fields contains an invalid value.');
    }
    document.getElementById(data.outputId).value = output;
    document.getElementById(data.outputId).select();
  }

  return {
    init: init
  };

})();

main.Effects = (function() { // class

  // toggle
  function toggle(id) {

    const element = document.getElementById(id);

    if (element.style.display === 'block') {
      element.style.display = 'none';
    }
    else {
      element.style.display = 'block';
    }
  }

  return {
    toggle: toggle
  };

})();

main.Events = (function() { // class

  // click
  function click(id, eventObject) {

    const element = document.getElementById(id);

    if (element.addEventListener) {
      element.addEventListener('click', eventObject);
    }
    else if (element.attachEvent) {
      element.attachEvent('onclick', eventObject);
    }
  }

  return {
    click: click
  };

})();

main.Tasks = (function() { // class

  // copy to clipbord
  function copyClip(id, copyId) {

    const element = document.getElementById(id);

    element.select();
    element.setSelectionRange(0, 99999); /* For mobile devices */
    navigator.clipboard.writeText(element.value);
    if (typeof(copyId) !== 'undefined') {
      const copyElement = document.getElementById(copyId);
      const defaultInnerHTML = copyElement.innerHTML;
      copyElement.disabled = true;
      copyElement.innerHTML = "Copied!";
      copyElement.focus();
      setTimeout(function(){
        copyElement.innerHTML = defaultInnerHTML;
        copyElement.disabled = false;
      }, 1000);
    }
  }

  return {
    copyClip: copyClip
  };

})();

main.Data = (function() { // class

  // test
  function test() {
    if (typeof(Storage) !== 'undefined') {
      try {
        sessionStorage.setItem('sessionStorage', 'true');
        return true;
      }
      catch(err) {
        return false;
      }
    }
    else {
      return false;
    }
  }

  // store
  function store(key, value, expiry) {
    if (test() === true) {
      if (expiry) {
        sessionStorage.setItem(key, value);
      }
      else {
        localStorage.setItem(key, value);
      }
    }
  }

  // read
  function read(key) {
    if (test() === true) {
      if (sessionStorage.getItem(key)) {
        return sessionStorage.getItem(key);
      }
      else if (localStorage.getItem(key)) {
        return localStorage.getItem(key);
      }
    }
  }

  // destroy
  function destroy(key) {
    if (test() === true) {
      if (key) {
        localStorage.removeItem(key);
      }
      else {
        localStorage.clear();
      }
    }
  }

  return {
    test: test,
    store: store,
    read: read,
    destroy: destroy
  };

})();

// -->
