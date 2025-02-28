# Event Management Application

This is an Event Management Application where you can manage events, including creating, editing, and deleting events. The backend is split into two parts:

1. **JSON Server** – A mock backend that simulates a REST API for event data.
2. **Custom Node.js Server** – The actual application server that handles routes for updating and deleting events.

**Commands to Run**
--- First open one terminal and run **" npx json-server --watch db.json --port 2211 "**
--- second open one more terminal and run **" node server.js "**

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

Make sure you have the following installed:

- **Node.js** (https://nodejs.org/)
- **npm** (Node Package Manager) (installed with Node.js)
- **npx** (comes with npm)

### Setup

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/your-username/event-management-app.git
   cd event-management-app
