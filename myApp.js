require('dotenv').config();
const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopologi: true
  }
);



const personSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  favoriteFoods:[String],
})

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({
    name: "Rizki",
    age: 25,
    favoriteFoods: ["Ayam", "Daging"]
  })

  person.save((err, data) =>{
    if(err){
      return done(err);
    }
  done(null, data);

  })

};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) =>{
    if (err){
      return done(err);
    }
    done(null, people);
  })
  
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, people) =>{
    if (err){
      return done(err);
    }
    done(null, people);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, people) =>{
    if (err){
      return done(err);
    }
    done(null, people);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, people) =>{
    if (err){
      return done(err);
    }
    done(null, people);
  })
};

const findEditThenSave = (personId, done) => {
  Person.findById(personId, (err, person) => {
    if (err) {
      return done(err); // Pass any errors to the callback
    }

    // Edit the found person's favoriteFoods by adding "hamburger"
    person.favoriteFoods.push("hamburger");

    // Save the updated person
    person.save((err, updatedPerson) => {
      if (err) {
        return done(err); // Pass any errors to the callback
      }
      done(null, updatedPerson); // Pass the updated person to the callback
    });
  });
};

const findAndUpdate = (personName, done) => {
  Person.findOneAndUpdate(
    { name: personName }, // Search criteria
    { $set: { age: 20 } }, // Update the age to 20
    { new: true }, // Return the updated document
    (err, updatedPerson) => {
      if (err) {
        return done(err); // Pass any errors to the callback
      }
      done(null, updatedPerson); // Pass the updated person to the callback
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) {
      return done(err); // Pass any errors to the callback
    }
    done(null, removedPerson); // Pass the removed person to the callback
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  // Use Model.remove() to delete people with matching names
  Person.remove({ name: nameToRemove }, (err, result) => {
    if (err) {
      return done(err); // Pass any errors to the callback
    }
    done(null, result); // Pass the result (number of items affected) to the callback
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch }) // Find people with the specified food preference
    .sort('name') // Sort the results by name
    .limit(2) // Limit the results to two documents
    .select('-age') // Hide the 'age' field
    .exec((err, data) => {
      if (err) {
        return done(err); // Pass any errors to the callback
      }
      done(null, data); // Pass the query result to the callback
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
