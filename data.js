/****************************************************
Translation from class and spec to token and back
****************************************************/

//  class => spec => urltoken
classtokens = new Object();

classtokens['deathknight'] = {'blood': '1', 'frost': '2', 'unholy': '3'};
classtokens['druid'] = {'balance': '4', 'feralcombat': '5', 'restoration': '6', 'feraltank': 'v'};
classtokens['hunter'] = {'beastmastery': '7', 'marksmanship': '8', 'survival': '9'};
classtokens['mage'] = {'arcane': 'a', 'fire': 'b', 'frost': 'c'};
classtokens['paladin'] = {'holy': 'd', 'protection': 'e', 'retribution': 'f'};
classtokens['priest'] = {'discipline': 'g', 'holy': 'h', 'shadow': 'i'};
classtokens['rogue'] = {'assassination': 'j', 'combat': 'k', 'subtlety': 'l'};
classtokens['shaman'] = {'elemental': 'm', 'enhancement': 'n', 'restoration': 'o'};
classtokens['warlock'] = {'affliction': 'p', 'demonology': 'q', 'destruction': 'r'};
classtokens['warrior'] = {'arms': 's', 'fury': 't', 'protection': 'u'};

// urltoken => 'class spec'
urltokens = new Object();

urltokens['1'] = 'deathknight blood'
urltokens['2'] = 'deathknight frost'
urltokens['3'] = 'deathknight unholy';
urltokens['4'] = 'druid balance';
urltokens['5'] = 'druid feralcombat';
urltokens['6'] = 'druid restoration';
urltokens['7'] = 'hunter beastmastery';
urltokens['8'] = 'hunter marksmanship';
urltokens['9'] = 'hunter survival';
urltokens['a'] = 'mage arcane';
urltokens['b'] = 'mage fire';
urltokens['c'] = 'mage frost';
urltokens['d'] = 'paladin holy';
urltokens['e'] = 'paladin protection';
urltokens['f'] = 'paladin retribution';
urltokens['g'] = 'priest discipline';
urltokens['h'] = 'priest holy';
urltokens['i'] = 'priest shadow';
urltokens['j'] = 'rogue assassination';
urltokens['k'] = 'rogue combat';
urltokens['l'] = 'rogue subtlety';
urltokens['m'] = 'shaman elemental';
urltokens['n'] = 'shaman enhancement';
urltokens['o'] = 'shaman restoration';
urltokens['p'] = 'warlock affliction';
urltokens['q'] = 'warlock demonology';
urltokens['r'] = 'warlock destruction';
urltokens['s'] = 'warrior arms';
urltokens['t'] = 'warrior fury';
urltokens['u'] = 'warrior protection';
urltokens['v'] = 'druid feraltank';

indexToCategory = new Object();

indexToCategory[1] = "category1";
indexToCategory[2] = "category2";
indexToCategory[3] = "category3";
indexToCategory[4] = "category4";
indexToCategory[5] = "category5";
indexToCategory[6] = "category6";
indexToCategory[7] = "category7";
indexToCategory[8] = "category8";
indexToCategory[9] = "category9";
indexToCategory[10] = "category10";
indexToCategory[11] = "category11";
indexToCategory[12] = "category12";
indexToCategory[13] = "category13";
indexToCategory[14] = "category14";
indexToCategory[15] = "category15";
indexToCategory[16] = "category16";
indexToCategory[17] = "category17";
indexToCategory[18] = "category18";
indexToCategory[19] = "category19";
indexToCategory[20] = "category20";
indexToCategory[21] = "category21";
indexToCategory[22] = "category22";
indexToCategory[23] = "category23";
indexToCategory[24] = "category24";
indexToCategory[25] = "category25";
indexToCategory[26] = "category26";
indexToCategory[27] = "category27";
indexToCategory[28] = "category28";
indexToCategory[29] = "category29";
indexToCategory[30] = "category30";
indexToCategory[31] = "category31";
indexToCategory[32] = "category32";
indexToCategory[33] = "category33";
indexToCategory[34] = "category34";
indexToCategory[35] = "category35";
indexToCategory[36] = "category36";
indexToCategory[37] = "category37";
indexToCategory[38] = "category38";
indexToCategory[39] = "category39";

// urltoken => 'spec'
urltoken2name = new Object();

