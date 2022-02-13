import mongoose from 'mongoose';

const personSchema = mongoose.Schema({
    Name: String,
    Email: String,
    Subjects: Array,
    Messages: Array
});

const Person= mongoose.model('Person',personSchema);
export default Person;