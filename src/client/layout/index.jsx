import React from 'react';
import Nav from './nav';
import { connected } from 'client/utils/redux';
import './index.scss';
import { currentVersion } from 'client/modules/versions';

class Layout extends React.Component {
  static stores = [ 'versions' ];
  render = () =>
    <div className="outer-container">
      <Nav links={[
        { url: '/', text: 'О проекте' },
        { url: '/test', text: 'Тестовая страница' }
      ]}/>
      <div className="top-level container">
        {this.props.children}
      </div>
      <div className="footer">
        <p>&copy;2016 v{currentVersion(this.props)}</p>
      </div>
    </div>
  ;
}

export default connected(Layout);
