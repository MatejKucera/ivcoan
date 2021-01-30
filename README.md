# IVAO Controllers Announcer (Discord Bot)

This is a Discord Bot that announces when IVAO controller from defined FIR joins the network and when he/she disconnects.

## Disclaimer

This application is work in progress.

Please note, that I am not a professional Node JS developer (I'm PHP geek 🤓), so this code is probably quite bad. It suits it's purpose and works just fine, but please do not use it as inspiration of how to code in Node JS.

## Installation


### Requirements
 - docker
 - docker-compose

### Configuration
 - rename .env.example to .env
 - edit .env file:
    - set FIR to what you want to monitor (eg. EG for Great Britain, ED for Germany etc.)
    - set DATA_PATH to location where data files will be stored
    - set TOKEN to your Discord bot token

### Run
 - use ***docker-compose run*** to run the bot   

### Invite bot to your server:

Use link https://discord.com/oauth2/authorize?client_id=YOUR_APP_ID&scope=bot&permissions=67584

Exchange YOUR_APP_ID with your Discord Application Client ID

## License

Hey, do whatever you want with it.
