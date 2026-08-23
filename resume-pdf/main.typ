#import "@preview/basic-resume:0.2.9": *

// Cinematic Astral Editorial — downloadable resume. Facts only; no unverified claims.
#let name = "Priyanshu Attri"
#let location = "SRM University"
#let email = "krishkake69@gmail.com"
#let github = "github.com/krishkake69-code"
#let personal-site = "Universe Portfolio"

#show: resume.with(
  author: name,
  location: location,
  email: email,
  github: github,
  personal-site: personal-site,
  accent-color: "#5cdae0",
  font: "New Computer Modern",
  paper: "a4",
  author-position: left,
  personal-info-position: left,
)

== Profile

Student Developer and AI & Technology Enthusiast at SRM University. Interested in building thoughtful web experiences, experimenting with AI, and turning ideas into practical projects.

== Education

#edu(
  institution: "SRM University",
  location: "India",
  dates: "2nd Year",
  degree: "Student Developer / AI & Technology Enthusiast",
)
- Cumulative academic performance: 9.65 CGPA
- Semester 1: 9.82 SGPA
- Semester 2: 9.48 SGPA

== Selected Focus

#project(
  name: "AI and Generative Technology",
  role: "Active learning orbit",
  dates: "Current",
)
- Exploring AI, machine learning, APIs, and generative AI through experiments and project work.
- Building a practical foundation across programming, web development, and technology systems.

#project(
  name: "Web Experiences",
  role: "Student developer practice",
  dates: "Current",
)
- Working with React, HTML, CSS, Node.js, JavaScript, and TypeScript.
- Interested in responsive interfaces, interaction design, and turning ideas into real-world projects.

== Skills

- *Programming*: C, C++, Python, JavaScript, TypeScript
- *Web*: React, HTML, CSS, Node.js
- *AI / Technology*: AI, Machine Learning, APIs, Generative AI
- *Cybersecurity*: Cyber security practical tasks, security fundamentals
- *Tools*: Git, GitHub, VS Code, Figma

== Certifications and Training

#project(
  name: "Cyber Job Simulation",
  role: "Forage / Deloitte",
  dates: "Jun 2026",
)
- Completed practical tasks in cyber security through the Forage job simulation.

#project(
  name: "C Fundamentals",
  role: "Certificate of Completion",
  dates: "13 Jun 2026",
)
- Completed the C Fundamentals section; Certification ID: i5IUHu-c-0xW5Z9.

#project(
  name: "ENDURO Workshop",
  role: "ENDURO in collaboration with IIT Hyderabad",
  dates: "Aug–Sep 2025",
)
- Completed software training and inner personality development workshop; Certificate ID: EN251157.

== Hackathons and Achievements

#project(
  name: "Confluence 1.0",
  role: "36-hour online hackathon participation",
  dates: "28–29 Dec 2025",
)
- Participated in the Idea Submission track as part of Team Coding dakaits, organized by The Helper.

#project(
  name: "SRMIST Hackathon",
  role: "Team Byte brigade",
  dates: "31 Jul–1 Aug 2026",
)
- Participated as a member of Team Byte brigade in the SRMIST Hackathon.

#project(
  name: "Published Anthology Contributions",
  role: "Co-author / contributing author",
  dates: "2026",
)
- Co-author of “A Happy Little Somewhere,” ISBN 978-81-998233-4-1.
- Published contributing author in “Love at Minus One,” published by Inkfetish Publication.

== Portfolio Projects

#project(
  name: "AI Tutor",
  role: "Portfolio project direction",
  dates: "Dossier available on portfolio",
)
- A learning-system concept for turning complex topics into clear, adaptive learning moments.

#project(
  name: "AI Heritage Archive",
  role: "Portfolio project direction",
  dates: "Dossier available on portfolio",
)
- A cultural-interface concept connecting memory, language, place, and AI-assisted discovery.

#project(
  name: "Universe Portfolio",
  role: "Interactive web experience",
  dates: "Current",
)
- A cinematic portfolio system that presents skills, projects, academics, and contact as a navigable universe.
