/*
Title: Interaction
Author: Jonathan Feaster, JonFeaster.com
Date: 2021-11-17
*/

class Interaction {

  // copy to clipbord

  copyClip(element, copyElement, text, milliseconds) {
    
    const el = document.querySelectorAll(
      element + ', #' + element + ', .' + element
    )[0];

    el.select();
    el.setSelectionRange(0, 99999); /* For mobile devices */
    navigator.clipboard.writeText(el.value);
    this.feedback(copyElement, text, milliseconds);
  }
  
  // feedback

  feedback(element, text, milliseconds) {
  
    const el = document.querySelectorAll(
      element + ', #' + element + ', .' + element
    )[0];
    let ms = 1000;
    let hasInnerHTML = false;
    
    if (typeof el !== 'undefined') {
      let defaultTxt = el.innerHTML;
      if (defaultTxt !== '') {
        hasInnerHTML = true;
      }
      if (hasInnerHTML === false) {
        defaultTxt = el.value;
      }
      el.disabled = true;
      if (typeof text !== 'undefined') {
        if (hasInnerHTML === true) {
          el.innerHTML = text;
        }
        else {
          el.value = text;
        }
      }
      el.focus();
      if (typeof milliseconds !== 'undefined') {
        ms = milliseconds;
      }
      setTimeout(function(){
        if (hasInnerHTML === true) {  
          el.innerHTML = defaultTxt;
        }
        else {
          el.value = defaultTxt;
        }
        el.disabled = false;
      }, ms);
    }
  }
}

export { Interaction };
