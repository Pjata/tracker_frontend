import React, { Component } from "react";
import Select from "react-select";

const options = [
  {
    value: "FIRST",
    label: "First period"
  },
  {
    value: "SECOND",
    label: "Second period"
  },
  {
    value: "THIRD",
    label: "Third period"
  }
];

const PeriodFilter = ({ selectedPeriods, onChange, matchId }) => {
  return (
    <Select
      options={options}
      value={selectedPeriods}
      onChange={onChange}
      placeholder="Periods..."
      isMulti
    />
  );
};

export default PeriodFilter;
