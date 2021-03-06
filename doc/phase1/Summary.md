#Summary

##Goal
Our team is set out to make a plug in that would be useful to any users of Firefox who use the browser for research while working on a project. We went through a number of ideas that all revolved around the central theme of making browsing easier for this demographic. What we settled on aims to solve an issue faced by multiple members of our team and is really focused on this one parrticular use case that we found most people experienced. 

When working on a project or doing research on the web, it is natural for one to have many tabs open related to the work one is doing. A typical problem that occurs is that many times we end up with multiple copies of the same tab open leading to our tab bar being filled to excess with a lot of duplicate sites. 
We want to make a plugin that will help to alieviate the problem of opening too many duplicate tabs. The plugin will work as follows: when a user clicks on a link or opens a site that is already open in an existing tab, instead of creating a duplicate tab, the plugin will switch focus to the tab that is already open. Our solution is to check the URLs of open tabs for duplicate sites and we may take into account some sort of TLD filtering. 

There are special cases when a user would actually like multiple copies of a tab open and to deal with this case, we are proposing an override, most likely in the way of keyboard input or context menu command to force open a duplicate site in a new tab. 
There are other cases we need to account for as well. Some sites use a base URL but load content on demand, or may have forms that need to be filled out and some of these sites may be ones that a user typically has open all the time. We propose a whitelist of sites to always open with the default behaviour to avoid having the user always having to use context many/keyboard shortcut to create the duplicates of these sites. 

One challenge we are anticipating is that this idea in and of itself could be too simple. We have since came up with multiple ways of adding more features to the plug in, such as organizing tabs with different URLs of the same TLD together, and closing duplicate tabs on demand. These additional features also revolve around making browsing easier and tidier when used to research for a project.

We will divide the work into front-end and back-end, where the team members who are more familiar with UI/UX design will be assigned to front-end tasks, and the members more famiiar with software development will be assigned to back-end tasks.