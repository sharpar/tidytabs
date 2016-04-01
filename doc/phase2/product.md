# Overview of Current Add-on Design

The browser has become the most used application in today’s world and is used to carry out most functions that were once in the domain of other apps including office programs, coding, watching videos, etc. The challenge we sought out to solve was of of having too many tabs open which creates a lot of clutter for the user and can inhibit productivity. The specific use case we address here is in the clutter of having many tabs open, often we can open the same site more than once while the ordering of our tabs slowly devolves into disarray.
After installing our addon, users will be notified when they open a tab that is a duplicate of an existing tab, they will have the option of grouping tabs from the same domain together, creating order, and will have the option of preventing multiple copies of blank tabs being opened.
Whenever the user opens a link in a new tab or a current tab, the add-on lets the link load and then checks the url of the loaded link against a list of current tabs. If the url matches that of an existing url, when the user switches to that tab, the add-on notifies the user that they opened a duplicate tab. This notification gives the user the option to close the duplicate tab and switches you to the existing tab.


# Summary of Completed Features

* Notifies user of duplicate tabs with system notification
* Pause/unpause add-on via add-on menu
* Prevents a new tab from being opened if there is already an existing new tab
* Grouping the tabs that have the same domain
* User can whitelist domains that they do not want to be handled by the add-on


# Summary of What Still Needs to Be Done

  * User UI for add-on functions such as whitelisting
  * Move duplicate tabs notification from using system notifications to a customizable panel notification
  * User options for the add-on to disable and enable specific features such as the duplicate new-tab blocking


# Technical Highlights and Design Challenges

  * Dealing with redirect links: we realized a problem in our design regarding what would happen if a user clicks a redirect link that would result in a duplicate tab. Because of this, using a “on click” event for duplicate site would not work as we cannot predict the url end page user will end up on. Two options were presented, a window in the corner that would list all duplicate tabs, or a per tab notification that would show on focus of the duplicate tab notifying user that site is already in another tab. Second option was chosen with input from Ajit as it seemed to be less intrusive and confusing for end user.
  * One of the major design decisions we made was at what point should the add-on check for duplication and how. We decided that in order to deal with the problem mentioned above, we would check for duplicate urls after the link has finished loading.
  * We considered how to handle cases of when the user may want to open a duplicate tab. We came up with a few different options; one option was to allow the user to pause and unpause the add-on when necessary and another option was to allow the user to whitelist certain domains. We decided both were good options to include.
  * Used panels for notifications. We realized that it was very difficult to debug panels as they do not show up on any logs. Had to understand how to use the Events API to communicate between addon and panel.
  * One technical challenge was to figure out how to allow users to save preferences such as whitelisted domains and settings. We decided to implement this by using simple-prefs and simple-storage for persistent storage.

# Process Breakdown

  * Brainstormed base idea
  * Figured out which technologies were required to create the addon. Getting a consistent environment on different OSes for installation and setup of Node.js, npm and jpm to start development for everyone.
  * Created a listed of MVP features
  * Discussed user cases and blocked out the flow of the application
  * Worked on development of features. Each person picked a feature they wanted to work on. If they had difficulties, we used slack and meeting to discuss possible solution. If they were blocked by some other feature, would help person working on that feature or use dummy functions.

# Reflection on Team’s Process

Our team stayed on track with regular in person meetings that served as productive work sessions. During these sessions we discussed any bugs and problems in a collaborative effort to solve them. We also used these meetings to run through use cases of the application and discussed areas that needed improvement. This process worked well as we overcame our more challenging problems through such collaboration. Some challenges we found in our team’s process included finding meeting times that fit the schedules of all team members.

# Artifacts:
Meeting minutes: [Document](https://docs.google.com/document/d/1qdqR5fDPVQLizGw1BXOhPbPG7bAdXN6S30kn1PExbQk/)
Sample of how it will look/work (March 7, 2016
![Sample of how it will look/work (March 7, 2016)](https://github.com/csc302-2016-spring/Group12/blob/master/doc/phase2/designartifact030716.jpg "Design artifact, March 7, 2016")
