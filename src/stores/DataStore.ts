import {observable, action, computed} from 'mobx';

export default class DataStore {
  @observable phoneNumber = '';
  @observable registeredFaces: Array<FaceData> = [];

  constructor() {}

  @action
  clear() {
    this.updatePhoneNumber('');
  }

  @action
  updatePhoneNumber(phoneNumber: string) {
    this.phoneNumber = phoneNumber;
  }

  @computed
  get isPhoneEmpty() {
    return !this.phoneNumber;
  }

  @action
  isDuplicatedName(name: string) {
    return this.registeredFaces.filter((f) => f.name === name).length > 0;
  }

  @action
  addFaceData(data: FaceData) {
    console.log('addFaceData', data);
    this.registeredFaces.push({...data, id: new Date().getTime()});
  }
}

export interface FaceData {
  id?: number;
  uri: string;
  name: string;
  accuracy?: number;
}
