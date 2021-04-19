import React from 'react';
import _ from 'lodash';
import { Table } from 'react-bootstrap';
import { trainingData, classNames } from './data';
import { findResultClass, getNeuronsFromData } from '../methods/probabilisticNeuralNetwork';

export const ClassificationMethodView = () => {
  const [ class1Data = [], class2Data = [], class3Data = [] ] = _.values(trainingData);

  const class1Neurons = getNeuronsFromData(class1Data, classNames[0]);
  const class2Neurons = getNeuronsFromData(class2Data, classNames[1]);
  const class3Neurons = getNeuronsFromData(class3Data, classNames[2]);

  const vector = [ 1, 1, 1, 3 ];
  const sigma = 0.7;

  const { R1, R2, R3, D1, D2, D3, p1, p2, p3, inputNeuron } = findResultClass(
    vector, sigma, classNames, { class1Neurons, class2Neurons, class3Neurons }
  );

  const generateTrainingSet = (classData, R, D, numberForLabel) => (
     _.map(classData, (item, index) => {
      const properties = item.getProperties();

      return (
        <tr>
          <td>{`x1: ${properties[0]}`}</td>
          <td>{`x2: ${properties[1]}`}</td>
          <td>{`x3: ${properties[2]}`}</td>
          <td>{`x4: ${properties[3]}`}</td>
          <td>{`y: ${item.getResultClass()}`}</td>
          <td>{generateCalculations(R[index], 'R', numberForLabel, index)}</td>
          <td>{generateCalculations(D[index], 'D', numberForLabel, index)}</td>
          {!index && numberForLabel === 1 && <td rowspan='30'>{generateResults()}</td>}
        </tr>
      )
    })
  );

  const generateCalculations = (value, label, numberForLabel, index) =>
    <p>{`${label}${numberForLabel}_${index+1}: ${value}`}</p>;

  const generateResults = () => {
    return (
      <>
        <p>{`p1: ${p1}`}</p>
        <p>{`p1: ${p2}`}</p>
        <p>{`p1: ${p3}`}</p>
        <p>{inputNeuron.toString()}</p>
      </>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ margin: '20px', display: 'flex' }}>
        <p style={{ marginRight: '20px' }}>
          <b>Vector:</b> {`x1: ${vector[0]} x2: ${vector[1]} x3: ${vector[2]} x4: ${vector[3]}`}
        </p>
        <p><b>Sigma:</b> {sigma}</p>
      </div>
      <Table striped bordered hover variant='dark'>
        <thead>
          <tr>
            <th colspan='5'>
              Дані для навчання
            </th>
            <th colspan='2'>
              Обрахунки
            </th>
            <th>
              Результати
            </th>
          </tr>
        </thead>
        <tbody>
          {generateTrainingSet(class1Neurons, R1, D1, 1)}
          {generateTrainingSet(class2Neurons, R2, D2, 2)}
          {generateTrainingSet(class3Neurons, R3, D3, 3)}
        </tbody>
      </Table>
    </div>
  )
};

export default ClassificationMethodView;
