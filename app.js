let express = require('express'); //require in package name
const bodyParser = require('body-parser');
const Track = require('./models/track');
const Sequelize = require('sequelize');
let knex = require('knex');
//node can't just dump servers in. you have to create the server lol
let app = express();
app.use(bodyParser.json());


app.get('/api/genres', function(request, response) {

  let connection = knex({
    client: 'sqlite3',
    connection: {
      filename: 'chinook.db'
    }
  });

  connection.select().from('genres').then((genres) => {
    response.json(genres);
    // response.json([1, 2, 3]);
    //whatever request comes in to genres pass in to browser an array of 123
  });
});

app.get('/api/genres/:id', function(request, response) {
  let id = request.params.id;
  // console.log(id);

  let connection = knex({
    client: 'sqlite3',
    connection: {
      filename: 'chinook.db'
    }
  });

  connection.select()
    .from('genres')
    .where('GenreId', id)
    .first() //for one object
    .then((genre) => {
      if (genre) {
        response.json(genre);
      } else {
        response.status(404).json({
          error: 'Genre ${id} not found'
        })
      }
      // response.json([1, 2, 3]);
      //whatever request comes in to genres pass in to browser an array of 123
    });
});

app.get('/api/artists', function(request, response) {
  console.log(request.query.filter);
  let filter = request.query.filter;

  let connection = knex({
    client: 'sqlite3',
    connection: {
      filename: 'chinook.db'
    }
  });

  if (filter) {

    connection.select()
      .from('artists')
      .where('Name', 'like', `%${filter}%`)
      .then((artist) => {
        if (artist) {
          response.json(artist);
        } else {
          response.status(404).json({
            error: 'Artist ${filter} not found'
          });
        };


      });
  } else {



    connection.select().from('artists').then((artists) => {


      var formatted = artists.map(artist => {
        var rObj = {};
        rObj["id"] = artist.ArtistId;
        rObj["name"] = artist.Name;
        return rObj;
      });
      response.json(formatted);
    });
  }

});

app.get('/api/tracks/:id', function(request, response) {
  let {
    id
  } = request.params;

  Track.
  findByPk(id)
    .then((track) => {
      if (track) {
        response.json(track);
      } else {
        response.status(404).send();
      }
    });
});

// response.status(200).send();

app.post('/api/tracks/:id', function(request, response) {
    let {id} = request.params;
    Track
      .findByPk(id)
      .then((track) => {
        if(!track) {
          response.status(404).send();
        }
      Track.update({
            name: request.body.name,
            composer: request.body.composer,
            milliseconds: request.body.milliseconds,
            bytes: request.body.bytes,
            unitPrice: request.body.unitPrice,
            // id: request.body.id,
            albumId: request.body.albumId,
            mediaTypeId: request.body.mediaTypeId,
            genreId: request.body.genreId,
          }, {
        where: {
                  id: id,
                }
  }).then(() => {
      response.send(request.body);
      response.status(200).send();
  },(validation) => {
      response.status(422).json({
          errors: validation.errors.map((error)=> {
            return {
              attribute: error.path,
              message: error.message
            }
          })
      });
  })
})
});

app.listen(process.env.PORT || 8000);
