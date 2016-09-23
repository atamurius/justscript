import { fromJS } from 'immutable';
import { action, reducer } from 'client/utils/redux';

let migrations = [
  require('./001-version'),
  require('./002-inc'),
];

// -----------------------------------------------------------------------------

const versionNumber = v => v.split('.').reduce((x,y) => 100 * x + +y, 0);

migrations = migrations
  .reduce((vs,v) => vs.concat(v.constructor === Array ? v : [v]), [ ])
  .map(v => { v.versionNumber = versionNumber(v.version); return v; });

migrations.sort((a,b) => a.versionNumber - b.versionNumber);

export const migrate = store =>
  migrations.reduce((store, v) => {
    const current = store.versions && store.versions.get('currentNumber');
    if (v.versionNumber <= (current || 0)) {
      return store;
    } else {
      const newStore = v.apply(store);
      newStore.versions = newStore.versions
        .set('current', v.version)
        .set('currentNumber', v.versionNumber)
        .update('list', l => l.push(v));
      return newStore;
    }
  }, store);

export const versions = reducer();
