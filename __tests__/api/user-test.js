const frisby = require('frisby');

const { Joi } =  frisby;


it('should return a status of 200 when the user is found', () => {
  return frisby
    .get('http://localhost:4000/api/users/1')
    .expect('status', 200);
});

it('should return a status of 404 when the user does not exist', () => {
  return frisby
    .get('http://localhost:4000/api/users/-1')
    .expect('status', 404);
});

it('should return a status of 200 when the user-info is found', () => {
  return frisby
    .get('http://localhost:4000/api/users_info/1')
    .expect('status', 200);
});

it('should return a status of 404 when the user does not exist', () => {
  return frisby
    .get('http://localhost:4000/api/users_info/-1')
    .expect('status', 404);
});

it('should return the user_info and its user and address', () => {
  return frisby
    .get('http://localhost:4000/api/users_info/1')
    .expect('json', 'firstName', 'Eric')
    .expect('jsonTypes', 'user', {
      id: Joi.number().required(),
      email: Joi.string().required()
    });
}) ;

// Delete tests
// Fail Case
it('should return a 404 when deleting a user that does not exist', () => {
  return frisby
    .del('http://localhost:4000/api/users/-1')
    .expect('status', 404);
});
// Success Case
it('should return a 204 when deleting a user that exists', () => {
  return frisby
    .del('http://localhost:4000/api/users/2')
    .expect('status', 204);
});
