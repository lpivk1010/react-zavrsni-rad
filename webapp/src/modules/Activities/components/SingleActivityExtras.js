import React from "react";

const SingleActivityExtras = ({ activity }) => {
  const extrasArray = activity.extras.split(",");
  const listItems = extrasArray.map((item, index) => (
    <li className="single-extras-ul-li" key={index}>
      {item}
    </li>
  ));
  return <ul className="single-extras-ul">{listItems}</ul>;
};

export default SingleActivityExtras;