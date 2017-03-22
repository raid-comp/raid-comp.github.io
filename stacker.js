/****************************************************
All functionality related to the buff and debuff stacking + highlighting
****************************************************/


allCategories = ['catt1', 'catt2', 'catt3', 'catt4', 'catt5', 'catt6', 'catt7', 'catt8', 'catt9', 'catt10', 'catt11', 'catt12', 'catt13', 'catt14', 'catt15', 'catt16', 'catt17', 'catt18', 'catt19', 'catt20', 'catt21', 'catt22', 'catt23', 'catt24', 'catt25', 'catt26', 'catt27', 'catt28', 'catt29', 'catt30', 'catt31', 'catt32', 'catt33', 'catt34', 'catt35', 'catt36', 'catt37'];

function resetClassHighlight()
{
for(i = 0; i < allCategories .length; i++)
    			  {
     			       $('#' + allCategories[i]).css('backgroundImage', '');  
    			  }
}

// Called every time a change is made in the raid comp
function generateStacker()
{
	var comp = '';
	
	for(i = 1; i <= 8; i++)
		comp += getComp('group' + i);
	
	$.get("stacker.php", {setup: comp}, function(data) { $('#stacker').html(data); tooltips(); });
      
      enableCatHighlights("#layout .block");
      generateCount(comp);
}

/*************************
Category highlights
*************************/
function enableCatHighlights(selector)
{
      $(selector).hover(function() {
		tmp = ($(this).children().attr("class")).split(' ', 2);
		
		highlightCat(classtokens[tmp[0]][tmp[1]]);
		
	}, function() {
		tmp = ($(this).children().attr("class")).split(' ', 2);
		
		restoreCat(classtokens[tmp[0]][tmp[1]]);
	});
}

// Highlight function for categories
function highlightCat(spectoken)
{
      for(i = 0; i < urltoken2categories[spectoken].length; i++)
      {
            //$('#' + urltoken2categories[spectoken][i] + ' .catlink').css('color', '#41a5dc');
            $('#' + urltoken2categories[spectoken][i]).css({backgroundImage: 'url(img/category_highlight.jpg)', backgroundRepeat: 'repeat'});     
      }
}

// Restore function for categories
function restoreCat(spectoken)
{
      for(i = 0; i < urltoken2categories[spectoken].length; i++)
      {
            //$('#' + urltoken2categories[spectoken][i] + ' .catlink').css('color', '');
            $('#' + urltoken2categories[spectoken][i]).css('backgroundImage', '');  
      }
}

/*************************
Spec highlights
*************************/
function highlightSpec(cat)
{
      t = new Array();
      for(i = 0; i < categorytooltip2providers[cat].length; i++)
      {
            t = categorytooltip2providers[cat][i].split(" ", 2);
            
            $("#classes ." + t[0]).each(function()
            {
                  if($(this).hasClass(t[1]))
                        $(this).parent().css({backgroundImage: 'url(img/baseblock_highlight.jpg)'});
            });
            
            $("#layout ." + t[0]).each(function()
            {
                  if($(this).hasClass(t[1]))
                        $(this).parent().css({backgroundImage: 'url(img/baseblock_highlight.jpg)'});
            });
      }
}
// restore function for specs
function restoreSpec(cat)
{
      t = new Array();
      for(i = 0; i < categorytooltip2providers[cat].length; i++)
      {
            t = categorytooltip2providers[cat][i].split(" ", 2);
            
            $("#classes ." + t[0]).each(function()
            {
                  if($(this).hasClass(t[1]))
                        $(this).parent().css({backgroundImage: 'url(img/baseblock.jpg)'}); 
            });
            
            $("#layout ." + t[0]).each(function()
            {
                  if($(this).hasClass(t[1]))
                        $(this).parent().css({backgroundImage: 'url(img/baseblock.jpg)'}); 
            });
      }
}

/*************************
Tooltips
*************************/
function tooltips()
{
	$("#stacker .tooltipwrapper").hide();
      
      $(".catlink").each(function()
      {
                  $(this).composertip({
                  fluff: 15,
                  top: -10,
                  side: 'left',
                  runArgs: getTipID(this),
                  runOver: function() { highlightSpec(this.runArgs)},
                  runOut: function() { restoreSpec(this.runArgs) }
            });
	  
      });
	  
	//Fix tooltips
	//CurseTips['wowdb-tooltip'].watchElements($('.tooltipwrapper a'));
	//WP_LoadTooltips($('.tooltipwrapper'));
}



