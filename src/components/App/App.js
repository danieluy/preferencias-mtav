import React, { PureComponent, Fragment } from 'react';
import Family from '../Family/Family';
import FamilyInfo from '../Family/FamilyInfo';
import Container from '../common/Container/Container';
import config from '../../config';


class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      family: {},
      units: null,
    }
    this.setAllowedUnits = this.setAllowedUnits.bind(this);
    this.setFamilyInfo = this.setFamilyInfo.bind(this);
  }

  componentDidMount() {
    this.validateUnitsConfig();
    this.setAllowedUnits();
  }

  setAllowedUnits() {
    if (this.state.family.dorms) {
      const dorms = `d${this.state.family.dorms}`;
      const units = config.units[dorms]
        .map(unit => ({ unit, priority: -1 }));
      this.setState({ units });
    }
  }

  validateUnitsConfig() {
    const { units } = config;
    const totalOk = units.d2.length + units.d3.length + units.d4.length === units.total;
    if (!totalOk)
      throw new Error('La cantidad de apartamentos no coincide con el total declarado.');
  }

  get familyInfoCompleted() {
    return !!this.state.family.id && !!this.state.family.name && !!this.state.family.dorms;
  }

  setFamilyInfo(family) {
    this.setState({
      family
    }, this.setAllowedUnits);
  }

  render() {
    return (
      <Container className="app-wrapper">
        {!this.familyInfoCompleted &&
          <Family onChange={this.setFamilyInfo} />
        }
        {this.familyInfoCompleted &&
          <Fragment>
            <FamilyInfo
              onEdit={() => this.setState({ family: {} })}
              info={this.state.family}
            />
          </Fragment>
        }
        <pre>
          {JSON.stringify(this.state, null, 2)}
        </pre>
      </Container>
    );
  }
}

export default App;
