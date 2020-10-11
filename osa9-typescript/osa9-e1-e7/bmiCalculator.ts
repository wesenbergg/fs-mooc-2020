const calculateBmi = (h: number, w: number): string => {
  const bmi: number = w / (h*h/10000);
  
  if( 0 < bmi && bmi < 15) {
    return 'Very severely underweight';
  } else if( bmi < 16) {
    return 'Severely underweight';
  } else if(bmi < 18.5) {
    return 'Underweight';
  } else if( bmi < 25) {
    return 'Normal (healthy weight)';
  } else if(bmi < 30) {
    return 'Overweight';
  } else if(bmi < 35) {
    return 'Obese Class I (Moderately obese)';
  } else if(bmi < 40) {
    return 'Obese Class II (Severely obese)';
  } else if(bmi > 40) {
    return 'Obese Class III (Very severely obese)';
  } else {
    return 'Error';
  }
};

interface BmiValues {
  value1: number;
  value2: number;
}

const parseArgumentsBmi = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const { value1, value2 } = parseArgumentsBmi(process.argv);
  console.log(calculateBmi(value1, value2));
  
} catch (e) {
  console.log('Error, something bad happened.');
}
// console.log(calculateBmi(180, 74))
export function bmi(v1:number, v2:number): string {
  return calculateBmi(v1, v2);
}