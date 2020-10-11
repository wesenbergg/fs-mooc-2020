interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (args: Array<number>, target: number): Result => {
  let trainingDays = 0;
  let average = 0;
  let sum = 0;
  let ratingDescription = "";
  
  args.forEach(v => {
    if(v > 0) {
      trainingDays++;
      sum += v;
    }
  });
  
  average = sum / args.length;  
  let rating: number = Math.floor( (average-target) * 2 ) + 3;
  rating = rating < 1 ? 1: rating > 3 ? 3: rating;

  switch(rating) {
    case 1:
      ratingDescription = 'Pysty parempaan!';
      break;
    case 2:
      ratingDescription = 'not too bad but could be better';
      break;
    case 3:
      ratingDescription = 'Well done, champ!';
      break;
  }

  return {
    periodLength: args.length,
    trainingDays,
    success: target <= average,
    rating,
    ratingDescription,
    target,
    average
  };
};

interface exerciseValues {
  value1: Array<number>;
  value2: number;
}
const parseArgumentsExer = (args: Array<string>): exerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const values: Array<number> = args.slice(3).map(e => Number(e));
  console.log(values);
  
  values.forEach(v => {
    if (isNaN(Number(v))) throw new Error('Provided values were not numbers!');
  });
  
  return {
    value1: values.slice(0, -1),
    value2: values[values.length-1]
  };
};

try {
  const { value1, value2 } = parseArgumentsExer(process.argv);
  console.log(calculateExercises(value1, value2));
  
} catch (e) {
  console.log('Error, something bad happened.');
}

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
export function exerciseCalculator(args: Array<number>, target: number): Result {
  return calculateExercises(args, target);
}