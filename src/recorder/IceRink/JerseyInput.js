import React, { useState } from "react";
import styled from "styled-components";

const Input = styled.input`
  width: 200px;
  height: 100%;
  font-size: 120px;
  text-align: center;
`;

export default function JerseyInput({ value, onChange }) {
  return (
    <Input
      autoFocus
      type="number"
      maxLength={2}
      placeholder="00"
      value={value}
      onChange={onChange}
    />
  );
}
