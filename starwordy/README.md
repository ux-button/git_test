# Starword
#### Video Demo:  <https://youtu.be/MDbBFNpJICM>
#### Description:
This project is designed for individuals embarking on the journey of learning a new language, offering a dynamic approach akin to the familiar concept of flip cards often employed for vocabulary memorization.

Operational within an MVC (Model-View-Controller) framework, the project leverages a Flask application and SQLite database to facilitate seamless data storage and management. The user interface is meticulously crafted around session-based interactions, ensuring each user maintains a personalized collection of groups and corresponding flip cards.

Upon accessing the web service, users are prompted to establish a unique username and password combination. This crucial information is securely stored within a table, with passwords encrypted for heightened security. In the event of a duplicate username entry, the system gracefully redirects the user to an error page, elucidating the reason for the interruption.

Initial engagement finds users devoid of any pre-existing groups, necessitating the creation of their own. Each group serves as a repository for flip cards, envisioned as the cornerstone of future language mastery. Users retain full autonomy to create and delete groups as per their evolving learning needs.

Delving deeper into the realm of groups, users curate their own assortment of flip cards, each meticulously crafted to reinforce linguistic proficiency. Upon completion of card creation, users seamlessly transition to the learning phase. Here, the application orchestrates a stimulating learning experience, presenting users with targeted words for memorization alongside four answer options. These answers, dynamically generated via an API, encompass a randomized blend of one correct response and three distractors culled from the same group. For every correct answer, the user accrues a point, celebrating their progress with a congratulatory screen. Conversely, incorrect responses are met with gentle correction, as the application reveals the accurate definition. As the learning session culminates, users are greeted with a comprehensive summary of their performance, encapsulating their journey of linguistic exploration.

Central to the project's functionality are meticulously crafted classes housed within a separate file, adeptly managing database interactions, flip card creation, and group manipulation. These classes, namely Groups and Flipcards, host an array of methods and class methods, orchestrating the seamless execution of user commands.

The database architecture is underpinned by three intricately interconnected tables: users, groups, and words. Each group is intrinsically linked to a unique user, ensuring personalized data segregation and management. Furthermore, individual words are tethered to specific groups via unique identifiers, facilitating granular control over data organization and retrieval. Crucially, the deletion of a group triggers a cascading effect, systematically purging all associated words, ensuring data integrity and coherence.

In essence, this project epitomizes a synergistic amalgamation of innovative technology and pedagogical efficacy, empowering language learners with a versatile platform for immersive vocabulary acquisition and retention. Through its robust architecture and user-centric design, this endeavor heralds a new era of personalized language learning experiences, poised to revolutionize the educational landscape.
