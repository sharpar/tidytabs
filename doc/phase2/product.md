Overview of Current Add-on Design
The browser has become the most used application in today’s world and is used to carry out most functions that were once in the domain of other apps including office programs, coding, watching videos, etc. The challenge we sought out to solve was of of having too many tabs open which creates a lot of clutter for the user and can inhibit productivity. The specific use case we address here is in the clutter of having many tabs open, often we can open the same site more than once while the ordering of our tabs slowly devolves into disarray. 
After installing our addon, users will be notified when they open a tab that is a duplicate of an existing tab, they will have the option of grouping tabs from the same domain together, creating order, and will have the option of preventing multiple copies of blank tabs being opened.
Whenever the user opens a link in a new tab or a current tab, the add-on lets the link load and then checks the url of the loaded link against a list of current tabs. If the url matches that of an existing url, when the user switches to that tab, the add-on notifies the user that they opened a duplicate tab. This notification gives the user the option to close the duplicate tab and switches you to the existing tab.


Summary of Completed Features
-Notifies user of duplicate tabs with system notification
-Pause/unpause add-on via add-on menu
-Prevents a new tab from being opened if there is already an existing new tab
-Grouping the tabs that have the same domain
-User can whitelist domains that they do not want to be handled by the add-on


Summary of What Still Needs to Be Done
  *User UI for add-on functions such as whitelisting
  *Move duplicate tabs notification from using system notifications to a customizable panel notification
  *User options for the add-on to disable and enable specific features such as the duplicate new-tab blocking


Technical Highlights and Design Challenges
  *Dealing with redirect links: we realized a problem in our design regarding what would happen if a user clicks a redirect link that would result in a duplicate tab. Because of this, using a “on click” event for duplicate site would not work as we cannot predict the url end page user will end up on. Two options were presented, a window in the corner that would list all duplicate tabs, or a per tab notification that would show on focus of the duplicate tab notifying user that site is already in another tab. Second option was chosen with input from Ajit as it seemed to be less intrusive and confusing for end user.
  *One of the major design decisions we made was at what point should the add-on check for duplication and how. We decided that in order to deal with the problem mentioned above, we would check for duplicate urls after the link has finished loading.
  *We considered how to handle cases of when the user may want to open a duplicate tab. We came up with a few different options; one option was to allow the user to pause and unpause the add-on when necessary and another option was to allow the user to whitelist certain domains. We decided both were good options to include.
  *Used panels for notifications. We realized that it was very difficult to debug panels as they do not show up on any logs. Had to understand how to use the Events API to communicate between addon and panel.
  *One technical challenge was to figure out how to allow users to save preferences such as whitelisted domains and settings. We decided to implement this by using simple-prefs and simple-storage for persistent storage.

Process Breakdown
  *Brainstormed base idea
  *Figured out which technologies were required to create the addon. Getting a consistent environment on different OSes for installation and setup of Node.js, npm and jpm to start development for everyone.
  *Created a listed of MVP features
  *Discussed user cases and blocked out the flow of the application
  *Worked on development of features. Each person picked a feature they wanted to work on. If they had difficulties, we used slack and meeting to discuss possible solution. If they were blocked by some other feature, would help person working on that feature or use dummy functions.

Reflection on Team’s Process
Our team stayed on track with regular in person meetings that served as productive work sessions. During these sessions we discussed any bugs and problems in a collaborative effort to solve them. We also used these meetings to run through use cases of the application and discussed areas that needed improvement. This process worked well as we overcame our more challenging problems through such collaboration. Some challenges we found in our team’s process included finding meeting times that fit the schedules of all team members.

Complete Meeting Minutes and Development Notes:

March 7, 2016, 5PM @ BA3200

attendance: Claudia, Shaun, Ujash, Shivain, Bill
add-on sdk extension
we installed node.js, jpm, created init add-on -> pushed
named add-on “Tidy Tabs”
start/made features list (mvp, additional features)
Everyone should review NodeJS and set up their IDEs/text whatever
know how to run an add-on



March 9, 2016 5PM @ BA2270

