import { motion, useScroll, useTransform } from 'motion/react';
import { Github, Linkedin, Mail, Video, ExternalLink, Code2, MonitorPlay, Layers, Wrench, Gamepad2, ChevronRight, Briefcase, GraduationCap, Sun, Moon, Home, User, Folder } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0, duration: 0.8 } },
};

export default function App() {
  return (
    <div className="min-h-screen bg-bg relative selection:bg-accent/20">
      <ThemeToggle />
      <SideNav />
      {/* Subtle background ambient lights */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[0%] left-[10%] w-[50%] h-[50%] rounded-full bg-[#22577A]/[0.2] blur-[140px]" 
        />
        <motion.div 
          animate={{ x: [0, -30, 0], y: [0, 50, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[0%] right-[10%] w-[40%] h-[40%] rounded-full bg-[#38A3A5]/[0.15] blur-[120px]" 
        />
        
        {/* Animated Unity Background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-10 light:opacity-20 transition-opacity duration-500 max-w-full max-h-[100dvh] overflow-hidden">
          <div className="bounce-x absolute top-0 w-24 h-full">
            <div className="bounce-y absolute left-0 w-24 h-24 flex items-center justify-center">
              <img 
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg" 
                alt="" 
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain contrast-0" 
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>

      <main className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 md:px-12 pb-32">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}

function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (document.documentElement.classList.contains('light')) {
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-3 sm:top-8 sm:right-5 md:right-8 xl:right-12 z-[100] w-12 h-12 rounded-full glass-panel focus:outline-none hover:bg-glass-border/80 transition-all duration-300 flex items-center justify-center text-ink-muted hover:text-accent group shadow-lg"
      title="Toggle Theme"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" strokeWidth={1.5} />
      ) : (
        <Moon className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-500" strokeWidth={1.5} />
      )}
    </button>
  );
}

function SideNav() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: '-40% 0px -40% 0px' });

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const links = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Projects', icon: Folder },
    { id: 'skills', label: 'Skills', icon: Code2 },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-[100] flex flex-row items-center justify-center gap-4 px-4 h-12 glass-panel !rounded-full shadow-lg">
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = activeSection === link.id;
        return (
          <button
            key={link.id}
            onClick={() => scrollTo(link.id)}
            className={`group flex items-center justify-center w-9 h-9 rounded-full focus:outline-none transition-all duration-300 relative ${isActive ? 'bg-accent/10 border border-accent/20' : 'hover:bg-glass-border/30'}`}
            aria-label={`Scroll to ${link.label}`}
          >
            {/* Tooltip */}
            <span className={`absolute bottom-12 px-2 py-1 rounded bg-glass-panel border border-glass-border text-[10px] sm:text-xs font-mono uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none text-ink-primary`}>
              {link.label}
            </span>
            <Icon 
              className={`w-4 h-4 transition-all duration-300 ${isActive ? 'text-accent scale-110' : 'text-ink-primary/40 group-hover:text-ink-primary'}`} 
            />
          </button>
        );
      })}
    </nav>
  );
}

function HeroSection() {
  const { scrollY } = useScroll();
  const scrollOpacity = useTransform(scrollY, [0, 150], [1, 0]);

  return (
    <motion.section 
      id="home"
      initial="hidden"
      animate="show"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.15 } }
      }}
      className="min-h-[90vh] flex flex-col justify-center pt-24 pb-12"
    >
      <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="flex items-center gap-4 mb-6">
        <div className="h-[1px] w-8 bg-accent" />
        <span className="text-accent font-mono text-xs tracking-wider uppercase">Portfolio</span>
      </motion.div>
      
      <motion.h1 
        variants={FADE_UP_ANIMATION_VARIANTS} 
        className="text-5xl sm:text-7xl md:text-8xl font-semibold tracking-tight text-ink-primary mb-6"
      >
        Khun Myat<br className="sm:hidden"/> Hpone
      </motion.h1>
      
      <motion.h2 
        variants={FADE_UP_ANIMATION_VARIANTS} 
        className="text-xl sm:text-2xl md:text-3xl text-ink-muted font-light mb-4 max-w-2xl"
      >
        Gameplay Programmer
      </motion.h2>
      
      <motion.p 
        variants={FADE_UP_ANIMATION_VARIANTS} 
        className="text-lg text-ink-muted/80 max-w-xl mb-12"
      >
        Transforming Ideas into Immersive Realities.
      </motion.p>
      
      <motion.div 
        variants={FADE_UP_ANIMATION_VARIANTS} 
        className="flex flex-wrap items-center gap-4 sm:gap-6"
      >
        <motion.a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center gap-2 px-6 py-2 rounded-full bg-accent text-bg font-medium shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all duration-300"
        >
          <ExternalLink className="w-4 h-4" />
          Resume
        </motion.a>
        <SocialLink href="mailto:khunmyathpone@gmail.com" icon={<Mail />} label="Email" />
        <SocialLink href="https://github.com/mk242b" icon={<Github />} label="mk242b" />
        <SocialLink href="https://www.linkedin.com/in/khunmyathpone" icon={<Linkedin />} label="LinkedIn" />
        <SocialLink href="https://youtube.com/@dev_with_grey" icon={<Video />} label="@dev_with_grey" />
      </motion.div>

      <motion.div 
        style={{ opacity: scrollOpacity }}
        className="mt-16 sm:mt-24 w-full"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="flex flex-col items-center justify-center gap-4"
        >
          <span className="text-xs font-mono text-ink-muted/50 uppercase tracking-widest">Scroll to explore</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-12 bg-gradient-to-b from-accent/50 to-transparent"
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <motion.a 
      href={href} 
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="group flex items-center gap-2 px-4 py-2 rounded-full border border-glass-border bg-glass-bg hover:bg-glass-border hover:border-accent/40 shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-colors duration-300 backdrop-blur-xl"
    >
      <span className="text-ink-muted group-hover:text-accent transition-colors w-4 h-4 flex items-center justify-center *:w-full *:h-full">
        {icon}
      </span>
      <span className="text-sm font-medium text-ink-muted group-hover:text-ink-primary transition-colors">
        {label}
      </span>
    </motion.a>
  );
}

