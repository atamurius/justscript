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
  link({ url, text }) {
    const cls = this.context.router.isActive(url, true) ? 'active' : '';
    return <li key={url} className={cls}>
      <Link to={url} onClick={this.closeNavbarToggle}>
        {text}
      </Link>
    </li>;
  }
  render = () =>
    <nav className="navbar navbar-fixed-top">
      <div className="container-fluid">

        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed"
                  data-toggle="collapse"
                  data-target="#navbar-collapse"
                  aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link className="navbar-brand" to="/"><b>J</b>ust<b>S</b>cript</Link>
        </div>

        <div className="collapse navbar-collapse" id="navbar-collapse">
          <ul className="nav navbar-nav">
            {this.props.links.map(l => this.link(l))}
          </ul>
          <ul className="nav navbar-nav navbar-right"/>
        </div>

      </div>
    </nav>
  ;
}
