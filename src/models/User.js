import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // Basic Information
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    minlength: [2, "First name must be at least 2 characters"],
    maxlength: [50, "First name cannot exceed 50 characters"]
  },
  
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
    minlength: [2, "Last name must be at least 2 characters"],
    maxlength: [50, "Last name cannot exceed 50 characters"]
  },

  // Authentication
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"]
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"]
  },

  // College Information
  studentId: {
    type: String,
    required: [true, "Student ID is required"],
    unique: true,
    trim: true,
    uppercase: true
  },

  college: {
    name: {
      type: String,
      required: [true, "College name is required"],
      trim: true
    },
    code: {
      type: String,
      required: [true, "College code is required"],
      trim: true,
      uppercase: true
    }
  },

  department: {
    type: String,
    required: [true, "Department is required"],
    trim: true,
    enum: [
      "Computer Science", "Information Technology", "Electronics", 
      "Mechanical", "Civil", "Electrical", "Chemical", "Aerospace",
      "Biotechnology", "Business Administration", "Economics", 
      "Psychology", "English", "Mathematics", "Physics", "Chemistry",
      "Biology", "History", "Political Science", "Other"
    ]
  },

  academicYear: {
    type: String,
    required: [true, "Academic year is required"],
    enum: ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year", "Graduate", "Post Graduate", "PhD"]
  },

  // Contact Information
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    match: [/^[6-9]\d{9}$/, "Please enter a valid 10-digit phone number"]
  },

  // Profile Information
  profilePicture: {
    type: String,
    default: null
  },

  dateOfBirth: {
    type: Date,
    required: [true, "Date of birth is required"]
  },

  gender: {
    type: String,
    enum: ["Male", "Female", "Other", "Prefer not to say"],
    required: [true, "Gender is required"]
  },

  // Event Preferences
  interests: [{
    type: String,
    enum: [
      "Technical", "Cultural", "Sports", "Academic", "Workshop", 
      "Seminar", "Competition", "Festival", "Conference", "Hackathon",
      "Debate", "Music", "Dance", "Drama", "Photography", "Art",
      "Gaming", "Entrepreneurship", "Social Work", "Environment"
    ]
  }],

  // Notification Preferences
  notificationSettings: {
    emailNotifications: {
      type: Boolean,
      default: true
    },
    smsNotifications: {
      type: Boolean,
      default: false
    },
    pushNotifications: {
      type: Boolean,
      default: true
    },
    eventReminders: {
      type: Boolean,
      default: true
    },
    newEventAlerts: {
      type: Boolean,
      default: true
    }
  },

  // Account Status
  isActive: {
    type: Boolean,
    default: true
  },

  isVerified: {
    type: Boolean,
    default: false
  },

  role: {
    type: String,
    enum: ["Student", "Faculty", "Admin", "Event Organizer"],
    default: "Student"
  },

  // Event Participation
  registeredEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event"
  }],

  attendedEvents: [{
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event"
    },
    attendedAt: {
      type: Date,
      default: Date.now
    }
  }],

  // Social Features
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],

  // Timestamps
  lastLogin: {
    type: Date,
    default: null
  },

  emailVerificationToken: String,
  passwordResetToken: String,
  passwordResetExpires: Date

}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Indexes for better performance
userSchema.index({ email: 1 });
userSchema.index({ studentId: 1 });
userSchema.index({ "college.code": 1 });
userSchema.index({ department: 1 });
userSchema.index({ interests: 1 });

// Virtual for full name
userSchema.virtual("fullName").get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Ensure virtual fields are serialized
userSchema.set("toJSON", { virtuals: true });

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  delete user.emailVerificationToken;
  delete user.passwordResetToken;
  delete user.passwordResetExpires;
  return user;
};

const User = mongoose.model("User", userSchema);

export default User;
