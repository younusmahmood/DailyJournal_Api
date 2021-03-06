const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { TaskList } = require('../../models/taskList')
const { User } = require('../../models/user')

const userOneId = new ObjectID();
const userTwoId= new ObjectID();

const users = [
  {
    _id: userOneId,
    email: "younus1@example.com",
    password: "userOnePass",
    tokens: [
      {
        access: "auth",
        token: jwt.sign({ _id: userOneId, access: "auth" }, process.env.JWT_SECRET).toString()
      }
    ]
  },
  {
    _id: userTwoId,
    email: "younus2@example.com",
    password: "userTwoPass",
    tokens: [
      {
        access: "auth",
        token: jwt.sign({ _id: userTwoId, access: "auth" },process.env.JWT_SECRET).toString()
      }
    ]
  }
];

const tasks = [
  {
    _id: new ObjectID(),
    task: "Test task 1",
    _creator: userOneId
  },
  {
    _id: new ObjectID(),
    task: "Test task 2",
    completed: false,
    _creator: userTwoId
  }
];

const populateTodos = done => {
  TaskList.remove({})
    .then(() => {
      return TaskList.insertMany(tasks);
    })
    .then(() => done());
};

const populateUsers = done => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo])
    }).then(() => done());
}

module.exports = {
    tasks,
    users,
    populateUsers,
    populateTodos
}