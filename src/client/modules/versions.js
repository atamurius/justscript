import { action, reducerMap, extendStore } from 'client/utils/redux';
import { fromJS } from 'immutable';

export const migrations = [{
  order: -1,
  description: "Version tracking, migrations",
  apply: extendStore('versions', {
      current: 0,
      list: []
  })
}];

export const currentVersion = store => store.versions.get('current');
export const listVersions = store => store.versions.get('list').toJS();

export const shouldApply = (state, module) =>
  ! state.versions ||
  ! state.versions.get('list').contains(m => m.get('id') === module.id);

export const applied = (state, module) => {
  state.versions = state.versions
    .update('list', l => l.push(fromJS(module)))
    .update('current', x => x + 1);
  return state;
}

export default reducerMap();
