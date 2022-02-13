import mongoose from 'mongoose';
import Station from '../models/station.js';
import Person from '../models/Person.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
    },
  });
  
  contactEmail.verify((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Ready to Send");
    }
  });

export const getStations = async (req,res) => {
   try {
       const stations = await Station.find();
       console.log(stations);
       res.status(200).json(stations);
   } catch (error) {
       res.status(404).json({message: error.message});
   }
}

export const bookSlot = async (req, res) => {    
    const {id} = req.params;
    console.log("here");
    console.log({id});
    // if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No station with that Id');
    const station = await Station.findOne({stationId: id});
    if(!station){
        const station = new Station({slot: 1,stationId: id});
        await station.save();
        console.log(station);
        res.json(station); 
    }else{
        console.log({station});
    var newSlot;
    if(station.slot < 24)newSlot=station.slot+1;
    else newSlot = 24;
    const updatedStation= await Station.findByIdAndUpdate(station._id,
        {slot: newSlot}, {new: true});
      res.json(updatedStation); 
    }
}

export const contact = async (req,res) => {
      const {Name,Email,Subject,Message} = req.body.data;
      console.log(req.body.data);
      const mail = {
        from: Email,
        to: process.env.GMAIL_RECEIVER,
        subject: "Contact Form Submission",
        html: `<p>Name: ${Name}</p>
               <p>Email: ${Email}</p>
               <p>Subject: ${Subject}</p>
               <p>Message: ${Message}</p>`,
      };
      contactEmail.sendMail(mail, (error) => {
        if (error) {
          console.log({error});
          res.json({ status: "Error" });
        } else {

          const user_mail = {
            from: Email,
            to: Email,
            subject: "Contact Form Submission",
            html: `Hey ${Name}<br>
            <br>
            Thanks for reaching out! I'd be more than happy to help you.<br>
            Before we dive in, can you give me a little more context on the situation? When did this issue begin happening? Has it been occurring consistently, or does it happen on and off? Have you tried any solutions on your own?<br>
            These questions will help me find a more personalized solution to your problem.<br><br>
            Thanks,<br><br>
            [Your name]`,
          };
          contactEmail.sendMail(user_mail, (error) => {
            if (error) {
              console.log({error});
            }});
          
          res.json({ status: "Message Sent" });
        }
      });

      const person = await Person.findOne({Email: Email});
    if(!person){
        const newPerson = new Person({Name: Name,Email: Email,Subjects: [Subject],Messages: [Message]});
        await newPerson.save();
        console.log(newPerson); 
    }else{
    console.log({person});
    let subjects = person.Subjects;
    let messages = person.Messages;
    subjects.push(Subject);
    messages.push(Message);
    const updatedPerson = await Person.findOneAndUpdate({Email: Email},
        {Messages: messages,Subjects: subjects}, {new: true});
        console.log(updatedPerson);
    }
}