urltoken2name['1'] = 'Blood';
urltoken2name['2'] = 'Frost';
urltoken2name['3'] = 'Unholy';
urltoken2name['4'] = 'Balance';
urltoken2name['5'] = 'Feral Combat';
urltoken2name['6'] = 'Restoration';
urltoken2name['7'] = 'Beast Mastery';
urltoken2name['8'] = 'Marksmanship';
urltoken2name['9'] = 'Survival';
urltoken2name['a'] = 'Arcane';
urltoken2name['b'] = 'Fire';
urltoken2name['c'] = 'Frost';
urltoken2name['d'] = 'Holy';
urltoken2name['e'] = 'Protection';
urltoken2name['f'] = 'Retribution';
urltoken2name['g'] = 'Discipline';
urltoken2name['h'] = 'Holy';
urltoken2name['i'] = 'Shadow';
urltoken2name['j'] = 'Assassination';
urltoken2name['k'] = 'Combat';
urltoken2name['l'] = 'Subtlety';
urltoken2name['m'] = 'Elemental';
urltoken2name['n'] = 'Enhancement';
urltoken2name['o'] = 'Restoration';
urltoken2name['p'] = 'Affliction';
urltoken2name['q'] = 'Demonology';
urltoken2name['r'] = 'Destruction';
urltoken2name['s'] = 'Arms';
urltoken2name['t'] = 'Fury';
urltoken2name['u'] = 'Protection';
urltoken2name['v'] = 'Guardian';

// urltoken => 'spec main role'
urltoken2role = new Object();

urltoken2role['1'] = 'Tank';
urltoken2role['2'] = 'Melee DPS';
urltoken2role['3'] = 'Melee DPS';
urltoken2role['4'] = 'Ranged DPS';
urltoken2role['5'] = 'Melee DPS';
urltoken2role['6'] = 'Healer';
urltoken2role['7'] = 'Ranged DPS';
urltoken2role['8'] = 'Ranged DPS';
urltoken2role['9'] = 'Ranged DPS';
urltoken2role['a'] = 'Ranged DPS';
urltoken2role['b'] = 'Ranged DPS';
urltoken2role['c'] = 'Ranged DPS';
urltoken2role['d'] = 'Healer';
urltoken2role['e'] = 'Tank';
urltoken2role['f'] = 'Melee DPS';
urltoken2role['g'] = 'Healer';
urltoken2role['h'] = 'Healer';
urltoken2role['i'] = 'Ranged DPS';
urltoken2role['j'] = 'Melee DPS';
urltoken2role['k'] = 'Melee DPS';
urltoken2role['l'] = 'Melee DPS';
urltoken2role['m'] = 'Ranged DPS';
urltoken2role['n'] = 'Melee DPS';
urltoken2role['o'] = 'Healer';
urltoken2role['p'] = 'Ranged DPS';
urltoken2role['q'] = 'Ranged DPS';
urltoken2role['r'] = 'Ranged DPS';
urltoken2role['s'] = 'Melee DPS';
urltoken2role['t'] = 'Melee DPS';
urltoken2role['u'] = 'Tank';
urltoken2role['v'] = 'Tank';

// categorytooltip2providers =>  [list of provider specs] 
categorytooltip2providers = new Object();


//urltoken2categories['1'][] = category name.
urltoken2categories = new Object();


// GENERATED STUFF

allClasses = new Array();
allClasses = ['deathknight blood', 'deathknight frost', 'deathknight unholy', 'druid balance', 'druid feralcombat', 'druid restoration', 'hunter beastmastery', 'hunter marksmanship', 'hunter survival', 'mage arcane', 'mage fire', 'mage frost', 'paladin holy', 'paladin protection', 'paladin retribution', 'priest discipline', 'priest holy', 'priest shadow', 'rogue assassination', 'rogue combat', 'rogue subtlety', 'shaman elemental', 'shaman enhancement', 'shaman restoration', 'warlock affliction', 'warlock demonology', 'warlock destruction', 'warrior arms', 'warrior fury', 'warrior protection', 'druid feraltank'];


