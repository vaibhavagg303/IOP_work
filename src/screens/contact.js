import React,{useState} from "react";
import {contact} from '../api';
import swal from 'sweetalert';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon, MDBBtn, MDBInput } from "mdbreact";
import "./contact.css"
const ContactPage = () => {
  const [formData, setFormData] = useState({ Name: '', Email: '',Subject: '', Message: ''});
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    contact(formData).then((result) => {
      console.log({result});
      if(result.status=="Message Sent")swal("Contact Us",`${result.status}`,"success");
      else swal("Contact Us",`${result.status}`,"error");
    });
 }
  return (
    <section className="my-5">
      <h1 className="h1-responsive font-weight-bold text-center my-5" id = "tkt1">
        Contact us
      </h1>
      <p className="text-center w-responsive mx-auto pb-5" id = "tkt">
      While we’re good with smoke signals, there are simpler ways for us to get in touch and answer your queries.
      </p>
      <MDBRow>
        <MDBCol lg="5" className="lg-0 mb-4">
          <MDBCard>
            <MDBCardBody>
              <div className="form-header blue accent-1" id = "www">
                <h3 className="mt-2">
                  <MDBIcon icon="envelope" /> Write to us:
                </h3>
              </div>
              <p className="dark-greytext">
                Feel free to ask any query. Our team will contact you ASAP!
              </p>
              <div className="md-form">
                <MDBInput
                  icon="user"
                  label="Name"
                  // valueDefault = {props.type === "update" ? props.record.UOM_Name : ""}
                  value={formData.Name}
                  onChange={(e) => setFormData({...formData,Name: e.target.value})}
                  iconClass="teal-text"
                  type="text"
                  id="form-name"
                />
              </div>
              <div className="md-form">
                <MDBInput
                  icon="envelope"
                  label="Email"
                  value={formData.Email}
                  onChange={(e) => setFormData({...formData,Email: e.target.value})}
                  iconClass="teal-text"
                  type="text"
                  id="form-email"
                />
              </div>
              <div className="md-form">
                <MDBInput
                  icon="tag"
                  label="Subject"
                  value={formData.Subject}
                  onChange={(e) => setFormData({...formData,Subject: e.target.value})}
                  iconClass="teal-text"
                  type="text"
                  id="form-subject"
                />
              </div>
              <div className="md-form" id ="tf">
                <MDBInput
                  icon="pencil-alt"
                  label="Message"
                  value={formData.Message}
                  onChange={(e) => setFormData({...formData,Message: e.target.value})}
                  iconClass="teal-text"
                  type="textarea"
                  id="form-text"
                />
              </div>
              <div className="text-center">
              <button onClick={handleSubmit} className="tt" type="button">Send Message</button>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol lg="7">
          <div
            id="map-container"
            className="rounded z-depth-1-half map-container"
            style={{ height: "400px" }}
          >
            <iframe
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11936.484448808587!2d77.89088018257897!3d29.857801905975002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390eb3650bfe37a7%3A0xa9d19b15af050467!2sIndian%20Institute%20Of%20Technology%E2%80%93Roorkee%20(IIT%E2%80%93Roorkee)!5e0!3m2!1sen!2sin!4v1644524497036!5m2!1sen!2sin"
              title="This is a unique title"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
            />
          </div>
          <br />
          <MDBRow className="text-center">
            <MDBCol md="4">
            <button className = "tk" type="button" mdbBtn color="primary" mdbWavesEffect><MDBIcon id = "ee" icon="map-marker-alt" size="2x"/></button>
              <p id = "ste">IHub,IIT Roorkee</p>
              <p id = "ste" className="mb-md-0">India</p>
            </MDBCol>
            <MDBCol md="4">
            <button className = "tk" type="button" mdbBtn color="primary" mdbWavesEffect><MDBIcon id = "ee" icon="phone" size="2x"/></button>
              <p id = "ste">+919779118585</p>
              <p id = "ste" className="mb-md-0">Mon - Fri, 8:00-22:00</p>
            </MDBCol>
            <MDBCol md="4">
            <button className = "tk" type="button" mdbBtn color="primary" mdbWavesEffect><MDBIcon id = "ee" icon="envelope" size="2x"/></button>
              <p id = "ste">info@gmail.com</p>
              <p id = "ste" className="mb-md-0">sale@gmail.com</p>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
    </section>
  );
}

export default ContactPage;