# 1. Add Data
This big block will be dedicated to the multiple ways the data in various formats and coming from various sources can be incorporated in INSERI.
Adding simple texts and images has already been discussed in "0. Introduction".
Below we shall discuss the case when the data exists already in some publicly available databank/webpage.

## 1.1. Addressing existing webpages in INSERI
One of the great aspects of INSERI is the "economical" approach towards the data that exists already somewhere as a publicly available ressources. Instead of downloading the things and republishing them somewhere else (which also might be  a copyright problem), Inseri proposes an option to call only those parts of data (for example, images and their respective descriptions) by using the existing internal linkage of a webpage via JSON. Let us learn how to do it.

As our first example we shall take E-codices, the most important swiss online collection of the manuscripts. [https://www.e-codices.unifr.ch/en](https://www.e-codices.unifr.ch/en)
Suppose we would like to work on a manuscript that has been photographed and uploaded already, but has not been transcribed page by page, and out aim would be 
1. to get images of the manuscript
2. get metadata of the whole text (description)
3. get page identifiers
4. transcribe some of the text in Inseri.

Below is a short description of the chosen manuscript:
<p><img src="https://github.com/nie-ine/inseri/blob/2020-04/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Introduction/1Aa.png" alt="Guhyaṣoḍha, starting page" width="900"></p>

What we need is the URL of the JSON data:

<p><img src="https://github.com/nie-ine/inseri/blob/2020-04/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Introduction/1Aa.png" alt="Guhyaṣoḍha, URL" width="600"></p>

Having copied that URL, we open a new page in INSERI, as explained in "0. Introduction".
Before calling any application, we click on the "wheel" and go to "Data Management":

<p><img src="https://github.com/nie-ine/inseri/blob/2020-04/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Introduction/1Ac.png" alt="Data Management" width="300"></p>

We create a new Query, and call it "My query to E-codices". In the frae that opens, as below,

<p><img src="https://github.com/nie-ine/inseri/blob/2020-04/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Introduction/1Ad.png" alt="New Query frame" width="700"></p>

In the field "Server URL" we paste the URL copied from E-codices.
Save and try query. Below the frame the data tree of the selected manuscript in E-codices will appear.

<p><img src="https://github.com/nie-ine/inseri/blob/2020-04/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Introduction/1Ae.png" alt="New Query frame" width="500"></p>

We have just created a link between that e-codices data and the page that we are creating. We can close the frame and call now the applications. We do not want to reproduce the whole dataset of e-codices, but only the images and the ids of the pages, plus a brief decsription of the manuscript. We thus need to link the application "window" and the material in the json tree structure it will display.
For that, we open a "Plain text viewer" and "Simple image application".
Let us start with the images.

Click again on "Data Management" as above, you will see the names of the called application in the query frame. Under "Simple Image App." click on the "map" button. The same data tree that we saw when we first tried the query opens.
The most tricky thing is now to find what exactly we need to be displayed.
The human way to access it is to first click on "show tree with data", and then follow the same steps in "Show abstract tree structure" which contains the linkage buttons.
<p><img src="https://github.com/nie-ine/inseri/blob/2020-04/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Introduction/1Af.png" alt="Show data options="400"></p>

The steps are mapped above in the following way automatically:
<p><img src="https://github.com/nie-ine/inseri/blob/2020-04/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Introduction/1Ag.png" alt="Mapping" width="400"></p>

Save, close and reaload the page to see if the "Simple Image App." displays what is really needed. Repeat the steps if it does not display the correct data.

Result: 
<p><img src="https://github.com/nie-ine/inseri/blob/2020-04/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Introduction/1Ah.png" alt="Images from E-codices displayed in Inseri" width="400"></p>

Note also the navigation button "< 1 >". That is, by a single link we can access all image of a chose manuscript, without any copy-paste (well, except URL).

We shall now do the same with the textual data, here is the description of the whole manuscript.
<p><img src="https://github.com/nie-ine/inseri/blob/2020-04/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Introduction/1Ai.png" alt="Linking text" width="400"></p>

The resulting view in "Plain text viewer":

<p><img src="https://github.com/nie-ine/inseri/blob/2020-04/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Introduction/1Aj.png" alt="Linked text in Plain Text viewer" width="500"></p>

Now to get the maximum from INSERI capacities, we shall open another "Plain text viewer", and make it display the folio id of each "page" of the manuscript.
The map is as follows:

<p><img src="https://github.com/nie-ine/inseri/blob/2020-04/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Introduction/1Ak.png" alt="Linked text in Plain Text viewer" width="500"></p>

The final result is below. One can navigate from one folio to another both from the manuscript images and the folio id because these have already been correctly linked in e-codices, and Inseri is able to address that structure!
For those who are not that lucky, and had to scan the project data by themselves, the following options shall be further addressed:

## 1.2. Adding images and data from desktop to Inseri

## 1.3. Addressing protected ressources from Inseri
