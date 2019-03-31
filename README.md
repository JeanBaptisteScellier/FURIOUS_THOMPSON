# HealthHack

**Project Name:** Women first
**TEAM :** Furious_Thompson
**Tagline :** Leveraging periods related data to improve women quality of life, foster gynecologic diseases diagnosis and contribute to fight gender inequality

# Summary paragraph

While being almost perceived as a normal biological process, periods deeply impact women daily life and generate a major negative societal impact. Indeed, periods deteriorate women’s quality of life, hide serious diseases with a negative impact on fertility and foster gender inequality. We have trained algorithms based on cycle lengths variations and on previous period’s symptoms on a cleaned dataset based to anticipate periods related symptoms and identify potential patient presenting abnormal symptoms suspected of suffering of endometriosis (e.g. abnormal pain) or cancer (e.g.; periods lengthening and change in menstruation bleeding). Our algorithm should be able to reduce incidences of depression (0.16%) and dysmenorrhea (0.33%) vs 0.77% and 1.31%, respectively in the general population. It will also also facilitate a shorter diagnostic of endometriosis (6 months vs currently 7.5 years) and early diagnostic of gynecological cancer.  

# Detailed synthesis 
**1/ Definition of the problem :**
While being almost perceived as a normal biological process, periods deeply impact women daily life and generate a major negative societal impact. Indeed, periods : 

- **Deteriorate women’s quality of life**
Many symptoms affect women during periods: dysmenorrhea is the most common symptom with a prevalence of 85%, followed by psychological complaints (77%), and tiredness (71%). During their menstrual period, 38% of all women are not able to perform all their regular daily activities. Among women that skip tasks due to their symptoms, only 48.6% tell their relatives that menstrual symptoms are the reason for the transfer of tasks. Hence, one in three women quit daily activities due to menstrual symptoms (source: “The impact of menstrual symptoms on everyday life: a survey among 42,879 women” by Schoep ME, Nieboer TE, Van der Zanden M, Braat DDM, Nap AW3, March 2019).

- **Hide serious diseases with a negative impact on fertility**
Endometriosis is an example of such a serious disease hidden by periods. A condition caused by cells similar to the ones lining the womb (uterus) growing outside the womb that can result in excessively painful periods and chronic pelvic pain. Though estimated to affect 1 in 10 women (around a third of which experience severe symptoms), awareness among the public and health professionals is low; it takes an average of 7.5 years to gain a diagnosis being considered as regular period. Moreover, while endometriosis does not directly cause infertility, patients who suffer from the disease will have a significantly lower chance of getting pregnant. The American Society for Reproductive Medicine states that endometriosis can be found in up to 50 percent of infertile women and patients with endometriosis typically suffer from infertility in about 30 to 50 percent of cases.

- **Foster gender inequality**
Periods generate absenteeism in the workplace and at university for younger women, both impact being difficult to estimate. For the most extreme serious related diseases, the scientific literature evidences very important impact on the patients concerned. For instance, many women suffering of endometriosis report reduced productivity and absence, while others find themselves forced into part-time work, or unable to work at all. Often women feel unable to disclose their condition, especially due to managers of the opposite sex, due to stigma and a general low awareness of endometriosis, what it is, and what support women who have it may need to stay at work. See http://www.theworkfoundation.com/wp-content/uploads/2016/10/419_MoreThanWomensIssues.pdf. 

**2/ Our approach**

The original dataset provided by PSLOVE has been used to prepare a cleaned dataset. We have trained algorithms based on cycle lengths variations and on previous period’s symptoms on our cleaned dataset.

**A/ Predictions of symptoms 3 days after the beginning of the period:**
        - The first thing we did is to look at the distribution of frequence of utilisation of each user.
 
We can observe through this figure that most of users used the app between 3 and 25 times with a huge  pic of one time user.
Unfortunately we cannot add in our model the few time users. So we decide to keep user who used the app between 3 and 25 times.

        -Distribution of Number of Periods info by user



This distribution of Number of different periods information by user let us decide to keep only users who give us info  for 3 and 10 different periods.
We chose that range to avoid having to treat a sparse matrix for our training

         -Last distribution : Number of information by date  
This distribution shows that most of users give one info during their period. Even if we have few information,  we decided to keep users that answered more than 3 times for our model in order to have a more robust model.
 

**B/ Trying to identify Endometriosis thanks to a TSNE clusterization**

We can not identify clearly 2 clusters(disease/non disease). But thanks to that we can try to check the outliers users.


**C/ Modelisation**

We thought about different periods approaches
CNN
        Considering user’s answer as a pixel matrix with rows corresponding to the cycles and the columns corresponding to the days of answer during the cycle
        But this approach was quite difficult for us to realize during the 24h.
        
**D/ Tree based models**
        We used a simple method with Random forest to predict the symptoms 3 days after the beginning of the Period


**3/ Why does it matter (qualitative impact)**

- **Improve  women QoL**
Women first project will allow women to anticipate periods related symptoms and foster a quick recovery by early medication, personalized coachings and agenda adaptation. Our solution is expected to massively reduce periods impact on women daily life: 
**A/ Take medication at the root of the problem** to foster a quick recovery through a recommendation of access to women forum, PSLove specific medication or recommendation to visit their gynecologist
**B/ Coach women with a chatbot** allowing a personalized communication based on specific user historic 
**C/ Anticipate major symptoms / crisis situation** to adapt women agenda and avoid client meeting or friends events. 

- **Foster and accelerate diagnostic of gynecologic diseases**
Women first project will have a major impact on early gynecologic disease diagnostic identifying potential patient presenting abnormal symptoms that would be asked to visit their physician. More specifically, women first will allow to:      
**A/ Identify women suffering of endometriosis:** main symptoms include abnormal pain related to periods (top 10% women suffering the most of pain within the sample)
**B/ Identify women at risk of suffering gynecological cancer:** main symptoms include periods lengthening and change in menstruation bleeding (note that this feature isn’t included in our current model due to lack of data)  

Our daily support of women, by allowing a smother management of periods will contribute to reduce gender inequality. 

**4/ Our results and potential impact (quantitative impact)**

Our algorithm should be able to reduce incidences of depression (0.16%) and dysmenorrhea (0.33%) vs 0.77% and 1.31%, respectively in the general population. The quality-adjusted life year for women users of our solution should be of 6.84 (0.07 higher than that in general population. We have based our expected impact on an assessment of effectiveness of mobile application for periods management that was performed in Japan.(source: “Effectiveness of mobile application for menstrual management of working women in Japan: randomized controlled trial and medical economic evaluation”, J Med Econ, 2018).
It will also also facilitate a shorter diagnostic of endometriosis (6 months vs currently 7.5 years) and early diagnostic of gynecological cancer. 

**Additional resources** - List of case studies, market analysis and relevant scientific materials
- Report of the Work Foundation “More than “women’s issues” by Cicely Dudley, Jenna Kerns and Karen Steadman, June 2017 => http://www.theworkfoundation.com/wp-content/uploads/2016/10/419_MoreThanWomensIssues.pdf
- “The impact of menstrual symptoms on everyday life: a survey among 42,879 women” by Schoep ME, Nieboer TE, Van der Zanden M, Braat DDM, Nap AW3, March 2019 => https://www.ncbi.nlm.nih.gov/pubmed/30885768
- “Impact of endometriosis on quality of life and work productivity : a multicenter study across ten countries. Fertility and Sterility” by Nnoaham, K.E.,Hummelshoj, L., Webster, P., d’Hooghe, T. et al., August 2011 => https://www.ncbi.nlm.nih.gov/pubmed/21718982
