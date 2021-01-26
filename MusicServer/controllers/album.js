const Album = require('../model/album');
const song = require('../model/song');

exports.getAlbum = (req,res,next) => {
   Album.find().populate('songs').
   then(album => {
       res.json({
           album : album
       });
   }).catch(err =>{
       console.log(err);
   });
};

exports.createAlbum = (req,res,next) => {
    const albumname = req.body.name;
    const imagePath = req.body.imagePath;

    const songs = req.body.songs;
    const songArray = [];
    console.log("hey there "+songs[0].name);

    for(let i=0;i<songs.length;i++){
        const newsong = new song({
            name : songs[i].name,
            genre : songs[i].genre,
            language : songs[i].language,
            imagePath : songs[i].imagePath,
            artist  : songs[i].artist
        });
         songArray.push(newsong);
         newsong.save();
    }
    const album = new Album({
       name : albumname,
       imagePath : imagePath,
       songs : songArray
    });
    album.save().then(result => {
        console.log(result);
        res.json({
            message : "Added ",
            album : result
        }
        );
    }).catch(err => {
        console.log(err);
    });
};
exports.editAlbum = (req,res,next) => {
    const albumId = req.params.albumId;
    const albumname = req.body.name;
    const imagePath = req.body.imagePath;
    const songs = req.body.songs;
    const songId = req.body.songId;
    const songArray = [];

    for(let i=0;i<songs.length;i++){
        
        const newsong = new song({
            name : songs[i].name,
            genre : songs[i].genre,
            language : songs[i].language,
            imagePath : songs[i].imagePath,
            artist  : songs[i].artist
        });
        song.findById(songId[i]).then(song => {
            song.name = songs[i].name,
            song.genre = songs[i].genre,
            song.language = songs[i].language,
            song.imagePath = songs[i].imagePath,
            song.artist  = songs[i].artist
            return song.save();
        }).then().catch(err => {console.log(err)});
         songArray.push(newsong);
         
    }

    Album.findById(albumId).then(album =>{
        album.name = albumname,
       album.imagePath = imagePath
        return album.save();
    }).
    then(result => {
        console.log(result);
        res.json({
            message : "Album Updated ",
            album : result
        }
        );
    }).catch(err => {
        console.log(err);
    });

};

exports.deleteAlbum = (req,res,next) => {
    const albumId = req.params.albumId;
    Album.findById(albumId)
    .then(album => {
        return Album.findByIdAndRemove(albumId);
    }).then(res =>{
        console.log(res);
        res.json({
            message : "Album Deleted ",
            album : result
        }
        );
    })
    .catch(err => {
        console.log(err);
    });
};