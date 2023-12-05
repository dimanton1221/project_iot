const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const calculateWaterNeeds = (age, gender) => {
    let waterNeeds = 0;
    if (age <= 3) {
        waterNeeds = 800;
    } else if (age >= 4 && age <= 8) {
        waterNeeds = 1200;
    } else if (age >= 9 && age <= 13) {
        waterNeeds = gender === "female" ? 1600 : 2000;
    } else if (age >= 14 && age <= 18) {
        waterNeeds = gender === "female" ? 1800 : 2200;
    } else {
        waterNeeds = gender === "female" ? 2000 : 2400;
    }
    return waterNeeds;
}

const registerController = async (req, res) => {
    const birthdate = new Date(req.body.birthdate);
    if (isNaN(birthdate)) {
        return res.status(400).json("Invalid birthdate format.");
    }
    // menghitung usia
    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
        age--;
    }

    // check apakah User ada username / email yang sudah terdaftar
    const { username, email } = req.body;
    const kalauDiaAda = await User.findOne({ $or: [{ username }, { email }] });
    if (kalauDiaAda) {
        return res.status(409).json("Username / email already exists.");
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            gender: req.body.gender,
            birthdate: req.body.birthdate,
            age: age,
            needs: calculateWaterNeeds(age, req.body.gender)
        });

        await newUser.save();
        res.status(200).json("User has been created.");
    } catch (error) {
        res.status(500).json("Error creating user. Please try again.");
    }
};

// buat Controllers login
const LoginController = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Langkah 1: Mengecek apakah pengguna ada dalam database
        const kalauDiaAda = await User.findOne({ $or: [{ username }, { email: username }] });
        if (!kalauDiaAda) {
            return res.status(404).json("User not found!");
        }
        // Langkah 2: Memeriksa apakah kata sandi sesuai
        const validPassword = await bcrypt.compare(password, kalauDiaAda.password);
        if (!validPassword) {
            return res.status(400).json("Wrong username or password!");
        }

        // Langkah 3: Menghasilkan token JWT untuk otentikasi
        const token = jwt.sign({ id: kalauDiaAda._id }, "jwtkey");
        console.log(kalauDiaAda._id);
        const  masih = kalauDiaAda;

        // Menyimpan token JWT dalam cookie
        res.cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json(masih);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
};
const Logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User has been logged out.");
}


module.exports = {
    registerController,
    LoginController,
    Logout
}