const { expect } = require('chai');
const Track = require('./../../../models/track');

describe('track', () => {
  describe('milliseconds', () => {
  it('should only contain numbers', async () => {
    try {
    let track = new Track({name: 'a'});
    await track.validate();
  } catch(error){
    expect(error.errors[0].message).to.equal('Time must only contain numbers');
  }
  });


  it('should only contain numbers', async () => {
    try {
    let track = new Track({name: '1'});
    await track.validate();
  } catch(error){
    expect(error.errors[0].message).to.equal('Time must only contain numbers');
  }
  });
});
});
