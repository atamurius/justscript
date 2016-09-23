import React from 'react';
import { Link } from 'react-router';
import { increment } from 'client/modules';
import { connected } from 'client/utils/redux';

class Test extends React.Component {

  static stores = [ 'inc' ];
  static actions = { increment };

  render() {
    const { inc, increment } = this.props;
    return (
      <div>
        <h1>We are on test</h1>
        <p>Current value is <code>{inc.get('value')}</code></p>
        <p>
          <button className="btn btn-default"
                   onClick={increment}>
             Increment
          </button>
        </p>
      </div>
    );
  }
}

export default connected(Test);
