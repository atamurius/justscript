import React, { PropTypes as p } from 'react';
import Ace from 'react-ace';
import brace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/xcode';
import $ from 'jquery';

import './style.scss';

export default class Editor extends React.Component {

  static propTypes = {
    code: p.string
  }

  state = {
    width: 400,
    result: undefined,
    error: null,
    code: this.props.code || '',
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeEditor);
    this.resizeEditor();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeEditor);
  }

  resizeEditor = () => {
    this.setState({ width: $(this.refs.editorContainer).width() });
  }

  changed = code => {
    this.setState({ code, result: undefined, error: null });
  }

  execute() {
    const code = this.refs.editor.editor.getValue();
    const sandbox = this.refs.sandbox.contentWindow;
    delete sandbox.parent;
    try {
      this.setState({
        result: sandbox.eval(code),
        error: null,
        executed: code
      });
    } catch (e) {
      this.setState({
        error: e,
        result: undefined,
        executed: code
      });
    }
  }

  check = e => {
    if (e.ctrlKey && e.keyCode == 13) {
      this.execute();
    }
  }

  formatResult = result =>
    <p>{result}</p>

  render = () =>
    <div className="editor">
      <div className="editor__results">
        {typeof this.state.result === 'undefined' ? null :
          <div className="editor__results__result">
            <h3>Результат:</h3>
            {this.formatResult(this.state.result)}
          </div>
        }
        {! this.state.error ? null :
          <div className="editor__results__error">
            <h3>Ошибка:</h3>
            <p>{this.state.error.message}</p>
          </div>
        }
      </div>
      <div className="editor__frame" ref="editorContainer" onKeyUp={this.check}>
        <Ace mode="javascript"
             theme="xcode"
             height="100px" width={`${this.state.width}px`}
             ref="editor"
             onChange={this.changed}
             value={this.state.code}
             showPrintMargin={false}
             highlightActiveLine={true} />
         <div className="editor__frame__footer">
           Для выполнения кода нажмите <kbd>Ctrl</kbd> + <kbd>&crarr;</kbd>
         </div>
         <iframe ref="sandbox" style={{display: 'none'}}/>
      </div>
    </div>
}