function AboutSection() {
  return (
    <motion.section 
      id="about"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.2 } }
      }}
      className="py-24 border-t border-glass-border/50"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="md:col-span-5 relative group flex justify-center">
           {/* Profile Image */}
           <div className="relative z-10 w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.3)] transition-all duration-500 group-hover:scale-105 border border-glass-border group-hover:border-accent/40 group-hover:shadow-[0_0_40px_rgba(87,204,153,0.2)]">
             <img 
               src="/assets/profile.jpg" 
               alt="Khun Myat Hpone" 
               className="w-full h-full object-cover"
               referrerPolicy="no-referrer"
             />
             
             {/* Fallback Icon */}
             <div className="absolute inset-0 flex items-center justify-center -z-10 bg-glass-bg">
               <Gamepad2 className="w-12 h-12 text-accent/20" strokeWidth={1} />
             </div>
           </div>
           
           <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 bg-accent/10 blur-[80px] w-full h-1/2 rounded-full z-0 group-hover:bg-accent/20 transition-colors duration-500" />
        </motion.div>
        
        <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="md:col-span-7">
          <h3 className="text-sm font-mono text-accent mb-6 uppercase tracking-widest">About Me</h3>
          <h2 className="text-3xl sm:text-4xl font-medium text-ink-primary leading-tight mb-8">
            Engineering the unseen systems that make digital worlds breathe.
          </h2>
          <p className="text-lg text-ink-muted leading-relaxed font-light mb-8">
            Passionate and results-driven Gameplay Programmer specializing in Unity (C#) and Python. I have built and shipped several indie games and game jam projects, specializing in physics-driven gameplay, custom character controllers, and system architecture. I bridge the gap between creative vision and technical execution.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 pt-6 border-t border-glass-border/30">
            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-2 text-xs font-mono text-ink-muted/80 uppercase tracking-wider">
                <Briefcase className="w-3.5 h-3.5 text-accent" />
                Currently
              </span>
              <span className="text-sm text-ink-primary font-medium tracking-wide">Gameplay Programmer @ Naga+ Interactive</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-2 text-xs font-mono text-ink-muted/80 uppercase tracking-wider">
                <GraduationCap className="w-3.5 h-3.5 text-accent" />
                Education
              </span>
              <span className="text-sm text-ink-primary font-medium tracking-wide">University of Technology (Yatanarpon Cyber City)</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

const PROJECTS = [
  {
    title: "Silent Reverie",
    year: "2024",
    roles: ["Gameplay Programmer", "Level Designer"],
    description: "An immersive atmospheric side-scroller platformer set in a dystopian future. Inspired by cinematic platformers.",
    bullets: [
      "Engineered a custom physics-based character controller for fluid platforming.",
      "Developed a modular dialogue and cinematic trigger system.",
      "Optimized 2D lighting and particle systems for target 60FPS on low-end hardware."
    ],
    tags: ["Unity3D", "C#", "Mechanics", "Level Design"],
    image: "/assets/silent-reverie.gif",
    linkTitle: "View on itch.io",
    linkUrl: "https://itch.io"
  },
  {
    title: "Nobody Knows What Happened",
    year: "2023",
    roles: ["Gameplay Programmer", "Level Design"],
    description: "A first-person explorer game set in a unique 1980s environment.",
    bullets: [
      "Implemented a raycast-based interaction system for inspecting environmental narrative clues.",
      "Created spatial audio managers syncing footsteps to different floor materials.",
      "Designed and sequenced 5 distinct narrative-driven levels."
    ],
    tags: ["Unity3D", "C#", "Sound-Design", "Mechanics"],
    image: "/assets/nobody-knows.gif",
    linkTitle: "GitHub Repo",
    linkUrl: "https://github.com/mk242b"
  },
  {
    title: "Terrashell",
    year: "In Development",
    roles: ["Gameplay Programmer", "Level Designer"],
    description: "A cozy farming simulation focusing on time management and top-down strategy mechanics.",
    bullets: [
      "Building a robust grid-based inventory and crop-lifecycle state machine.",
      "Architected save/load system using scriptable objects and JSON serialization.",
      "Designing A* pathfinding for autonomous NPC helpers."
    ],
    tags: ["Farming Sim", "Time Management", "Top-Down Strategy", "Unity3D"],
    image: "/assets/terrashell.gif",
    linkTitle: "Devlog on YouTube",
    linkUrl: "https://youtube.com/@dev_with_grey"
  },
  {
    title: "Diving Deeper",
    year: "2023.2",
    roles: ["Gameplay Programmer"],
    description: "A Puzzle Adventure Game created for Brackeys Game Jam 2023.2, focusing on mechanical puzzle design.",
    bullets: [
      "Developed an underwater physics simulation with custom buoyancy and drag mechanics.",
      "Implemented dynamic puzzle states that persist across non-linear level navigation.",
      "Top 15% overall in Brackeys Game Jam 2023.2."
    ],
    tags: ["Unity3D", "Game Mechanics", "Puzzle Design", "Game Jam"],
    image: "/assets/diving-deeper.gif",
    linkTitle: "Play on itch.io",
    linkUrl: "https://itch.io"
  },
  {
    title: "Chaos 2 Run",
    year: "2021.2",
    roles: ["Gameplay Programmer"],
    description: "A top-down 2.5D puzzle game built for Brackeys Game Jam 2021.2.",
    bullets: [
      "Built a deterministic enemy AI system capable of coordinated group attacks.",
      "Created a robust combo-based combat state machine.",
      "Delivered a complete vertical slice in a 7-day development window."
    ],
    tags: ["Unity3D", "Game Jam", "Game Mechanics"],
    image: "/assets/chaos-2-run.gif",
    linkTitle: "Play on itch.io",
    linkUrl: "https://itch.io"
  }
];

function ProjectsSection() {
  return (
    <motion.section 
      id="projects"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.1 } }
      }}
      className="py-24 border-t border-glass-border/50"
    >
      <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="mb-16">
        <h3 className="text-sm font-mono text-accent mb-4 uppercase tracking-widest">Selected Works</h3>
        <h2 className="text-3xl sm:text-4xl font-medium text-ink-primary">Featured Projects</h2>
      </motion.div>

      <div className="flex flex-col gap-12">
        {PROJECTS.map((project, idx) => (
          <ProjectRow key={idx} index={idx} project={project} />
        ))}
      </div>
    </motion.section>
  );
}

