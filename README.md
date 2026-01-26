# 🚀 Modern Developer Portfolio

A sleek, high-performance portfolio website built with **React**, **TypeScript**, and **Tailwind CSS**, featuring a dynamic backend integration with **Supabase**.

> **"Built to impress, engineered to scale."**

---

## ✨ Key Features

-   **🎨 Dynamic "Particle" Background**: A custom-built, interactive particle system that reacts to mouse movement but remains performance-optimized.
-   **🌗 Dark/Light Mode**: Fully integrated theme switching with persistence (localStorage) and smooth transitions.
-   **📊 Real-time Visitor Counter**: "CRT-style" glowing counter in the sidebar, synced with Supabase.
-   **🏆 Verification System**: Dedicated "Achievements" page where users can view proofs/certificates for Hackathons and Awards via a sleek Modal.
-   **📱 Fully Responsive**: Mobile-first design that adapts seamlessly from phones to ultra-wide monitors.
-   **⚡ High Performance**: Built on Vite for instant HMR and optimized production builds.

---

## 🛠️ Tech Stack

### **Frontend**
-   **Framework**: [React 18](https://react.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Routing**: [React Router DOM](https://reactrouter.com/)

### **Backend / Data**
-   **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
-   **Storage**: Supabase Storage (for proof images)

---

## 📂 Project Structure

```bash
src/
├── components/       # Reusable UI components
│   ├── Achievements.tsx  # Grid of honors/certs
│   ├── DetailModal.tsx   # Universal modal for reviewing details/proofs
│   ├── Sidebar.tsx       # Main navigation & profile status
│   └── ...
├── layouts/          # Page layouts (DashboardLayout)
├── lib/              # Utilities & Supabase client ({ supabase })
├── pages/            # Page Views
│   ├── Home.tsx          # Hero section
│   ├── About.tsx         # Bio, Education, Experience
│   ├── Projects.tsx      # Portfolio grid
│   ├── Achievements.tsx  # Hall of Fame
│   └── Contact.tsx       # Contact form
├── App.tsx           # Main Router configuration
└── main.tsx          # Entry point
```

---

## 🗄️ Database Schema (Supabase)

To replicate the functionality, set up the following tables in your Supabase project:

### 1. `profile_settings`
*Stores dynamic sidebar status.*
-   `id` (int8, PK)
-   `status_text` (text) - e.g., "Open to Work"
-   `learning_text` (text) - e.g., "Learning: GenAI Agents"

### 2. `site_stats`
*Visitor counter logic.*
-   `id` (int8, PK)
-   `visitor_count` (int8) - The counter value.

### 3. `education`
-   `id` (int8, PK)
-   `degree` (text)
-   `institution` (text)
-   `period` (text)
-   `score` (text)
-   `details` (text)
-   `detailed_description` (text)
-   `proof_url` (text) - URL to certificate image.

### 4. `experience`
-   `id` (int8, PK)
-   `role` (text)
-   `company` (text)
-   `period` (text)
-   `type` (text)
-   `description` (text)
-   `detailed_description` (text)
-   `skills_used` (text[]) - Array of strings.
-   `proof_url` (text)

### 5. `projects`
-   `id` (int8, PK)
-   `title` (text)
-   `description` (text)
-   `detailed_description` (text)
-   `tech_stack` (text[])
-   `github_url` (text)
-   `live_url` (text)
-   `image_url` (text)
-   `featured` (bool)

### 6. `achievements`
-   `id` (int8, PK)
-   `title` (text)
-   `issuer` (text) - e.g., "Meta", "Google".
-   `date` (text)
-   `category` (text) - 'Hackathon', 'Certification', or 'Award'.
-   `description` (text)
-   `image_url` (text) - The "Proof" image url.

### 7. `tech_skills`
-   `id` (int8, PK)
-   `name` (text)
-   `category` (text)
-   `icon_name` (text) - Matches Lucide/SimpleIcons names if mapped.

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Create a `.env.local` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run Development Server
```bash
npm run dev
```

The app will launch at `http://localhost:5173`.

---

## 🎨 Customization Guide

-   **Colors**: Edit `tailwind.config.js` to change the `primary`, `background`, and `card` brand colors.
-   **Sidebar**: Modify `src/components/Sidebar.tsx` to update the static links or avatar logic.
-   **Icons**: We use `lucide-react`. Explore their [icon library](https://lucide.dev/icons) for more options.

---
*Created with ❤️ by Antigravity*
