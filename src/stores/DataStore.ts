import {observable, action, computed, makeObservable, runInAction} from 'mobx';
import {callRegisterFace, callCheckinFace} from '@root/api';
import {getBase64FromUri} from '@root/utils/file';

export default class DataStore {
  @observable phoneNumber = '';
  @observable registeredFaces: Array<FaceData> = [];

  constructor() {
    makeObservable(this);
  }

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

  isDuplicatedName(name: string) {
    return this.registeredFaces.filter((f) => f.name === name).length > 0;
  }

  async addFaceData(data: FaceData) {
    const base64 = await getBase64FromUri(data.uri);
    const result = await callRegisterFace({
      name: data.name,
      base64,
    });
    console.log('addFaceData::result', result);
    runInAction(() => this.registeredFaces.push({...data, id: result.id}));
  }

  async checkFace(uri: string): Promise<FaceData> {
    const base64 = await getBase64FromUri(uri);
    const result = await callCheckinFace({base64});
    console.log('checkFace::result', result);
    const data = this.registeredFaces[0];
    return {
      ...data,
    };
  }
}

export interface FaceData {
  id?: number;
  uri: string;
  name: string;
  accuracy?: number;
}
