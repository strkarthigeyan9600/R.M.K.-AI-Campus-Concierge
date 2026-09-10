# Smart AI Campus Concierge & Kiosk Navigation System

An enterprise-grade, kiosk-optimized, interactive AI-powered Campus Concierge System designed for Freshers, Parents, Visitors, Alumni, Faculty, and Staff.

Built with Apple / Tesla / Stripe-level aesthetics, full 2D visual campus map, indoor floor plan navigation with A* pathfinding, grounded RAG AI Knowledge Assistant, Web Speech API voice interaction (STT/TTS), QR mobile hand-off, bus & hostel management, admissions guide, analytics, and admin control panel.

---

## 🌟 Key Features

- **Interactive 2D/3D Campus & Indoor Navigation**:
  - Interactive SVG campus visual layout with building pins, animated path drawing, radar rings, and zoom/pan controls.
  - Indoor floor plan navigator (Ground Floor, 1st Floor, 2nd Floor) with room finder and turn-by-turn guidance drawer.
  - Wheelchair & Elevator accessibility toggle (skips staircases for accessibility compliance).
- **RAG AI Assistant**:
  - Natural language Q&A backed by structured campus knowledge base documents with source citation badges.
  - Context-aware responses with zero hallucinations.
  - Direct "Navigate Here" action triggers embedded inside AI chat messages.
- **Voice Interaction & Multilingual Support**:
  - Web Speech API integration for Speech-to-Text (STT) voice queries and Text-to-Speech (TTS) spoken answers.
  - Dynamic audio frequency wave visualizer.
  - Support for 10 languages (English, Hindi, Spanish, French, German, Japanese, Chinese, Marathi, Tamil, Telugu).
- **Mobile QR Code Continuation**:
  - QR Code generator allows kiosk users to transfer active walking navigation routes directly to their smartphone camera.
- **Campus Information Modules**:
  - **Home**: Live announcements, digital clock, weather widget, campus stats.
  - **Faculty Directory**: Filter by department, search cabins, view office hours, and trigger map navigation to professor cabins.
  - **Bus Shuttle Management**: Real-time arrival timers, stop schedules, driver contact details.
  - **Hostel & Dining**: Warden contacts, residential guidelines, and daily mess menus (breakfast, lunch, snacks, dinner).
  - **Admissions & Fee Calculator**: Interactive fee estimator, eligibility criteria, and required documents checklist.
  - **Campus Events**: Seminars, hackathons, placement drives, workshops.
  - **Student & Parent Guide**: Key administrative offices, principal cell, accounts, exam branch, and counseling services.
  - **Emergency SOS Alert**: Immediate hotline modal with one-touch ambulance, security dispatch, and medical center pathfinding.
- **Admin & Analytics Dashboards**:
  - **Kiosk Analytics**: Total visitors, session duration, top searched building heatmaps, language usage breakdown.
  - **Admin Control Panel**: Full CRUD management for buildings, faculty, events, and RAG knowledge articles.

---

## 🛠️ Architecture & Tech Stack

- **Frontend**: React 18, TypeScript, TailwindCSS (Glassmorphic dark mode), Framer Motion, Lucide Icons, QR Code SVG.
- **Backend API**: Node.js, Express REST API (`/api/v1/...`).
- **AI & Algorithms**: Custom TF-IDF Grounded RAG Search Engine, Dijkstra / A* Graph Pathfinding Algorithm.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server (Frontend + Backend REST API)
```bash
npm run dev
```
- Kiosk Web App: `http://localhost:3000`
- Express REST API: `http://localhost:5000/api/v1`

### 3. Run Automated Tests
```bash
npm test
```

### 4. Build Production Bundle
```bash
npm run build
```

---

## 🔒 Admin Credentials (Demo)

- **Username**: `admin`
- **Password**: `admin123`
