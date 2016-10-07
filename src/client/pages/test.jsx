import React from 'react';
import { Link } from 'react-router';
import { increment, value } from 'client/modules/inc';
import { listVersions } from 'client/modules/versions';
import { connected } from 'client/utils/redux';

class Test extends React.Component {

  static stores = [ 'inc','versions' ];
  static actions = { increment };

  render() {
    const { increment } = this.props;
    return (
      <div>
        <h1>We are on test</h1>
        <p>Current value is <code>{value(this.props)}</code></p>
        <p>
          <button className="btn btn-default"
                   onClick={increment}>
             Increment
          </button>
        </p>
        <h2>Changelog</h2>
        <ul>
          {listVersions(this.props).map(v =>
            <li key={v.id}><code>{v.id}</code>&nbsp;&ndash; {v.description}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default connected(Test);
