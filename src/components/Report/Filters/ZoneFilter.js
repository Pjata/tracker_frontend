import React, { Component } from "react";
import Select from "react-select";

const options = [
  {
    value: "DEFEND",
    label: "Defending zone"
  },
  {
    value: "NEUTRAL",
    label: "Neutral zone"
  },
  {
    value: "ATTACK",
    label: "Attacking zone"
  },
];

const ZoneFilter = ({ selectedPeriods, onChange }) => {
  return (
    <Select
      options={options}
      value={selectedPeriods}
      onChange={onChange}
      placeholder="Zones..."
      isMulti
    />
  );
};

export default ZoneFilter;
