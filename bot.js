var Discord = require( 'discord.io' );
var logger = require( 'winston' );
var auth = require( './auth.json' );

class diePool 
{
  //Constructor
    constructor()
    {
        this.arthaDice = 0;         //number of dice added through spending Artha
        this.astroDice = 0;         //number of dice added through Astrology FoRK
        this.astroPool = [];        //results of astrological FoRKs/Help
        this.astroResult = 0;       //Successes gained or lost through Astrology
        this.beginnersLuck = false; //do you actually have the right skill for the job?
        this.basePool = [];         //array of dice results, includes FoRKs, Artha Dice, Advantage Dice
        this.exponent = 0;          //BASE number of dice rolled, Exponent of the roll.
        this.fated = false;         //if a Fate point has been spent on this roll
        this.helperDice = 0;        //number of dice added by helpers
        this.helperExponent = [];   //the exponent of your helpers
        this.helperPool = [];       //how much your companions 'helped' you
        this.inspired = false;      //has this roll recieved Divine Inspiration?
        this.isOpenEnded = false;   //do dice explode?
        this.nonArtha = 0;          //the number of non-artha dice added to the roll
        this.ObAddition = 0;        //added to Base Obstacle after it's multiplied
        this.ObMultiplier = 1;      //for all you double Ob needs.
        this.obstacle = 0;          //BASE obstacle of the roll
        this.owner = '';            //Who rolled the dice
        this.shade = 4;             //shade of the roll, 4 = black, 3 = grey, 2 = white
        this.successes = 0;         //the number of successes gained through rolls
        this.totalRolled = 0;       //how many dice ultimately end up being rolled (before rerolls)
    }

  //DiePool.printPool()
    printPool()
    {
        let msg = this.owner + ' rolled ' + this.totalRolled;

          //determine shade 
            switch ( this.shade ) 
            {
                case 4:
                    msg += ' Black ';
                    break;
                case 3:
                    msg += ' Grey ';
                    break;
                case 2:
                    msg += ' White ';
                    break;
            }

            this.isOpenEnded ? msg += 'Open Ended dice' : msg += 'shaded dice';

            this.beginnersLuck ? msg += ', Beginner\'s Luck,' : 0 ;

            this.obstacle > 0 ?  msg += ' against an Ob of ' + ( Number( this.obstacle ) * Number( this.ObMultiplier ) + Number( this.ObAddition ) ) : 0;
            
            this.ObMultiplier > 1 && this.obstacle > 0 ? msg += '[' + this.obstacle + '*' + this.ObMultiplier + '+' + this.ObAddition + '.' : msg += '.';

          //tally & output astrology results
            if ( this.astroDice > 0 )
            {
                msg += '\nThe Stars were ';
                this.astroResult >0 ? msg += 'right' : msg += 'wrong';
                msg += ' for ' + this.owner + '. Their fate gives them ' + this.astroResult + ' success this roll\nAstro Dice: ' + diceSugar( this.astroPool, this.shade, 2 );
                //-msg += '\n' + this.astroPool.toString();
            }

          //determine helper test difficulty
            for ( let helper = 0; helper < this.helperPool.length; helper++ ) 
            {
                msg += '\nHelper' + helper + ' added ' + diceSugar( this.helperPool[helper], this.shade, this.isOpenEnded ) + 'to the roll';
                
                if ( this.obstacle > 0 )
                {
                    msg += ' and earned a ' + RDC( this.helperExponent[helper], this.obstacle + this.ObAddition );
                }

                msg += '.';
            }
          //print base dice 
            if ( this.basePool.length )
            {
                msg += '\nBase dice: ' + diceSugar( this.basePool, this.shade, this.isOpenEnded );
                this.arthaDice > 0 ? msg += this.arthaDice + ' of which were gained by spending Artha' : 0;
            }
           
          //determine Main test difficulty
            let totesSuccessess = this.successes + this.astroResult;
            let totesObstacle = this.obstacle * this.ObMultiplier + this.ObAddition;

            //?Ob0 with an obstacleMultiplier is a graduated test with different rules

            if ( this.obstacle > 0 )
            {
                totesSuccessess >= totesObstacle ? msg += '\nThats a success with a margin of ' + ( totesSuccessess - totesObstacle ) + ' and they got to mark off a ' : msg += '\nTraitorous dice! Thats a *failure*...\nAt least they got to mark off a ';

                let bl = RDC( Number( this.exponent ) + Number( this.nonArtha ) + Number( this.astroDice ) + Number( this.helperDice ), Number( this.obstacle ) + Number( this.ObAddition ) );

                if ( this.beginnersLuck )
                {
                    bl  === 'Routine test' ? msg += 'test towards learning a new skill!' : msg += bl + ' towards advancing their stat!';
                }
                else
                {
                    msg += bl;
                }
            }
            else
            {
                if ( this.ObMultiplier > 1 )
                {
                    let degreeOfSuccess = Math.floor( ( this.successes - this.ObAddition ) / this.ObMultiplier );
                    msg += '\nThat\'s ' + totesSuccessess + ' in total and ' + degreeOfSuccess + ' degrees of success on a graduated test.';
                }
                else
                {
                    totesSuccessess > 0 ? msg += '\nThats ' + totesSuccessess + ' succes(es)!' : msg += '\nNo successes? looks like things are about to get interesting!';
                }
                
            }

            return msg;
        }
}

