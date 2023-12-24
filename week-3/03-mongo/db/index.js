const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("your-mongodb-url");

// Define schemas
const AdminSchema = new mongoose.Schema(
  {
    // Schema definition here
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  { timestamps: true }
);

const UserSchema = new mongoose.Schema({
  // Schema definition here
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  coursesEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const CourseSchema = new mongoose.Schema({
  // Schema definition here
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageLink: {
    type: String,
    default: "",
  },
  published: {
    type: Boolean,
    default: false,
  },
});
const hasher = async function (_, _, next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
};

const verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
AdminSchema.pre("save", hasher);
AdminSchema.methods.verifyPassword = verifyPassword;

UserSchema.pre("save", hasher);

UserSchema.methods.verifyPassword = verifyPassword;

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
