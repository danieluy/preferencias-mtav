import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// Material UI
import { withStyles } from '@material-ui/core/styles';

class Units extends PureComponent {
  state = {};

  lalala = () => { }

  render() {
    const { classes, units } = this.props;
    return (
      <pre>
        {JSON.stringify(units, null, 2)}
      </pre>
    );
  }
}

Units.propTypes = {
  classes: PropTypes.object.isRequired,
  units: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(Units);

function styles(theme) {
  return {};
};