var prevPool = new diePool();

// Configure logger settings
logger.remove( logger.transports.Console );
logger.add( logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

/*
Challenging = # of dice rolled +1
Difficult = # of dice rolled and below but above RoutineChallenge
if diceRolled > routineTest.length us use diceRolled-3?
*/
const routineTest = [0, 1, 1, 2, 2, 3, 4, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

bot.on( 'ready', function (evt) {
    logger.info( 'Connected' );
    logger.info( 'Logged in as: ' );
    logger.info( bot.username + ' - (' + bot.id + ')' );
});

bot.on( 'message', function ( user, userID, channelID, message, evt ) 
{
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `~`
    if ( message.slice( 0, 1 ) === '~' && message.length > 1 ) 
    {
      //RegEx Setup
        let args = message.split( ' ' );
        let firstCmd = args[0];

        let isVS = false;

        const rollPattern = RegExp( '~([b|g|w])([0-9]{1,2})(!?)', 'i' );
        const testPattern = RegExp( '([a-z\+]{1,2})([0-9]{0,2})', 'i' );

      //Help
        if ( firstCmd.toLowerCase() === '~help' )
        {
            let msg = '**' + user + ' has queried the cosmos.**';

          //Flagged
            if ( args[1] )
            {
                switch ( args[1] )
                {
                    case 'dof':
                        msg += '\n__Die of Fate__';
                        msg += '\nFunction: Rolls a single die.';
                        msg += '\nForm: `~dof`';
                        msg += '\n\t` +#` adds `#` [1-6] to the result of the roll.';
                        msg += '\n\t` -#` subtracts `#` [1-6] to the result of the roll.';
                        break;
                    case 'fate':
                    case 'luck':
                        msg += '\n__Luck, Fate point__\n';
                        msg += '\nFunction: Rerolls all 6s in the previous roll if it wasn\'t open-ended or one traitor die if it was.';
                        msg += '\nForm: `~fate` or `~luck`';
                        break;
                    case 'rdc':
                        msg += '\n__Difficulty Calculator__';
                        msg += '\nFunction: Returns if a test is Routine, Difficult or Challenging.';
                        msg += '\nForm: `~rdc X Y`';
                        msg += '\n\t` X` is the number of dice rolled.';
                        msg += '\n\t` Y` is the Obstacle of the test.';
                        break;
                    case 'test':
                        msg += '\n__Areas for Improvement__';
                        msg += '\nFunction: displays a list of things that need testing.';
                        msg += '\nForm: `~test`';
                        break;
                    case 'roll':
                        msg += '\n__Roll the Dice__';
                        msg += '\nFunction: Rolls a pool of dice';
                        msg += '\nForm: `~X#[!]`';
                          msg += '\n\t` X` Accepts `b`, `g` or `w`. Determines the Shade (Black, Grey or White respectively) of the roll.';
                          msg += '\n\t`#` the number of dice to be rolled [0 to 99]. Dice multipliers like the `di` tag only affect this number.';
                          msg += '\n\tWhen using `di` extra dice should be added with `ad`, `as` `fk`, `he` and `bn`.';
                          msg += '\n\t`!` *optional*; adding this changes the roll to be Open-Ended';
                        msg += '\nExtra Tags:';
                          msg += '\n\t` ad#` __Advantage__ Adds `#` dice to the roll, unaffected by dice multipliers';
                          msg += '\n\t` as ` __Astrology, FoRK__: Adds special Astrology FoRK dice. Rolls 1 die by default. `as2` will roll 2';
                          msg += '\n\t` bl ` __Beginners\' Luck__: Multiplies Base Obstacle by 2, calculates if the test goes towards the ability or the skill';
                          msg += '\n\t` bn#` __Boon, Deeds Point__: Adds `#` [1-3] dice to the roll that do no affect difficulty. Unaffected by dice multipliers';
                          msg += '\n\t` di ` __Divine Inspiration__: Multiplies Exponent Dice by 2 and counts these extra dice as gained through Artha expenditure.';
                          msg += '\n\t` ds#` __Disadvantage__: Adds `#` to the Base Obstacle, unaffected by Ob multipliers.';
                          msg += '\n\t` fk#` __FoRK __: Functionally identical to `ad`. See `as` to FoRK in Astrology';
                          msg += '\n\t` he#` __Helper Exponent__: Adds Help Dice from an Exponent of `#` [1-10]. if an Obstacle is specified I can tell how difficult their test is';
                          msg += '\n\t` ob#` __Obstacle, Base__: Set the Base Obstacle of the task to `#` and returns the difficulty of the test. Obstacle multipliers only affect this number';
                          msg += '\n\t` ox#` __Obstacle, Multiplier__: Multiplies the Base Obstacle of by `#`.';
                          msg += '\n\t` vs ` __Versus Test__: *Unimplemented* Will flag Arenjii to compare this roll with the previous roll and declare a winner';
                        break;
                }
            }
          //No Flags
            else
            {
                msg += '\nI am Arenjii, the White God of Progression.\nI am still in development but I still have a few tricks up my sleeve!';

                msg += '\nAll commands are case insensitive so yell if you like. Speak slowly though, add spaces between tags so I can understand you.';

                msg += '\n`~dof`: __Die of Fate__ Rolls a single die.';
                msg += '\n`~fate`: See `~luck`.';
                msg += '\n `~help [command]`: __Specific Help__ gives more details about individual commands.'
                msg += '\n`~luck`: __Luck, Fate point__: Rerolls all 6s in the previous roll if it wasn\'t open-ended or one traitor die if it was.';
                msg += '\n`~rdc X Y`: __Difficulty Calculator__ Returns if roll of `X` dice against and Ob of `Y` is Routine, Difficult or Challenging.';
                msg += '\n`~test`: __How Can I Help?__ displays a list of things that need testing.';
                msg += '\n`~b#`, `~g#`, `~w#` rolls a pool of `#` [0-99] black, grey or white dice respectively. adding a `!` after `#` will make the roll open ended.';
                msg += '\n\ttype `~help roll` for more info on how to roll.'
               
                msg += '\n\nPlease PM Saelvarath if you find any bugs or have other suggestions!';
            }

          //output
            bot.sendMessage(
                {
                    to: channelID,
                    message: msg
                });  
        }
      //Die of Fate 
        else if ( firstCmd === '~dof' )
        {
            let bonus = 0;
            const DoFPattern = RegExp( '([+|-])([1-6])', 'i' );
        
          //Interpret Flags
            args.forEach( token => 
            {
                let flag = DoFPattern.exec( token );

                if ( flag )
                {
                    switch ( flag[1] )
                    {
                        case '+':
                            bonus += Number( flag[2] );
                            break;
                        case '-':
                            bonus -= flag[2];
                            break;
                    }
                }             
            });
          //Roll
            let DoF = roll();
        
          //Output    
            let msg = user + ' rolled a Die of Fate';
            if ( bonus > 0 ) { msg += ' +' + bonus; }
            else if ( bonus < 0 ) { msg += ' ' + bonus; }
            
            msg += '!\n[' + ( DoF + bonus ) + ']';
        
            bot.sendMessage(
                {
                    to: channelID,
                    message: msg
                });
        }
      //Inheritors Easter Egg
        else if ( firstCmd === '~inheritors' )
        {
            bot.sendMessage(
                {
                    to: channelID,
                    message: '\nThe king on the throne, alone one day,\nTook the words in his mouth and threw them away,\nFirst came the servants, the first of the seen,\nWho built him a house, and kept his hearth clean\nNext came the tall men of stone and cold fire,\nTo seek out all sinners and add to the pyre.\nThen came the beloved, the storied and told,\nThe first to lay claim to the cosmos of old.\nLast came the white ones of bones, teeth and eyes,\nWho swallow all truths and spit out only lies.'
                });
        }
      //Knights Easter Egg
        else if ( firstCmd === '~knights')
        {
            bot.sendMessage(
                {
                    to: channelID,
                    message: 'What makes a knight?\nA shining blade or bloody battered steel?\nLet us name the Orders Four and the truth within reveal.\n\nTHE GEAS KNIGHT unknown by name, the seeker proud and true,\nHis endless quest hath rent the stars yet known is he by few,\n\nTHE PEREGRINE, whose bell always rings the crack of breaking day,\nIt’s nameless peal will drive the ceaseless evil from the ways,\n\nTHE BLOODY KNIGHT, belligerent, her edge tastes skulls and lives,\nThe viscera of common men and royalty besides,\n\nTHE MENDICANT, the beggar knight, roughly clad and shod,\nHe lives as though he were a beast, but fights he as a God.'

                });
        }
      //Luck; Fate point, retroactively make a roll Open-Ended or reroll one die
        else if ( firstCmd.toLowerCase() === '~luck' || firstCmd.toLowerCase() === '~fate' )
        {
            let msg = '';

            if ( !prevPool.fated )
            {
              //Roll is Open-Ended
                if ( prevPool.isOpenEnded )
                {
                    let traitor = 0;
                    let traitorType = '';
                    let reroll = 0;
                    
                    //? check for a negatively expoded die in Astrology pool first?

                  //check exponent/Artha/FoRK/Advantage Pool
                    prevPool.basePool.forEach( ( die, index, collection ) => 
                    {
                        if ( traitor === 0 && die < prevPool.shade )
                        {
                            traitor = die;
                            reroll = roll();
                            collection[index] = reroll;
                            traitorType = 'Exponent';
                        }
                    });

                  //check Helper Pool
                    prevPool.helperPool.forEach( helper => 
                    {
                        helper.forEach( ( die, index, collection ) => 
                        {
                            if ( traitor === 0 && die < prevPool.shade )
                            {
                                traitor = die;
                                reroll = roll();
                                collection[index] = reroll;
                                traitorType = 'Helper';
                            }
                        });
                    });

                  //no die to reroll
                    if ( traitor === 0 )
                    {
                        msg += 'Why would you spend Artha on a perfectly good roll?'
                    }
                  //die rerolled
                    else
                    {
                        prevPool.fated = true;
                        reroll >= prevPool.shade ? msg += 'Traitorous ' + traitorType + ' die converted!\n' + traitor + ' => ' + reroll + '\nthat\'s +1 success for a total of ' + ++prevPool.successes : msg += 'Well, you tried...\nI rerolled a ' + traitor + ' from your ' + traitorType + ' dice but only got at ' + reroll;
                    }
                }
              //Roll Not Open-Ended
                else
                {
                    let rerollBase = [];
                    let rerollHelp = [];
                    let r = 0;

                  //check exponent Pool (1Dim Array)
                    prevPool.basePool.slice().forEach( ( die, dI, dC ) => 
                    {
                        if ( die === 6 )
                        {
                            r = roll();
                            while ( r === 6 )
                            {
                                rerollBase.push( r );
                                prevPool.successes += r >= prevPool.shade;
                                prevPool.basePool.splice( dI + rerollBase.length, 0, r );
                                r = roll();
                            }
                            rerollBase.push( r );
                            prevPool.successes += r >= prevPool.shade;
                            prevPool.basePool.splice( dI + rerollBase.length, 0, r );
                        }
                    });

                  //check Helper Pool (2Dim Array)
                    prevPool.helperPool.slice().forEach( ( helper, hI, hC ) => 
                    {
                        rerollHelp.push( [] );

                        helper.forEach( ( die, dI, dC ) => 
                        {
                            if ( die === 6 )
                            {
                                r = roll();
                                while ( r === 6 )
                                {
                                    rerollHelp[hI].push( r );
                                    prevPool.successes += r >= prevPool.shade;
                                    prevPool.helperPool[hI].splice( dI + rerollHelp[hI].length, 0, r );
                                    r = roll();
                                }
                                rerollHelp[hI].push( r );
                                prevPool.successes += r >= prevPool.shade;
                                prevPool.helperPool[hI].splice( dI + rerollHelp[hI].length, 0, r );
                            }
                        });
                    });

                    msg += 'reroll results: ' + diceSugar( rerollBase, prevPool.shade, prevPool.isOpenEnded );

                    rerollHelp.forEach( ( helper, hI, hC ) => 
                    {
                        if ( helper.length > 0 )
                        {
                            msg += '\nhelper' + hI + ' ' + diceSugar( helper,  prevPool.shade, prevPool.isOpenEnded );
                        }
                    });

                }
            }
          //Fate point already spent
            else
            {
                msg = 'You\'ve already spent a Fate point on this roll';
            }

          //Send message
            bot.sendMessage(
                {
                    to: channelID,
                    message: msg
                });
        }
      //+maybe Easter Egg
        /*else if ( firstCmd.toLowerCase() === '~maybe' )
        {

        }
      //+Psalms Easter Egg
        else if ( firstCmd.toLowerCase() === '~psalms' )
        {
            let msg = '';
            switch ( args[2] ) {
                case 1:
                    msg += '**Royalty**';
                    break;
                case 2:
                    msg += '**The King in the Tower**';
                    break;
                case 2:
                    msg += '**The Grand Enemy Called I**';
                    break;
                case 8:
                    msg += '';
                    break;
                case 10:
                    msg += '';
                    break;
            }

            switch ( args[3] ) {
                case 1:
                    
                    break;
            }
        }*/
      //Test Difficulty calculator
        else if ( firstCmd.toLowerCase() === '~rdc' )
        {
            //+add Ob addition/multiplication?
            let msg = '';

          //has required arguments
            if ( args[2] ) 
            {
                let d = Number.parseInt( args[1] );
                let o = Number.parseInt( args[2] );

              //improper argument types
                if ( isNaN(o) || isNaN(d) )
                {
                    msg += 'those are not valid numbers.';
                }
              //proper argument types
                else
                {
                  //array index out of bounds prevention
                    if ( d > routineTest.length )
                    {
                        msg += 'Whoa there friend... That\'s an awful lot of dice you\'re slinging there...\n What do you think you are playing? Shadowrun? *Exalted?*';
                    }
                  //negative dice rolled or Negative Ob
                    else if ( o <= 0 || d < 0 )
                    {
                        msg += 'https://qph.fs.quoracdn.net/main-qimg-527daeca7d4b6d4ef11607e548f576dd-c';
                    }
                  //proper input
                    else if ( o > 0 )
                    {
                        msg += d + 'D rolled Versus an Ob of ' + o + '?\nWhy, that would be a ' + RDC( d, o ) + '!';
                    }
                }
            }
          //fewer than 2 arguments
            else
            {
                msg += 'I need 2 numbers to compare. first, the number of dice rolled; second the Obstacle of the test.';
            }

          //Output
            bot.sendMessage(
                {
                    to: channelID,
                    message: msg
                });

            
        }
      //+Easter Egg
        /*else if ( firstCmd.toLowerCase() === '~spasms' )
        {

        }*/
      //areas of improvement
        else if ( firstCmd.toLowerCase() === '~test' )
        {
            let msg = '***Murder the Gods and topple their thrones!***\nIf they cannot bear the weight of your worship they are undeserving of Royalty.\nSo test your gods, beat them where they are weakest until they break.\nIf they are worthy they will come back stronger.';
            msg += '\n\nKnown weakenesses of the White God Arenjii are:\n-__Astrology__: reading the stars is a fine art but Arenjii is having troubles determining if the fates are in your favour or not\n-__Obstacle Math__: Several new verses to the prayer of rolling have been uncovered, invoke them with `ox#`, `ds#` and `bl`.\n-__Dice Math__: in additon the `ad#`, `fk#` and `di` verses have been unlocked, with so many new commands it may be possible to overwhelm him.';

            bot.sendMessage(
                {
                    to: channelID,
                    message: msg

                });
        }
      //-debugging VS tests
        else if ( firstCmd.toLowerCase() === '~vs' )
        {
            bot.sendMessage(
                {
                    to: channelID,
                    message: 'prev roll = \n' + prevPool.printPool()
                });
        }
      //Yisun easter egg
        else if ( firstCmd.toLowerCase() === '~yisun' )
        {
            let msg = '';

            switch ( Number( args[1] ) )
            {
                case 1:
                    msg += 'The name of YISUN that can be spoken is not the name of YISUN.\nThe name that can be named is not the eternal name!\nNameless: it is the source of Is and Is Not.\nThe Nameless has nine hundred and ninety nine thousand names that combine into the true name of God:\nI';
                    break;
                case 2:
                    msg += 'When the people of the world all know Truth, there arises the recognition of Lies. When they know there is such a thing as Illusion, there arises the idea of Reality.\n\nTherefore Reality and Illusion produce each other, Truth and Lies trick each other.';
                    break;
                case 3:
                    msg += 'To speak general truths about YISUN is to lie intimately; in truth YISUN is the unparalleled master of the fundamental art of lying. The best practice of lying is self deception.';
                    break;
                case 4:
                    msg += 'The Nameless way of YISUN is empty.\nWhen utilised, it is not filled up.\nInfinitely deep! This is YISUN: it is everything, including itself.';
                    break;
                case 5:
                    msg += 'The space between The Wheel and void\nIs it not like a bellows?\nEmpty, and yet never exhausted\nIt moves, and produces more';
                    break;
                case 6:
                    msg += 'The valley spirit, undying\nIs called the Mystic YS\n\nThe gate of the Mystic Female\nIs called the root of The Wheel and Void\n\nIt flows continuously, barely perceptible\nUtilize it; it is never exhausted.';
                    break;
                case 7:
                    msg += 'The Wheel and Void are everlasting\nThe reason the Wheel and Void can last forever\nIs that they do not exist for themselves\nThus they can last forever.';
                    break;
                case 8:
                    msg += 'Be fire: A burning will that consumes everything in its path to survive. Dance a dance of destruction and rebirth';
                    break;
                case 9:
                    msg += 'YS ATUN VRAMA PRESH';
                    break;
            }
          //output
            bot.sendMessage(
                {
                    to: channelID,
                    message: msg

                });
        }
      //Standard Test
        else if ( rollPattern.test( firstCmd ) )
        {
          //setup
            let firstExp = rollPattern.exec( firstCmd );
            
            var currPool = new diePool();

            currPool.owner = user;
            currPool.exponent = firstExp[2];
            currPool.totalRolled = currPool.exponent;
            currPool.isOpenEnded = firstExp[3] === '!';
            
          //read and interpret each token
            args.forEach( token => 
            {
                let flag = testPattern.exec( token.toLowerCase() );
                
                if ( flag )
                {
                    switch ( flag[1] )
                    {
                        case 'ad':  //advantage dice
                            //+restrict to +2D
                        case 'fk':  //FoRK dice
                            currPool.nonArtha += flag[1];
                            break;
                        case 'as':  //astrology
                            if ( flag[2] != '0' && currPool.astroDice == 0)
                            {
                                //currPool.astroPool.push( 0 );
                                currPool.astroDice++;

                                if ( flag[2] >= 2 )
                                {
                                    //currPool.astroPool.push( 0 );
                                    currPool.astroDice++;
                                }
                            }
                            break;
                        case 'bl':  //beginner's Luck
                            if ( !currPool.beginnersLuck )
                            {
                                currPool.ObMultiplier *= 2;
                                currPool.beginnersLuck = true;
                            }
                            break;
                        case 'bn':  //Boon; Persona Point - +1D-3D to a roll 
                            //+ disable after 1 invocation
                            flag[2] > 3 ? currPool.arthaDice += 3 : currPool.arthaDice += Number( flag[2] );
                            break;
                        case 'di':  //Divine Inspiration; Deeds Point - doubles base Exponen
                            if ( !currPool.inspired )
                            {
                                currPool.arthaDice += currPool.exponent;
                                currPool.inspired = true;
                            }
                            break;
                        case 'ds':   //Disadvantage
                            currPool.ObAddition += Number( flag[2] );
                            break;
                        case 'he':  //helper dice*/
                            if ( flag[2] > 6 )
                            {
                                currPool.helperPool.push( [0, 0] );
                                currPool.helperDice += 2;
                            } 
                            else
                            {
                                currPool.helperPool.push( [0] ); 
                                currPool.helperDice++;
                            } 
                            currPool.helperExponent.push( flag[2] );
                            break;
                        case 'ob':  //base obstacle
                            currPool.obstacle = flag[2];
                            break;
                        case 'ox':  //base Obstacle multiplier
                            currPool.ObMultiplier *= flag[2];
                            break;
                        case 'vs':  //this is a VS test?
                            isVS = true;
                            break;
                    }
                }
            });

          //Find total dice rolled
            currPool.totalRolled = Number( currPool.exponent ) + Number( currPool.arthaDice ) + Number( currPool.nonArtha ) + Number( currPool.astroDice ) + Number( currPool.helperDice );

          //determine shade 
            switch ( firstExp[1].toLowerCase() ) 
            {
                case 'b':
                    currPool.shade = 4;
                    break;
                case 'g':
                    currPool.shade = 3;
                    break;
                case 'w':
                    currPool.shade = 2;
                    break;
            }

          //roll astrology dice
          for ( a = 0; a < currPool.astroDice; a++ )
          {
            let astRoll = roll();
            currPool.astroResult += astRoll >= currPool.shade;
            currPool.astroPool.push( astRoll );
            
            while( astRoll === 6 )
            {
              astRoll = roll();
              currPool.astroResult += astRoll >= currPool.shade;
              currPool.astroPool.push( astRoll );
            }
          
            if ( astRoll === 1 )
            {
              astRoll = roll();
              currPool.astroResult -= astRoll < currPool.shade;
              currPool.astroPool.push( astRoll );
            }
          }

          //roll helper dice
            for ( h = 0; h < currPool.helperPool.length; h++ )
            {
                let helpRoll = [];
            
                for ( h2 = 0; h2 < currPool.helperPool[h].length; h2++ )
                {
                    let r = roll();
                    currPool.successes += r >= currPool.shade;
                    helpRoll.push( r );
                
                    while( currPool.isOpenEnded && r === 6 )
                    {
                        r = roll();
                        currPool.successes += r >= currPool.shade;
                        helpRoll.push( r );
                    }
                }

                currPool.helperPool[h] = helpRoll;
            }

          //Roll Exponent dice 
            for ( d = 0; d < Number( currPool.exponent ) + Number( currPool.arthaDice ); d++ )
            {
                let r = roll();

                if ( r >= currPool.shade ) { currPool.successes++; }
                if ( currPool.isOpenEnded && r === 6 ) { d--; }

                currPool.basePool.push( r );
            }

          //output
            bot.sendMessage(
            {
                to: channelID,
                message: currPool.printPool()
            });

          //VS Test
            if ( isVS && prevPool != [] )
            {
                let VSmsg =  '';
            }

            prevPool = currPool;
        }
      //Debug output 
        else
        {
            bot.sendMessage( {to: channelID, message: 'That\'s not a valid command.'} );
        }
    }
});

function roll ()
{
    return  1 + Math.floor( Math.random() * 6 );
}

function RDC (Pool, Obstacle)
{
    if ( Obstacle > Pool )
    {
       return 'Challenging test';
    }
    else if ( Obstacle > routineTest[Pool] )
    {
        return 'Difficult test';
    }
    else
    {
        return 'Routine test';
    }
}

function diceSugar( pool, shade, open )
{
    let msg = '[';

    if ( Array.isArray( pool ) )
    {
        for ( let d = 0; d < pool.length; d++ )
        {
            if ( Array.isArray( pool[d] ) )
            {
                msg += diceSugar( pool[d], shade, open );
            }
            else if ( open != 0 && ( pool[d] === 6 || pool[d] === 1 ) )
            {
                if ( pool[d]  === 6 )
                {
                    msg += ( d === 0 ? '__**' + pool[d] : ', __**' + pool[d] );
                
                    while ( pool[d + 1] === 6 )
                    {
                        msg += ', '+  pool[++d];
                    }

                    if ( open == 2 && pool[d + 1] === 1 )
                    {
                        msg += '**, ~~' + pool[++d] + ', ' + pool[++d] + '~~';
                    }
                    else
                    {
                        msg += ( pool[++d] >= shade ? ', ' + pool[d] + '**' : '**, ' + pool[d] );
                    }
                    
                    msg += '__';
                }
                
                if ( open == 2 && pool[d] ===1 && d != pool.length )
                {
                    msg += ( d === 0 ? '~~' +  pool[d] + ', ' + pool[++d] + '~~' : ', ~~' + pool[d] + ', ' + pool[++d] + '~~' );
                }
            }
            else if ( pool[d] >= shade )
            {
                msg += ( d === 0 ? '**' + pool[d] + '**' : ', **' + pool[d] + '**');
            }
            else
            {
                msg += ( d === 0 ? pool[d] : ', ' + pool[d] );
            }
      }
      msg += ']';
    }
    
    return msg;
}