Attendance: Ujash, Bill, Shivain, Shaun, Claudia
Make issues on github based on MVP
Features List
MVP
duplicate tab = same url?
if you open a link that is a duplicate of an existing tab…
option: add-on switches you to existing tab
option: ask user before switching
option: add-on prevents that tab from opening and shows a message telling the user that the tab was blocked 
hotkey that bypasses add-on 
additional features 
option: if you open a link that has the same top level domain of an existing tab…. 
option: add-on puts that tab next to the existing tab 
alternately: the tabs are stacked somehow; shown on mouseover
Issues with extension design:
When do we close the old tab, what if the user requires a duplicate tab.
If we close tab with same url as another already open tab, we lose history from that tab.
Function: Press enter to close duplicate tab, and switch to the other one. 
Should we deal with multiple windows? Nope, too much complexity and more UI/UX issues to deal with.



Monday March 21, 2016 5PM @ BA2283

Attendance: Shaun, Claudia, Bill, Shivain
Where we’re at: 
In meeting with TA Ajit in tutorial March 11, we realized a problem in our design regarding what would happen if a user clicks a redirect link that would result in a duplicate tab. Because of this, using a “on click” event for duplicate site would not work as we cannot predict the url end page user will end up on. 
Two options were presented, a window in the corner that would list all duplicate tabs, or a per tab notification that would show on focus of the duplicate tab notifying user that site is already in another tab.
Second option was chosen with input from Ajit as it seemed to be less intrusive and confusing for end user. 
Tab notification would be similar to built in firefox notifications for page driven events like new chat message in slack for example. Event for duplicate tab notification could be either “on activate” which would figure out duplicate when user switches to the tab, or “on ready” which would check for duplicate when page DOM is finished loading. 
Duplicate tab notification would include options:
Close old tab and stay on current tab.
Switch to old tab. Close new duplicate.
Check box option to add site to a “whitelist” which would always allow duplicates for this site and turn off notifications.
Continue (maybe?)
Plugin Options: 
There should also be a settings option in the extensions menu where users can edit the site whitelist
Automatically close empty new tabs not used 

Feature list and user scenarios that we want to address with this plugin:
Open a fresh blank tab when there is already an unused blank tab open Bill
Give user option to automatically close an unused blank tab when he opens a new one. By default option is off, user can switch it on in options menu.
(“open an existing page in current tab”) Click on a link, finishes loading and we know is already open in an existing tab
After clicking the link, a new page is loading in current tab, and it should be handled by Duplicate tab notification 
(“open an existing page in current tab”) Click on a link whose URL is the same as a url that is already open in an existing tab
After clicking on the link, the URL check  should be handled by Duplicate tab notification 
End up opening or redirected to a page in your current tab but that is already open in another existing tab
User should have the option to continue or get the Duplicate tab notification
“Open existing page in a new tab”
Handled by Duplication tab notification
“Open existing page in a new window”
Don’t think we should consider new window at this moment
Tab.Ready or Tab.Activate?
Tab.Ready will not cover if a user opens a new tab, B, in the background (ie ctrl+click) and that tab exists in a previously open tab, A, and switches to tab A, tab A will not notify of being a duplicate
If using tab.ready and a duplicate is detected, notification is sent to both tabs A & B
Will also work for blank tabs
Work for duplicate link in current tab

Tab.Activate may not cover the case when a user switches to a tab that is not done loading redirects or if a user opens a page in the current tab that is now a duplicate of some other previously open tab.

Looks like Tab.Ready will cover all cases, use Tab.ready

Possible tasks to do:
Figure out how to popup notification for plugin question: “Do you want to close this duplicate tab?” Etc..
Notification? Panel? - Claudia
Determine whether to use tab.onactivate (tab gets focus) or tab.ready (page’s DOM is fully loaded) for plugin 
How to develop settings tab, store settings options, and load them up on change or open browser
Options menu - by clicking tab button 
All Event trigger functions should not do any work but check the global settings and determine whether or not they should call the generic back end function that calls or not calls popup to close duplicate etc.. this will prevent duplicate code and make plugin more extensible. 
Are there other event triggers besides Tab.Ready that we need to trigger function for?


___________________________________________________________________________

March 23, 2016 5PM @ BA3200

Attendance:  Bill, Shaun, Claudia
Plan out the code

Started working on dialogue to display on new tab creation. Also add system notification on duplicate tab creation. 



