import React, { Component } from "react";
import Select from "react-select";
import Events from "../../IceRink/Events";
import { map } from "ramda";
import chroma from "chroma-js";

const colorStyles = {
  control: styles => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.3).css()
        : null,
      color: isDisabled
        ? "#ccc"
        : chroma.contrast(data.color, "white") < 2
          ? color.darken(2).css()
          : data.color,
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor:
          !isDisabled && (isSelected ? data.color : color.alpha(0.3).css())
      }
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.3).css()
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles
  })
};
const EventFilter = ({ selectedPeriods, onChange, matchId }) => {
  const options = map(event => ({
    value: Events[event].type,
    label: Events[event].name,
    color: Events[event].color
  }))(Object.keys(Events));
  return (
    <Select
      options={options}
      value={selectedPeriods}
      onChange={onChange}
      placeholder="Events..."
      isMulti
      styles={colorStyles}
    />
  );
};

export default EventFilter;
