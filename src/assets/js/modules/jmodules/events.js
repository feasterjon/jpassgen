/*
Title: Events
Author: Jonathan Feaster, JonFeaster.com
Date: 2022-04-11
*/

export class Events {
  blur(element, eventObject) {
    const el = document.querySelectorAll(
      element + ', #' + element + ', .' + element
    )[0];
    if (el.addEventListener) {
      el.addEventListener('blur', eventObject);
    }
    else if (el.attachEvent) {
      el.attachEvent('onblur', eventObject);
    }
  }
  change(element, eventObject) {
    const el = document.querySelectorAll(
      element + ', #' + element + ', .' + element
    )[0];
    if (el.addEventListener) {
      el.addEventListener('change', eventObject);
    }
    else if (el.attachEvent) {
      el.attachEvent('onchange', eventObject);
    }
  }
  click(element, eventObject) {
    const el = document.querySelectorAll(
      element + ', #' + element + ', .' + element
    )[0];
    if (el.addEventListener) {
      el.addEventListener('click', eventObject);
    }
    else if (el.attachEvent) {
      el.attachEvent('onclick', eventObject);
    }
  }
}
