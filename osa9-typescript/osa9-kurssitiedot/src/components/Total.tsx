import React from "react";

interface Total {
  exerciseCount(): number;
}
const Total: React.FC<Total> = props => {
  return (
    <p>Number of exercises {props.exerciseCount()}</p>
  );
};

export default Total;