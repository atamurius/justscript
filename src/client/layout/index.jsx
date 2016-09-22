import React from 'react';
import Nav from './nav';
import './index.scss';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="outer-container">
        <Nav links={[
          { url: '/', text: 'О проекте' },
          { url: '/test', text: 'Тестовая страница' }
        ]}/>
        <div className="top-level container">
          {this.props.children}
        </div>
        <div className="footer">
          &copy;2016
        </div>
      </div>
    );
  }
}
