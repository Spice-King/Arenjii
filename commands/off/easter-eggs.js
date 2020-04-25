      // Yisun easter egg
      else if ( firstCmd === 'yisun' && message.author.id === config.boss )
      {
          message.delete(0);
          
          switch ( Number( args[1] ) )
          {
              case 1:
                  msg += 'The name of YISUN that can be spoken is not the name of YISUN.\nThe name that can be named is not the eternal name!\nNameless: it is the source of Is and Is Not.\nThe Nameless has nine hundred and ninety nine thousand names that combine into the true name of God:\nI';    break;
              case 2:
                  msg += 'When the people of the world all know Truth, there arises the recognition of Lies. When they know there is such a thing as Illusion, there arises the idea of Reality.\n\nTherefore Reality and Illusion produce each other, Truth and Lies trick each other.'; break;
              case 3:
                  msg += 'To speak general truths about YISUN is to lie intimately; in truth YISUN is the unparalleled master of the fundamental art of lying. The best practice of lying is self deception.';    break;
              case 4:
                  msg += 'The Nameless way of YISUN is empty.\nWhen utilised, it is not filled up.\nInfinitely deep! This is YISUN: it is everything, including itself.'; break;
              case 5:
                  msg += 'The space between The Wheel and void\nIs it not like a bellows?\nEmpty, and yet never exhausted\nIt moves, and produces more';  break;
              case 6:
                  msg += 'The valley spirit, undying\nIs called the Mystic YS\n\nThe gate of the Mystic Female\nIs called the root of The Wheel and Void\n\nIt flows continuously, barely perceptible\nUtilize it; it is never exhausted.';   break;
              case 7:
                  msg += 'The Wheel and Void are everlasting\nThe reason the Wheel and Void can last forever\nIs that they do not exist for themselves\nThus they can last forever.'; break;
              case 8:
                  msg += 'Be fire: A burning will that consumes everything in its path to survive. Dance a dance of destruction and rebirth'; break;
              case 0:
              case 9:
                  msg += 'YS ATUN VRAMA PRESH';   break;
          }
                // Inheritors Easter Egg
        else if ( firstCmd === 'inheritors' && message.author.id === config.boss )
        {
            message.delete(0);
            msg += '\nThe king on the throne, alone one day,\nTook the words in his mouth and threw them away,\nFirst came the servants, the first of the seen,\nWho built him a house, and kept his hearth clean\nNext came the tall men of stone and cold fire,\nTo seek out all sinners and add to the pyre.\nThen came the beloved, the storied and told,\nThe first to lay claim to the cosmos of old.\nLast came the white ones of bones, teeth and eyes,\nWho swallow all truths and spit out only lies.';
        }
      // Knights Easter Egg
        else if ( firstCmd === 'knights' && message.author.id === config.boss )
        {
            message.delete(0);
            msg += 'What makes a knight?\nA shining blade or bloody battered steel?\nLet us name the Orders Four and the truth within reveal.\n\nTHE GEAS KNIGHT unknown by name, the seeker proud and true,\nHis endless quest hath rent the stars yet known is he by few,\n\nTHE PEREGRINE, whose bell always rings the crack of breaking day,\nIt’s nameless peal will drive the ceaseless evil from the ways,\n\nTHE BLOODY KNIGHT, belligerent, her edge tastes skulls and lives,\nThe viscera of common men and royalty besides,\n\nTHE MENDICANT, the beggar knight, roughly clad and shod,\nHe lives as though he were a beast, but fights he as a God.';
        }
              //+ Maybe Easter Egg
              else if ( firstCmd === 'maybe' && message.author.id === config.boss )
              {
                  message.delete(0);
              }
            // Meti's Sword Manual
              else if ( firstCmd === 'meti' && message.author.id === config.boss )
              {
                  message.delete(0);
                  
                  let verse = typeof args[1] === 'undefined' ? 1 + Math.floor( Math.random() * 30 ) : Number( args[1] );
      
                  if ( verse <= 6 )
                      {   msg += "**Argument**\n";  }
                  else if ( verse <= 8 )
                      {   msg += "**Mastering the Sword**\n"; }
                  else if ( verse <= 26 )
                      {   msg += `**The 18 Precepts**\n__${verse - 9})__: `;   }
                  else
                      {   msg += "**Closing**\n";   }
      
                  switch ( verse )
                  {
                      case 1:
                          msg += "Glory to the Divine Corpse, o breaker of infinities.\nI am Meti, of no house but myself. In my 108th year I am surrounded by fools. My compatriots cling obsessively to their destiny, and my only apprentice is an idiot speck of a girl with more talent for eating than skill with the blade. Therefore I have decided to die drowning in the boiling gore of my enemies, of which there are many."; break;
                      case 2:
                          msg += "My master was the greatest lord general to the king Au Vam, Ryo-ten-Ryam, who first coaxed me into learning the ways of turning men into ghosts. As his interest quickly turned to the wholly uninteresting and most useless parts of my body, I returned the favor and relieved him of his.";  break;
                      case 3:
                          msg += "It is my personal opinion the straight sword is best if you can obtain one, but I also favor the sabre. The spear, stave, or club are peasant's weapons of which I am wholly unfamiliar and so will not speak on them.";    break;
                      case 4:
                          msg += "Upon meeting me, you might find that my appearance is quite dreadful and unkempt. I have been spat upon by priest, king, and merchant alike. I have no retainers, and possess nothing except a straight sword six hand spans (five and a half kret) long (this is the proper length). This is because I am Royalty and the undisputed master of the principal art of Cutting. I will fight naked with ten-thousand men.";   break;
                      case 5:
                          msg += "When it came time to face my first real opponent, the Colossus of Pardos, in my youthful pride and immense skill, I brought all my training and mastery to bear. Scarcely half a day passed before my sword was shattered into thirty pieces, my right leg was almost torn from its socket, and my honed body was broken pathetically in a hundred and forty places. I defeated him by gouging his brains out through his breathing valves. My thumbs, in this case, proved far more useful.\nAt that moment, with my thumbs in his brains, I had a revelation. I had trained far too broadly. Existence and the act of combat are absolutely no different, and the essence of both, the purity of both, is a singular action, which is Cutting Down Your Opponent. You must resolve to train this action. You must become this action. Truly, there is very little else that will serve you as well in this entire cursed world.";    break;
                      case 6:
                          msg += "I hope that by reading this manual, you will be thoroughly encouraged to become a farmer."; break;
                          
                      case 7:
                          msg += "YISUN's glory is great, and you may know this by two paths, the sanctioned words, and the sanctioned action.\nThe sanctioned words are YS ATN VARAMA PRESH. The meaning of these words is YISUN and their attainment is Royalty.\nThe sanctioned action is to Cut.\nTo Cut means division by the blade of Want, that parer of potentials that excises infinities."; break;
                          /*YS ATUN VRAMA PRESH
                            YS ATN VARAMA PRESH
                            YS ATUN VARANMA PRESH*/
                      case 8:
                          msg += "To train with the sword, first master sweeping. When you have mastered sweeping, you must master the way of drawing water. Once you have learned how to draw water, you must split wood. Once you have split wood, you must learn the arts of finding the fine herbs in the forest, the arts of writing, the arts of paper making, and poetry writing. You must become familiar with the awl and the pen in equal measure. When you have mastered all these things you must master building a house. Once your house is built, you have no further need for a sword, since it is an ugly piece of metal and its adherents idiots."; break;
                      case 9:
                          msg += "Consider: there is no such thing as a sword."; break;
                      case 10:
                          msg += "Your stance must be wide. You must not be spare with the fluidity of your wrists or shoulders. You must have grip on the handle that is loose and unstrained. I heard it said you must be tender with your sword grip, as though with a lover. This is patently false. A sword is not your lover. It is a hideous tool for separating men from their vital fluids.";    break;
                      case 11:
                          msg += "Going onwards, you must adjust hands as needed, do not keep the blade close to your body, keep your breathing steady. This is the life cut. You must watch your footwork. Your feet must be controlled whether planted on fire, air, water, or earth in equal measure.";    break;
                      case 12:
                          msg += "Breathing is very important! Is the violent breath of life in you not hot? Exhale! Exult!"; break;
                      case 13:
                          msg += "You must strive for attachment-non-attachment when cutting. Your cut must be sticky and resolute. A weak, listless cut is a despicable thing. But you must also not cling to your action, or its result. Clinging is the great error of men. A man who strikes without thought of his action can cut God.";    break;
                      case 14:
                          msg += "To cut properly, you must continually self-annihilate when cutting. Your hand must become a hand that is cutting, your body a body that is cutting, your mind, a mind that is cutting. You must instantaneously destroy your fake pre-present self. It is a useless hanger on.";   break;
                      case 15:
                          msg += "A brain is useful only up until the point when you are faced with your enemy. Then it is useless. The only truly useful thing in this cursed world is will. You must suffuse your worthless body with its terrible heat. You must be so hot that even if your enemy should strike your head off, you shall continue to decapitate ten more men. Your boiling blood must spring forth from your neck and mutilate the survivors!";  break;
                      case 16:
                          msg += "You must never make 'multiple' cuts. Each must be singular in its beauty, no matter how many precede it. You must make your enemies weep with admiration, and likewise should your head be shorn off by such an object of beauty, you must do your best to shed tears of respect.";    break;
                      case 17:
                          msg += "When decapitating an enemy, it is severe impoliteness to use more than one blow."; break;
                      case 18:
                          msg += "A man who finds pleasure in the result of cutting is the most hateful, crawling creature there is. A man who finds pleasure in the act of cutting is an artisan."; break;
                      case 19:
                          msg += "Man always strives to cut man. Therefore he who draws his sword the fastest is the survivor. To pre-empt this, you must live, eat, and shit as a person who has their sword drawn. It doesn't matter whether your blade, in actuality, is always out of its sheathe, though you will look like an idiot if it is.";    break;
                      case 20:
                          msg += "Consider: The undefeated swordsman must be exceptionally poor.";   break;
                      case 21:
                          msg += "The weak swordsman reserves his sword strokes. He clings excessively to his blade. His footwork is unsteady. His grip is too hard and he is afraid to crack the earth with his step. He has a shallow and wandering gaze, his tongue is sluggish and pale. He refuses to exhale the hot breath of the Flame Immortal.";    break;
                      case 22:
                          msg += "The weak swordsman clings to victory. He thinks of his life, his obligations, the outcome of the battle, his hatred for his opponent, his training, his pride in his mastery. By doing so, he is an imperfect vessel for the terrible fires of Will. He will surely crack. He will not laugh uproariously if he is cleft in two by his opponent’s blade. When his sword is shattered, his hands will be too reserved to tear his enemies’ flesh."; break;
                      case 23:
                          msg += "The weak swordsman strikes his enemy down and thinks his task done. He relishes in victory. He casts away his sword and returns to his lover. Little does he know his single cut will encircle the world five times and strike him down fifty-fold.";  break;
                      case 24:
                          msg += "The weak swordsman clings to his instrument. It is better you have a sword, but death must lie under your fingernails, if need be. Learn death with your elbows, death with your knees, and death with your thumbs and fingertips. It is said death with the tongue is useful, but I find words too soft an instrument to smash a man’s skull";    break;
                      case 25:
                          msg += "In manners of terrain, you must learn to cut yourself from it. You must cut even your footprints from it, if need be. Have complete awareness of each crawling thing and each precious flower, each blade of sweet grass and each clod of bitter earth, each beating heart and each being that thrums with love, hope, and admiration. Only then are you qualified to be their annihilator.";  break;
                      case 26:
                          msg += "Excess heat and excess coldness are undesirable. Learn to read the weather.";  break;
      
                      case 27:
                          msg += "It is said the greatest warrior-kings may sublime violence and forget all they learn about the sword. This is true. But the only true path to kingship lies through regicide./nMoreover, only the worst kind of idiot strives to be king."; break;
                      case 29:
                          msg += "My extreme hope is that some measure of wisdom will penetrate the thick skull of my apprentice. If not, may reading this manual demonstrate your powerful disinterest in it, and may its true value die with me."; break;
                      case 30:
                          msg += "Reach heaven by violence."; break;
                  }
              }
                    // Psalms Easter Egg
        else if ( firstCmd === 'psalms' && message.author.id === config.boss )
        {
            message.delete(0);
            
            let verse = typeof args[1] === 'undefined' ? Math.floor( Math.random() * 19 ) : Number( args[1] );

            if ( verse <= 7 )
                {   msg += "**I. ROYALTY** - ";  }
            else if ( verse <= 14 )
                {   msg += "**II. THE KING IN THE TOWER** - "; }
            else if ( verse <= 18 )
                {   msg += `**III. THE GRAND ENEMY CALLED I** - `;   }

            switch ( verse ) 
            {
                case 0:
                    msg += 'The Holy Septagrammaton -\n- YS ATUN VRAMA PRESH -';    break;
                    /*YS ATUN VRAMA PRESH
                      YS ATN VARAMA PRESH
                      YS ATUN VARANMA PRESH*/
                case 1:
                    msg += 'i.\nYISUN said: let there not be a genesis, for beginnings are false and I am a consummate liar.';    break;
                case 2:
                    msg += 'ii.\nThe full of it is this –\nthe circular suicide of God is the perfection of matter.';    break;
                case 3:
                    msg += 'iii.\nYISUN lied once and said they had nine hundred and ninety nine thousand names.\nThis is true, but it is also a barefaced lie.\nThe true name of God is I.';    break;
                case 4:
                    msg += 'iv.\nLiving is an exercise of violence.\nExercise of violence is the fate of living';    break;
                case 5:
                    msg += 'v.\nViolence is circular.\nPerception is not circular and lacks flawlessness-\ntherefore, rejoice in imperfect things, for their rareness is not lacking!';    break;
                case 6:
                    msg += 'vi.\nLove of self is the true exercise of the God called I.';    break;
                case 7:
                    msg += 'vii.\nOnly an idiot cannot place his absolute certainty in paradoxes.\nThe divine suicide is a perfect paradox.\nA man cannot exist without paradox –\nthat is the full of it.';    break;
                case 8:
                    msg += 'i.\nYISUN is the supreme king. It is impossible for YISUN to have any rivals – you will see this.\nYISUN does not aspire to royalty: YISUN is the two-syllable name of the seven syllable name of royalty revealed.\nOnly those who can invert a path can know the secret name of YISUN.';    break;
                case 9:
                    msg += 'ii.\nIt was once said that YISUN had many names.\nThis is true, but all of them are false save the name YISUN, which in itself is a paradox.';    break;
                case 10:
                    msg += 'iii.\nYISUN is the weakest thing there is and the smallest crawling thing, and the worm upon the earth and in the earth.';    break;
                case 11:
                    msg += 'iv.\nYISUN is capable of contemplating nothing.';    break;
                case 12:
                    msg += 'v.\nTo speak general truths about YISUN is to lie intimately;\nin truth one must learn the tongues but the matter remains that YISUN is the unparalleled master of the fundamental art of lying.\nThe best practice of lying is self deception.';    break;
                case 13:
                    msg += 'vi.\nYISUN once said:\n‘Selfish tongues revolt and refuse to invert the contents of their brains – even if it were a lie, this insurrection of our flesh would do us great offense.’';    break;
                case 14:
                    msg += 'vii.\nYISUN is the untouchable and prime master of all seven syllables of royalty and once told four lies.\ni. The lie of the giant and the ant\nii. The lie of the iron plum\niii. The lie of the water house\niv. The lie of the small light';    break;
                case 15:
                    msg += ' __The Lie of the Giant and the Ant__\n\nYISUN sat once with his disciple Hansa in YISUN’s second clockwise glass palace. Hansa was one of his most ardent students and a grand questioner of YISUN. Unlike Yisun’s other disciple, Pree Ashma, he had no hunger in his heart for dominion of the universe, but a miserly scrutiny and a heart of iron nails. He was not an aspirant for royalty, and thereby attained it through little effort.\nHansa’s questions were thus:\n\n‘Lord, how must I question space?’\n‘With an age, an ant may encircle a giant five million times,’ spoke YISUN.\n\n‘Lord, how then may I question time?’\n‘A giant’s stride takes an ant a week to surpass.’ YISUN spoke and smiled in the 4th way.\nHansa was discontent with this answer and rubbed the stem of his long and worn pipe which he always kept with him and would eventually lead to his annihilation. Since he was royalty, he knew this, and kept it close to him as a reminder of his circular death.\n\n‘Lord, then which should I be, the giant or the ant?’\n‘Both,’ spoke YISUN,’ or either, when it suits you. Destroy the grand enemy called ‘I’.’\n\nHansa contemplated this in silence. Later he would recount this proverb to his daughter.';    break;
                case 16:
                    msg += ' __The Lie of the Iron Plum__\n\n';    break;
                    /*There was once a king named UN-Payam who sat at the right hand of YISUN’s throne and ruled a palace of burnished gold and fire and dispensed justice in all things. It was let known once that Payam had grown an extraordinary plum – enormous in size, with adamant skin that was burnished as a breastplate and fifty times as hardy. Payam was desirous of a pillow friend of fiery heart and excellent skill with their mouth and let know that whosoever could break the skin of that plum with their teeth he would swear to share his bed with for three nights in whatever disposition they may desire.
                    Many gods were in attendance at Payam’s hall on the first day, and even more on the second day, but by the third day of this strange contest few remained who had not tested their mettle, for the plum remained implacable and immaculate and turned many away with sore teeth and roiling frustration in their brains. A great cry rose up and YISUN was called forth from the twenty third clockwise palace of carbon where YISUN had been meditating on the point of a thirty acre long spear of crystallized time. In companionship with YISUN was Hansa, who followed along.
                    “See this Payam!” cried the gods, “He deceives us! He cruelly abuses our lustful hearts!”
                    YISUN was very fond of plums and immediately grasped the iron plum and took a long, succulent bite, praising its merits to the amazement of all.
                    “How!” wailed the attended.
                    “Why, it is a plum of flesh, and quite ripe as well,” said YISUN plainly, and indeed, it was apparent to those gathered that it was the case. The plum was passed around and touched and indeed it was sensual and soft and pliant. Hansa was not so convinced. “It is still a plum of iron,” said he, “there is some trickery here, oh master of masters.”
                    “Indeed, it is so,” said YISUN, and it was again apparent to those gathered that the flesh of that plum was as hard and impermeable as a fortress. “How can it be so?” said Hansa, “How comes this fickle nature? Plums and the fifty winds are not so alike I think.”
                    YISUN said, “I told you of this and, believing it, it was so. In truth, it is whichever you prefer. In truth, there is no plum at all, just as there is no YISUN.  A plum has no shape, form, or color at all, in truth, but these are all things I find pleasing about it. A plum has no taste at all for it has no flesh or substance, but I find its sweetness intoxicating. A plum is a thing that does not exist. But it is my favorite fruit.”
                    “A pipe is a thing that does exist, and it is my favorite past time,” said Hansa, lacking understanding, and growing in cynicism.
                    “What a paradox!” said YISUN, smiling, “I shall share my love tenderly with Payam.”*/
                case 17:
                    msg += ' __The Lie of the Water House__\n\n';    break;
                    /*YISUN and Hansa walked the king’s road once, drinking plum wine. They were enfleshed as maidens at the time, for boastful, drunken Ogam swore on his high seat at the speaking house that any feat accomplished by his brothers he could redouble seven times again. Hansa, of crafty mind, and bearing little love for a brother whose raucous singing frequently interrupted his philosophical fugues, immediately saw an opportunity to deprive Ogam of his prized and well-boasted-about manhood for a fortnight, and challenged him to a contest of womanly love-making, sewing, and hearth sweeping, and for a time there was great mirth in the Red City.
                    “Dearest Un-Hansa,” spoke YISUN, after a moment, as they strolled along an expanse of fractal glass and cold fire, “Art thou not flesh of my self love? Springst thou not from my recursive womb?”
                    “Sprung I from your brow, for it is my lot in life to beat my hands against it in return for ejecting me,” said Hansa, in jest, but in truth he listened.
                    “Knowst thou the meaning of my name Y-S-U-N is the true name of sovereignty?” spoke YISUN plainly.
                    “I do,” spoke Hansa, for it was true.
                    YISUN then assumed a speaking form that was bright and very cold, from her breath she inhaled the void, and when she exhaled, beautiful water came forth from her pliant lips in great rushing gasps, and there was a sound like a clear bell that meant emptiness. Hansa was very moved by this display and watched as the shining water curved and bent upon itself and crystallized, and suddenly before the pair was a great, beautiful house, translucent and all filled with light of many colors.
                    “Observe my work,” said YISUN, pleased.
                    “It is an astounding work,” said Hansa, clearly impressed. They strode inside the house at YISUN’s bidding. The walls were clear and smooth as crystal, and warm to the touch. It had a wide hall, and a full hearth, and was full of light and air, and the openness of the place with the starkness of the void was incredibly pleasing. Hansa would have given half his lordship for such a house, in truth, for his own was a dark and cramped tomb of iron and dust.
                    “Observe again,” said YISUN, with a keen eye. Hansa did, and as he looked closer, he saw the walls, the floor, the vaulted roof, the wall coverings, and even the altar with the flowers in the visiting hall were all made of water – water as clear and still and solid as smooth and perfect glass.
                    “Water, lord?” spoke Hansa, sensing some purpose.
                    “What,” spoke YISUN playfully, “is the meaning of this allegory?”
                    They reposed for a while as Hansa thought, in the resting hall of that great water house, and gazed through the shining rim of that house across the great void, where the empty sky was perfect in its nothingness. The house rung gently like a bell and it was pleasing to Hansa as he sat in his woman’s flesh and thought.
                    After a while, he said this:
                    “The house is a man’s life.”
                    “Why this?” answered YISUN, as was the fashion.
                    “Because although it is very beautiful and filled with many fine things, it is only water, after all. It would be poor to rely on its existence –  it is only water pretending to be a house. In truth, there is no real house here at all, just as there is no Hansa, or no plums.”
                    “This is a good answer,” said YISUN, and made a small motion with her long white fingers, and smiled.
                    “It is an infuriating answer,” said Hansa, his mood darkening, and his borrowed brow furrowing, “As is common with you. How can one grant themselves the pleasure to enjoy such a fine thing? It sparkles and shines like a gorgeous jewel, but its sparkle is an intimate falsehood.”
                    “Death is my gift to you,” spoke YISUN in reply.
                    “What’s the point,” spoke Hansa, bitterly,”Of such a fine house, if it is only a lie? What is the point of Hansa, if Hansa is only a lie?”
                    “I am a fine liar,” spoke YISUN in reply.
                    Hansa was silent a moment.
                    “It is a beautiful house,” he admitted, after some time, “It is a beautiful lie.”
                    “Our self-realization is the most beautiful lie there is. I am the most conceited and prime liar. Lies are the enemy of stagnation and my self-salvation. How could we appreciate the shining beauty of my house of lies,” spoke YISUN, arching her supple back, “if there was always such a house? How could we appreciate Hansa if there was always such a Hansa?”
                    They sat in stillness a while longer.
                    “In truth, we would get very bored,” said Hansa, after a while.
                    “In truth, we would,” said YISUN.*/
                case 18:
                    msg += ' __The lie of the small light__\n\nHansa was of sound mind and proud soul and only once asked YISUN a conceited question, when he was very old and his bones were set about with dust and bent with age. It was about his own death.\n\n“Lord,” said Hansa, allowing a doubt to blossom, “What is ending?”\nIt was said later he regretted this question but none could confirm the suspicion.\n“Ending is a small light in a vast cavern growing dim,” said YISUN, plainly, as was the manner.\n\n“When the light goes out, what will happen to the cavern?”\n“It and the universe will cease to exist, for how can we see anything without any light, no matter how small?” said YISUN.\nHansa was somewhat dismayed, but sensed a lesson, as was the manner.\n\n“Darkness is the natural state of caverns,” said he, vexingly, “if I were a cavern, I would be glad to be rid of the pest of light and exist obstinately anyway!”\n“Hansa is observant,” said YISUN.';    break;
            }        
        }
      //+ Spasms Easter Egg
        else if ( firstCmd === 'spasms' && message.author.id === config.boss ) 
        {
            message.delete(0);
            
            let verse = typeof args[1] === 'undefined' ? 0 /*//- Math.floor( Math.random() * 30 )*/ : Number( args[1] );

            switch ( verse )
            {
                case 8:
                    msg += "YISUN was questioned once by their disciples at their speaking house. The questions were the following:\n\n'What is the ultimate reason for existence?'\nTo which YISUN replied, 'Self-deception.'\n\n'How can a man live in perfect harmony?'\nTo which YISUN replied, 'Non-existence.'\n\n'What is the ultimate result of all action?'\nTo which YISUN replied, 'Futility.'\n\n'How best can we serve your will?'\nTo which YISUN replied, 'Kindly ignore my first three answers.'";    break;
                case 30:
                    msg += "Prim and the Mendicant Knight";    break;
                case 31:
                    msg += "A Conquering King must come with violence in his self of selves. He must splay the guts of his enemy with no weapon but his heartstrings. His lips must spit sweet music that pulverizes his enemies, and his eyes must tell a brain-cleaving tale of loveliness. He must quench the sword of his tongue in the love of his enemies.\n\tSpasms 31:12";    break;
            }
         }