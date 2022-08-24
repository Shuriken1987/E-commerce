import React from "react";
import "../../pages/Contact/contact.scss";
const Map = ({ url }) => {
  return <iframe title="map" className="map-frame" src={url}></iframe>;
};

export default Map;
