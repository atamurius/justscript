
const mods = {
// name        require               migration versions
  'versions': [require('./version'), '0.0.1'],
  'inc':      [require('./inc'),     '0.0.2'],
};


export const modules = Object.keys(mods).reduce((res,m) => {
    res[m] = mods[m][0].reducer;
    return res;
  }, { });

export const migrations = Object.keys(mods).reduce((res,m) => {
    const [mod, ...vs] = mods[m];
    for (let i = 0; i < vs.length; i++) {
      res[vs[i]] = mod.migrations[i];
    }
    return res;
  }, { });
