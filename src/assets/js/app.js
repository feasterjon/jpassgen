/*
Title: App
Author: Jonathan Feaster, JonFeaster.com
Date: 2022-04-11
*/

import { Main } from './main.js';

export class App {
  async load() {
    let response = await fetch('assets/api/config.json');
    if (response.status === 200) {
      let data = await response.json();
      const main = new Main(data);
      main.render();
    }
  }
}