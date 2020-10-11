import patients from '../../data/patients';
import { Entry, NewPatient, Patient } from '../types';

// const patients: Array<Patient> = patientData as Array<Patient>; //.jsonille

const getPatients = (): Array<Patient> => {
  return patients;
};

const getPatientById = (id: string): Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { ssn, entries, ...patient} = patientData.find(p => id == p.id); //Public patient
  const patient = patients.find(p => id == p.id) as Patient;

  if(patient) {
    return patient;
  }else{
    throw new Error('Incorrect or missing id: ' + id);
  }
};

const addPatient = ( patient: NewPatient): Patient => {

  const newPatient = { id: Math.floor(Math.random() * 99999).toString(), ...patient };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = ( entry: Entry, id: string ): Entry => {
  const foundPatient = getPatientById(id);
  
  foundPatient.entries.push(entry);
  return entry;
};

export default {
  addEntry,
  getPatients,
  getPatientById,
  addPatient
};