# houseOrganiserWebapp
**A React web application, and complementary express web server, that can be run on a local network and act as a way to help keep the house organised.**

*(This webapp is designed for mobile phones, and currently doesn't look great on desktops)*

**I have the webapp (and express server) running off a Rasperry Pi 3, with an ARM6 single core processor, and 1GB of RAM**

## Functionality
There are currently 4 sections on the webapp, each accessible through the tabs at the top of the webpage:
- **Home**
- **Events**
- **Chores**
- **Account**
### Home

![home.jpeg](HomeTab)

The **Home** tab displays all people who are currently registered in the house, and whether they are currently in, indicated by the circles by their names. A **green circle** means that they are currently in the house, a **red circle** means that they are out.

This can be manually changed by each user, after they are logged in, by tapping on the circle by their name.

Also on this page you can add a **note** by your name for everyone to see. You can do this by typing your note in the box underneath all the names *(max 75 characters)*, and clicking the ```Update note``` button.

### Events
*This section is currently a W.I.P*
### Chores
*This section is currently a W.I.P*
### Account

![account.jpeg](AccountTab)

The **Account** tab is where all of the account related functionality comes into play.

When not logged in it will display ```You are not currently logged in``` on the page. To login, enter your name into the text box and press the button that says ```Login```.

If you are already registered into the house, it will log you in as that user, else, it will ask if you would like to add that user to the house.

Your user is **saved to local storage** so unless you are using a browser with no local storage support, or on private mode, you shouldn't have to log in multiple times.
If you want to log out, simply click the ```Logout``` button that displays once logged in.

Also if you want to delete your user, once logged in, you can click the ```Delete user``` button.

## Setup
Once running, the application can be accessed from anywhere on the local network, through ```http://your.hosts.ip:5000```
