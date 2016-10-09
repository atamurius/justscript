import React from 'react';
import { Link, routerShape } from 'react-router';

export default class Nav extends React.Component {
  static contextTypes = {
    router: routerShape
  }
  closeNavbarToggle = () => {
    const toggle = document.querySelector('.navbar-toggle');
    toggle && ! toggle.classList.contains('collapsed') && toggle.click();
  }
  link = ({ url, text }) => {
    const cls = this.context.router.isActive(url, true) ? 'active' : '';
    return <li key={url} className={cls}>
      <Link to={url} onClick={this.closeNavbarToggle}
            activeClassName="current" onlyActiveOnIndex={url === '/'}>
        {text}
      </Link>
    </li>;
  }
  render = () =>
    <nav>
      <h1>JustScript</h1>
      <ol className="navigation">
        {this.props.links.map(this.link)}
      </ol>
    </nav>
  ;
}
