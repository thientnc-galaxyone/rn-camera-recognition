import {createContext, useContext} from 'react';
import DataStore, {FaceData as FaceDataType} from './DataStore';

export const stores = {
  dataStore: new DataStore(),
};

export const StoreContext = createContext(stores);
export type FaceData = FaceDataType;
export const useStores = () => useContext(StoreContext);
