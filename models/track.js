const sequelize = require('./../database/sequelize');
const Sequelize = require('sequelize');

//create model
module.exports = sequelize.define('track', {
      id: {
        field: 'TrackId',
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      albumId: {
        field: 'AlbumId',
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      mediaId: {
        field: 'MediaTypeId',
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      genreId: {
        field: 'GenreId',
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      composer: {
    field: 'Composer',
    type: Sequelize.STRING
  },
  bytes: {
    field: 'Bytes',
    type: Sequelize.INTEGER
  },
      name: {
        field: 'Name',
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Name is required'
          }
        }
      },
        milliseconds: {
          field: 'Milliseconds',
          type: Sequelize.INTEGER,
          validate: {
            isNumeric: {
              args: true,
              msg: 'Time must only contain numbers'
            }
          }
          },
          unitPrice: {
            field: 'UnitPrice',
            type: Sequelize.INTEGER,
            validate: {
              isNumeric: {
                args: true,
                msg: 'Price must only contain numbers'
              }
            }
          }
        },
        {
          //every model requires timestamp but turn it off here.
          timestamps: false
        });
