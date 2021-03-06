/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance heirarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properites and methods that are defined in their block comments below:
*/
  
/*
  === GameObject ===
  * createdAt
  * dimensions
  * destroy() // prototype method -> returns the string: 'Object was removed from the game.'
*/




function GameObject (attributes) {
  this.createdAt = attributes.createdAt;
  this.dimensions = attributes.dimensions;
}

GameObject.prototype.destroy = () =>{
  return('Object was removed from the game.');  
}


/*
  === CharacterStats ===
  * hp
  * name
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/

function CharacterStats (attributes) {
  GameObject.call(this, attributes);
  this.hp = attributes.hp;
  this.name = attributes.name
}
CharacterStats.prototype = Object.create(GameObject.prototype);


CharacterStats.prototype.takeDamage = function () {
  return(`${this.name} took damage`);  
}
/*
  === Humanoid ===
  * faction
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/

function Humanoid (attributes) {
  CharacterStats.call(this, attributes);
  this.faction = attributes.faction;
  this.weapons = attributes.weapons;
  this.language = attributes.language;
  }
 
  Humanoid.prototype = Object.create(CharacterStats.prototype)

 Humanoid.prototype.greet = function () {
   return(`Hello! My name is ${this.name}`);   
 } 
/*
  * Inheritance chain: GameObject -> CharacterStats -> Humanoid
  * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
  * Instances of CharacterStats should have all of the same properties as GameObject.
*/

// Test you work by uncommenting these 3 objects and the list of console logs below:


  const mage = new Humanoid({
    createdAt: new Date('December 17, 1995 03:24:00'),
    dimensions: {
      length: 2,
      width: 1,
      height: 1,
    },
    hp: 5,
    name: 'Bruce',
    faction: 'Mage Guild',
    weapons: [
      'Staff of Shamalama',
    ],
    language: 'Common Toungue',
  });

  const swordsman = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 2,
      height: 2,
    },
    hp: 15,
    name: 'Sir Mustachio',
    faction: 'The Round Table',
    weapons: [
      'Giant Sword',
      'Shield',
    ],
    language: 'Common Toungue',
  });

  const archer = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 4,
    },
    hp: 10,
    name: 'Lilith',
    faction: 'Forest Kingdom',
    weapons: [
      'Bow',
      'Dagger',
    ],
    language: 'Elvish',
  });

  console.log(mage.createdAt); // Today's date
  console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
  console.log(swordsman.hp); // 15
  console.log(mage.name); // Bruce
  console.log(swordsman.faction); // The Round Table
  console.log(mage.weapons); // Staff of Shamalama
  console.log(archer.language); // Elvish
  console.log(archer.greet()); // Lilith offers a greeting in Elvish.
  console.log(mage.takeDamage()); // Bruce took damage.
  console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.


  // Stretch task: 
  // * Create Villian and Hero constructor functions that inherit from the Humanoid constructor function.  
  // * Give the Hero and Villians different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
  // * Create two new objects, one a villian and one a hero and fight it out with methods!



  function Super (attributes) {
    Humanoid.call(this, attributes);    
    this.weapons = ['ice beam','fire beam','lightning beam'];
    this.shield = ['ice shield', 'fire shield', 'lightning shield'];
  }

  function Hero (attributes) {
    Super.call(this, attributes);    
    this.faction = 'Good';
  }

  function Villian (attributes) {
    Super.call(this, attributes);
    this.faction = 'Evil';
  }

  function battle  (hero, villian) {
    console.log(hero.hp);
    
    while (hero.hp > 0 && villian.hp > 0) {    
      
      let attackChoice = 0
      let defendChoice = 0

      hero.special(Math.floor(Math.random() * Math.floor(11)), hero);
      attackChoice =  Math.floor(Math.random() * Math.floor(3));
      defendChoice = Math.floor(Math.random() * Math.floor(3));

      if (attackChoice === defendChoice){
        console.log(`BLOCKED: ${hero.name}'s ${hero.weapons[attackChoice]} was negated by ${villian.name}'s ${villian.shield[defendChoice]}`);
        
      }else {
        villian.hp -= 10;
        console.log(`HIT: ${hero.name}'s ${hero.weapons[attackChoice]} hit for 10 HP. ${villian.name} has ${villian.hp} HP left`);        
      }

      villian.special(Math.floor(Math.random() * Math.floor(11)), hero);
      attackChoice =  Math.floor(Math.random() * Math.floor(3));
      defendChoice = Math.floor(Math.random() * Math.floor(3));

      if (attackChoice === defendChoice){
        console.log(`BLOCKED: ${villian.name}'s ${villian.weapons[attackChoice]} was negated by ${hero.name}'s ${hero.shield[defendChoice]}`);
        

      }else {
        hero.hp -= 10;
        console.log(`HIT: ${villian.name}'s ${villian.weapons[attackChoice]} hit for 10 HP. ${hero.name} has ${hero.hp} HP left`);        
      }     
      
    }
    if(hero.hp <= 0){
      console.log(`DEATH: ${hero.name} died`);
      hero.destroy();
      
    }
    if(villian.hp <= 0){
      console.log(`DEATH: ${villian.name} died`);    
      villian.destroy();  
    }
    if(villian.hp <= 0 && hero.hp <= 0){
      console.log('TIED: Both fighters died');
      
    }
  }

  Super.prototype = Object.create(Humanoid.prototype)
  Hero.prototype = Object.create(Super.prototype)
  Villian.prototype = Object.create(Super.prototype)
  Hero.prototype.special= (num, target) =>{
    if (num ==5 || num== 6) {
      if(target.hp + 10 > 100){
        console.log(`SPECIAL: ${target.name}'s Special Activated! But already at max HP`);
        
      }else{
        target.hp += 10;
      console.log(`SPECIAL: ${target.name}'s Special Activated! Heal for 10 HP. ${target.name}'s HP is ${target.hp}`);      
        }      
    }    
  } 

  Villian.prototype.special = (num ,target) => {
    if (num ==5 || num== 6 || num ==7) {
      target.hp -= 10
      console.log(`SPECIAL: Evil Demon Death Ray hit ${target.name} for 10 HP. ${target.name}'s HP is ${target.hp}`);
      
    }   
  }




  const superHero = new Hero({       
    hp: 100,
    name: 'Nice Man TM',    
  });

  const superVillian = new Villian({       
    hp: 100,
    name: 'MURDERTRON-9000',    
  });


  console.log(Math.floor(Math.random() * Math.floor(3)));
  console.log(Math.floor(Math.random() * Math.floor(3)));
  console.log(Math.floor(Math.random() * Math.floor(3)));
  console.log(Math.floor(Math.random() * Math.floor(3)));

  battle(superHero, superVillian)

  
