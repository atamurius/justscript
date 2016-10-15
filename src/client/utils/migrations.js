// @flow
import { fromJS } from 'immutable';

type Module = {
  id: string;
  order: number;
  apply: (state: { }) => { };
}

type Modules = {
  [name: string]: {
    migrations: Array<Module>
  }
}

export const collect = (modules: Modules) =>
  Object.keys(modules).reduce((ms,module) =>
    ms.concat(modules[module].migrations.map((m,i) => {
      if (! m.id) m.id = `${module}#${i}`;
      return m;
    })), []);

export const order = (ms: Array<Module>) => {
  const byId = ms.reduce((rs,m) => { rs[m.id] = m; return rs }, { });
  const setOrder = id => {
    const m = byId[id];
    if (m.ordering) {
      throw `Circular dependencies in migration ${m.id}`;
    } else if (m.order) {
      return m.order;
    } else if (! m.dependsOn) {
      m.order = 1;
    } else {
      m.ordering = true;
      m.order = 1 + m.dependsOn
        .map(setOrder)
        .reduce((a,b) => Math.max(a,b));
      delete m.ordering;
    }
    return m.order;
  };
  ms.forEach(m => setOrder(m.id));
  return ms.sort((a,b) => a.order - b.order);
}

export default (
   modules: Modules,
   state: { },
   shouldApply: (state: { }, m: Module) => boolean,
   applied: (state: { }, m: Module) => { }
 ) =>
  order(collect(modules)).reduce((st,m) =>
    shouldApply(st, m) ? applied(m.apply(st), m) : st,
    state);
