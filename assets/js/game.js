var randomNumber = function(min, max) {
  var value = Math.floor(Math.random()*(max - min + 1))+min;

  return value;
};

var fight = function(enemy) {
    while (playerInfo.health > 0 && enemy.health > 0) {
      // ask player if they'd like to fight or run
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

      // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes (true), leave fight
        if (confirmSkip) {
        window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye!');
          // subtract money from playerMoney for skipping
        playerInfo.money = Math.max(0, playerInfo.money - 10);
        console.log("playerMoney", playerInfo.money)
        break;
        }
    }

    //generate random damage value based on player's attack power
    var damage = randomNumber(playerInfo.attack -3, playerInfo.attack);

    // remove enemy's health by subtracting the amount set in the playerAttack variable
    enemy.health = Math.max(0, enemy.health - damage);
    console.log(
        playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
    );

      // check enemy's health
    if (enemy.health <= 0) {
        window.alert(enemy.name + ' has died!');

        // award player money for winning
        playerInfo.money = playerInfo.money + 20;

        // leave while() loop since enemy is dead
        break;
    } else {
        window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
    }

      //generate random damage value based on enemy's attack power
      var damage = randomNumber(enemy.attack - 3, enemy.attack);
      // remove players's health by subtracting the amount set in the s variable
      playerInfo.health = Math.max(0, playerInfo.health - damage);
    console.log(
        enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
    );

      // check player's health
    if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + ' has died!');
        // leave while() loop if player is dead
        break;
    } else {
        window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
    }
    }
};

var startGame = function () {
  //reset player stats
  playerInfo.reset();

  for(var i = 0; i <enemyInfo.length; i++) {
    if (playerInfo.health > 0) {
      window.alert("Welcome to Robot Gladiators! Round " + (i+1));
      var pickedEnemyObj = enemyInfo[i];
      pickedEnemyObj.health= randomNumber(40,60);
      fight(pickedEnemyObj);
      
      if (i< enemyInfo.length-1 && playerInfo.health>0) {
        //ask the player if they want to visit the shop
        var storeConfrim = window.confirm("The fight is over. Want to visit the store before the next round?");

        //if yes visit the shop
        if (storeConfrim) {
          shop();
        }
      };
    }
    else {
      window.alert("You have lost your robot in battle! Game Over!");
      break;
    }
  }
};

var endGame = function () {
  window.alert ("The game has ended. Let's see how you did!");
  if (playerInfo.health > 0) {
    window.alert ("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
  }
  else {
    window.alert ("You've lost your robot in battle.");
  }

  //ask the player if theyd like to play again
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    //restart the game
    startGame();
  }

  else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};

var shop = function() {
  //ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );
    
    //use switch to carry out action
    switch (shopOptionPrompt) {
      case "REFILL":
      case "refill":
        playerInfo.refillHealth();
        break;
      case "UPGRADE":
      case "upgrade":
        playerInfo.upgradeAttack();
        break;
      case "LEAVE":
      case "leave":
        window.alert ("Leaving the store.")

        //do nothing so function will end
        break;
      default:
        window.alert("You did not pick a valid option. Try again.");

        //call shop() again to force player to pick a valid option
        shop();
        break;
    }
};

var playerInfo= {
  name: window.prompt("What is your robots name?"),
  health: 100,
  attack: 10,
  moeny: 10,
  reset: function() {
    this.health = 100;
    this.money =10;
    this.attack=10;
  },
  refillHealth: function() {
    if (this.money >= 7){
      window.alert("Refilling player's health by 20 points for 7 coins.")
      this.health += 20;
      this.money -= 7;
    }
    else {
      window.alert("You don't have enough money!")
    }
  },
  upgradeAttack: function() {
    if (this.money >= 7){
      window.alert("Upgrading player's attack by 6 points for 7 coins.")
      this.attack += 6;
      this.money -= 7;
    }
    else {
      window.alert("You don't have enough money!")
    }
  }
};
console.log(playerInfo.name, playerInfo.attack, playerInfo.health);

var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(9,12)
  },
  {
    name : "Amy Android", 
    attack: randomNumber(10,13)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(12,14)
  },
];


//start the game when the page loads.
startGame ();
endGame();
//game states
//"WIN" - player robot has defeated all enemy-robots
//  * fight all enemy robots
//  * Defeat each enemy robot
//"LOSE" - Player robot's health is zero or less