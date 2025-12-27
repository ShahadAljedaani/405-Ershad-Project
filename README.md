Ershad

Ershad is a full-stack web application designed to help students submit project ideas and connect with supervisors based on expertise. Supervisors can review requests, view project details, and accept or reject student proposals.

The system streamlines communication, supervision requests, and project tracking in a clean and user-friendly interface.

Done by:

	•	Rana Alsaggaf – 2209314
	•	Shahad Aljedaani – 2105032

⸻

Features

Student Features

	•	Register & login
	•	Upload a project idea with:
	•	Title
	•	Description
	•	Field / Major
	•	Optional file attachment
	•	Automatically sends requests to supervisors matching the selected field
	•	View list of supervisors
	•	Track supervisor responses (pending, accepted, rejected)
	•	Manage projects:
	•	View details
	•	Edit
	•	Delete (deletes file and removes project from supervisors)

Supervisor Features

	•	Register & login
	•	Dashboard with:
	•	Student requests
	•	Ability to accept / reject requests
	•	View full project details:
	•	Student information
	•	Description
	•	File attachment
	•	Contact students via email directly from the system

⸻

Screenshots & UI Overview

Welcome Page

Displays the main landing page with options to register as a student, register as a supervisor, or log in. This page is accessible only to unauthenticated users.
<img width="978" height="677" alt="Screenshot 2025-12-27 at 11 38 51 PM" src="https://github.com/user-attachments/assets/b5526987-8a0e-4334-beac-0c53d44954e8" />

Login Page

Allows users to log in by selecting their role (Student or Supervisor) and entering their email and password.
<img width="984" height="679" alt="Screenshot 2025-12-27 at 11 39 59 PM" src="https://github.com/user-attachments/assets/a19fd845-203b-4efc-b447-25f3a30eb43a" />

Student Registration

Enables students to create an account by providing personal and academic information such as name, university ID, major, and password.
<img width="967" height="678" alt="Screenshot 2025-12-27 at 11 40 27 PM" src="https://github.com/user-attachments/assets/975978b3-1337-4c93-a8cc-e034c91be371" />

Supervisor Registration

Allows supervisors to register by entering their academic details, including title, field of expertise, and login credentials.
<img width="986" height="676" alt="Screenshot 2025-12-27 at 11 40 39 PM" src="https://github.com/user-attachments/assets/5e0cc3da-8ac7-4aed-9d09-af5785daa259" />

Student Dashboard

Provides students with quick access to main actions such as uploading project ideas, viewing supervisors, and tracking requests. It also shows submitted projects with their current status.
<img width="1344" height="757" alt="Screenshot 2025-12-27 at 11 49 28 PM" src="https://github.com/user-attachments/assets/ff27038b-4b4c-4c45-9548-7b822d9edc14" />

Upload Project Idea

Allows students to submit a new project idea with a title, description, field, and optional file attachment.
<img width="1346" height="761" alt="Screenshot 2025-12-27 at 11 49 38 PM" src="https://github.com/user-attachments/assets/a819b528-065c-411e-9574-9b0f993484fb" />

Supervisors List

Displays available supervisors in card format, including their title and expertise, with an option to send supervision requests.
<img width="1348" height="753" alt="Screenshot 2025-12-27 at 11 49 47 PM" src="https://github.com/user-attachments/assets/f53ba28b-606b-44b0-af60-459623ee7c55" />

Supervisor Requests (Student View)

Shows all supervision requests sent by the student, including status (Pending, Accepted, Rejected) and submission date.
<img width="1347" height="755" alt="Screenshot 2025-12-27 at 11 49 57 PM" src="https://github.com/user-attachments/assets/c70aa0e3-9c95-495c-affa-5b80a27e5820" />

Student Profile

Displays student account information with the option to edit profile details.
<img width="1346" height="759" alt="Screenshot 2025-12-27 at 11 50 05 PM" src="https://github.com/user-attachments/assets/531f5c0f-c13b-4b81-b9d0-aed16b726b8d" />

Supervisor Dashboard

Allows supervisors to review incoming student requests, view project details, and accept or reject supervision requests.
<img width="1348" height="759" alt="Screenshot 2025-12-27 at 11 50 48 PM" src="https://github.com/user-attachments/assets/ca544e6e-3cac-440f-869e-60667b0e283b" />

Project Details Modal

Displays full project information in a popup view, including student details, project description, and contact options.
<img width="1351" height="759" alt="Screenshot 2025-12-27 at 11 50 57 PM" src="https://github.com/user-attachments/assets/92a16159-6a88-4477-8c74-24581d497116" />

GitHub Project Recommendations

This page uses the GitHub API to show real projects based on a search keyword, helping students discover relevant repositories and get project inspiration.
<img width="1348" height="760" alt="Screenshot 2025-12-28 at 12 27 20 AM" src="https://github.com/user-attachments/assets/f5aabce3-3060-405e-ae2e-a656faad8c66" />

⸻

System Architecture

Frontend (React.js)

	•	React Router (Navigation)
	•	Axios for API communication
	•	React Icons for UI elements
	•	CSS Modules for styling
	•	Local Storage for session persistence

Backend (PHP – MAMP)

	•	REST-like API (custom PHP endpoints)
	•	MySQL Database
	•	Authentication using PHP sessions
	•	Secure file uploading
	•	Relational tables:
	•	users
	•	projects
	•	supervisor_requests
