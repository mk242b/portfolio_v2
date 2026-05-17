import { motion, useScroll, useTransform } from 'motion/react';
import { Github, Linkedin, Mail, Video, ExternalLink, Code2, MonitorPlay, Layers, Wrench, Gamepad2, ChevronRight, Briefcase, GraduationCap, Sun, Moon } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0, duration: 0.8 } },
};

export default function App() {
  return (
    <div className="min-h-screen bg-bg relative selection:bg-accent/20">
      <ThemeToggle />
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
      className="fixed top-6 right-6 sm:top-8 sm:right-8 z-50 p-3 rounded-full glass-panel focus:outline-none hover:bg-glass-border/80 transition-all duration-300 flex items-center justify-center text-ink-muted hover:text-accent group"
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

function HeroSection() {
  const { scrollY } = useScroll();
  const scrollOpacity = useTransform(scrollY, [0, 150], [1, 0]);

  return (
    <motion.section 
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
        <SocialLink href="mailto:khunmyathpone@gmail.com" icon={<Mail />} label="Email" />
        <SocialLink href="#" icon={<Github />} label="mk242b" />
        <SocialLink href="#" icon={<Linkedin />} label="LinkedIn" />
        <SocialLink href="#" icon={<Video />} label="@dev_with_grey" />
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
               src="https://i.ibb.co/9k3Mq7n3/kmp-mugshot.jpg" 
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
            Passionate and results-driven Gameplay Programmer specializing in Unity (C#) and Python, with a proven track record of developing and publishing polished indie games and interactive experiences. I bridge the gap between creative vision and technical execution.
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
    roles: ["Gameplay Programmer", "Level Designer"],
    description: "An immersive atmospheric side-scroller platformer set in a dystopian future. Inspired by cinematic platformers.",
    tags: ["Unity3D", "C#", "Mechanics", "Level Design"],
    image: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXhmaHVueXNmbXR5eXhxa2xucjU3d3c4cjV1eW55cXZweDl1ZHNuZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/c7mso33ESjbSfI3RDC/giphy.gif"
  },
  {
    title: "Nobody Knows What Happened",
    roles: ["Gameplay Programmer", "Level Design"],
    description: "A first-person explorer game set in a unique 1980s environment.",
    tags: ["Unity3D", "C#", "Sound-Design", "Mechanics"],
    image: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbG11cTVranV5b3N5bGE1d3MwZXI2bDRycDU5bDgzbWJ0c2R5bWk1ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/nrOOXmVMZjrFz3wp2a/giphy.gif"
  },
  {
    title: "Terrashell",
    roles: ["Gameplay Programmer", "Level Designer"],
    description: "A cozy farming simulation focusing on time management and top-down strategy mechanics. (In Development)",
    tags: ["Farming Sim", "Time Management", "Top-Down Strategy", "Unity3D"],
    image: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWMydjd4Ymt2d2p3cG5zNDU3anYzMGt6NGpkNzMxdWxwaHVnem5kMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/r24qMSLM4gLZ6xqM0f/giphy.gif"
  },
  {
    title: "Diving Deeper",
    roles: ["Gameplay Programmer"],
    description: "A Puzzle Adventure Game created for Brackeys Game Jam 2023.2, focusing on mechanical puzzle design.",
    tags: ["Unity3D", "Game Mechanics", "Puzzle Design", "Game Jam"],
    image: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmUzamtibzh6dmJvamNhdzZ4dW4yOXJtcm11cjEwOGt4dmpjeHZnYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/G0Mz3b670R4TxZn2II/giphy.gif"
  },
  {
    title: "Chaos 2 Run",
    roles: ["Gameplay Programmer"],
    description: "A top-down 2.5D puzzle game built for Brackeys Game Jam 2021.2.",
    tags: ["Unity3D", "Game Jam", "Game Mechanics"],
    image: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExamMzZmU2Z3EyMzQzemYxNDBrOWVrZ3QxMzY0dzczM3Jyd2RwbGphcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fEKjlUGkIqxrIfWYqu/giphy.gif"
  }
];

function ProjectsSection() {
  return (
    <motion.section 
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
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
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
        <div className="flex flex-wrap gap-2 mb-4">
          {project.roles.map((role, i) => (
            <span key={i} className="text-xs font-medium text-accent/80 bg-accent/10 px-2.5 py-1 rounded-sm border border-accent/20">
              {role}
            </span>
          ))}
        </div>
        
        <h4 className="text-2xl font-semibold text-ink-primary mb-3 group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h4>
        
        <p className="text-ink-muted font-light leading-relaxed mb-6">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-auto">
          {project.tags.map((tag, i) => (
            <div key={i} className="flex items-center gap-1.5 text-xs text-ink-muted/80 font-mono">
              <span className="w-1 h-1 rounded-full bg-ink-muted/40" />
              {tag}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}


function SkillsSection() {
  const SKILLS = [
    {
      category: "Languages",
      icon: <Code2 />,
      items: ["C#", "Python", "Java", "C"]
    },
    {
      category: "Engines & Frameworks",
      icon: <Layers />,
      items: ["Unity 3D", "2D Ecosystem", "3D Ecosystem"]
    },
    {
      category: "Tools & Workflow",
      icon: <Wrench />,
      items: ["Visual Studio", "Git / GitHub", "Trello", "Blender", "FL Studio"]
    },
    {
      category: "Specializations",
      icon: <Gamepad2 />,
      items: ["Gameplay Mechanics", "Physics & Collision", "UI/UX Implementation", "Animation Systems"]
    }
  ];

  return (
    <motion.section 
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
            <ul className="flex flex-col gap-2.5">
              {skillGroup.items.map((item, i) => (
                <li key={i} className="text-sm text-ink-muted font-light flex items-center gap-2 group-hover:text-ink-muted/90 transition-colors">
                  <div className="w-px h-3 bg-glass-border group-hover:bg-accent/40 transition-colors" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
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
