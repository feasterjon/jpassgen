/*
Title: Template Engine
Author: Jonathan Feaster, JonFeaster.com
Date: 2021-10-28
*/

class Template {
  constructor(data, input) {
    this.data = data;
    this.input = input;
    this.tagPrefix = "{{ ";
    this.tagSuffix = " }}";
  }

  // compile

  compile() {
    let values = Object.values(this.data);
    for (let value of values) {
      this.input = this.input.replace(new RegExp(this.tagPrefix + value.name + this.tagSuffix, 'g'), value.value);
    }
    return this.input;
  }
}

export { Template };
