import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type CircularBarProps = {
  value: number;
  maxValue: number;
};

export const CircularBar: React.FC<CircularBarProps> = ({ value, maxValue }) => {
  return (
    <div style={{ width: 30, height: 30 }}>
      <CircularProgressbar
        value={value}
        text={`${value}`}
        maxValue={maxValue}
        styles={{
          trail: {
            strokeLinecap: "butt",
            stroke: "#EEE6EE",
            strokeWidth: "7px",
          },
          text: {
            fill: "#000000",
            fontSize: "40px",
            fontWeight: "500",
          },
          path: {
            transform: `rotate(${1 + (1 - value / maxValue) / 1.5}turn)`,
            strokeLinecap: "butt",
            transformOrigin: "center center",
            strokeWidth: "7px",
          },
        }}
      />
    </div>
  );
};
