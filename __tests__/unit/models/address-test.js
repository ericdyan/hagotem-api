const { expect } = require('chai');
const Address = require('./../../../models/address');


describe('address', () => {
  describe('zipCode', () => {
    it('should be numeric', async () => {
      try {
        let address = new Address({zipCode: 'd'});
        await address.validate();
      } catch (error) {
        expect(error.errors[0].message).to.equal('Zip code must be a number');
      }
    });
    it('should not be empty', async () => {
      try {
        let address = new Address({zipCode: ''});
        await address.validate();
      } catch (error) {
        expect(error.errors[0].message).to.equal('Zip Code is required');
      }
    });
  });
  describe('address1', () => {
    it('should not be empty', async () => {
      try {
        let address = new Address({address1: ''});
        await address.validate();
      } catch (error) {
        expect(error.errors[0].message).to.equal('Address1 is required');
      }
    });
  });
  describe('city', () => {
    it('should not be empty', async () => {
      try {
        let address = new Address({city: ''});
        await address.validate();
      } catch (error) {
        expect(error.errors[0].message).to.equal('City is required');
      }
    });
  });

});