categorytooltip2providers['#tooltip1'] = ['deathknight blood', 'deathknight frost', 'deathknight unholy', 'shaman elemental', 'shaman enhancement', 'shaman restoration'];
categorytooltip2providers['#tooltip2'] = ['priest discipline', 'priest holy', 'shaman restoration'];
categorytooltip2providers['#tooltip3'] = ['paladin holy', 'paladin protection', 'paladin retribution', 'warrior arms', 'warrior fury', 'warrior protection'];
categorytooltip2providers['#tooltip4'] = ['deathknight blood', 'hunter marksmanship', 'shaman enhancement'];
categorytooltip2providers['#tooltip5'] = ['shaman elemental', 'shaman enhancement', 'shaman restoration'];
categorytooltip2providers['#tooltip6'] = ['hunter beastmastery', 'paladin retribution', 'mage arcane'];
categorytooltip2providers['#tooltip7'] = ['paladin protection', 'warrior protection', 'priest discipline'];
categorytooltip2providers['#tooltip8'] = ['druid balance', 'paladin retribution'];
categorytooltip2providers['#tooltip9'] = ['druid restoration', 'paladin protection'];
categorytooltip2providers['#tooltip10'] = ['warlock destruction', 'warrior arms', 'warrior fury', 'warrior protection'];
categorytooltip2providers['#tooltip11'] = ['mage arcane', 'mage fire', 'mage frost', 'warlock affliction'];
categorytooltip2providers['#tooltip12'] = ['paladin holy', 'paladin protection', 'paladin retribution', 'shaman restoration'];
categorytooltip2providers['#tooltip13'] = ['druid feralcombat', 'druid feraltank', 'warrior fury'];
categorytooltip2providers['#tooltip14'] = ['deathknight frost', 'shaman enhancement'];
categorytooltip2providers['#tooltip15'] = ['hunter survival', 'mage frost', 'paladin retribution', 'priest shadow', 'warlock destruction'];
categorytooltip2providers['#tooltip16'] = ['druid balance', 'shaman elemental'];
categorytooltip2providers['#tooltip17'] = ['shaman elemental', 'shaman enhancement', 'shaman restoration'];
categorytooltip2providers['#tooltip18'] = ['shaman elemental', 'warlock demonology', 'shaman enhancement', 'shaman restoration'];
categorytooltip2providers['#tooltip19'] = ['warlock affliction', 'priest discipline', 'priest holy', 'priest shadow'];
categorytooltip2providers['#tooltip20'] = ['priest discipline', 'priest holy', 'priest shadow'];
categorytooltip2providers['#tooltip21'] = ['druid balance', 'druid feralcombat', 'druid restoration', 'druid feraltank'];
categorytooltip2providers['#tooltip22'] = ['paladin holy', 'paladin protection', 'paladin retribution'];

 
 
categorytooltip2providers['#tooltip23'] = ['hunter beastmastery','warrior protection','rogue combat','rogue assassination','rogue subtlety'];
categorytooltip2providers['#tooltip24'] = ['druid feralcombat','druid feraltank','druid balance','hunter beastmastery','hunter survival','hunter marksmanship','warlock affliction', 'warlock demonology', 'warlock destruction'];
categorytooltip2providers['#tooltip25'] = ['druid feralcombat','druid feraltank','warlock affliction', 'warlock demonology', 'warlock destruction','warrior arms','warrior protection','warrior fury'];
categorytooltip2providers['#tooltip26'] = ['druid feralcombat','druid feraltank','hunter beastmastery','warrior arms'];
categorytooltip2providers['#tooltip27'] = ['hunter beastmastery','mage arcane','rogue combat','rogue assassination','rogue subtlety','warlock affliction', 'warlock demonology', 'warlock destruction'];
categorytooltip2providers['#tooltip28'] = ['paladin protection','paladin retribution','rogue assassination','shaman elemental'];
categorytooltip2providers['#tooltip29'] = ['hunter beastmastery','hunter survival','hunter marksmanship','rogue combat','rogue assassination','rogue subtlety'];
categorytooltip2providers['#tooltip30'] = ['paladin protection','paladin holy','paladin retribution'];
categorytooltip2providers['#tooltip31'] = ['paladin protection','paladin holy','paladin retribution'];
categorytooltip2providers['#tooltip32'] = ['deathknight frost','druid feralcombat','druid feraltank','paladin protection','warrior arms','warrior protection','warrior fury'];
categorytooltip2providers['#tooltip33'] = ['druid balance','hunter survival','hunter beastmastery','hunter marksmanship'];
categorytooltip2providers['#tooltip34'] = ['rogue combat','warrior arms'];
categorytooltip2providers['#tooltip35'] = ['mage fire','mage frost','warlock demonology','warlock affliction'];
categorytooltip2providers['#tooltip36'] = ['warlock affliction', 'warlock demonology', 'warlock destruction', 'deathknight unholy', 'druid balance'];
categorytooltip2providers['#tooltip37'] = ['priest shadow', 'druid balance'];


