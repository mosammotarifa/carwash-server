const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { getUserCollection } = require("../models/user.models");
// const { getUserCollection } = require("../models/user.models");

const registerUser = async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const userCollection = getUserCollection(db);

    const { name, email, password } = req.body;

    // Check if the email already exists
    const existingUser = await userCollection.findOne({ email });

    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: "Email already registered",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      role: "user",
      createdAt: new Date(),
    };

    const result = await userCollection.insertOne(newUser);

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      data: {
        userId: result.insertedId,
        name,
        email,
      },
    });
  } catch (error) {
    next(error);
  }
};
const loginUser = async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const userCollection = getUserCollection(db);

    const { email, password } = req.body;

    // Find user by email
    const existingUser = await userCollection.findOne({ email });

    if (!existingUser) {
      return res.status(401).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!isPasswordCorrect) {
      return res.status(401).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    const token = jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(200).send({
      success: true,
      message: "Login successful",
      data: {
        userId: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser };
