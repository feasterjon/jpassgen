/*
Title: Template Engine
Author: Jonathan Feaster, JonFeaster.com
Date: 2022-04-01
*/

export class Template {
  constructor(data, input, tagPrefix = "{{", tagSuffix = "}}") {
    this.data = data;
    this.input = input;
    this.tagPrefix = tagPrefix;
    this.tagSuffix = tagSuffix;
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
