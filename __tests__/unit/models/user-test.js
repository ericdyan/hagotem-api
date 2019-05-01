const { expect } = require('chai');
const User = require('./../../../models/user');


describe('email', () => {
  it('should be an email', async () => {
    try {
      let user = new User({email: 'a'});
      await user.validate();
    } catch (error) {
      expect(error.errors[0].message).to.equal('Must be an email');
    }
  });
});
