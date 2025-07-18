# Water-polo scoreboard

This application is designed to manage a game's scoreboard, including timekeeping, scoring, the shot clock, and team fouls.

It supports multiple platforms, including **Windows**, **Android**, and a **web-based** version. It also offers viewer functionality on additional devices and web browsers.

The score can be displayed during live streams using OBS.  
![streaming](./images/obs2.png)  
Image from [radio-canada](https://images.radio-canada.ca/q_auto,w_1250/v1/ici-info/sports/16x9/water-polo-mondiaux-canada-france.png)

## Setup Overview
The application runs on both Windows and Android. A web-based version is also available, though more limited.

A minimal setup includes:

+ One computer running the Main Scoreboard.
+ A second computer in Viewer mode connected to a large screen for spectators.

## Installation
+ **Windows** installer: in the Windows subfolder.
+ **Android** APK: in the Android folder.
  
For testing the web version, go to [Water-polo scoreboard](https://gcote2019.github.io/WaterPoloScoreboard/)

# ❗ Web Version Limitations
+ Cannot act as a viewer.
+ Cannot update the view-only web page.

### The welcome screen
![Welcome screen](./images/welcome.png)

You can choose to:
+ Operate the Main Scoreboard
+ Launch a Viewer

To connect as a viewer, select a listed server or manually enter the IP or device name of the scoreboard host.

![Detected servers](./images/detected%20servers.png)

#### Main scoreboard

![Main](./images/main.png)

![Main](./images/MainWithAnnotation.png)

## Settings
Accessed via the **Settings** button.

#### Game Settings

![Game Settings](./images/game_settings.png)
+ Period duration (max: 999:59)
+ Enable/disable shot clock
+ Shot clock duration
+ Timeouts per team and per period
+ Timeout duration
+ Penalty duration

#### Audible Signal

![Audible Signal](./images/sound_settings.png)  
A sound can be configured to alert when time is running out.

#### Colour Settings

![Color Settings](./images/colors_settings.png)  
You can change the default interface colors.

#### Keyboard shortcuts

![Keyboard shortcuts](./images/keyboard_shortcuts.png)
+ Shortcuts are currently fixed.
+ In viewer mode: press PageUp to toggle scoreboard display.

(From [tatinui](https://www.titanui.com/49580-xbox-one-controller-buttons-psd/))

If you connect an Xbox controller to your computer, you can use these buttons   
![A](./images/xbox_a.png)  
   : Start/Stop game clock  
![B](./images/xbox_b.png)   
   : Reset shot clock  
![X](./images/xbox_x.png)  
   : Reset shot clock (secondary value)

#### Web Server

![Web Settings](./images/web_settings.png)
+ Allows real-time updates of a web page scoreboard.
+ Configure under **Settings > Web**
+ Custom labels for events (e.g., goals)
  
#### Language

![Language](./images/language.png)  
Supports **English** and **French**.

### Team names
Double-click a team name to edit. Press *Enter* to confirm.
![Names](./images/names.png)
![Names](./images/names_2.png)


### Score

Click the **G** button beside a player's number to log a goal:  
![Score](./images/score_2.png)  

Or click **+1** to add a goal without logging the player:  
![Score](./images/score_1.png)



### Game Clock
When active, the clock button changes:   
![Game Clock](./images/game_clock.png)  

+ Under 1 minute: shows only seconds
+ Under 10 seconds: shows tenths
+ At 0: loud buzzer sounds
  
![Game Clock](./images/game_clock_decimal.png)


#### Editing the Game Clock
Double-click the clock to edit.  
![Edit Game Clock](./images/game_clock_edit.png)  
Formats:
+ mm:ss
+ mm:ss.t
+ ss  
+ ss.t

Max value: 999:59.9

### Shot Clock
![Shot Clock](./images/shot_clock.png)

+ Syncs with game clock
+ Under 10 seconds: shows tenths
+ At 0: buzzer plays
+ If remaining game time < shot clock: shot clock mirrors game clock

#### Editing the Shot Clock
Double-click the shot clock to set a new value.

### Time Outs
Timeouts are shown under T.O.L.
+ Click -1 to trigger a timeout
+ Shot clock is replaced by timeout clock
  
![Time Outs settings](./images/main_time_outs.png)

+ Press *Esc* to cancel timeout

### Fouls

Fouls are tracked per player:  
![Penalty and foul](./images/penalty_and_foul.png)

+ Click **+** to add a foul and penalty
+ Click **X** to remove

### Cap Exchange
Swap two players’ cap numbers:

![Cap Exchange](./images/cap_exchange_1.png)  
1. Enter the two cap numbers:
![Cap Exchange](./images/cap_exchange_2.png)  
2. Press X to confirm swap    
![Cap Exchange](./images/cap_exchange_3.png)  

### Viewer
*(Not available in the web version)*
+ Connect via server list or IP
![Viewer](./images/viewer.png)
+ Press PageUp to switch to shot-clock-only display
![Viewer](./images/viewer2.png)

Viewers require network access to the host machine..

###  Setting Up the Web Server

![web server](./images/web_server_1.png)
![web server](./images/web_server_2.png)
![web server](./images/web_server_3.png)

#### Requirements

1. Install [NodeJS](https://nodejs.org/en/download/current).
2. Verify with:
   > node -v

#### Installation Steps
1. Download and **extract** the source code
![download code](./images/github_1.png)
2. Go to the *webServer* subfolder
3. In a command prompt, run once:
   > npm install express  
   > npm install socket.io  
   > npm install socket.io-client  
 
4.  To start the server:
    > node index.js    

Or, to use a configuration file:  
    > node index.js configuration.json  
    
**Example** *configuration.json*:
   > {  
   >   "port": 3000,  
   >   "password": "",  
   >   "html_file": "index.html"  
   > }  
   
View the page in your browser: http://localhost:3000

In the application:
Go to **Settings > Web** and enter the same address.

##### Make it public
To allow external viewers:
+ Configure your router to forward port 3000 (TCP)
+ Optional: set up a cloud server (e.g., Oracle Cloud Free Tier)
+ Use a free dynamic DNS like dynu.com

Test instance:
http://scoreboard.ddnsgeek.com:3000 *(availability may vary)*

#### Streaming with OBS
Start an OBS-compatible web server:
  > node obs.js another_configuration_file.json 
+ Default port: 3001
+ Default server: http://localhost:3001  

#### In OBS
1, Add a Browser source  
![Add a source](./images/obs3.png)  
2. Select Browser  
![Add a source](./images/obs4.png)  
3. Customize the appearance (text color, size, etc.)
![Add a source](./images/obs5.png)  
![Add a source](./images/obs7.png)  
![Add a source](./images/obs8.png)  

**Tip**: If text isn’t visible, click the **transition** button.

#### Custom OBS Config
Example another_configuration_file.json:

  > {  
  >   "server": "http://localhost:3000",  
  >   "port_obs": 3001,  
  >   "password": "",  
  >   "html_file": "obs.html"  
  > }  

See *obs_3000_3001.json* for additional config options.

