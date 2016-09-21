import React from 'react';

import './index.scss';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="container">
        {this.props.children}
      </div>
    );
  }
}
