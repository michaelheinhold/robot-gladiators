var playerName = window.prompt("What is your robots name?")
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

console.log(playerName, playerAttack, playerHealth);

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function(enemyName) {
    while (playerHealth > 0 && enemyHealth > 0) {
      // ask player if they'd like to fight or run
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

      // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes (true), leave fight
        if (confirmSkip) {
        window.alert(playerName + ' has decided to skip this fight. Goodbye!');
          // subtract money from playerMoney for skipping
        playerMoney = playerMoney - 10;
        console.log("playerMoney", playerMoney)
        break;
        }
    }

      // remove enemy's health by subtracting the amount set in the playerAttack variable
    enemyHealth = enemyHealth - playerAttack;
    console.log(
        playerName + ' attacked ' + enemyName + '. ' + enemyName + ' now has ' + enemyHealth + ' health remaining.'
    );

      // check enemy's health
    if (enemyHealth <= 0) {
        window.alert(enemyName + ' has died!');

        // award player money for winning
        playerMoney = playerMoney + 20;

        // leave while() loop since enemy is dead
        break;
    } else {
        window.alert(enemyName + ' still has ' + enemyHealth + ' health left.');
    }

      // remove players's health by subtracting the amount set in the enemyAttack variable
    playerHealth = playerHealth - enemyAttack;
    console.log(
        enemyName + ' attacked ' + playerName + '. ' + playerName + ' now has ' + playerHealth + ' health remaining.'
    );

      // check player's health
    if (playerHealth <= 0) {
        window.alert(playerName + ' has died!');
        // leave while() loop if player is dead
        break;
    } else {
        window.alert(playerName + ' still has ' + playerHealth + ' health left.');
    }
    }
};

var startGame = function () {
  //reset player stats
  playerHealth = 100;
  playerAttack = 10;
  playerMoney = 10;

  for(var i = 0; i <enemyNames.length; i++) {
    if (playerHealth > 0) {
      window.alert("Welcome to Robot Gladiators! Round " + (i+1));
      var pickedEnemyName = enemyNames[i];
      enemyHealth=50;
      fight(pickedEnemyName);
      
      if (i< enemyNames.length-1 && playerHealth>0) {
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
  if (playerHealth > 0) {
    window.alert ("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
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
        if (playerMoney >= 7) {
          window.alert("Refilling player's health by 20 points for 7 coins.");

          //increase health and decrease money
          playerHealth = playerHealth + 20;
          playerMoney = playerMoney -7;
          break;
        }
        else {
          window.alert ("You don't have enough money!")
        }
      case "UPGRADE":
      case "upgrade":
        if (playerMoney >=7) {
          window.alert("Upgrading player's attack by 6 points for 7 coins.");

          //increase attack; decrease money
          playerAttack = playerAttack + 6;
          playerMoney = playerMoney -7;
          break;
        }
        else {
          window.alert ("You don't have enough money!")
        }
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

//start the game when the page loads.
startGame ();
endGame();
//game states
//"WIN" - player robot has defeated all enemy-robots
//  * fight all enemy robots
//  * Defeat each enemy robot
//"LOSE" - Player robot's health is zero or less