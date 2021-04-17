import Neuron from '../NeuralNetwork/Neuron';

const calculateSum = (dataList, vector) => {
  let sum = 0;
  for (let index = 0; index < dataList.length; index++) {
    sum+= Math.pow(dataList[index] - vector[index], 2)
  }

  return sum;
}

const calculateR = (classData, vector) => {
  const R = [];
  for (let index = 0; index < classData.length; index++) {
    const value = calculateSum(classData[index].getProperties(), vector.getProperties());
    R.push(Math.sqrt(value));
  }

  return R;
}

const calculateD = (RList, sigma) => {
  const D = [];

  for(let index = 0; index < RList.length; index++) {
    const value = Math.exp(-RList[index] * RList[index] / (sigma * sigma));
    D.push(value);
  }

  return D;
};

const calculateP = (sumD, sumOfAllD) => sumD/sumOfAllD;

const calculateDSum = (DList) => {
  let sum = 0;
  for (let value of DList) {
    sum += value;
  }

  return sum;
};

export const getNeuronsFromData = (values, className) => {
  const array = [];

  for (let index = 0; index < values.length; index++) {
    const neuron = new Neuron(...values[index], className);
    array.push(neuron);
  }

  return array;
};

export const findResultClass = (vector, sigma, classNames, classData ) => {
  const inputNeuron = new Neuron(...vector);
  const [ class1, class2, class3 ] = classNames;
  const { class1Neurons, class2Neurons, class3Neurons } = classData;

  const
    R1 = [...calculateR(class1Neurons, inputNeuron)],
    R2 = [...calculateR(class2Neurons, inputNeuron)],
    R3 = [...calculateR(class3Neurons, inputNeuron)];

  const
    D1 = [...calculateD(R1, sigma)],
    D2 = [...calculateD(R2, sigma)],
    D3 = [...calculateD(R3, sigma)];

  const
    sumD1 = calculateDSum(D1),
    sumD2 = calculateDSum(D2),
    sumD3 = calculateDSum(D3);

  const sumOfAllD = sumD1 + sumD2 + sumD3;

  const
    p1 = calculateP(sumD1, sumOfAllD),
    p2 = calculateP(sumD2, sumOfAllD),
    p3 = calculateP(sumD3, sumOfAllD);

  const maxValue = Math.max(p1, p2, p3);

  switch(maxValue) {
    case p1: {
      inputNeuron.setResultClass(class1);
      break;
    }
    case p2: {
      inputNeuron.setResultClass(class2);
      break;
    }
    case p3: {
      inputNeuron.setResultClass(class3);
    }
  }

  return { R1, R2, R3, D1, D2, D3, p1, p2, p3, inputNeuron };
};
