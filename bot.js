const Discord = require( 'discord.js' );
const config = require( './config.json' );

const fs = require( 'fs' );
const path = require('path');
const Robot = require("./robot");
const Enmap = require('enmap');
//+ const EnmapMongo = require('enmap-mongo');

// Initialize Discord Bot
const client = new Discord.Client(); //- { token: config.token, autorun: true });
const robot = new Robot()
//+ client.rollMap = new Enmap({ provider: new EnmapMongo({ name: "rollMap" }) }); // Persistant
client.rollMap = new Enmap(); // non-persistant

const prefix = config.prefix;
const prefix2 = config.prefix2; 

const rollPattern = RegExp( '([bgw])([0-9]{1,2})(!?)', 'i' );
const testPattern = RegExp( '([a-z]{1,2})([0-9]{0,2})', 'i' );

client.on ( "ready", () => { console.log( "I am ready!" ); });

//autoLog
client.on( "error", () => {
  // Log
    fs.appendFile( 'logFile.txt', client.rollMap.get( 'logfile' ),  function (err) {
        if (err) throw err;
        console.log('Err!');
        client.rollMap.set( 'logfile', '');
    });
});
client.on( "disconnect", () => {
    // Log
      fs.appendFile( 'logFile.txt', client.rollMap.get( 'logfile' ),  function (err) {
          if (err) throw err;
          console.log('Dis!');
          client.rollMap.set( 'logfile', '');
    });
});
client.on( "debug", () => {
    // Log
      fs.appendFile( 'logFile.txt', client.rollMap.get( 'logfile' ),  function (err) {
          if (err) throw err;
        //   console.log('Deb!');
          client.rollMap.set( 'logfile', '');
    });
});

client.on( 'message', ( message ) =>
{
    robot.processRequest(message);
});

//DoW, Fight!, RaC keyword conversion
function actionConverter ( type, action )
{
    let act = -1;

    if ( type === 'f')
    {
        
    }
    else if ( type === 'd' )
    {
        switch ( action )
        {
            case "avoid": act = 0; break;
            case "dismiss": act = 1; break;
            case "feint": act = 2; break;
            case "incite": act = 3; break;
            case "obfuscate": act = 4; break;
            case "point": act = 5; break;
            case "rebuttal": act = 6; break;
            case "fall":
            case "prone":
            case "beg":
            case "mercy":
            case "run":
            case "scream":
            case "screaming":
            case "stand":
            case "drool":
            case "swoon":
            case "hesitate": act = 7; break;
            case "command":
            case "spirit":
            case "cast":
            case "drop":
            case "spell":
            case "pray":
            case "sing":
            case "howl": act = 8; break;
        }
    }
    else if ( type === 'r' )
    {
        switch ( action )
        {
            case "charge": act = 0; break;
            case "close": act = 1; break;
            case "fall":
            case "fallback":
            case "fall_back": act = 2; break;
            case "flank": act = 3; break;
            case "hold": act = 4; break;
            case "maintain": act = 5; break;
            case "retreat": act = 6; break;
            case "sneakin":
            case "sneak_in":
            case "fall": act = 7; break;
            case "sneakout":
            case "sneak_out": act = 8; break;
            case "command":
            case "withdraw": act = 9; break;
            case "prone":
            case "beg":
            case "mercy":  act = 10; break;
            case "run":
            case "scream":
            case "screaming": act = 11; break;
            case "stand":
            case "drool": act = 12; break;
            case "swoon": act = 13; break;
        }
    }


    return act;
}

client.login( config.token );
robot.load(path.resolve(__dirname, "commands"))