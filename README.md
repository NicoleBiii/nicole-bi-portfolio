# Portfolio Website

Personal portfolio website built with Next.js, TypeScript, Tailwind CSS, and custom animation effects.

## Demo

https://github.com/user-attachments/assets/e4a7c7d1-fe06-4a4a-bfe5-732ed72d6047

## Technologies
- **Next.js**: React framework for production-level websites
- **TypeScript**: Ensures type safety and a robust codebase
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Framer Motion**: Animation library for smooth transitions and interactive animations
- **Lottie**: Integrates animated vector graphics for engaging visual effects

## Features

- **Full-Page Scrolling**: Custom-built smooth scrolling experience with anchor navigation.
- **Dark Mode**: Toggleable dark mode theme with persistent user preference.
- **Dynamic Backgrounds**: Animated blur gradient and blob effects enhancing visual appeal.
- **Animated Elements**: Fancy text animations, breathing subtitles, and interactive icon links.
- **Project Carousel**: Interactive project showcase featuring swipe gestures, hover animations, and 3D perspective transitions.
- **Modal Project Details**: Seamless modals for detailed project views, optimized for various video dimensions and scroll interactions.

## Project Structure

```
nicole-portfolio
├── README.md
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── pages
├── postcss.config.mjs
├── public
│   ├── NicoleBi-resume.pdf
│   ├── animations
│   │   └── darkmode-toggle.json
│   ├── fonts
│   │   ├── Inter-Italic-VariableFont_opsz,wght.ttf
│   │   ├── Inter-VariableFont_opsz,wght.ttf
│   │   ├── PPNeueMontreal-Bold.otf
│   │   ├── PPNeueMontreal-Book.otf
│   │   ├── PPNeueMontreal-Italic.otf
│   │   ├── PPNeueMontreal-Medium.otf
│   │   ├── PPNeueMontreal-SemiBolditalic.otf
│   │   └── PPNeueMontreal-Thin.otf
│   ├── icons
│   │   ├── N-blue.svg
│   │   ├── N-dark.svg
│   │   ├── N.svg
│   │   ├── rest-api.png
│   │   └── vscode.svg
│   ├── images
│   │   ├── instock.png
│   │   ├── nicole.JPG
│   │   ├── simplenews.png
│   │   ├── tablemate.png
│   │   └── truenorth.png
│   └── videos
│       ├── instock.mp4
│       ├── simplenews.mp4
│       ├── tablemate.MOV
│       └── truenorth.mp4
├── s.txt
├── src
│   ├── app
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components
│   │   ├── DynamicBackground.tsx
│   │   ├── FullpageWrapper.tsx
│   │   ├── MagneticIcon.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectModal.tsx
│   │   ├── SkillIcon.tsx
│   │   ├── hooks
│   │   │   └── useModalScrollLock.ts
│   │   ├── projectData.ts
│   │   └── sections
│   │       ├── AboutSection.tsx
│   │       ├── ContactSection.tsx
│   │       ├── HomeSection.tsx
│   │       ├── ProjectsSection.tsx
│   │       └── SkillsSection.tsx
│   ├── context
│   │   └── DarkModeContext.tsx
│   └── libs
│       └── BlurGradientBg.module.js
├── tailwind.config.js
└── tsconfig.json

15 directories, 55 files
```

## Getting Started

Clone the repository:

```bash
git clone https://github.com/NicoleBiii/nicole-bi-portfolio
cd nicole-portfolio
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

The application is deployed using Netlify. Any push to the `main` branch will trigger automatic deployment.

## Author

**Nicole Bi**

- [GitHub](https://github.com/NicoleBiii)
- [LinkedIn](https://www.linkedin.com/in/nicole-bi/)
- [Portfolio](https://nicolebi.com/)

