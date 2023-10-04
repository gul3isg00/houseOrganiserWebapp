# houseOrganiserWebapp
**A React web application, and complementary express web server, that can be run on a local network and act as a way to help keep the house organised.**

*(This webapp is designed for mobile phones, and currently doesn't look great on desktops)*


One running the application can be accessed from anywhere on the local network, through ```http://your.devices.ip:5000```
## Functionality

There are currently 4 sections on the webapp, each accessible through the tabs at the top of the webpage:
- **Home**
- **Events**
- **Chores**
- **Account**
### Home
The **Home** tab displays all people who are currently registered in the house, and whether they are currently in, indicated by the circles by their names. A **green circle** means that they are currently in the house, a **red circle** means that they are out.

This can be manually changed by each user, after they are logged in, by tapping on the circle by their name.

Also on this page you can add a **note** by your name for everyone to see. You can do this by typing your note in the box underneath all the names *(max 75 characters)*, and clicking the ```Update note``` button.
