<p align="center">
  <img width="200" height="200" src="/src/Images/Logo3.png" alt="# SpeechBuddy">
</p>

## Introduction 

SpeechBuddy aims to be your go to tool for analyzing your thoughts. Long gone are the days where you have to go from Google text to speech to Grammarly and then to a Speech Context analyzer. With SpeechBuddy, you can accomplish all of that in one simple, intuitive and powerful user interface. The primary goal of SpeechBuddy is deliver a user experience that is clean and easy to use for anyone whether if its their first time or their 100th time. 

### Aim of this Document

This document will discuss SpeechBuddy and how it was engineered by the SpeechBuddy team. We will talk about the our user stories, functional requirements, and why we decide on certain design choices. In summary, this document talks about why SpeechBuddy is the way that it is. 

### Overview of SpeechBuddy

SpeechBuddy aims to be the go to tool for text analysis. It combines the features of Grammarly, Plagrirism analyzers, and text context analyzers into one place. In addition to those features, SpeechBuddy delivers a unique feature of comparing two texts for plagrirism. If you are a professor, SpeechBuddy allows you to upload many student texts and analyze all of them for unusual similarities. If unusual similarities occuries between two texts, you can do a deeper analyze on those two texts to see which sentences SpeechBuddy deemed to be the most similar. 

### Operational Settings 

### Related Systems and their Pros & Cons

While there are related systems, no systems is quite like ours with the combination of its features. There are a lot of services out there that does some of what SpeechBuddy does, but the unique feature of SpeechBuddy is that it brings it all into one simple interface. We will discuss some systems out there that is also in the business of text analysis. 

#### 1. Grammarly 
  * Grammarly is a great tool for analysis whether or not there are grammatical mistakes in your text. It is a feature that is accessible through SpeechBuddy if you enable the Grammarly chrome plugin. 

    * **Pros of Grammarly** - 
The pros of grammarly is that it is an incredibly powerful tool for analyzing whether or not your text is grammatically correct. It is the best tool available for AI grammar correction

    * **Cons of Grammarly** - 
Other than that though, Grammarly doesn't do much else. It does one thing well and not much else.

#### 2. EasyBib
  * One of EasyBib's tools is plagiarism detection. This feature primarily compares the user's text with online sources to make sure the user is properly citing all of the works they may have used.

    * **Pros of EasyBib** - 
The pros of EasyBib is the fact that it compares the user's text with a wide array of online sources which can pinpoint specific websites and papers which are being plagiarized from. 

    * **Cons of EasyBib** - 
The cons of EasyBib is that the tool is mainly targeted for students attempting to avoid plagiarism dectection and is incapable of detecting peer to peer plagiarism. 

## User Stories
**Bryan Kwong**
  * **Recording:** 
As a speaker user, I want to speak into an application and have the application provide feedback to me about my speech, so that I can improve as a public speaker. 

  * **Single Text:**
As a student user, I want to receive feedback on my grammar and word diversity, so that I can improve my speech skills. 
	
  * **Toxicity:**
As a social media user, I want to see the potential sentiment and toxicity my post may have, so that I can contribute positively on social media.

**Steven Gandham**
  * **2 Text comparison:**
As a student, I want to compare similar speeches to mine to make sure I’m not plagiarizing and staying on topic, so that I can responsibly be inspired.

  * **Identify most similar sentence:**
As an educator, I want to be alerted to specific sentences and phrases that have potential for plagiarism, so that I can quickly pinpoint academic dishonesty in my classroom.

  * **Cosine:**
As an educator, I want a numerical score of how similar certain sentences and papers are to each other, so that I can quantify the severity of my students’ plagiarism.

**Daniel Tisdale**
  * **MultiText upload:**
As an educator, I want the option to upload multiple papers of my students’ simultaneously when getting feedback, so that I can quickly go through my students’ papers. 

  * **Multitext comp:**
As an educator, I want to verify my classroom is not plagiarizing their speeches by copying quotes or phrases from other speeches without citation, so that I can ensure original work from students in my class. 

  * **2 Text comp in multitext:**
As an educator, I want to identify specific papers that are similar to analyze further, so that I can rapidly identify cheaters in my classroom.

## Functional Requirements 
**Bryan Kwong**
  * **Recording:**
The system shall provide a record button which will transcribe the user’s speech into a text field.

  * **Single Text:**
The system shall analyze given text by presenting the top 10 words in a frequency list.

  * **Sentiment:**
The system shall provide a numerical estimate of a speech’s sentiment in the range of [-1,1].
	
**Steven Gandham**
  * **Text box:**
The system shall provide a text box and an “Analyze” button for the user to input and submit their speech for text analysis.

  * **2 Text comparison:**
The system shall provide an additional text field to submit another speech and compare the two for plagiarism. 

  * **Cosine:**
The system shall compare similar phrasing between two transcripts and display the most similar sentences in descending order of cosine distance. 

**Daniel Tisdale**
  * **MultiText upload:**
The system shall provide an upload field for multiple text transcripts files in a portion of the page. 

  * **Multitext comp:**
The system shall compare multiple texts and display the most similar texts along with their cosine distance and Jero-Winkler score in descending order. 

  * **2 Text comp in multitext:**
The system shall provide a button for the user to further analyze two similar texts and view the most similar sentences based on cosine distance. 

## Use Cases 
 
### Overview Diagram

![Overview.jpg](/src/Images/Overview.jpg)
