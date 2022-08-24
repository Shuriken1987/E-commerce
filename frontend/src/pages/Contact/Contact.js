import React from "react";
import ContactForm from "../../components/Contact/ContactForm";
import Map from "../../components/Contact/Map";
import ContactInfo from "../../components/Contact/ContactInfo";
import "./contact.scss";

function Contact() {
  return (
    <>

      <Map url="https://www.openstreetmap.org/export/embed.html?bbox=20.412769317626957%2C44.80418913062458%2C20.42693138122559%2C44.81090280205642&amp;layer=mapnik&amp;marker=44.80754606401696%2C20.41985034942627"></Map>
      <div className="section-padding"></div>
      <div className="container">
        <div className="row">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
      <div className="section-padding"></div>
    </>
  );
}

export default Contact;
