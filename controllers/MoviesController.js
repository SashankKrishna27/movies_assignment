const mongoose = require("mongoose");
const moviesArray = require("../movie-data-raw.json");

exports.postMovies = (req, res) => {
  const dbCon = mongoose.createConnection(
    process.env.DB_CONNECTION,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (error) => {
      if (error) {
        return res.status(206).json({ message: error.message });
      }
    }
  );

  dbCon.once("open", () => {
    dbCon.db
      .collection("Movies")
      .insertMany(moviesArray)
      .then(() => {
        return res
          .status(200)
          .json({ message: "Movies collection created successfully!" });
      })
      .catch((error) => {
        return res.status(500).json({ message: error.message });
      });
  });
};

exports.getMovies = (req, res) => {
  const dbCon = mongoose.createConnection(
    process.env.DB_CONNECTION,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (error) => {
      if (error) {
        return res.status(206).json({ message: error.message });
      }
    }
  );

  dbCon.once("open", () => {
    dbCon.db
      .collection("Movies")
      .aggregate([
        {
          $unwind: "$genres",
        },
        {
          $group: {
            _id: "$genres",
            genres: { $first: "$genres" },
            movies:{
                $push:{
                    director:"$director",
                    imdb_rating:"$imdb_rating",
                    length:"$length",
                    poster:"$poster",
                    title:"$title"
                },
            }
          },
        },
      ])
      .toArray()
      .then((response) => {
        return res.status(200).json({ message: response });
      })
      .catch((error) => {
        return res.status(500).json({ message: error.message });
      });
  });
};
