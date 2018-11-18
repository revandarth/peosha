import { Injectable } from '@angular/core';

@Injectable()
export class GlobalData {
  constructor() { }
  public user:Object = {};
  setUser = (user) => {
      this.user = user;
  }
  getUser = () => {
      return this.user;
  }
}
