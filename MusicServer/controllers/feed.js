const Song = require('../model/song'); 
exports.getPosts = (req,res,next) => {
    Song.find().then(songs =>{
        res.status(200).json({
            songs : songs
        });
    }).catch(err =>{
        console.log(err);
    });
    
};

exports.createPost = (req,res,next)=>{
    const name = req.body.name;
    const genre = req.body.genre;
    const language = req.body.language;
    const imagePath = req.body.imagePath;
    const artist = req.body.artist;
    const song = new Song({
        name : name,
        genre : genre,
        language : language,
        imagePath : imagePath,
        artist : artist
    });
    song.save().then(result => {
        console.log(result);
        res.status(201).json({
            message : "Added ",
            songs : result
        }
        );
    }).catch(err => {
        console.log(err);
    });
    console.log(name);
   
};

exports.editSong = (req,res,next) => {
    const songId = req.params.songId;
    const name = req.body.name;
    const genre = req.body.genre;
    const language = req.body.language;
    const imagePath = req.body.imagePath;
    const artist = req.body.artist;
    Song.findById(songId)
    .then(song =>{
        song.name =name;
        song.genre=genre;
        song.language=language;
        song.imagePath=imagePath;
        song.artist=artist;
        return song.save();
    }).
    then(result =>{
      res.status(200).json({
          message : 'Song Updated',
          song : result
      });
    }).
    catch(err =>{
        console.log(err);
    });

};

exports.deleteSong = (req,res,next) => {
    const songId = req.params.songId;
    Song.findById(songId)
    .then(song => {
        return Song.findByIdAndRemove(songId);
    }).then(res =>{
        console.log(res);
        res.json({
            message : 'Song Deleted',
            song : result
        });
    })
    .catch(err => {
        console.log(err);
    });
};