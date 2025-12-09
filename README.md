Ershad 
Ershad is a full-stack web application designed to help students submit project ideas and connect with supervisors based on expertise. Supervisors can review requests, view project details, and accept or reject student proposals.

The system streamlines communication, supervision requests, and project tracking in a clean and user-friendly interface.

Done by :
Rana Alsaggaf - 2209314
Shahad Aljedaani - 2105032
⸻

Features

Student Features
	•	Register & login.
	•	Upload a project idea with:
	•	Title
	•	Description
	•	Field / Major
	•	Optional file attachment
	•	Automatically sends requests to supervisors matching the selected field.
	•	View list of supervisors
	•	Track supervisor responses (pending, accepted, rejected).
	•	Manage projects:
	•	View details
	•	Edit
	•	Delete (deletes file + removes project from supervisors)

Supervisor Features
	•	Register & login.
	•	Dashboard with:
	•	Student requests
	•	Ability to accept / reject requests
	•	View full project details:
	•	Student information
	•	Description
	•	File attachment
	•	Contact student via email directly from the system.

⸻

System Architecture

The project is built using:

Frontend (React.js)
	•	React Router (Navigation)
	•	Axios for API communication
	•	React Icons for UI elements
	•	CSS modules for styling
	•	Local storage for session persistence

Backend (PHP – MAMP)
	•	REST-like API (custom PHP endpoints)
	•	MySQL Database
	•	Proper authentication using sessions
	•	File uploading with secure storage
	•	Relational tables:
	•	users
	•	projects
	•	supervisor_requests
