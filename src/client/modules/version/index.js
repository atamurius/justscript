import { action, reducerMap, extendStore } from 'client/utils/redux';

export const migrations = [{
  description: "Version tracking, migrations",
  apply: extendStore('versions', {
      current: '0.0.0',
      currentNumber: 0,
      list: []
  })
}];

export const currentVersion = store => store.versions.get('current');
export const listVersions = store => store.versions.get('list').toJS();

export const reducer = reducerMap();
