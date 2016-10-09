import React from 'react';
import { Link } from 'react-router';
import { increment, value } from 'client/modules/inc';
import { listVersions } from 'client/modules/versions';
import { connected } from 'client/utils/redux';
import Ace from 'react-ace';
import brace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/xcode';
import $ from 'jquery';

class Test extends React.Component {

  static stores = [ 'inc','versions' ];
  static actions = { increment };

  componentDidMount() {
    window.addEventListener('resize', this.resizeEditors);
    this.resizeEditors();
  }

  resizeEditors = () => {
    $('.ace_editor').each((i,e) => {
      this.resizeEditor($(e))
    })
  }

  resizeEditor = e => {
    e.css('width', e.parent().width());
  }

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
        <ul className="text">
          {listVersions(this.props).map(v =>
            <li key={v.id}><code>{v.id}</code>&nbsp;&ndash; {v.description}</li>
          )}
        </ul>
        <h2>Code editor</h2>
        <div className="editor">
          <Ace mode="javascript" theme="xcode" height="100px"
               showPrintMargin={false} highlightActiveLine={true} />
        </div>
      </div>
    );
  }
}

export default connected(Test);
