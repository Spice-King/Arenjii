switch(0)
{
    case 'co':
    case 'callon':
    msg += '\n__Call-On Trait__';
    msg += '\nFunction: Rerolls all traitor dice in your previous roll. Usable once per roll.';
    msg += '\nForm: `~co` or `~callon`';
    break;
    case 'fate':
    case 'luck':
    msg += '\n__Luck, Fate point__';
    msg += '\nFunction: Rerolls all 6s in your previous roll if it wasn\'t open-ended or one traitor die if it was. Usable once per roll.';
    msg += '\nForm: `~fate` or `~luck`';
    break;
    
    case 'grace':
    msg += '\n__Saving Grace, Deeds Point__'
    msg += '\nFunction: Rerolls all Traitor Dice in your previous roll. Usable once per roll.';
    msg += '\nForm: `~grace`';
    break;
    
    case 'pr':
    case 'prev':
    msg += '\n__Display Previous Roll__';
    msg += '\nFunction: Displays your previous roll or that of the mentioned user, including all changes made to it afterwards such as with `~callon`, `~fate` and `~vs`';
    msg += '\nForm: `~pr` or `~prev` optional: `@user`. eg `~prev @Un-Arenjii#4939`';
    break;
    
    case 'roll':
    msg += '\n__Roll the Dice__';
    msg += '\nFunction: Rolls a pool of dice';
    msg += '\nForm: `~X#{!}`';
    msg += '\n\t`X` Accepts `b`, `g` or `w`. Determines the __Shade__ (Black, Grey or White respectively) of the roll.';
    msg += '\n\t`#` the __Base Exponent__ of the Test to be rolled [0-99].';
    msg += '\n\t`!` *optional*; adding this makes the roll Open-Ended';
    msg += '\nExtra Tags:';
    msg += '\n\t`ad#` __Advantage__ Adds `#` advantage dice to the roll.';
    msg += '\n\t`ar#` __Artha__ Adds `#` Artha dice to the roll.';
    /*Greed: 
    - Aids or hinders Resource tests
    - 1Pp: add [1-Greed] dice to a roll. Act as Artha Dice.
    Grief: 
    - 1Dp, add [Grief] dice to a spell/skill song exponent. Independantly Open-Ended.
    Hatred: 
    - 1/session: may test Hatred in place of any skill or stat if appropriate. Open-Ended.
    - 1Dp: add [Hatred] to the roll instead of doubling exponent. Independantly Open-Ended.
    Spite:
    - 1Dp: add [Spite] dice to a roll.
    Corruption: 
    - may test Corruption in place of Forte for spell tax
    - 1Fp: Corruption Exponent helps skill/stat roll. 
    - 1Pp: may test Corruption in place of any skill or stat
    - 1Dp: add [Corruption] to the roll instead of doubling exponent.
    */
    // Rune Casting, Nature of all things also function like this?
    msg += '\n\t`as#` __Astrology, FoRK__: Adds special Astrology FoRK dice. # = [Astrology exponent].';
    msg += '\n\t`bl ` __Beginners\' Luck__: Multiplies Base Obstacle by 2, calculates if the test goes towards the ability or the skill';
    msg += '\n\t`bn#` __Boon, Deeds Point__: Adds `#` (3 Max) Artha dice to the roll.';
    msg += '\n\t`di ` __Divine Inspiration, Deeds Point__: Adds [Base Exponent] Artha dice to the roll.';
    msg += '\n\t`ds#` __Disadvantage__: Adds `#` to the Base Obstacle.';
    msg += '\n\t`fk#` __FoRK__: Functionally identical to `ad`. See `as` to FoRK in Astrology';
    msg += '\n\t`he#` __Helper Exponent__: Adds Help Dice from an Exponent of `#` [1-10].';
    msg += '\n\t`ns`  __Not Saved__: Do not save this roll. Several features use your previous roll';
    msg += '\n\t`ob#` __Obstacle, Base__: Set the Base Obstacle of the task to `#`.';
    
    msg += '\n\t`oe#` __Open-Ended__: Adds `#` dice to the roll that are Open-Ended independantly of the base roll';
    
    msg += '\n\t`ox#` __Obstacle, Multiplier__: Multiplies the Base Obstacle by `#`.';
    msg += '\n\t`vs ` __Versus Test__: Hide the results of the roll and add it to the VS Pile. Trigger the Versus Test with `~vs`.';
    msg += '\nNotes:\n\t- Its usually okay to include FoRKs and Advantage dice in your Exponent. The exception being when the `di` tag is included.\n\t- Similarly, unless the `bl` or `ox` tags are included it\'s alright to forgo the `ds` tag';
    break;
    case 'vs':
    msg += '\n__Versus Test__';
    msg += '\nFunction: Compares rolls. Which rolls are compared depends on how many mentions follow the command.';
    msg += '\nForm: `~vs {clear} {@user...}`';
    msg += '\nNotes:\n\t- `clear`: Empties the VS Stack (see the `vs` tag in `~help roll`). \n\t- No Mentions: compares all rolls in the VS stack. Clears the stack if successful.\n\t- One Mention: Compares mentioned person\'s last roll vs your last roll.\n\t- Two+ Mentions: Compares the last rolls of every person mentioned.';
    break;
}
module.exports = (robot) =>
{
    
    const prefix = robot.config.prefix;
    robot.registerHelpLine(`\`${prefix}grace\`: __Saving Grace, Deeds Point__ Rerolls all traitor dice, tracked separately from Call-on.`);
    robot.registerHelpLine(`\`${prefix}co\`: See \`${prefix}callon\``);
    robot.registerHelpLine(`\`${prefix}callon\`: __Call On Trait__ rerolls all traitor dice. Tracked separatetly from Saving Grace.`);
    // return;
    let DicePool = robot.utils.DicePool;
    console.log(DicePool)
    const roll = robot.utils.roll;
    
    robot.registerCommand(/([bgw])(\d{1,2})(!)?(.*)?/i,(message, test) =>
    {
        // setup
        var currPool = new DicePool();
        console.log(test)
        currPool.owner = message.author;
        currPool.shade = [0,0,'w', 'g', 'b'].indexOf(test[1])
        currPool.exponent = Number( test[2] );
        
        currPool.isOpenEnded = test[3] === '!';
        let isVS = false;
        const testPattern = /(\w{2})(\d{0,2})/ig
        // read and interpret each token
        let tokens = Array.from((test[4] || "").matchAll(testPattern));
        tokens.forEach( (token) =>
        {
            let flag = token[1].toLowerCase();
            
            if ( flag )
            {
                let amount = parseInt(token[2]);
                
                switch ( flag )
                {
                    case 'ad':  // Advantage dice
                    //+ restrict to +2D
                    case 'fk':  // FoRK dice
                    currPool.nonArtha += amount;
                    break;
                    case 'as':  // Astrology
                    if ( amount !== 0 && currPool.astroDice === 0)
                    {
                        currPool.astroDice++;
                        
                        if ( amount >= 5 )
                        {
                            currPool.astroDice++;
                        }
                    }
                    break;
                    case 'ar':
                    currPool.arthaDice += amount;
                    break;
                    case 'bl':  // Beginner's Luck
                    if ( !currPool.beginnersLuck )
                    {
                        currPool.ObMultiplier *= 2;
                        currPool.beginnersLuck = true;
                    }
                    break;
                    case 'bn':  // Boon; Persona Point - +1D-3D to a roll
                    if ( currPool.booned < 3 )
                    {
                        if ( amount + currPool.booned >= 3 )
                        {
                            currPool.arthaDice = 3;
                            currPool.booned = 3;
                        }
                        else
                        {
                            currPool.arthaDice += amount;
                            currPool.booned += amount;
                        }
                    }
                    break;
                    case 'di':  // Divine Inspiration; Deeds Point - doubles base Exponent
                    if ( !currPool.inspired )
                    {
                        currPool.arthaDice += currPool.exponent;
                        currPool.inspired = true;
                    }
                    break;
                    case 'ds':  // Disadvantage
                    currPool.ObAddition += amount;
                    break;
                    case 'he':  // Helper dice
                    if ( amount > 4 ) // five or more is two dice, FoRKs are 7+ for 2
                    {
                        currPool.helperPool.push( [0, 0] );
                        currPool.helperDice += 2;
                    }
                    else
                    {
                        currPool.helperPool.push( [0] );
                        currPool.helperDice++;
                    }
                    currPool.helperExponent.push( amount );
                    break;
                    case 'ns':  // No save
                    saveRoll = false;
                    break;
                    case 'ob':  // Base obstacle
                    currPool.obstacle = amount;
                    break;
                    case 'oe':
                    currPool.openEndedDice += amount;
                    break;
                    case 'ox':  // Base Obstacle multiplier
                    currPool.ObMultiplier *= amount > 0 ? amount : 1;
                    break;
                    case 'vs':  // this is a VS test?
                    isVS = true;
                    break;
                }
            }
        });
        
        // Find total dice rolled
        currPool.totalRolled = currPool.exponent + currPool.arthaDice + currPool.nonArtha + +currPool.openEndedDice + currPool.astroDice + currPool.helperDice;
        
        
        // roll astrology dice
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
        
        // roll Independantly Open-Ended dice
        for ( o = 0; o < currPool.openEndedDice; o++ )
        {
            let openRoll = roll();
            
            if ( openRoll >= currPool.shade ) 
            {   currPool.successes++;   }
            if ( openRoll === 6 ) 
            {   o--;   }
            
            currPool.openEndedPool.push( openRoll );
        }
        
        // roll helper dice
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
        
        // Roll Exponent dice
        for ( d = 0; d < Number( currPool.exponent ) + Number( currPool.arthaDice ); d++ )
        {
            let r = roll();
            
            if ( r >= currPool.shade ) 
            {   currPool.successes++;   }
            if ( currPool.isOpenEnded && r === 6 ) 
            {   d--;   }
            
            currPool.basePool.push( r );
        }
        
        // VS Test
        if ( isVS )
        {
            let vsRolls = client.rollMap.get( message.channel.id );
            
            if ( vsRolls === null )
            {
                vsRolls = [];
            }
            else
            {
                vsRolls.forEach ( (participant) =>
                {
                    if ( participant.reps <= currPool.reps )
                    {
                        currPool.reps++;
                    }
                }
                );
            }
            
            vsRolls.push( currPool );
            
            client.rollMap.set( message.channel.id, vsRolls );
            
            message.channel.send(`${currPool.reps === 0 ? currPool.owner.username : currPool.owner.username + ' ' + currPool.reps} added a roll to the VS pile.`);
        }
        
        // Output
        if ( !isVS )
        {
            message.channel.send(currPool.printPool());
        }
        
        // // Save Roll
        // if ( saveRoll )
        // {
        //     //- client.rollMap.set( message.channel.id, currPool ); //- is there any reason to save this?
        //     // client.rollMap.set( message.author.id, currPool );
        // }
    });
    robot.registerCommand(/((?:co)|(?:callon)|(?:grace))/, `\`~co\`: See \`~callon\`'`, (message, test) =>
    {
        const type = test[1].toLowerCase().startsWith( 'c' );
        let prevPool = client.rollMap.get( message.author.id );
        
        if ( !prevPool )
        {   message.channel.send('You need to make a roll first'); return}
        else if ( prevPool.calledOn && type.startsWith( 'c' ) )
        {   message.channel.send('You have already used a Call-on trait for this roll.'); return}
        else if ( prevPool.graced && type === 'grace' )
        {   message.channel.send(`You already had a Saving Grace.`); return}
        
        let prevShade = prevPool.shade;                
        let astroTally = 0;
        let expoTally = 0;
        let result = 0;
        
        // Check Astrology pool
        let a = 0;
        while ( prevPool.astroPool[a] != null )
        {
            let newRoll = [];
            
            if ( prevPool.astroPool[a] < prevShade )
            {
                result = roll();
                newRoll.push( result ); 
                astroTally += result >= prevShade;
                
                // explode 6s
                while ( result === 6 )
                {
                    result = roll();
                    newRoll.push( result ); 
                    astroTally += result >= prevShade;
                }
                
                // reroll 1s
                if ( result === 1 )
                {
                    result = roll();
                    newRoll.push( result ); 
                    astroTally -= result <= prevShade;
                }
                
                if ( prevPool.astroPool[a] === 1 )
                {
                    astroTally += prevPool.astroPool[ a + 1 ] < prevShade;
                    prevPool.astroPool.splice( a, 2, ...newRoll);
                }
                else
                {   prevPool.astroPool.splice( a, 1, ...newRoll );    }
            }
            a += newRoll.length ? newRoll.length : 1;
        }
        
        prevPool.astroResult += astroTally;
        
        // Check independant Open pool (1Dim Array)
        prevPool.openEndedPool.slice().forEach( ( ioe, iI, iC ) =>
        {
            let newRoll = [];
            
            if ( ioe < prevShade )
            {
                result = roll();
                newRoll.push( result );
                expoTally += result >= prevShade;
                while ( prevPool.isOpenEnded && result === 6 )
                {
                    result = roll();
                    newRoll.push( result );
                    expoTally += result >= prevShade;
                }
                prevPool.openEndedPool.splice( iI, 1, ...newRoll );
            }
        });
        
        // Check exponent Pool (1Dim Array)
        prevPool.basePool.slice().forEach( ( die, dI, dC ) =>
        {
            let newRoll = [];
            
            if ( die < prevShade )
            {
                result = roll();
                newRoll.push( result );
                expoTally += result >= prevShade;
                while ( prevPool.isOpenEnded && result === 6 )
                {
                    result = roll();
                    newRoll.push( result );
                    expoTally += result >= prevShade;
                }
                prevPool.basePool.splice( dI, 1, ...newRoll );
            }
        });
        
        // Check Helper pool (2Dim Array)
        prevPool.helperPool.slice().forEach( ( helper, hI, hC ) =>
        {
            helper.forEach( ( hDie, dII, dC ) =>
            {
                let newRoll = [];
                
                if ( hDie < prevShade )
                {
                    result = roll();
                    newRoll.push( result );
                    expoTally += result >= prevShade;
                    while ( prevPool.isOpenEnded && result === 6 )
                    {
                        result = roll();
                        newRoll.push( result );
                        expoTally += result >= prevShade;
                    }
                    prevPool.helperPool[hI].splice( dII, 1, ...newRoll );
                }
            });
        });
        
        // output
        if ( result === 0 )
        {
            msg += 'There was nothing to reroll...'
        }
        else
        {
            if ( firstCmd.startsWith( 'c' ) )
            {   prevPool.calledOn = true;   }
            else if ( firstCmd === 'grace' )
            {   prevPool.graced = true;   }
            
            prevPool.successes += expoTally;
            client.rollMap.set( message.author.id, prevPool );
            msg += `your rerolls net you ${astroTally + expoTally} successes.\n${prevPool.printPool()}`;
        }
        
    });
    robot.registerCommand(/((?:fate)|(?:luck))/i, (message, test) =>
    {
        // Luck; Fate point, retroactively make a roll Open-Ended or reroll one die
        //+ if roll is not open ended but contains asto or independant open dice force choice 
        //+ figure out how astro dice work in this scenario
        //+ figure out how to handle pools with both open and non-open ended dice 
        // else if ( firstCmd === 'luck' || firstCmd === 'fate' )
        {
            let prevPool = client.rollMap.get( message.author.id );

            if ( prevPool !== null && !prevPool.fated )
            {
              // Roll is Open-Ended
                if ( prevPool.isOpenEnded )
                {
                    let traitor = 0;
                    let traitorType = '';
                    let reroll = 0;

                  //? check for a negatively expoded die in Astrology pool first?
                  /**
                   * Luck— A player may spend a fate point to make the dice of a single roll open—ended (6s rerolled as new dice for additional successes).
                   * If the roll is already open-ended —Steel, Faith, Sorcery— then the player may reroll a single traitor (which is not open—ended).
                   * Luck is purchased after the dice have been rolled.
                   */

                  /**
                   * the Astrology FORK die is different from other FORKS: The die is open-ended.
                   * But unlike standard open—ended dice, it open-ends both ways. 
                   * 6s are rerolled as per the normal open—end rules, but 1s are open-ended as well. 
                   * If a 1 is rolled, reroll the die.
                   * If the second roll is a failure, then a success is subtracted from the result.
                  */

                 /** Certain rolls in Burning Wheel are described as “open—ended.”
                  * This means that any 6s rolled allow the player to pick up another die.
                  * If you hit your difficulty munber or higher, it's a success.
                  * If you don't meet your difficulty number, the die is a traitor. 
                  * If you roll a 6, it counts as a success and you get to roll another die!
                 */

                  // check exponent/Artha/FoRK/Advantage Pool
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

                  // check Helper Pool
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

                  // no die to reroll
                    if ( traitor === 0 )
                    {
                        msg += 'Why would you spend Artha on a perfectly good roll?'
                    }
                  // die rerolled
                    else
                    {
                        prevPool.fated = true;
                        msg += reroll >= prevPool.shade ? `Traitorous ${traitorType} die converted!\n${traitor} => ${reroll}\nthat's +1 success for a total of ${++prevPool.successes}` : `Well, you tried...\nI rerolled a ${traitor} from your ${traitorType} dice but only got at ${reroll}`;
                    }
                }
              // Roll Not Open-Ended
                else
                {
                    let rerollBase = [];
                    let rerollHelp = [];
                    let newRoll = 0;

                  // check exponent Pool (1Dim Array)
                    prevPool.basePool.slice().forEach( ( die, dI, dC ) =>
                    {
                        if ( die === 6 )
                        {
                            newRoll = roll();
                            while ( newRoll === 6 )
                            {
                                rerollBase.push( newRoll );
                                prevPool.successes += newRoll >= prevPool.shade;
                                prevPool.basePool.splice( dI + rerollBase.length, 0, newRoll );
                                newRoll = roll();
                            }
                            rerollBase.push( newRoll );
                            prevPool.successes += newRoll >= prevPool.shade;
                            prevPool.basePool.splice( dI + rerollBase.length, 0, newRoll );
                        }
                    });

                  // check Helper Pool (2Dim Array)
                    prevPool.helperPool.slice().forEach( ( helper, hI, hC ) =>
                    {
                        rerollHelp.push( [] );

                        helper.slice().forEach( ( die, dI, dC ) =>
                        {
                            if ( die === 6 )
                            {
                                newRoll = roll();

                                while ( newRoll === 6 )
                                {
                                    rerollHelp[hI].push( newRoll );
                                    prevPool.successes += newRoll >= prevPool.shade;
                                    prevPool.helperPool[hI].splice( dI + rerollHelp[hI].length, 0, newRoll );
                                    newRoll = roll();
                                }
                                rerollHelp[hI].push( newRoll );
                                prevPool.successes += newRoll >= prevPool.shade;
                                prevPool.helperPool[hI].splice( dI + rerollHelp[hI].length, 0, newRoll );
                            }
                        });
                    });

                    prevPool.fated = true;
                    prevPool.isOpenEnded = true;

                    msg += `reroll results: ${prevPool.printPool()}`;

                    if ( prevPool.astroDice !== 0 || prevPool.openEndedDice !== 0 )
                    {
                        //+ make this work.
                        msg += "\n\nI don't know how to deal with a pool is already partially Open-Ended so those dice are ignored.";
                    }
                }

                client.rollMap.set( message.author.id, prevPool );
            }
          // Fate point already spent
            else
            {
                msg += "No Previous roll or you've already spent a Fate point on that roll";
            }
        }
    })
};