function ProjectRow({ project, index }: { project: typeof PROJECTS[0], index: number, key?: string | number }) {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div 
      variants={FADE_UP_ANIMATION_VARIANTS}
      whileHover={{ y: -6, scale: 1.01 }}
      className={`group flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center p-6 sm:p-8 glass-panel hover:bg-glass-border/40 hover:border-glass-border/80 transition-colors duration-300`}
    >
      <div className="w-full md:w-5/12 aspect-video rounded-xl bg-ink-muted/5 border border-glass-border overflow-hidden relative flex items-center justify-center">
        {project.image ? (
          <img src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        ) : (
          <MonitorPlay className="w-12 h-12 text-ink-muted/30 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
        )}
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <span className="text-xs font-mono text-white/50">{index + 1 < 10 ? `0${index+1}` : index + 1}</span>
           <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur flex items-center justify-center border border-white/10">
              <ChevronRight className="w-4 h-4 text-white" />
           </div>
        </div>
      </div>
      
      <div className="w-full md:w-7/12 flex flex-col justify-center">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-sm font-mono text-ink-muted/80 mr-2">{project.year}</span>
          {project.roles.map((role, i) => (
            <span key={i} className="text-xs font-medium text-accent/80 bg-accent/10 px-2.5 py-1 rounded-sm border border-accent/20">
              {role}
            </span>
          ))}
        </div>
        
        <h4 className="text-2xl font-semibold text-ink-primary mb-3 group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h4>
        
        <p className="text-ink-muted text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        <ul className="mb-6 space-y-1.5 list-none">
          {project.bullets.map((bullet, i) => (
            <li key={i} className="text-sm text-ink-muted/90 flex items-start leading-snug">
              <span className="text-accent text-xs mr-2 mt-1 px-1">▹</span>
              {bullet}
            </li>
          ))}
        </ul>
        
        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-auto mb-6">
          {project.tags.map((tag, i) => (
            <div key={i} className="flex items-center gap-1.5 text-xs text-ink-muted/80 font-mono">
              <span className="w-1 h-1 rounded-full bg-ink-muted/40" />
              {tag}
            </div>
          ))}
        </div>

        {project.linkUrl && (
          <a
            href={project.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center w-fit gap-2 px-4 py-2 text-sm font-medium rounded-full bg-glass-bg border border-glass-border text-ink-primary hover:text-accent hover:border-accent/40 shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-colors duration-300"
          >
            {project.linkTitle}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </motion.div>
  );
}


function SkillsSection() {
  const SKILLS = [
    {
      category: "Languages",
      icon: <Code2 />,
      items: [
        { name: "C#", level: "Advanced" },
        { name: "Python", level: "Proficient" },
        { name: "C / C++", level: "Familiar" }
      ]
    },
    {
      category: "Engines & Frameworks",
      icon: <Layers />,
      items: [
        { name: "Unity 3D", level: "Advanced" },
        { name: "Unity 2D", level: "Proficient" },
        { name: "React", level: "Familiar" }
      ]
    },
    {
      category: "Tools & Workflow",
      icon: <Wrench />,
      items: [
        { name: "Git / GitHub", level: "Proficient" },
        { name: "Visual Studio", level: "Advanced" },
        { name: "Blender", level: "Familiar" }
      ]
    },
    {
      category: "Specializations",
      icon: <Gamepad2 />,
      items: [
        { name: "Gameplay Systems", level: "Advanced" },
        { name: "Physics & Animation", level: "Proficient" },
        { name: "UI Architecture", level: "Proficient" }
      ]
    }
  ];

  return (
    <motion.section 
      id="skills"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.1 } }
      }}
      className="py-24 border-t border-glass-border/50"
    >
      <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="mb-16">
        <h3 className="text-sm font-mono text-accent mb-4 uppercase tracking-widest">Expertise</h3>
        <h2 className="text-3xl sm:text-4xl font-medium text-ink-primary">Core Skills & Stack</h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SKILLS.map((skillGroup, idx) => (
          <motion.div 
            key={idx}
            variants={FADE_UP_ANIMATION_VARIANTS}
            whileHover={{ y: -5 }}
            className="group flex flex-col p-6 rounded-2xl glass-panel relative overflow-hidden transition-colors duration-300"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="w-10 h-10 mb-6 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent relative z-10">
              {React.cloneElement(skillGroup.icon as React.ReactElement, { className: 'w-5 h-5', strokeWidth: 1.5 })}
            </div>
            <h4 className="text-base text-ink-primary font-medium mb-4">{skillGroup.category}</h4>
            <ul className="flex flex-col gap-3">
              {skillGroup.items.map((item, i) => (
                <li key={i} className="flex flex-col">
                  <div className="flex items-center gap-2 text-sm text-ink-muted font-light group-hover:text-ink-muted/90 transition-colors">
                    <div className="w-px h-3 bg-glass-border group-hover:bg-accent/40 transition-colors" />
                    {item.name}
                  </div>
                  <span className="text-[10px] text-ink-muted/40 uppercase ml-[13px] mt-0.5 font-mono tracking-widest leading-none block">{item.level}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function ContactSection() {
  return (
    <motion.section 
      id="contact"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.1 } }
      }}
      className="py-24 border-t border-glass-border/50 text-center flex flex-col items-center justify-center"
    >
      <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="mb-8">
        <h3 className="text-sm font-mono text-accent mb-4 uppercase tracking-widest">What's Next?</h3>
        <h2 className="text-3xl sm:text-5xl font-medium text-ink-primary mb-6">Get In Touch</h2>
        <p className="text-ink-muted leading-relaxed font-light max-w-xl mx-auto">
          Currently open to new opportunities. Whether you have a question, a project proposal, or just want to say hi, I'll try my best to get back to you!
        </p>
      </motion.div>

      <motion.a 
        variants={FADE_UP_ANIMATION_VARIANTS}
        href="mailto:khunmyathpone@gmail.com"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-2 px-8 py-4 mt-4 rounded-full bg-glass-bg border border-accent/50 text-accent font-medium shadow-[0_4px_24px_rgba(0,240,255,0.15)] hover:bg-accent hover:text-bg hover:shadow-[0_4px_32px_rgba(0,240,255,0.3)] transition-all duration-300"
      >
        <Mail className="w-5 h-5" />
        Say Hello
      </motion.a>
    </motion.section>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-glass-border/50 mt-12 py-8">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs text-ink-muted/60 font-mono tracking-wider">
          &copy; 2026 KHUN MYAT HPONE.
        </p>
        <p className="text-xs text-ink-muted/40 flex items-center gap-2">
          BUILT FOR PERFORMANCE <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        </p>
      </div>
    </footer>
  );
}
