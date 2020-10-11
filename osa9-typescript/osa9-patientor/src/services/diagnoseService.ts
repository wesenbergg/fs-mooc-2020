import diagnosesData from '../../data/diagnoses.json';
import { Diagnosis } from '../types';

const diagnosis: Array<Diagnosis> = diagnosesData;

const getDiagnoses = (): Array<Diagnosis> => {
  return diagnosis;
};

const addDiagnosis = (): null => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnosis
};