import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const style = {
  button: {
    display: 'inline-block',
    fontFamily: 'sans-serif',
    borderRadius: '5px',
    color: '#555',
    padding: '5px 10px',
    textAlign: 'center',
    cursor: 'pointer',
    backgroundColor: '#EEE',
  },
  input: {
    display: 'none',
  },
};

const outputs = {
  ANY: {
    transform: input => input,
    accept: null,
    mimeType: null,
  },
  JSON: {
    transform: input => JSON.parse(input),
    accept: '.json,application/json',
    mimeType: 'application/json',
  },
  IMG: {
    transform: input => input,
    accept: 'image/*',
    mimeType: null,
  },
};

class InputFile extends PureComponent {
  constructor() {
    super();
    this.state = {};
    this.onChange = this.onChange.bind(this);
    this.output = this.output.bind(this);
  }

  onChange(evt) {
    const { onComplete, multiple, output, onError } = this.props;
    const files = Array.from(evt.target.files).filter((file) => {
      if (!output)
        return true;
      return file.type === outputs[output].mimeType;
    });
    if (files.length)
      Promise.all(files.map(file => this.readFile(file)))
        .then(results => this.output(results))
        .catch(err => onError(err));
    else
      onComplete(multiple ? [] : null);
  }

  output(results) {
    const { onComplete, multiple, output, onError } = this.props;
    try {
      const out = results.map(file => outputs[output].transform(file));
      onComplete(multiple ? out : (out[0] || null));
    }
    catch (err) {
      onError(err);
    }
  }

  readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (evt) => {
        resolve(evt.target.result);
      };
      reader.onerror = (evt) => {
        reader.abort();
        reject(new Error('Error loading file.'));
      };
      reader.readAsText(file);
    });
  }

  render() {
    const { multiple, children, output } = this.props;
    const id = Math.random();
    const label = multiple ? 'Upload files' : 'Upload file';
    const accept = output !== 'ANY'
      ? outputs[output].accept
      : undefined;
    return (
      <label htmlFor={id} aria-label={label} style={!children ? style.button : {}}>
        {children || label}
        <input
          id={id}
          type="file"
          multiple={multiple}
          style={style.input}
          onChange={this.onChange}
          accept={accept}
        />
      </label>
    );
  }
}

InputFile.propTypes = {
  multiple: PropTypes.bool,
  children: PropTypes.object,
  onComplete: PropTypes.func.isRequired,
  onError: PropTypes.func,
  output: PropTypes.oneOf(['ANY', 'JSON', 'IMG']),
};

InputFile.defaultProps = {
  multiple: false,
  children: null,
  output: 'ANY',
  onError: err => console.error(err),
};

export default InputFile;
