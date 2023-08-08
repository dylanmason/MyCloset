const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const apiConfig = require("./apiConfig.json");
const imgbbUploader = require("imgbb-uploader");
//different config file

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50 mb", extended: true }));

const connectDB = () => {
  try {
    mongoose.connect(`${apiConfig.DATABASE_URL}`, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Connected to database!");
  } catch (err) {
    console.log("Error with connecting to database");
    console.log(err);
  }
};

connectDB();

const userCluster = new mongoose.Schema(
  {
    userName: String,
    password: String,
    profilePicture: String,
    following: [{ _id: false, userName: String }],
    followers: [{ _id: false, userName: String }],
    verified: Boolean,
  },
  { versionKey: false }
);
const userDB = mongoose.model("Users", userCluster);

const userData = new mongoose.Schema(
  {
    userName: String,
    date: String,
    caption: String,
    image: String,
    clothes: [{ _id: false, article: String, name: String, link: String }],
    height: Number,
    width: Number,
  },
  { versionKey: false }
);
const dataDB = mongoose.model("Data", userData);

app.get("/api/userAuthentication", async (req, res) => {
  try {
    const userCredentials = await userDB.findOne({
      userName: req.query.userName,
    });
    if (userCredentials === null) {
      console.log("user not found");
      const match = {
        found: "null",
      };
      res.send(match);
    } else {
      if (bcrypt.compareSync(req.query.password, userCredentials.password)) {
        console.log("true");
        const match = {
          found: "true",
        };
        res.send(match);
      } else {
        console.log("false");
        const match = {
          found: "null",
        };
        res.send(match);
      }
    }
  } catch (err) {
    res.send(err);
    console.log(err);
  }
});

app.post("/api/userSignUp", (req, res) => {
  const saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
    try {
      const found = await userDB.findOne({
        userName: req.body.userName,
      });
      if (found === null) {
        const match = {
          found: "available",
        };
        res.send(match);
        let img = await host(req.body.profilePicture);
        const userCredentials = await userDB.create({
          _id: new mongoose.Types.ObjectId(),
          userName: req.body.userName,
          password: hash,
          profilePicture: img,
          following: [],
          followers: [],
          verified: false,
        });
      } else {
        const match = {
          found: "unavailable",
        };
        res.send(match);
      }
      console.log(found);
    } catch (err) {
      res.send(err);
      console.log(err);
    }
  });
});

async function host(image) {
  let imgUpload;
  image = image.slice(22);
  const options = {
    apiKey: apiConfig.IMGBB_API,
    base64string: image,
  };
  try {
    imgUpload = await imgbbUploader(options);
    console.log(imgUpload.url);
  } catch (err) {
    console.log(err);
  }
  return imgUpload.url;
}

app.post("/api/uploadPost", async (req, res) => {
  try {
    const date = req.body.date;
    const caption = req.body.description;
    const userName = req.body.userName;
    const image = req.body.image;
    const clothes = req.body.clothes;
    const height = req.body.height;
    const width = req.body.width;

    console.log(clothes);

    let img = await host(image);

    const postData = await dataDB.create({
      _id: new mongoose.Types.ObjectId(),
      userName: userName,
      date: date,
      caption: caption,
      image: img,
      clothes: clothes,
      height: height,
      width: width,
    });
    const status = {
      status: "success",
    };
    res.send(status);
  } catch (err) {
    const status = {
      status: "error",
    };
    res.send(status);
    console.log(err);
  }
});

app.get("/api/gatherPosts", async (req, res) => {
  try {
    const postData = await dataDB.find();
    console.log(postData);
    res.send(postData);
  } catch (err) {
    res.send(err);
    console.log(err);
  }
});

app.get("/api/gatherUsers", async (req, res) => {
  try {
    const users = await userDB.find();
    console.log("grabbing users");
    console.log(users);
    res.send(users);
  } catch (err) {
    res.send(err);
    console.log(err);
  }
});

