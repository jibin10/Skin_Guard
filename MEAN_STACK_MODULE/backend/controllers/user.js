const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { async } = require("rxjs");

const User = require("../models/user");

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        name: req.body.name,
        role: req.body.role,
        phone: req.body.phone,
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message: "User created!",
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            message: "The user already exists!"
          });
        });
    });
}

exports.getUsers = (req, res, next) => {
  // convert string to numbebr
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;

  const userQuery = User.find();
  let fetchedUsers;

  if(pageSize && currentPage) {
    userQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  userQuery
    .then(documents => {
      fetchedUsers = documents;
      return User.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Users fetched successfully!",
        users: fetchedUsers,
        maxUsers: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching User failed!"
      });
    });
};

exports.getOtherUsers = (req, res, next) => {
  // convert string to numbebr
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;

  const userQuery = User.find({role: 'Other'});
  let fetchedUsers;

  if(pageSize && currentPage) {
    userQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  userQuery
    .then(documents => {
      fetchedUsers = documents;
      return User.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Users fetched successfully!",
        users: fetchedUsers,
        maxUsers: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching User failed!"
      });
    });
};

exports.getUser = (req, res, next) => {
  User.findById(req.params.id).then(user => {
    if(user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({message: 'Mode not found!'});
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "Fetching post failed!"
    });
  });
};

exports.getDoctors = (req, res, next) => {
  User.find({role: "Doctor"}).then(documents => {
    res.status(200).json({
      message: "Doctors fetched successfully!",
      doctors: documents
    });
  })
  .catch(error => {
    res.status(500).json({
      message: "Fetching doctors failed!"
    });
  });
};

exports.getUserRole = (req, res, next) => {
  User.find({ _id: req.params.user_id })
    .then(user => {
      if (user) {
        res.status(200).json({_id: user[0]._id, name: user[0].name, role: user[0].role});
      } else {
        res.status(404).json({ message: "User not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching user failed!"
      });
    });
}

exports.updateUserRole = (req, res, next) => {
  // get the data from request body
  const userData ={
    name: req.body.name,
    role: req.body.role
  };
  User.updateOne({ _id: req.params.user_id }, {$set: userData}).then(result => {
    if(result.matchedCount > 0) {
      res.status(200).json({message: "Update successful!"});
    } else {
      res.status(401).json({message: "Not authorized!"});
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "Couldn't update post! "
    });
  });
};

exports.updatePassword = (req, res, next) => {
  // get the data from request body
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const userData ={
      password: hash
    };
    User.updateOne({ _id: req.params.user_id }, {$set: userData}).then(result => {
      if(result.matchedCount > 0) {
        res.status(200).json({message: "Update successful!"});
      } else {
        res.status(401).json({message: "Not authorized!"});
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't update password! "
      });
    });
  });
};

exports.deleteUser = (req, res, next) => {
  User.deleteOne({_id: req.params.id}).then(
    result => {
      if(result.deletedCount > 0) {
        res.status(200).json({message: "Deletion successful!"});
      } else {
        res.status(401).json({message: "Not authorized!"});
      }
    }
  )
  .catch(error => {
    res.status(500).json({
      message: "Fetching user failed!"
    });
  });
};

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
   .then(user => {
    if(!user) {
      return res.status(401).json({
        message: 'Auth failed'
      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
   })
   .then(result => {
     if(!result) {
      return res.status(401).json({
        message: "Auth failed"
       });
     }
     const token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id},
      process.env.JWT_KEY,
      { expiresIn: "1h"}
    );
    res.status(200).json({
      token: token,
      expiresIn: "3600",
      userId: fetchedUser._id,
      name: fetchedUser.name,
      role: fetchedUser.role
    });
   })
   .catch(err => {
     return res.status(401).json({
      message: "Invalid authentication credentials!"
     });
   });
}
