// Import necessary modules and packages.
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

// Connect to MongoDB database.
mongoose.connect(process.env.CONN_STR, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then((conn) => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

// Define the schema for the user collection.
const LogInSchema = new mongoose.Schema({
  // Define fields for first name, last name, email, password, and confirm password.
    firstName: {
      type: String,
      required: [true, 'Please enter your firstName']
    },
    lastName: {
      type: String,
      required: [true, 'Please enter your lastName']
    },
    email: {
      type: String,
      required: [true, 'Please enter an email.'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please enter a valid email.']
  },
    password: {
      type: String,
      required: [true, 'Please enter a password.'],
      minlength: 8
    },
    confirmPassword: {
      type: String,
      required: [true, 'Please confirm your password.'],
      validate: {
        // Custom validator to ensure password and confirm password match.
        //This validator will only work for save() & create()
        validator: function(val){
            return val === this.password;
        },
        message: 'Password & confirm Password does not match!'
    }
    }
})

// Middleware to hash the password before saving it.
LogInSchema.pre('save', async function(next) {
  if(!this.isModified('password')) return next();

  //encrypt the password before saving it
  this.password = await bcrypt.hash(this.password, 12);

  // Clear the confirmPassword field after encryption.
  this.confirmPassword = undefined;
  next();
})


// Method to compare passwords during authentication.
LogInSchema.methods.comparePasswordInDb =  async function(pswd, pswdDB){
  return await bcrypt.compare(pswd, pswdDB);
}

// Create a model 'collect' based on the schema.
const collect = new mongoose.model('collection3', LogInSchema)

// Export the 'collect' model.
module.exports = collect