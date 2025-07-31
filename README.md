# Projectly - Student Innovation Collaboration Platform

A responsive React + Tailwind CSS prototype for a student innovation collaboration platform designed specifically for Indian students.

## Features

### 🚀 Project Feed Page
- **Card-based layout** similar to LinkedIn posts
- **Project previews** with 50-character descriptions
- **Phase tracking** with tags ('Ideation', 'Prototyping', 'Completed')
- **Skill badges** showing required technologies (Python, CAD, etc.)
- **Engagement metrics** with like/comment counts
- **Category filters** in left sidebar (Electronics, Mechanical, IT, etc.)

### 📋 Project Detail Page
- **Timeline view** with vertical stepper UI showing project phases
- **Interactive comments** section with:
  - Template replies (Resource Suggestion, Technical Risk, Alternative Approach)
  - Upvoting system for helpful comments
  - Real-time comment addition
- **Collaboration button** for joining projects
- **Animated phase transitions** using Framer Motion

### 👤 User Profile Page
- **Project portfolio grid** showcasing completed and ongoing work
- **Editable skill tags** with categorized skill selection
- **Karma scoring system** with achievement badges
- **Dynamic skill management** with add/remove functionality

## 🎨 Design Features

### Mobile-First Responsive Design
- Optimized for **Xiaomi Redmi devices** and similar Android phones
- Responsive breakpoints for tablet and desktop
- Touch-friendly interface elements

### Dark Mode Support
- System preference detection
- Manual toggle switch
- Persistent user preference storage
- Complete UI adaptation for dark theme

### Indian Student UX Touches
- **WhatsApp-style notification dots** with animated pings
- **Low-data mode** with skeleton loading placeholders
- **Hindi/English toggle** for multilingual support
- **Community karma system** with culturally relevant badges

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Responsive Design**: Mobile-first approach

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd projectly
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
```

## 📱 Mobile Testing

The application is optimized for:
- **Xiaomi Redmi series** (common among Indian students)
- **Screen sizes**: 360px - 414px width
- **Touch interactions**: Minimum 44px touch targets
- **Performance**: Optimized for 3G/4G networks

## 🌍 Internationalization

Basic support for:
- **English** (default)
- **Hindi** (हिंदी)

Language toggle available in the navigation bar.

## 🎯 Key User Flows

1. **Discovering Projects**: Browse feed → Filter by category → View project details
2. **Collaboration**: Find interesting project → Request collaboration → Join team
3. **Showcasing Work**: Create profile → Add projects → Showcase skills
4. **Community Engagement**: Comment on projects → Upvote helpful suggestions → Build karma

## 🔧 Development

### Project Structure
```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── ProjectFeed.tsx  # Main feed page
│   ├── ProjectDetail.tsx # Project detail view
│   ├── UserProfile.tsx  # User profile page
│   └── Navigation.tsx   # Navigation component
├── lib/
│   └── utils.ts        # Utility functions
├── App.tsx             # Main application
└── main.tsx           # Entry point
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on mobile devices
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ for Indian students by the developer community**
