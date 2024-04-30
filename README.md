## Water-polo scoreboard

Well, this software is used for keeping track of the remaining time and the scoring. It can also handle the shotclock and the fouls.

Other devices can connect to the main scoreboard in order to view the scoreboard. The scoreboard can also be viewed in a web page.

There are 3 versions, one for Windows, one for Android and one web-based.

With two laptops and a large TV attached to the second laptop, spectators can view the scoreboard.

The windows version can be found in the subfolder **Win**
The Android version is in the **Android** folder. It is an apk file.

For testing the web version, go to [Water-polo scoreboard](https://gcote2019.github.io/WaterPoloScoreboard/)

#### Limitations
The web version is limited. No viewer can connect to it. It cannot update the view-only web page.

The android version is also limited. It cannot update the view-only web page but other devices can connect to it. It is better to use it as a viewer. 

I strongly recommend using the Windows version as the main scoreboard.

### The welcome screen
![Welcome screen](./images/welcome.png)

You have the choice between operating the scoreboard (Main Scoreboard) or launching a viewer. If you launch a viewer, you have to provide the ip address or the name of the machine running the main scoreboard.

If one or multiple additional buttons appear, they can be pressed to connect a to detected server.

![Detected servers](./images/detected%20servers.png)

#### Main scoreboard

![Main](./images/main.png)

![Main](./images/MainWithAnnotation.png)

#### Settings
After pressing the _Settings_ button, this dialog is shown

##### Game Settings

![Game Settings](./images/game_settings.png)
You can set the duration of a period. The maximum value is 999:59.
You can enable the shot clock and set its duration
You can also set the number of time outs and its duration.
For instance, here, each team has two time outs for every two periods.
Finally, you can set the duration of a penalty.

#### Sound Settings

![Sound Settings](./images/sound_settings.png)
A sound can be played to indicate the remaining time.

#### Color Settings

![Color Settings](./images/colors_settings.png)
If you want to change the default colors.

#### Keyboard shortcuts

![Keyboard shortcuts](./images/keyboard_shortcuts.png)
Currently, these values cannot be modified.
On a viewer, you can press "PageUp" to see a different screen. This could be useful if one needs a shot clock display.

Following images taken from [tatinui](https://www.titanui.com/49580-xbox-one-controller-buttons-psd/)

Also, if you connect an Xbox controller, you can use  
![A](./images/xbox_a.png) to start/stop the game clock.  
![B](./images/xbox_b.png) to reset the shot clock.  
![X](./images/xbox_x.png) to reset the shot clock to the second value.  

#### Web Server

![Web Settings](./images/web_settings.png)

It is possible to update a web page through socket.io to allow spectators to view the scoreboard. Make sure that the prefix http:// or https:// is used.

See [Web Server](#how-to-set-up-the-web-server)

### Team names
If you double-click on a name, you can start editing it
![Names](./images/names.png)
![Names](./images/names_2.png)
Press Enter to apply.

### Score
Simply click on the +1 to add a goal.  
![Score](./images/score_1.png)

If you have a web server, it is better to click on the G button next to a player's number.   
![Score](./images/score_2.png)  
See [Web Server](#how-to-set-up-the-web-server) for more details.


### Game Clock
Once you press "Play", the button changes   
![Game Clock](./images/game_clock.png)  

When the clock is less than a minute, it shows only the seconds.

When the clock is less than ten seconds, it shows the decimal value

![Game Clock](./images/game_clock_decimal.png)

When the remaining time reaches 0, a loud buzzer sound is played.

#### Editing the Game Clock
By double-clicking on the game clock, it possible to edit its value.  
![Edit Game Clock](./images/game_clock_edit.png)  
The format has to be MMM:SS, MMM:SS.D, SS or SS.D where M represents minutes, S represents seconds D represents a decimal value. The maximum value is 999:59.9.

### Shot Clock
![Shot Clock](./images/shot_clock.png)

the shot clock starts and stops with the game clock.

When the clock is less than ten seconds, it shows the decimal value

When the remaining time on the shot clock reaches 0, a loud buzzer sound is played.

Currently, when the remaining time on the game clock is less than the time of the shot clock, the shot clock shows the same time as the game clock. It doesn't get blanked.

#### Editing the Shot Clock
By double-clicking on the shot clock, it possible to edit its value.

### Time Outs
It is possible to start a time out which can be configured in the Settings page.
![Time Outs settings](./images/game_settings_time_outs.png)

The Time Out clock is shown instead of the shot clock.
![Time Outs settings](./images/main_time_outs.png)

You can press the Escape key to cancel it.

### Fouls

![Fouls](./images/fouls.png)  
If you press on the plus button, it adds a foul to that player and a penalty is also added.  
![Penalty and foul](./images/penalty_and_foul.png)

You can press on the corresponding X button to remove it.

### Cap Exchange
It is possible to exchange players' cap number.  
For instance, if you want to exchange cap #6 and cap #7  
![Cap Exchange](./images/cap_exchange_1.png)  
Enter 6 and 7 in the Cap Exchange area  
![Cap Exchange](./images/cap_exchange_2.png)  
Press on the X button   
![Cap Exchange](./images/cap_exchange_3.png)  

### Viewer
(Not available on the Web version)
If you click on a detected server or on the viewer button (after entering the proper information), you can view the scoreboard
![Viewer](./images/viewer.png)

You can also press the PageUp button in order to view a different layout with only the game clock and the shot clock in order to have a shot clock display.

![Viewer](./images/viewer2.png)

The viewers communicate with the server via the network. You need a local network at least.

###  How to set up the web server
It is possible to set up a web page for anyone to see in the world.

![web server](./images/web_server_1.png)
![web server](./images/web_server_2.png)
![web server](./images/web_server_3.png)

It is a bit technical but not difficult.
Here's the recipe for Windows but it is quite similar for other OSes. You don't need programming skills.

1. Install [NodeJS](https://nodejs.org/en/download/current)
2. Verify that it works by running the command "node -v" in a command prompt
3. Download the source code and _*extract*_ it in a folder.
![download code](./images/github_1.png)
4. Once extracted, go to the WebServer subfolder.
5. In a command prompt in the WebServer subfolder
   * run these 2 commands
     *  npm install express
     *  npm install socket.io
 
6.  When ready to launch the web server, run this command from the same webServer folder
    *  node index.js

You should be able to view the page by going to [localhost:3000](localhost:3000) in your web browser.

![localhost](./images/localhost.png)
In the main scoreboard, go to Settings/Web, enter "http://localhost:3000", press Ok.

If you press "Play", it should start updating in the browser too.

##### Make it accessible from anywhere
If you have access to the router, you can configure port forwarding for port 3000. Protocol is TCP.

If you are tech savvy, you could also set up a machine on Oracle Cloud free tier for instance and install the web server on it. You get an ip address to connect to that machine.

I use a free dynamic DNS service provider [dynu.com](https://www.dynu.com/en-US/) to get an easier to remember domain name that points to that machine.

You can try scoreboard.ddnsgeek.com:3000 which is a machine on Oracle Cloud running an instance of the server. Beware that it may be in use by other users.




