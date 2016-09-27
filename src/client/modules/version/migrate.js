import { fromJS } from 'immutable';
import { action, reducer } from 'client/utils/redux';

const versionNumber = v => v.split('.').reduce((x,y) => 100 * x + +y, 0);

const toList = migrations => {
  const list = Object.keys(migrations)
    .map(key => {
      const migration = migrations[key];
      migration.version = key;
      migration.versionNumber = versionNumber(key);
      return migration;
    });
  list.sort((a,b) => a.versionNumber - b.versionNumber);
  return list;
}

export default (store, migrations) =>
  toList(migrations).reduce((store, v) => {
    const current = store.versions && store.versions.get('currentNumber');
    if (v.versionNumber <= (current || 0)) {
      return store;
    } else {
      console.debug(`Applying migration to ${v.version}`);
      const newStore = v.apply(store);
      newStore.versions = newStore.versions
        .set('current', v.version)
        .set('currentNumber', v.versionNumber)
        .update('list', l => l.push(v));
      return newStore;
    }
  }, store);