/*************************
Custom
*************************/

function setActive(name)
{
	document.getElementById(name).src = "img/active.gif";
}


function setMaybe(name)
{
	if(document.getElementById(name).src != "img/active.gif")
	{
		document.getElementById(name).src = "img/maybe.gif";
	}
}


function setInactive(name)
{
	document.getElementById(name).src = "img/inactive.gif";
}

function resetBuffs()
{
	setInactive("Horn of Winter");
setInactive("Strength of Earth Totem");
setInactive("Inspiration");
setInactive("Ancestral Healing");
setInactive("Blessing of Might");
setInactive("Improved Blessing of Might");
setInactive("Battle Shout");
setInactive("Commanding Presence");
setInactive("Abomination's Might");
setInactive("Trueshot Aura");
setInactive("Unleashed Rage");
setInactive("Bloodlust");
setInactive("Ferocious Inspiration");
setInactive("Sanctified Retribution");
setInactive("Arcane Empowerment");
setInactive("Blessing of Sanctuary");
setInactive("Vigilance");
setInactive("Renewed Hope");
setInactive("Improved Moonkin Form");
setInactive("Swift Retribution");
setInactive("Tree of Life");
setInactive("Improved Devotion Aura");
setInactive("Improved Imp");
setInactive("Commanding Shout");
setInactive("Commanding Presence2");
setInactive("Arcane Intellect");
setInactive("Fel Intelligence");
setInactive("Blessing of Wisdom");
setInactive("Improved Blessing of Wisdom");
setInactive("Mana Spring Totem");
setInactive("Restorative Totems");
setInactive("Leader of the Pack");
setInactive("Rampage");
setInactive("Icy Talons");
setInactive("Improved Icy Talons");
setInactive("Improved Windfury Totem");
setInactive("Hunting Party");
setInactive("Enduring Winter");
setInactive("Judgements of the Wise");
setInactive("Vampiric Touch");
setInactive("Improved Soul Leech");
setInactive("Moonkin Aura");
setInactive("Elemental Oath");
setInactive("Wrath of Air Totem");
setInactive("Totem of Wrath");
setInactive("Demonic Pact");
setInactive("Flametongue Totem");
setInactive("Divine Spirit");
setInactive("Fel Intelligence2");
setInactive("Power Word: Fortitude");
setInactive("Improved Power Word: Fortitude");
setInactive("Mark of the Wild");
setInactive("Improved Mark of the Wild");
setInactive("Blessing of Kings");
setInactive("Blessing of Sanctuary2");
setInactive("Acid Spit");
setInactive("Expose Armor");
setInactive("Sunder Armor");
setInactive("Faerie Fire");
setInactive("Sting");
setInactive("Curse of Weakness");
setInactive("Demoralizing Roar");
setInactive("Feral Aggression");
setInactive("Curse of Weakness2");
setInactive("Improved Curse of Weakness");
setInactive("Demoralizing Shout");
setInactive("Improved Demoralizing Shout");
setInactive("Mangle");
setInactive("Stampede");
setInactive("Trauma");
setInactive("Lava Breath");
setInactive("Slow");
setInactive("Mind-numbing Poison");
setInactive("Curse of Tongues");
setInactive("Heart of the Crusader");
setInactive("Master Poisoner");
setInactive("Totem of Wrath2");
setInactive("Aimed Shot");
setInactive("Wound Poison");
setInactive("Mortal Strike");
setInactive("Furious Attacks");
setInactive("Judgement of Light");
setInactive("Judgement of Wisdom");
setInactive("Icy Touch");
setInactive("Improved Icy Touch");
setInactive("Infected Wounds");
setInactive("Judgements of the Just");
setInactive("Thunder Clap");
setInactive("Improved Thunder Clap");
setInactive("Insect Swarm");
setInactive("Scorpid Sting");
setInactive("Savage Combat");
setInactive("Blood Frenzy");
setInactive("Improved Scorch");
setInactive("Winter's Chill");
setInactive("Improved Shadow Bolt");
setInactive("Ebon Plaguebringer");
setInactive("Earth and Moon");
setInactive("Curse of the Elements");
setInactive("Improved Faerie Fire");
setInactive("Misery");
}

