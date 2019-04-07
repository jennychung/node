const frisby = require('frisby');

const { Joi } = frisby;

it('should return a status of 404 when the track does not exist', () => {
  return frisby
  .get('http://localhost:8000/api/tracks/-1')
  .expect('status', 404);
});

it('should return a status of 200 when the track is updated', () => {
return frisby
  .get('http://localhost:8000/api/tracks/12')
  .expect('status', 200)
  .expect('jsonTypes', {
    id: Joi.number().required(),
    albumId: Joi.number().required(),
    mediaId: Joi.number().required(),
    genreId: Joi.number().required(),
    composer: Joi.string().required(),
    bytes: Joi.number().required(),
    name: Joi.string().required(),
    milliseconds: Joi.number().required(),
    unitPrice: Joi.number().required()
});
});


it('should update track', () => {
  return frisby
    .patch('http://localhost:8000/api/tracks/5', {
      name: '',
      milliseconds: 'a',
      unitPrice: 'b'
    })
    .expect('status', 422)
});
