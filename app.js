const express = require('express');
const bodyParser = require('body-parser');
const Userinfo = require('./models/user_info');
const Address = require('./models/address');
const Users = require('./models/user');


const Sequelize = require('sequelize');
const { Op } = Sequelize;
let knex = require('knex');

// Create server via express library
const app = express();

app.use(bodyParser.json());

Users.hasOne(Userinfo, {
  foreignKey: 'user_id'
});

Userinfo.belongsTo(Users, {
  foreignKey: 'user_id'
});

Address.hasOne(Userinfo, {
  foreignKey: 'address_id'
});

Userinfo.belongsTo(Address, {
  foreignKey: 'address_id'
});


// Using sequelize
// Get request for users with lastName filter optional
app.get('/api/users_info', function(request, response) {
  let filter = {};
  let { q } = request.query;

  if (request.query.q) {
    filter = {
      where: {
        lastName: {
          [Op.like] : `${q}%`
        }
      }
    };
  }
  Userinfo.findAll(filter).then((users) => {
    response.json(users);
  });
});
// Get request for individual user information
app.get('/api/users_info/:id', function(request, response) {
  // let id = request.params.id;
  let { id } = request.params;
  Userinfo.findByPk(id, {
    include: [Users, Address]
  }).then((user ) => {
    if (user) {
      response.json(user);
    } else {
      response.status(404).send();
    }
  });
});
// Get request for individual user + user info
app.get('/api/users/:id', function(request, response) {
  // let id = request.params.id;
  let { id } = request.params;
  Users.findByPk(id, {
    include: [Userinfo]
  }).then((user ) => {
    if (user) {
      response.json(user);
    } else {
      response.status(404).send();
    }
  });
});

// Get request for all addresses
app.get('/api/addresses', function(request, response) {
  Address.findAll().then((addresses) => {
    response.json(addresses);
  });
});
// Post request for creating a new address
app.post('/api/addresses', function(request, response) {
  Address.create({
    address1: request.body.address1,
    address2: request.body.address2,
    city: request.body.city,
    state: request.body.state,
    zipCode: request.body.zipCode
  }).then((user) => {
    response.json(user)
  }, (validation) => {
    response.status(422).json({
      errors: validation.errors.map((error) => {
        return {
          attribute: error.path,
          message: error.message
        };
      })
    });
  });
});

app.patch('/api/users/:id', function(request, response) {
  let { id } = request.params;
  Users.findByPk(id).then(() => {
    Users.update({
      email: request.body.email
    }, { where: {id: id}})
    .then((updated) => {
      response.status(200).json({
        updated: updated,
        email: request.body.email
      });
    }, (validation) => {
      response.status(422).json({
        errors: validation.errors.map((error) => {
          return {
            attribute: error.path,
            message: error.message
          };
        })
      });
    });
  }, () => {
    response.status(404).send();
  });
  // let { email } = request.body;
  // Users.findOne({
  //   where: {
  //     email: email
  //   }
  // }).then((user) => {
  //   response.status(422).json(user);
  // }, () => {
  //
  // });


});

// Needs work!!!!!!

// Fix nested promises
// Delete request to delete single user (deletes associated tables first)
app.delete('/api/users/:id', function(request, response) {
  let { id } = request.params;
  Userinfo.findOne({
    where: {
      user_id: id
    }
  }).then((userInfo) => {
    userInfo.destroy().then(() => {
      Address.findByPk(id).then((address) => {
        address.destroy().then(() => {
          Users.findByPk(id).then((user) => {
            user.destroy().then(() => {
              response.status(204).send();
            }, () => {
              response.status(404).send();
            });
          });
        });
      });
    });
  });
});
// Patch request to edit individual user email






// Using Knex
// app.get('/api/users', function(request, response) {
//   let connection = knex({
//     client: 'sqlite3',
//     connection: {
//       filename: 'hagotem.db'
//     }
//   });
//   connection.select().from('users_info').then((users) => {
//     response.json(users);
//   });
// });
// app.get('/api/users/:id', function(request, response) {
//   let id = request.params.id;
//   console.log(id);
//   let connection = knex({
//     client: 'sqlite3',
//     connection: {
//       filename: 'hagotem.db'
//     }
//   });
//   connection
//     .select()
//     .from('users_info')
//     .where('id', id)
//     .first()
//     .then((user) => {
//       if (user) {
//         response.json(user);
//       } else {
//         response.status(404).json({
//           error: `User ${id} not found`
//         });
//       }
//     });
// });
app.listen(process.env.PORT || 4000);