/*************************
Count box
*************************/
function generateCount(comp)
{
	
	resetBuffs();
	
	  
	  var buffs = new Array();
	  buffs.length = 0;
	  
      for(i = 1; i < 40; i++)
      {
          buffs[i] = 0;
      }
	
      var count = new Array();
      
      count['Tank'] = 0;
      count['Healer'] = 0;
      count['Ranged DPS'] = 0;
      count['Melee DPS'] = 0;
	  
	  paladinCount = 0;          
		  
      var count2 = new Array();
      
      for(i = 0; i < 3; i++)
      {
          count2[i] = 0;
      }
	  
      // Do all the counting
      for(i = 0; i < comp.length; i++)
      {
            // the character
            c = comp.charAt(i);
			
			spec = urltokens[c];
            
            // Count roles
            count[urltoken2role[c]]++;
            
            for(j = 0; j < 3; j++)
            {
                if(countClasses[j].indexOf(urltokens[c]) != -1)
                {
                    count2[j]++;
                }
            }
			
			if(spec == 'deathknight blood')
			{
				buffs[1]+=100;
				setActive("Horn of Winter");
				buffs[4]+=100;
				setActive("Abomination's Might");
			}
			if(spec == 'deathknight frost')
			{
				buffs[1]+=100;
				setActive("Horn of Winter");
				buffs[14]+=100;
				setActive("Icy Talons");
				buffs[14]+=100;
				setActive("Improved Icy Talons");
				buffs[32]+=100;
				setActive("Icy Touch");
				buffs[32]+=100;
				setActive("Improved Icy Touch");
			}
			if(spec == 'deathknight unholy')
			{
				buffs[1]+=100;
				setActive("Horn of Winter");
				buffs[36]+=100;
				setActive("Ebon Plaguebringer");
			}
			if(spec == 'druid balance')
			{
				buffs[8]+=100;
				setActive("Improved Moonkin Form");
				buffs[16]+=100;
				setActive("Moonkin Aura");
				buffs[21]+=100;
				setActive("Mark of the Wild");
				buffs[21]+=100;
				setActive("Improved Mark of the Wild");
				buffs[33]+=1;
				setMaybe("Insect Swarm");
				buffs[36]+=100;
				setActive("Earth and Moon");
				buffs[37]+=100;
				setActive("Improved Faerie Fire");
			}
			if(spec == 'druid feraltank')
			{
				buffs[13]+=100;
				setActive("Leader of the Pack");
				buffs[21]+=100;
				setActive("Mark of the Wild");
				buffs[21]+=100;
				setActive("Improved Mark of the Wild");
				buffs[24]+=100;
				setActive("Faerie Fire");
				buffs[25]+=100;
				setActive("Demoralizing Roar");
				setMaybe("Feral Aggression");
				buffs[26]+=100;
				setActive("Mangle");
				buffs[32]+=1;
				setMaybe("Infected Wounds");
			}
			if(spec == 'druid feralcombat')
			{
				buffs[13]+=100;
				setActive("Leader of the Pack");
				buffs[21]+=100;
				setActive("Mark of the Wild");
				buffs[21]+=100;
				setActive("Improved Mark of the Wild");
				buffs[24]+=100;
				setActive("Faerie Fire");
				buffs[25]+=100;
				setActive("Demoralizing Roar");
				setActive("Feral Aggression");
				buffs[26]+=100;
				setActive("Mangle");
				buffs[32]+=1;
				setMaybe("Infected Wounds");
			}
			if(spec == 'druid restoration')
			{
				buffs[9]+=100;
				setActive("Tree of Life");
				buffs[21]+=100;
				setActive("Mark of the Wild");
				buffs[21]+=100;
				setActive("Improved Mark of the Wild");
			}
			if(spec == 'hunter beastmastery')
			{
				buffs[6]+=100;
				setActive("Ferocious Inspiration");
				buffs[23]+=1;
				setMaybe("Acid Spit");
				buffs[24]+=1;
				setMaybe("Sting");
				buffs[26]+=1;
				setMaybe("Stampede");
				buffs[27]+=1;
				setMaybe("Lava Breath");
				buffs[29]+=1;
				setMaybe("Aimed Shot");
				buffs[33]+=100;
				setActive("Scorpid Sting");
			}
			if(spec == 'hunter marksmanship')
			{
				buffs[4]+=100;
				setActive("Trueshot Aura");
				buffs[24]+=1;
				setMaybe("Sting");
				buffs[29]+=100;
				setActive("Aimed Shot");
			}
			
			if(spec == 'hunter survival')
			{
				buffs[15]+=100;
				setActive("Hunting Party");
				buffs[24]+=1;
				setMaybe("Sting");
				buffs[29]+=100;
				setActive("Aimed Shot");
				buffs[33]+=100;
				setActive("Scorpid Sting");
			}
			
			if(spec == 'mage arcane')
			{
				buffs[6]+=100;
				setActive("Arcane Empowerment");
				buffs[11]+=100;
				setActive("Arcane Intellect");
				buffs[27]+=1;
				setMaybe("Slow");
			}
			if(spec == 'mage fire')
			{
				buffs[11]+=100;
				setActive("Arcane Intellect");
				buffs[35]+=100;
				setActive("Improved Scorch");
			}
			if(spec == 'mage frost')
			{
				buffs[11]+=100;
				setActive("Arcane Intellect");
				buffs[15]+=100;
				setActive("Enduring Winter");
				buffs[35]+=100;
				setActive("Winter's Chill");
			}
			if(spec == 'paladin holy')
			{
				paladinCount++;
				
				buffs[3]+=34;
				buffs[12]+=34;
				setMaybe("Improved Blessing of Wisdom");
				buffs[22]+=34;
				buffs[30]+=1;
				setMaybe("Judgement of Light");
				buffs[31]+=1;
				setMaybe("Judgement of Wisdom");
				
				if(paladinCount >= 3)
				{
					setActive("Blessing of Might");
					setActive("Blessing of Kings");
					setActive("Blessing of Wisdom");
				}
				else
				{
					setMaybe("Blessing of Might");
					setMaybe("Blessing of Kings");
					setMaybe("Blessing of Wisdom");
				}
			}
			if(spec == 'paladin protection')
			{
				paladinCount++;
				
				buffs[3]+=34;
				buffs[7]+=100;
				setActive("Blessing of Sanctuary");
				buffs[9]+=100;
				setActive("Improved Devotion Aura");
				buffs[12]+=34;
				buffs[22]+=34;
				buffs[22]+=34;
				setActive("Blessing of Sanctuary2");
				buffs[28]+=100;
				setActive("Heart of the Crusader");
				buffs[30]+=1;
				setMaybe("Judgement of Light");
				buffs[31]+=1;
				setMaybe("Judgement of Wisdom");
				buffs[32]+=1;
				setMaybe("Judgements of the Just");
				
				if(paladinCount >= 3)
				{
					setActive("Blessing of Might");
					setActive("Blessing of Kings");
					setActive("Blessing of Wisdom");
				}
				else
				{
					setMaybe("Blessing of Might");
					setMaybe("Blessing of Kings");
					setMaybe("Blessing of Wisdom");
				}
			}
			if(spec == 'paladin retribution')
			{
				paladinCount++;
				
				buffs[3]+=34;
				setActive("Improved Blessing of Might");
				buffs[6]+=100;
				setActive("Sanctified Retribution");
				buffs[8]+=100;
				setActive("Swift Retribution");
				buffs[12]+=34;
				buffs[15]+=100;
				setActive("Judgements of the Wise");
				buffs[22]+=34;
				buffs[28]+=100;
				setActive("Heart of the Crusader");
				buffs[30]+=1;
				setMaybe("Judgement of Light");
				buffs[31]+=1;
				setMaybe("Judgement of Wisdom");
				
				if(paladinCount >= 3)
				{
					setActive("Blessing of Might");
					setActive("Blessing of Kings");
					setActive("Blessing of Wisdom");
				}
				else
				{
					setMaybe("Blessing of Might");
					setMaybe("Blessing of Kings");
					setMaybe("Blessing of Wisdom");
				}
			}
			if(spec == 'priest discipline')
			{
				buffs[2]+=100;
				setActive("Inspiration");
				buffs[7]+=100;
				setActive("Renewed Hope");
				buffs[19]+=100;
				setActive("Divine Spirit");
				buffs[20]+=100;
				setActive("Power Word: Fortitude");
				buffs[20]+=100;
				setActive("Improved Power Word: Fortitude");
			}
			if(spec == 'priest holy')
			{
				buffs[2]+=100;
				setActive("Inspiration");
				buffs[19]+=100;
				setActive("Divine Spirit");
				buffs[20]+=100;
				setActive("Power Word: Fortitude");
				buffs[20]+=100;
				setActive("Improved Power Word: Fortitude");
			}
			if(spec == 'priest shadow')
			{
				buffs[15]+=100;
				setActive("Vampiric Touch");
				buffs[19]+=100;
				setActive("Divine Spirit");
				buffs[20]+=100;
				setActive("Power Word: Fortitude");
				buffs[20]+=100;
				setActive("Improved Power Word: Fortitude");
				buffs[37]+=100;
				setActive("Misery");
			}
			if(spec == 'rogue assassination')
			{
				buffs[23]+=1;
				setMaybe("Expose Armor");
				buffs[27]+=1;
				setMaybe("Mind-numbing Poison");
				buffs[28]+=100;
				setActive("Master Poisoner");
				buffs[29]+=1;
				setMaybe("Wound Poison");
			}
			if(spec == 'rogue combat')
			{
				buffs[23]+=1;
				setMaybe("Expose Armor");
				buffs[27]+=1;
				setMaybe("Mind-numbing Poison");
				buffs[29]+=1;
				setMaybe("Wound Poison");
				buffs[34]+=100;
				setActive("Savage Combat");
			}
			if(spec == 'rogue subtlety')
			{
				buffs[23]+=1;
				setMaybe("Expose Armor");
				buffs[27]+=1;
				setMaybe("Mind-numbing Poison");
				buffs[29]+=1;
				setMaybe("Wound Poison");
			}
			if(spec == 'shaman elemental')
			{
				buffs[1]+=1;
				setMaybe("Strength of Earth Totem");
				buffs[5]+=100;
				setActive("Bloodlust");
				buffs[16]+=100;
				setActive("Elemental Oath");
				buffs[17]+=1;
				setMaybe("Wrath of Air Totem");
				buffs[18]+=1;
				setMaybe("Totem of Wrath");
				buffs[18]+=1;
				setMaybe("Flametongue Totem");
				buffs[28]+=1;
				setMaybe("Totem of Wrath2");
			}
			if(spec == 'shaman enhancement')
			{
				buffs[1]+=1;
				setMaybe("Strength of Earth Totem");
				buffs[4]+=100;
				setActive("Unleashed Rage");
				buffs[5]+=100;
				setActive("Bloodlust");
				buffs[14]+=100;
				setActive("Improved Windfury Totem");
				buffs[17]+=1;
				setMaybe("Wrath of Air Totem");
				buffs[18]+=1;
				setMaybe("Flametongue Totem");
			}
			if(spec == 'shaman restoration')
			{
				buffs[1]+=1;
				setMaybe("Strength of Earth Totem");
				buffs[2]+=100;
				setActive("Ancestral Healing");
				buffs[5]+=100;
				setActive("Bloodlust");
				buffs[12]+=1;
				setMaybe("Mana Spring Totem");
				setActive("Restorative Totems");
				buffs[17]+=1;
				setMaybe("Wrath of Air Totem");
				buffs[18]+=1;
				setMaybe("Flametongue Totem");
			}
			if(spec == 'warlock affliction')
			{
				buffs[11]+=100;
				setActive("Fel Intelligence");
				buffs[19]+=100;
				setActive("Fel Intelligence2");
				buffs[24]+=1;
				setMaybe("Curse of Weakness");
				buffs[25]+=1;
				setMaybe("Curse of Weakness2");
				buffs[25]+=1;
				setMaybe("Improved Curse of Weakness");
				buffs[27]+=1;
				setMaybe("Curse of Tongues");
				buffs[35]+=100;
				setActive("Improved Shadow Bolt");
				buffs[36]+=1;
				setMaybe("Curse of the Elements");
			
			}
			if(spec == 'warlock demonology')
			{
				buffs[18]+=100;
				setActive("Demonic Pact");
				buffs[24]+=1;
				setMaybe("Curse of Weakness");
				buffs[25]+=1;
				setMaybe("Curse of Weakness2");
				buffs[27]+=1;
				setMaybe("Curse of Tongues");
				buffs[35]+=100;
				setActive("Improved Shadow Bolt");
				buffs[36]+=1;
				setMaybe("Curse of the Elements");
			}
			if(spec == 'warlock destruction')
			{
				buffs[10]+=100;
				setActive("Improved Imp");
				buffs[15]+=100;
				setActive("Improved Soul Leech");
				buffs[24]+=1;
				setMaybe("Curse of Weakness");
				buffs[25]+=1;
				setMaybe("Curse of Weakness2");
				buffs[27]+=1;
				setMaybe("Curse of Tongues");
				buffs[36]+=1;
				setMaybe("Curse of the Elements");
			}
			if(spec == 'warrior arms')
			{
				buffs[3]+=100;
				setActive("Battle Shout");
				buffs[10]+=100;
				setActive("Commanding Shout");
				buffs[25]+=100;
				setActive("Demoralizing Shout");
				buffs[26]+=100;
				setActive("Trauma");
				buffs[29]+=100;
				setActive("Mortal Strike");
				buffs[32]+=100;
				setActive("Thunder Clap");
				buffs[34]+=100;
				setActive("Blood Frenzy");
				buffs[23]+=1;
				setMaybe("Sunder Armor");
				
			}
			if(spec == 'warrior fury')
			{
				buffs[3]+=100;
				setActive("Battle Shout");
				buffs[3]+=1;
				setMaybe("Commanding Presence");
				buffs[10]+=100;
				setActive("Commanding Shout");
				buffs[10]+=1;
				setMaybe("Commanding Presence2");
				buffs[13]+=100;
				setActive("Rampage");
				buffs[25]+=100;
				setActive("Demoralizing Shout");
				buffs[29]+=1;
				setMaybe("Furious Attacks");
				buffs[32]+=100;
				setActive("Thunder Clap");
				buffs[23]+=1;
				setMaybe("Sunder Armor");
			}
			if(spec == 'warrior protection')
			{
				buffs[3]+=100;
				setActive("Battle Shout");
				buffs[7]+=100;
				setActive("Vigilance");
				buffs[10]+=100;
				setActive("Commanding Shout");
				buffs[23]+=100;
				setActive("Sunder Armor");
				buffs[25]+=100;
				setActive("Demoralizing Shout");
				buffs[32]+=100;
				setActive("Thunder Clap");
				buffs[32]+=1;
				setMaybe("Improved Thunder Clap");
			}
      }
	 
	  for(i = 1; i < 38; i++)
	  {
		  if(buffs[i] >= 100)
		  {
			document.getElementById(indexToCategory[i]).src = "img/active.gif";
		  }
		  else if (buffs[i] > 0)
		  {
			  document.getElementById(indexToCategory[i]).src = "img/maybe.gif";
		  }
		  else
		  {
			  document.getElementById(indexToCategory[i]).src = "img/inactive.gif";
		  }
	  }
	  
      str = '<span>' + count['Tank'] + '</span>&nbsp;Tank';     
      if(count['Tank'] > 1)
            str = str + 'i';
            
      $("#tanks").html(str);
      
      str = '<span>' + count['Healer'] + '</span>&nbsp;Healer';     
      
      if(count['Healer'] > 1)
            str = str + 'zy';
            
      $("#healers").html(str);

      $("#rDPS").html('<span>' + count['Ranged DPS'] + '</span>&nbsp;Ranged DPS');
      $("#mDPS").html('<span>' + count['Melee DPS'] + '</span>&nbsp;Melee DPS');
      
      
      $("#Conqueror").html('<span>' + count2[0] + '</span>&nbsp;Mark of the Conqueror');
      $("#Protector").html('<span>' + count2[1] + '</span>&nbsp;Mark of the Protector');
      $("#Vanquisher").html('<span>' + count2[2] + '</span>&nbsp;Mark of the Vanquisher');
      
}