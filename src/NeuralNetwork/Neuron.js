import _ from 'lodash';

class Neuron {
  properties = [];
  resultClass = null;

  constructor(x1, x2, x3, x4, y) {
    this.properties = [x1, x2, x3, x4];
    this.resultClass = y;
  }

  getProperties = () => this.properties;

  setPropertiesObject = (props) => this.properties = [...props];

  toString = () => {
    if (_.isEmpty(this.properties) || _.isEmpty(this.resultClass)) {
      return '';
    }
    const [ property1, property2, property3, property4 ] = this.properties;

    return `${property1} ${property2} ${property3} ${property4} = ${this.resultClass}`;
  }

  getResultClass = () => this.resultClass;

  setResultClass = (y) => this.resultClass = y;
}

export default Neuron;
