/**
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { read, write } from '../libs/ReadWrite/ReadWrite';

export default class SampleController {

  constructor () {
    this.writeSomeStuff();
    this.readSomeStuff();
    this.writeSomeStuff();
    this.readSomeStuff();
  }

  @read
  readSomeStuff () {
    console.log('read');

    // Reading offsetTop here is fine.
    console.log(document.querySelector('.main').offsetTop);

    // Mutating styles is not.
    document.querySelector('.main').style.top = '100px';
  }

  @write
  writeSomeStuff () {
    console.log('write');

    // Writing top here is fine.
    document.querySelector('.main').style.top = '200px';

    // Calling focus() here can trigger layout because it's a read op.
    document.querySelector('.main').focus();

    // Same for offsetTop.
    document.querySelector('.main').offsetTop;
  }
}
