import React from "react";
import DayListItem from "./DayListItem";

const DayList = ({ days, day, setDay }) => {
  const allDays = days.map(d => {
    return (
      <DayListItem
        key={d.id}
        name={d.name}
        spots={d.spots}
        selected={d.name === day}
        setDay={setDay}
      />
    );
  });

  return <ul>{allDays}</ul>;
};

export default DayList;
