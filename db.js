const Sequelize = require('sequelize');
const { STRING, TEXT } = Sequelize.DataTypes;
const faker = require('faker');

const db = new Sequelize(process.env.DATABASE_URL || "postgres://localhost/tune_world", {
    logging:false
})

//data
const musicians = [
    {name: 'monk'},
    {name: 'milesDavis'},
    {name: 'coltrane'},
    {name: 'billieHoliday'}
]

const albums = [
    {name: 'soloMonk'},
    {name: 'straightNoChaser'},
    {name: 'kindOfBlue'},
    {name: 'bagsGroove'},
    {name: 'giantSteps'},
    {name: 'ladyInSatin'},
    {name: 'blueMoon'}
]

const tunes = [
    {name: 'rudyMyDear'},
    {name: 'bemsharSwing'},
    {name: 'soWhat'},
    {name: 'footPrint'},
    {name: 'aLoveSupreme'},
    {name: 'findAndMellow'},
    {name: 'amIBlue'}
]


//models
const Musician = db.define("musician", {
    name:{
        type: STRING,
        allowNull: false
    },
    bio: TEXT
}, {
  hooks: {
        beforeCreate: function(musician){
            if(!musician.bio){
                musician.bio = `${musician.name}. ${faker.lorem.paragraphs(2)}`;
            }
        }
    }
        
});

const Album = db.define("album", {
    name:{
        type:STRING,
        allowNull: false,
        unique: true,
        notEmpty: true
    }
})

const Tune = db.define("tune", {
    name:{
        type: STRING,
        allowNull: false,
        notEmpty: true
    }
})

//relations
Tune.belongsTo(Musician);
Musician.hasMany(Tune);
Album.belongsTo(Musician);
Musician.hasMany(Album);
Tune.belongsTo(Album);
Album.hasMany(Tune);


const syncAndSeed = async()=>{
    await db.sync({force:true});
    const [monk,milesDavis,coltrane,billieHoliday] = await Promise.all(
       musicians.map(name => Musician.create(name)) 
    )
    
    const [soloMonk,straightNoChaser,kindOfBlue,bagsGroove,giantSteps,ladyInSatin,blueMoon] = await Promise.all(
        albums.map(name => Album.create(name)) 
     )
    const [rudyMyDear,bemsharSwing,soWhat,footPrint,aLoveSupreme,findAndMellow,amIBlue] = await Promise.all(
        tunes.map(name => Tune.create(name)) 
     )

    soloMonk.artistId = monk.id;
    straightNoChaser.artistId = monk.id;
    kindOfBlue.artistId = milesDavis.id;
    bagsGroove.artistId = milesDavis.id;
    giantSteps.artistId = coltrane.id;
    ladyInSatin.artistId = billieHoliday.id;
    blueMoon.artistId = billieHoliday.id;

    await Promise.all([
      soloMonk.save(),
      straightNoChaser.save(),
      kindOfBlue.save(),
      bagsGroove.save(),
      giantSteps.save(),
      ladyInSatin.save(),
      blueMoon.save()
    ])

   

    
};


module.exports = {
   syncAndSeed,
   models:{
       Musician,
       Album,
       Tune
   }
}


