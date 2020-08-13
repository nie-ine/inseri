# 1. Add Data
This big block will be dedicated to the multiple ways the data in various formats and coming from various sources can be incorporated in INSERI.
Adding simple texts and images has already been discussed in "0. Introduction".
Below we shall discuss the case when the data exists already in some publicly available databank/webpage.

## 1.1. Addressing existing webpages in INSERI
### 1.1.1. Without a template

The steps, taking Europeana as example, have been explained by Jan Stoffregen in the video:

[https://www.youtube.com/embed/9An1cGPrv9Q](https://www.youtube.com/embed/9An1cGPrv9Q)

<p><img src="https://github.com/nie-ine/inseri/blob/2020-04/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Add%20Data/1video1.png" alt="Guhyaṣoḍha, starting page" width="900"></p>

One of the great aspects of INSERI is the "economical" approach towards the data that exists already somewhere as a publicly available resource. Instead of downloading the things and republishing them somewhere else (which also might be  a copyright problem), Inseri proposes an option to call only needed parts of data (for example, images and their respective descriptions) by using the existing internal linkage of a webpage via JSON. Let us learn how to do it.

As our first example we shall take E-codices, the most important swiss online collection of the manuscripts. [https://www.e-codices.unifr.ch/en](https://www.e-codices.unifr.ch/en)
Suppose we would like to work on a manuscript that has been photographed and uploaded already, but has not been transcribed page by page, and our aim would be 
1. to get images of the manuscript
2. get metadata of the whole text (description)
3. get page identifiers

Below is a short description of the chosen manuscript:
<p><img src="https://github.com/nie-ine/inseri/blob/2020-04/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Add%20Data/1Aa.png" alt="Guhyaṣoḍha, starting page" width="900"></p>

What we need is the URL of the JSON data:

<p><img src="https://github.com/nie-ine/inseri/blob/2020-04/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Add%20Data/1Ab.png" alt="Guhyaṣoḍha, URL" width="600"></p>

Having copied that URL, we open a new page in INSERI, as explained in "0. Introduction".
Before calling any application, we click on the "wheel" and go to "Data Management":

<p><img src="https://github.com/nie-ine/inseri/blob/2020-04/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Add%20Data/1Ac.png" alt="Data Management" width="300"></p>

We create a new Query, and call it "My query to E-codices". In the frame that opens, as below,

<p><img src="https://github.com/nie-ine/inseri/blob/2020-04/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Add%20Data/1Ad.png" alt="New Query frame" width="700"></p>

in the field "Server URL" we paste the URL copied from E-codices.
Save and try query. Below the frame, the data tree of the selected manuscript in E-codices will appear.

<p><img src="https://github.com/nie-ine/inseri/blob/2020-04/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Add%20Data/1Ae.png" alt="New Query frame" width="500"></p>

We have just created a link between the e-codices data and the page that we are creating. We can close the frame and call now the applications. We do not want to reproduce the whole dataset of e-codices, but only the images and the ids of the pages, plus a brief description of the manuscript itself. We thus need to link the application "window" and the material in the json tree structure it will display.
For that, we open a "Plain text viewer" and "Simple image application".
Let us start with the images.

Click again on "Data Management" as above, you will see the names of the called application in the query frame. Under "SimpleImageApp" click on the "map" button. The same data tree that we saw when we first tried the query opens.
The most tricky thing is now to find what exactly we need to be displayed.
The human way to access it is to first click on "show tree with data", and then follow the same steps in "Show abstract tree structure" which contains the linkage buttons.
<p><img src="https://github.com/nie-ine/inseri/blob/2020-04/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Add%20Data/1Af.png" alt="Show data options" width="400"></p>

The steps are mapped above in the following way automatically:
<p><img src="https://github.com/nie-ine/inseri/blob/2020-04/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Add%20Data/1Ag.png" alt="Mapping" width="500"></p>

Save, close and reload the page to see if the "SimpleImageApp" displays what is really needed. Repeat the steps if it does not display the correct data.

Result: 
<p><img src="https://github.com/nie-ine/inseri/blob/2020-04/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Add%20Data/1Ah.png" alt="Images from E-codices displayed in Inseri" width="400"></p>

Note also the navigation button "< 1 >". That is, by a single link we can access all images of a chose manuscript, without any copy-paste (well, except URL).

We shall now do the same with the textual data, here is the description of the whole manuscript.
<p><img src="https://github.com/nie-ine/inseri/blob/2020-04/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Add%20Data/1Ai.png" alt="Linking text" width="400"></p>

The resulting view in "PlainTextViewer":

<p><img src="https://github.com/nie-ine/inseri/blob/2020-04/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Add%20Data/1Aj.png" alt="Linked text in Plain Text viewer" width="500"></p>

Now to get the maximum from Inseri capacities, we shall open another "PlainTextViewer", and make it display the folio id of each "page" of the manuscript.
The map is as follows:

<p><img src="https://github.com/nie-ine/inseri/blob/2020-04/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Add%20Data/1Ak.png" alt="Linked text in Plain Text viewer" width="500"></p>

The final result is below. One can navigate from one folio to another both from the manuscript images and the folio id because these have already been correctly linked in the E-codices, and Inseri is able to address that structure! I.e. if you navigate to the folio 4, both the image, and the field displaying the page number, will display the information related to the page 4. We have reproduced the primary data we might need for the project in no time from within Inseri.

<p><img src="https://github.com/nie-ine/inseri/blob/2020-04/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Add%20Data/1Al.png" alt="Linked text in Plain Text viewer" width="700"></p>

Besides navigating from one page to the next, one can use the "extended search option". One should click on the page number of the resource, and the list of all available pages opens:

<p><img src="https://github.com/nie-ine/inseri/blob/2020-04/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Add%20Data/1Am.png" alt="Linked text in Plain Text viewer" width="400"></p>

If one clicks on the "Extended search", the overview of the whole document opens which includes the pages' miniatures, so that one can easily go to any desired page:

<p><img src="https://github.com/nie-ine/inseri/blob/2020-04/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Add%20Data/1An.png" alt="Linked text in Plain Text viewer" width="700"></p>

### 1.1.2. With a template
The process above has been simplified and automatised, and all what the user needs to address and online resource from within Inseri, is just to change the URL, while the complicated "mapping" has been simplified to the most commonly used fields, as above (picture of a page, page id, commentary, etc.) The details are demonstrated in the video created by Jan Stoffregen here:

[https://www.youtube.com/watch?v=TuUyhrwGbKQ&feature=youtu.be](https://www.youtube.com/watch?v=TuUyhrwGbKQ&feature=youtu.be)

<p><img src="https://github.com/nie-ine/inseri/blob/2020-04/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Add%20Data/1video2.png" alt="Guhyaṣoḍha, starting page" width="900"></p>

As of 11.08.2020, the new way of working with templates has been implemented.
It is described below. The user has an option to duplicate and to use as a template any published page, that has been explicitely published as a template.

<p><img src="https://github.com/nie-ine/inseri/blob/2020-08/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Add%20Data/Dup0.png" alt="Template publishing" width="400"></p>

For this, first of all, let us create a new "project" at the Dashboard. Once it is open, click on the name of the project, the option of adding the pages will open. 

<p><img src="https://github.com/nie-ine/inseri/blob/2020-08/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Add%20Data/Dup1.png" alt="Adding pages to the project button" width="400"></p>

As of 11.08.2020, there are two available templates:
<p><img src="https://github.com/nie-ine/inseri/blob/2020-08/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Add%20Data/Dup2.png" alt="Template list" width="900"></p>

Let us chose the one with e-codices:
<p><img src="https://github.com/nie-ine/inseri/blob/2020-08/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Add%20Data/Dup3.png" alt="E-codices template" width="900"></p>

Suppose that we want for our project use the same source, i.e. e-codices, but a different book. We should, all like it was explained above, open e-codices in the browser and copy the IIIF link.

<p><img src="https://github.com/nie-ine/inseri/blob/2020-08/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Add%20Data/Dup4.png" alt="The target book from e-codices" width="900"></p>

Let us paste the link directly into the template:
<p><img src="https://github.com/nie-ine/inseri/blob/2020-08/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Add%20Data/Dup3a.png" alt="E-codices template, link replacement" width="900"></p>

Result: the page refreshes, and we can now access the desired book from within Inseri:
<p><img src="https://github.com/nie-ine/inseri/blob/2020-08/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Add%20Data/Dup5.png" alt="E-codices template, resulting page" width="900"></p>

The steps and the commentary options have been explained by Jan Clemens Stoffregen in the video here:

[https://www.youtube.com/watch?v=2SY3357fIZM](https://www.youtube.com/watch?v=2SY3357fIZM)
<p><img src="https://github.com/nie-ine/inseri/blob/2020-08/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Add%20Data/Dup44.png" alt="VideoImage" width="900"></p>

For those who are not that lucky, and had to scan the project data by themselves, the following options shall be further addressed:

## 1.2. Adding images and data from desktop to Inseri

### 1.2.1. Uploading images and addressing them

In order to upload images to Inseri, the user should first navigate to a desired page, and then open an application called "My Files" in the applications list.

<p><img src="https://github.com/nie-ine/inseri/blob/2020-05/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Add%20Data/B1.png" alt="My Files" width="500"></p>

By clicking on the sign of file in the opening window, the user can create a new file, for example, "pics".

<p><img src="https://github.com/nie-ine/inseri/blob/2020-05/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Add%20Data/B2.png" alt="My Files" width="500"></p>

Having clicked on the newly created file, the user should now click on the dots, and the file options will open. We shall describe here only the first one, allowing to upload the images (upmost option). The names of the images should not have any spaces of special signs, but they can be in any language. The names of uploaded images will appear in the created file, as below.

<p><img src="https://github.com/nie-ine/inseri/blob/2020-05/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Add%20Data/B3.png" alt="My Files" width="500"></p>

In order to address the image, the user should right-click on the name of the chose image, it will open the list of applications. The user should click on "Simple Image" and further on "Image URL". 

<p><img src="https://github.com/nie-ine/inseri/blob/2020-05/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Add%20Data/B4.png" alt="My Files" width="500"></p>

The link between the app and the image is saved automatically, and the image is displayed on the screen.

<p><img src="https://github.com/nie-ine/inseri/blob/2020-05/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Add%20Data/B5.png" alt="My Files" width="800"></p>


## 1.3. Addressing protected or partially available resources from Inseri

Here we shall take DDD project data (Drawings of Gods, University of Lausanne) in Knora as example. 
Project description on the old webpage can be found here:
[https://ddd.unil.ch/](https://ddd.unil.ch/)

The project data has been imported into Knora, and below you can see a link to one of the images:
[https://kv.unil.ch/resource/http:%2F%2Frdfh.ch%2F0105%2F-0XOy-sFSbeojbIsTwmVPw?version=20180702T153543856Z](https://kv.unil.ch/resource/http:%2F%2Frdfh.ch%2F0105%2F-0XOy-sFSbeojbIsTwmVPw?version=20180702T153543856Z)

Knora displays the data that has been made publicly available by the DDD project. The data that is not in public domain can be reached only with admin level of access. We shall thus try to resolve the real problem here, namely, the absence of the possibility to make an easy to use webpage of the project imported into Knora from within Knora. We shall do it from Inseri.

First of all, all like above in 1.1.1. example, we shall create a new set of pages and a new query.
It is very difficult to find the proper URL to be posted into the query. The easy way involves searching for a non-existent entry in the project data in the link above, which gives an error message.

<p><img src="https://github.com/nie-ine/inseri/blob/2020-04/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Add%20Data/1Knora0.png" alt="Knora Search Error" width="600"></p>

We shall use a part of the first URL, and just replace the search with the "searchextended".
Then we shall post a ready URL into our query. Having tried the query, we can see that 25 images with data are available.

<p><img src="https://github.com/nie-ine/inseri/blob/2020-04/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Add%20Data/1Knora1.png" alt="Knora Search Error" width="600"></p>

Now, we can close it all and open the applications that we shall use for our example. We shall need one "Image Viewer" to be able to display the images, and 3 "Plain text viewers" in order to display image code, and its dimensions in pixels (x, y).
The data mapping is a puzzle, it is particularly difficult to find which link would display the image.

The path is as follows:
<p><img src="https://github.com/nie-ine/inseri/blob/2020-04/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Add%20Data/1Knora2.png" alt="Linking Images" width="600"></p>

The text data linkages are more evident. Here is the example of "label", i.e. image code:

<p><img src="https://github.com/nie-ine/inseri/blob/2020-04/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Add%20Data/1Knora4.png" alt="Linking Images" width="300"></p>

And here is the X-dimension in pixels:
<p><img src="https://github.com/nie-ine/inseri/blob/2020-04/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Add%20Data/1Knora2.png" alt="Linking Text Data" width="500"></p>

Having saved and reloaded the page we obtain a simplified webpage, in which the user can see the image, and zoom into it, and find out its code and the dimensions:

<p><img src="https://github.com/nie-ine/inseri/blob/2020-04/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Add%20Data/1Knora5.png" alt="Resulting Page" width="700"></p>

As in the 1.1.1. example, the images and their data maintain their original structure and linkages, and thus when one navigates in any of the windows via < > signs, the data fits the corresponding image. If one clicks on the number of the resource, i.e. page, it will open the extended search options, here, for example, we can see the preview of the whole selection of images:

<p><img src="https://github.com/nie-ine/inseri/blob/2020-04/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Add%20Data/1Knora6.png" alt="Preview of all pages" width="700"></p>

## 1.4. Commenting on the data 

Inseri provides a crucial function of a structured commentary to virtually any part of data that is opened in an application. This means that the user can address a third party data via IIIF, for example, a book from e-codices, and to comment on it page by page, thus immediately selecting and structuring the data for one's own research project, without the need to retype even the page number of the original.

In order to make a comment, the user should first get data on the page by any of the methods described above (1.1-1.3). By clicking on the Inseri sign, in the "Add, Edit & Manage Data" group of applicaion, one find "Comment App."

<p><img src="https://github.com/nie-ine/inseri/blob/2020-08/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Add%20Data/Com0.png" alt="Add Commentary in Apps" width="400"></p>

It is clear that the commentary option works the best when it is just one book/manuscript/ressource that is presented on a given page. If there is more than one, the user might need to order the applications on the page by moving them with arrows via "Move app on the page", which is to be found in the options in the top left corner.

<p><img src="https://github.com/nie-ine/inseri/blob/2020-08/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Add%20Data/Com5.png" alt="Move App" width="400"></p>

The arrows will move the selected App window more up or more down.

<p><img src="https://github.com/nie-ine/inseri/blob/2020-08/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Add%20Data/Com6.png" alt="Move App Arrows" width="400"></p>

Once one clicks on "Add Commentary", a text field opens, where the user can easily add data.

<p><img src="https://github.com/nie-ine/inseri/blob/2020-08/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Add%20Data/Com1.png" alt="Typing Commentary" width="900"></p>

There are some small tipps: in order to add a field, click on "new commentary", especially if there are some commentaries already, as the field would display the text of the most recent commentary, while in order to save what you have typed, click on "add commentary".

As of 11.08.2020, the user can search for the commentaries. For that it is necessary to go to the Dashboard and select commentaries:

<p><img src="https://github.com/nie-ine/inseri/blob/2020-08/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Add%20Data/Com2.png" alt="Finding Commentaries" width="400"></p>

When the user clicks on the created commentaries in the list, he lands on the very page (of the IIIF addressed book, for example), for which the commentary was created.

In order to edit or to delete the commentary, one should click on the avatar (here a dog), and these two options will appear.

<p><img src="https://github.com/nie-ine/inseri/blob/2020-08/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Add%20Data/Com3.png" alt="Editing and deleting Commentaries" width="400"></p>

Clicking on Inseri button saves changes.