countClasses = new Object();

countClasses[0] = ['paladin holy', 'paladin protection', 'paladin retribution', 'priest discipline', 'priest holy', 'priest shadow', 'warlock affliction', 'warlock demonology', 'warlock destruction'];  //conqueror
countClasses[1] = ['warrior arms', 'warrior protection', 'warrior fury', 'hunter survival', 'hunter beastmastery', 'hunter marksmanship', 'shaman elemental', 'shaman enhancement', 'shaman restoration'];  //proctector
countClasses[2] = ['rogue assassination', 'rogue combat', 'rogue subtlety', 'deathknight blood', 'deathknight frost', 'deathknight unholy', 'mage arcane', 'mage fire', 'mage frost', 'druid balance', 'druid feralcombat', 'druid restoration', 'druid feraltank'];  //vanquisher



urltoken2categories['1'] = ['catt1', 'catt4'];
urltoken2categories['2'] = ['catt1', 'catt14', 'catt32'];
urltoken2categories['3'] = ['catt1', 'catt36'];
urltoken2categories['4'] = ['catt8', 'catt16', 'catt21', 'catt24','catt33','catt36','catt37'];
urltoken2categories['5'] = ['catt13', 'catt21','catt24','catt25','catt26','catt32'];
urltoken2categories['6'] = ['catt9', 'catt21'];
urltoken2categories['7'] = ['catt6', 'catt23','catt24','catt26','catt27','catt29','catt33'];
urltoken2categories['8'] = ['catt4', 'catt24','catt29','catt33'];
urltoken2categories['9'] = ['catt15', 'catt24','catt29','catt33'];
urltoken2categories['a'] = ['catt6', 'catt11','catt27'];
urltoken2categories['b'] = ['catt11', 'catt35'];
urltoken2categories['c'] = ['catt11', 'catt15','catt35'];
urltoken2categories['d'] = ['catt3', 'catt12', 'catt22', 'catt30', 'catt31'];
urltoken2categories['e'] = ['catt3', 'catt7', 'catt9', 'catt12', 'catt22','catt28', 'catt30', 'catt31','catt32'];
urltoken2categories['f'] = ['catt3', 'catt6', 'catt8', 'catt12', 'catt15', 'catt22','catt28', 'catt30', 'catt31'];
urltoken2categories['g'] = ['catt2', 'catt7', 'catt19', 'catt20'];
urltoken2categories['h'] = ['catt2', 'catt19', 'catt20'];
urltoken2categories['i'] = ['catt15', 'catt19', 'catt20', 'catt37'];
urltoken2categories['j'] = ['catt23', 'catt27', 'catt28', 'catt29'];
urltoken2categories['k'] = ['catt23', 'catt27', 'catt29', 'catt34'];
urltoken2categories['l'] = ['catt23', 'catt27', 'catt29'];
urltoken2categories['m'] = ['catt1', 'catt5', 'catt16', 'catt17', 'catt18', 'catt28'];
urltoken2categories['n'] = ['catt1', 'catt4', 'catt5', 'catt14', 'catt17', 'catt18'];
urltoken2categories['o'] = ['catt1', 'catt2', 'catt5', 'catt12', 'catt17', 'catt18'];
urltoken2categories['p'] = ['catt11', 'catt19', 'catt24','catt25','catt27','catt35','catt36'];
urltoken2categories['q'] = ['catt18', 'catt24','catt25','catt27','catt35','catt36'];
urltoken2categories['r'] = ['catt10', 'catt15', 'catt24','catt25','catt27', 'catt36'];
urltoken2categories['s'] = ['catt3', 'catt10', 'catt25','catt26','catt29','catt32','catt34'];
urltoken2categories['t'] = ['catt3', 'catt10', 'catt13', 'catt25','catt29','catt32'];
urltoken2categories['u'] = ['catt3', 'catt7', 'catt10', 'catt23' ,'catt25' ,'catt32']; 
urltoken2categories['v'] = ['catt13', 'catt21','catt24','catt25','catt26','catt32'];