app.get("/api/userInfo", async (req, res) => {
  const userName = req.query.userName;
  console.log("searching for", userName);
  try {
    const userInfo = await userDB.findOne({
      userName: userName,
    });
    console.log("here is the userInfo", userInfo);
    res.send(userInfo);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.get("/api/userPostData", async (req, res) => {
  const userName = req.query.userName;
  try {
    const userPosts = await dataDB.find({
      userName: userName,
    });
    console.log(userPosts);
    res.send(userPosts);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.get("/api/updatePassword", async (req, res) => {
  const userName = req.query.userName;
  const password = req.query.password;
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, async (err, hash) => {
    try {
      const found = await userDB.findOne({
        userName: req.body.userName,
      });
      if (found === null) {
        const match = {
          found: "user not found",
        };
        res.send(match);
      } else {
        const match = {
          found: "user found",
        };
        res.send(match);
        console.log(found);
        const userInfo = await userDB.replaceOne(
          { userName: userName },
          {
            userName: userName,
            password: hash,
            profilePicture: found.profilePicture,
          }
        );
        console.log("here is the userInfo", userInfo);
        res.send(userInfo);
      }
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  });
});

app.get("/api/updateUsername", async (req, res) => {
  const oldUserName = req.query.oldUserName;
  const newUserName = req.query.newUserName;
  console.log(oldUserName, newUserName);
  try {
    const found = await userDB.findOne({
      userName: newUserName
    });
    if (found !== null) {
      const match = {
        found: "unavailable",
      };
      res.send(match);
    } else {
      const oldData = await userDB.findOne({
        userName: oldUserName
      })
      console.log("here is the data", oldData);
      await userDB.replaceOne(
        { userName: oldUserName },
        {
          userName: newUserName,
          password: oldData.password,
          profilePicture: oldData.profilePicture,
        }
      );
      const match = {
        found: "available",
      };
      res.send(match);
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.get("/api/updateProfilePicture", async (req, res) => {
  const userName = req.query.userName;
  const profilePicture = req.query.profilePicture;
  try {
    const found = await userDB.findOne({
      userName: req.body.userName,
    });
    if (found === null) {
      const match = {
        found: "user not found",
      };
      res.send(match);
    } else {
      const match = {
        found: "user found",
      };
      const newProfilePicture = await host(profilePicture);
      res.send(match);
      console.log(found);
      const userInfo = await userDB.replaceOne(
        { userName: userName },
        {
          userName: userName,
          password: found.password,
          profilePicture: newProfilePicture,
          followers: found.followers,
          following: found.following,
        }
      );
      console.log("here is the userInfo", userInfo);
      res.send(userInfo);
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.get("/api/updateFollowing", async (req, res) => {
  console.log(req.query);
  const userName = req.query.userName;
  const myUserName = req.query.myUserName;
  const action = req.query.action === 'true';
  try {
    const user = await userDB.findOne(
      { userName: userName }
    ).lean();
    const me = await userDB.findOne(
      { userName: myUserName }
    ).lean();
    let meArrayFollowing = me.following;
    let userArrayFollowers = user.followers;
    
    if (action) {
      const userReq = await userDB.updateOne(
        { userName: userName },
        {
          $set: { followers: [...userArrayFollowers, {userName: myUserName}] },
        }
      );
      const myReq = await userDB.updateOne(
        { userName: myUserName },
        {
          $set: { following: [...meArrayFollowing, {userName: userName}] },
        }
      );
      console.log(userReq);
      console.log(myReq);
      console.log("followed");
    } else {
      meArrayFollowing = meArrayFollowing.filter((user) => user.userName !== userName);
      userArrayFollowers = userArrayFollowers.filter((user) => user.userName!== myUserName);
      await userDB.updateOne(
        { userName: userName },
        {
          $set: { followers: userArrayFollowers },
        }
      );
      await userDB.updateOne(
        { userName: myUserName },
        {
          $set: { following: meArrayFollowing },
        }
      );
      console.log("unfollowed");
    }
  res.send("success");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));

module.exports = app;
