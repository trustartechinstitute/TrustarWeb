import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { 
  Globe, 
  Users, 
  Rocket, 
  Star, 
  MessageCircle, 
  ChevronRight, 
  CheckCircle2,
  PlayCircle,
  Award,
  Zap,
  Building2,
  Mail,
  Phone,
  Instagram,
  Menu,
  Heart,
  Lightbulb,
  Code,
  Target,
  MonitorPlay,
  Trophy,
  ArrowRight,
  Laptop,
  Compass
} from "lucide-react";
import { api } from "@/src/services/api";
import { buildLandingLeadMessage } from "@/src/utils/whatsapp";
import { setPageMeta } from "@/src/utils/seo";

export default function LandingPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    country: "",
    childAge: "",
    interestedTrack: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setPageMeta(
      "World-Class Tech Education for All Ages",
      "Live online tech education for children and young adults worldwide. Coding, AI, digital creativity. Small cohorts. Real projects. Expert instructors."
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.createLead({
      ...form,
      status: 'new',
      source: 'Landing Page',
      createdAt: new Date().toISOString(),
    });
    
    // Open WhatsApp
    const waLink = buildLandingLeadMessage(form);
    window.open(waLink, '_blank');
    
    setSubmitted(true);
  };

  const navLinks = [
    { name: "Programmes", href: "#tracks" },
    { name: "Curriculum", href: "#curriculum" },
    { name: "Passion Test", href: "#passion-test" },
    { name: "Contact", href: "#leads" },
  ];

  return (
    <div className="bg-surface overflow-x-hidden">
      {/* 1. Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-surface-3">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-full bg-baby flex items-center justify-center font-display font-bold text-navy text-xl shadow-lg shadow-baby/20">T</div>
            <span className="font-display font-bold text-2xl tracking-tighter text-navy uppercase">TRUSTAR</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 font-bold text-navy/70">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="hover:text-baby transition-colors text-sm uppercase tracking-widest">{link.name}</a>
            ))}
            <div className="w-[1px] h-6 bg-surface-3"></div>
            <Button variant="ghost" onClick={() => navigate("/login")} className="hover:text-baby font-bold uppercase tracking-widest text-xs">Login</Button>
            <Button onClick={() => document.getElementById("leads")?.scrollIntoView({ behavior: 'smooth' })} className="bg-baby text-navy hover:bg-baby-dark font-bold rounded-full px-8 h-12 shadow-lg shadow-baby/20">
              Enquire
            </Button>
          </div>
          
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger render={
              <Button variant="ghost" size="icon" className="md:hidden text-navy outline-none" />
            }>
              <Menu className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent className="bg-navy border-none p-8 flex flex-col">
              <div className="flex items-center gap-2 mb-12">
                <div className="w-10 h-10 rounded-full bg-baby flex items-center justify-center font-display font-bold text-navy text-xl">T</div>
                <span className="font-display font-bold text-2xl tracking-tighter text-white uppercase">TRUSTAR</span>
              </div>
              <div className="flex flex-col gap-6">
                {navLinks.map(link => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white/60 hover:text-white text-2xl font-display font-bold transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="h-[1px] bg-white/10 my-4"></div>
                <Button variant="outline" onClick={() => { setIsMobileMenuOpen(false); navigate("/login"); }} className="border-white/20 text-white hover:bg-white/5 font-bold h-14 rounded-2xl text-lg">
                  Student Login
                </Button>
                <Button onClick={() => { setIsMobileMenuOpen(false); document.getElementById("leads")?.scrollIntoView({ behavior: 'smooth' }); }} className="bg-baby text-navy hover:bg-baby-dark font-bold h-14 rounded-2xl text-lg">
                  Enquire Now
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      <main className="min-w-0 w-full overflow-x-hidden">
        {/* 2. Hero */}
        <section className="pt-32 lg:pt-52 pb-20 px-4 sm:px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-baby/10 text-baby font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] rounded-full mb-8">
                <Star className="w-3 h-3 fill-current" />
                TRANSFORMING PEOPLE, NOT JUST INFORMING THEM
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-display font-bold text-navy leading-[0.95] tracking-tighter mb-10">
                EDUCATION <br /> THAT <span className="text-baby">BUILDS</span> <br /> INNOVATORS.
              </h1>
              <p className="text-lg sm:text-xl text-text-secondary font-medium max-w-lg mx-auto lg:mx-0 mb-12 leading-relaxed">
                Live online classes from anywhere. Small cohorts of up to 10 students. Real output every single week. We follow a capability pipeline, not just age.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center lg:justify-start">
                <Button 
                  size="lg" 
                  onClick={() => document.getElementById("leads")?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-navy text-white hover:bg-navy2 font-bold rounded-full px-12 h-16 text-lg shadow-xl shadow-navy/20"
                >
                  Apply Now <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
                <div className="flex flex-col items-center sm:items-start text-xs font-bold text-text-secondary uppercase tracking-widest mt-2 sm:mt-0">
                  <span>Take the Passion Test</span>
                  <span className="text-baby">Only $1 (or equivalent)</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/5] bg-surface-2 rounded-[4rem] overflow-hidden shadow-2xl shadow-navy/10 relative group border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop" 
                  alt="Student at Trustar" 
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-navy/10 group-hover:bg-transparent transition-colors"></div>
              </div>
              
              <div className="absolute -bottom-6 sm:-bottom-10 -left-2 sm:-left-6 bg-baby p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl shadow-baby/30 max-w-[240px] sm:max-w-[280px] border-4 border-white z-10 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-white/20 rounded-xl"><Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-navy" /></div>
                  <p className="font-display font-bold text-navy text-base sm:text-lg">Educate & Build</p>
                </div>
                <p className="text-[10px] text-navy font-bold leading-relaxed opacity-80 uppercase tracking-wider">Every week produces a tangible output. No week ends without a project.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 3. Ticker strip */}
        <div className="bg-navy py-8 overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee">
            {[1, 2, 3].map((set) => (
              <div key={set} className="flex gap-20 items-center px-10">
                {["EDUCATE", "BUILD", "APPLY", "REFINE", "CAPABILITY PIPELINES", "PASSION TESTED"].map((text) => (
                  <span key={text} className="text-white/20 font-display font-bold text-5xl uppercase tracking-tighter flex items-center gap-6">
                    <span className="w-3 h-3 bg-baby rounded-full shadow-[0_0_15px_rgba(126,184,247,0.5)]"></span>
                    {text}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* 4. Curriculum detailed */}
        <section id="tracks" className="py-24 sm:py-32 bg-white px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-end mb-16 sm:mb-24">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-baby/10 text-baby font-bold text-xs uppercase tracking-widest rounded-full mb-6">
                  Not just codes, but creations
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-navy tracking-tighter leading-none">FOUR LEARNING <br /> <span className="text-baby">TRACKS</span>.</h2>
              </div>
              <p className="text-lg sm:text-xl text-text-secondary font-medium leading-relaxed max-w-lg mb-4">
                Our tracks are capability pipelines. We move students from digital curiosity to professional-grade problem solving.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  id: "t0",
                  name: "Foundations", 
                  age: "Ages 4–7", 
                  color: "baby", 
                  icon: Heart,
                  desc: "From Curious to Confident. Early logic, pattern recognition, and device confidence through ScratchJr." 
                },
                { 
                  id: "t1",
                  name: "Explorers", 
                  age: "Ages 8–12", 
                  color: "teal", 
                  icon: Rocket,
                  desc: "From User to Programmer. Full Scratch mastery, variables, conditionals, and systematic debugging." 
                },
                { 
                  id: "t2",
                  name: "Builders", 
                  age: "Ages 12–17", 
                  color: "navy", 
                  icon: Code,
                  desc: "From Player to Builder. HTML, CSS, JavaScript, and Firebase. Building a deployed public portfolio." 
                },
                { 
                  id: "t3",
                  name: "Engineers", 
                  age: "Ages 15+", 
                  color: "gold", 
                  icon: Award,
                  desc: "From Learner to Solver. Core engineering, SQL, Git, and full-stack systems. Job and freelance ready." 
                },
              ].map((track) => (
                <div key={track.id} className="flex flex-col h-full bg-surface-2 border border-surface-3 p-10 rounded-[3rem] hover:bg-navy hover:text-white transition-all duration-500 group">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-navy/5 bg-white shadow-lg`}>
                    <track.icon className={`w-7 h-7 ${track.color === 'baby' ? 'text-baby' : track.color === 'teal' ? 'text-teal' : track.color === 'gold' ? 'text-gold' : 'text-navy'}`} />
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-2 transition-colors group-hover:text-white">{track.name}</h3>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted group-hover:text-white/50">{track.age}</span>
                    <span className="w-1 h-1 bg-baby rounded-full"></span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-baby">Active Track</span>
                  </div>
                  <p className="text-sm font-medium leading-relaxed mb-10 text-text-secondary group-hover:text-white/60">{track.desc}</p>
                  
                  <Button 
                    variant="ghost" 
                    className="mt-auto p-0 h-auto font-bold text-navy group-hover:text-baby flex items-center gap-2"
                    onClick={() => document.getElementById("leads")?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    View Curriculum <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Short Courses */}
        <section id="curriculum" className="py-24 sm:py-32 bg-surface-2 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 sm:mb-20">
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-navy mb-4 tracking-tighter uppercase">Targeted Short Courses</h2>
              <p className="text-sm text-text-secondary font-medium max-w-xl mx-auto uppercase tracking-widest font-bold opacity-60">Practical. Immediate. Skill-Based.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Digital Foundations", dur: "2 Weeks", outcome: "Computer basics & internet safety." },
                { title: "AI & Prompt Engineering", dur: "3 Weeks", outcome: "Practical AI tool use & automation." },
                { title: "Excel & Data Basics", dur: "2 Weeks", outcome: "Spreadsheet confidence & charts." },
                { title: "Intro to Web Design", dur: "3 Weeks", outcome: "Build your first personal webpage." },
              ].map(course => (
                <div key={course.title} className="bg-white border border-surface-3 p-8 rounded-3xl hover:border-baby transition-all">
                  <div className="flex justify-between items-start mb-6">
                     <span className="px-2 py-1 bg-baby/10 text-baby text-[10px] font-bold rounded-lg uppercase tracking-widest">{course.dur}</span>
                     <Zap className="w-4 h-4 text-baby fill-current" />
                  </div>
                  <h4 className="text-xl font-display font-bold text-navy mb-2">{course.title}</h4>
                  <p className="text-xs text-text-secondary leading-relaxed font-medium">{course.outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 sm:py-32 bg-white px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 sm:mb-24">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-baby/10 text-baby font-bold text-xs uppercase tracking-widest rounded-full mb-6">
                Your Journey
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-navy tracking-tighter leading-none mb-6">HOW IT <span className="text-baby">WORKS</span>.</h2>
              <p className="text-lg text-text-secondary font-medium max-w-2xl mx-auto">From absolute beginner to confident builder in four stages.</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8 relative">
              <div className="hidden md:block absolute top-[45px] left-0 right-0 h-1 border-t-2 border-dashed border-surface-3 z-0"></div>
              
              {[
                { step: "01", title: "Take the Passion Test", desc: "We evaluate capability and motivation, not just age.", icon: Target },
                { step: "02", title: "Join a Micro-Cohort", desc: "Get matched with up to 10 global peers sharing your level.", icon: Users },
                { step: "03", title: "Learn & Build Live", desc: "Interactive online classes focusing on real-world projects.", icon: MonitorPlay },
                { step: "04", title: "Showcase Output", desc: "Deploy your project and build a professional portfolio.", icon: Trophy }
              ].map((item, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-surface border-8 border-white shadow-xl shadow-navy/5 flex items-center justify-center mb-6">
                    <item.icon className="w-10 h-10 text-baby" />
                  </div>
                  <div className="bg-baby text-navy font-black text-sm px-3 py-1 rounded-full mb-4">{item.step}</div>
                  <h4 className="text-xl font-display font-bold text-navy mb-3">{item.title}</h4>
                  <p className="text-sm font-medium text-text-secondary">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Showcase */}
        <section className="py-24 sm:py-32 bg-surface-2 px-4 sm:px-6 border-y border-surface-3">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-navy tracking-tighter leading-none mb-6">REAL STUDENT <br/><span className="text-baby">PROJECTS</span>.</h2>
                <p className="text-lg text-text-secondary font-medium max-w-xl">We don't do endless theory. Every module ends with a built, working project that students can show to the world.</p>
              </div>
              <Button variant="outline" className="border-navy text-navy hover:bg-navy/5 font-bold rounded-full px-8 h-12" onClick={() => document.getElementById("leads")?.scrollIntoView({ behavior: 'smooth' })}>
                Start Building <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Interactive Solar System", track: "Explorers", tech: "Scratch", img: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1974&auto=format&fit=crop" },
                { title: "E-Commerce Mockup", track: "Builders", tech: "HTML/CSS/JS", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1970&auto=format&fit=crop" },
                { title: "Expense Tracker App", track: "Engineers", tech: "React & Firebase", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" }
              ].map((project, idx) => (
                <div key={idx} className="group rounded-[2rem] overflow-hidden bg-white border border-surface-3 shadow-lg hover:shadow-2xl transition-all duration-500">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img src={project.img} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent flex items-end p-6">
                      <div className="flex gap-2">
                         <span className="px-2 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold rounded-lg uppercase tracking-widest">{project.track}</span>
                         <span className="px-2 py-1 bg-baby text-navy text-[10px] font-bold rounded-lg uppercase tracking-widest">{project.tech}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-display font-bold text-navy">{project.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Passion Test */}
        <section id="passion-test" className="py-24 sm:py-32 bg-white px-4 sm:px-6">
          <div className="max-w-7xl mx-auto bg-navy rounded-[2.5rem] sm:rounded-[4rem] p-8 sm:p-12 lg:p-24 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-baby/10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
              <div>
                <h2 className="text-3xl sm:text-5xl font-display font-bold mb-8 tracking-tighter uppercase">The Passion Test</h2>
                <p className="text-lg sm:text-xl text-white/70 mb-10 leading-relaxed font-medium">
                  We don't place students by age alone. We place them by capability. The Passion Test assesses problem-solving instinct, curiosity, and motivation.
                </p>
                <div className="space-y-6 mb-12">
                   {[
                     "Not an intelligence test — it's a capability check.",
                     "20–30 minutes, administered online.",
                     "Determines the perfect starting track for you.",
                     "One-time fee of $1 (or equivalent)."
                   ].map(v => (
                     <div key={v} className="flex items-center gap-4">
                       <div className="w-6 h-6 rounded-full bg-baby/20 flex items-center justify-center"><CheckCircle2 className="w-4 h-4 text-baby" /></div>
                       <p className="font-bold text-sm tracking-wide">{v}</p>
                     </div>
                   ))}
                </div>
                <Button className="bg-baby text-navy hover:bg-baby-dark font-bold rounded-full px-12 h-16 text-lg" onClick={() => document.getElementById("leads")?.scrollIntoView({ behavior: 'smooth' })}>
                  Take the Test
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="aspect-square bg-white/5 rounded-3xl flex flex-col items-center justify-center text-center p-6 border border-white/10">
                    <Zap className="w-8 h-8 text-baby mb-4" />
                    <h4 className="text-sm font-bold uppercase tracking-widest mb-2">Curiosity</h4>
                    <p className="text-[10px] text-white/50">Does the student want to explore?</p>
                 </div>
                 <div className="aspect-square bg-white/5 rounded-3xl flex flex-col items-center justify-center text-center p-6 border border-white/10">
                    <Rocket className="w-8 h-8 text-baby mb-4" />
                    <h4 className="text-sm font-bold uppercase tracking-widest mb-2">Instinct</h4>
                    <p className="text-[10px] text-white/50">How do they solve unknown problems?</p>
                 </div>
                 <div className="aspect-square bg-white/5 rounded-3xl flex flex-col items-center justify-center text-center p-6 border border-white/10">
                    <Users className="w-8 h-8 text-baby mb-4" />
                    <h4 className="text-sm font-bold uppercase tracking-widest mb-2">Motivation</h4>
                    <p className="text-[10px] text-white/50">Are they here with intent?</p>
                 </div>
                 <div className="aspect-square bg-white/5 rounded-3xl flex flex-col items-center justify-center text-center p-6 border border-white/10">
                    <Lightbulb className="w-8 h-8 text-baby mb-4" />
                    <h4 className="text-sm font-bold uppercase tracking-widest mb-2">Creativity</h4>
                    <p className="text-[10px] text-white/50">Can they imagine a solution?</p>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Testimonials */}
        <section className="py-24 sm:py-32 px-4 sm:px-6 bg-surface-2 overflow-hidden">
          <div className="max-w-7xl mx-auto">
             <div className="text-center mb-16 sm:mb-20">
                <h2 className="text-3xl sm:text-5xl font-display font-bold text-navy mb-4 tracking-tighter uppercase">What Families Say</h2>
                <div className="flex justify-center gap-1">
                   {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-baby text-baby" />)}
                </div>
             </div>

             <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[3rem] border border-surface-3 relative shadow-xl shadow-navy/5">
                   <div className="absolute -top-4 sm:-top-6 -left-2 sm:-left-6 w-12 h-12 sm:w-16 sm:h-16 bg-baby rounded-full flex items-center justify-center text-navy shadow-lg z-10"><MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" /></div>
                   <p className="text-lg sm:text-2xl font-display font-bold text-navy leading-relaxed mb-10 italic">
                     "The children love it and are intrigued... it has been a transformative experience for them."
                   </p>
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-surface-3 flex items-center justify-center text-navy font-bold">J</div>
                      <div>
                        <h4 className="font-display font-bold text-navy">Mrs. Joan Ette</h4>
                        <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Parent, Lagos</p>
                      </div>
                   </div>
                </div>

                <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[3rem] border border-surface-3 relative shadow-xl shadow-navy/5">
                   <div className="absolute -top-4 sm:-top-6 -left-2 sm:-left-6 w-12 h-12 sm:w-16 sm:h-16 bg-teal rounded-full flex items-center justify-center text-white shadow-lg z-10"><MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" /></div>
                   <p className="text-lg sm:text-2xl font-display font-bold text-navy leading-relaxed mb-10 italic">
                     "I recommend Trustar Tech Institute and Mr. Daniel (Founder) to anyone who needs real tech skills."
                   </p>
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-surface-3 flex items-center justify-center text-navy font-bold">G</div>
                      <div>
                        <h4 className="font-display font-bold text-navy">Mrs. Gbodon</h4>
                        <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Professional Parent</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-24 sm:py-32 bg-navy text-white px-4 sm:px-6 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 100% 0%, #7eb8f7 0%, transparent 50%)'}}></div>
           <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center mb-16 sm:mb-24">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tighter leading-none mb-6">GLOBAL STANDARDS, <br/><span className="text-baby">LOCAL IMPACT</span>.</h2>
                <p className="text-lg text-white/70 font-medium max-w-2xl mx-auto">Why students from across the globe choose Trustar for their tech education.</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {[
                   { title: "Hybrid Learning Engine", desc: "Live classes blended with a self-paced hub of quizzes, assignments, and discussions.", icon: MonitorPlay },
                   { title: "Micro-Cohorts", desc: "Class sizes strictly capped at 10 students ensuring personalized attention.", icon: Users },
                   { title: "Output-Driven", desc: "Every module concludes with a functional, deployed piece of technology.", icon: Rocket },
                   { title: "Global Peer Network", desc: "Learn alongside motivated peers from different countries and cultures.", icon: Globe },
                   { title: "Dedicated Mentorship", desc: "Separate, dedicated mentorship tracks supporting career goals and portfolio building.", icon: Compass },
                   { title: "Future-Ready Curriculum", desc: "Syllabus updated quarterly to match industry demands, including AI context.", icon: Laptop }
                 ].map((feat, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
                       <div className="w-12 h-12 rounded-xl bg-baby/20 flex items-center justify-center text-baby mb-6"><feat.icon className="w-6 h-6" /></div>
                       <h4 className="text-xl font-display font-bold mb-3">{feat.title}</h4>
                       <p className="text-sm font-medium text-white/60 leading-relaxed">{feat.desc}</p>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 sm:py-32 bg-surface-2 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-navy mb-4 tracking-tighter uppercase">Frequently Asked Questions</h2>
              <p className="text-text-secondary font-medium tracking-widest text-sm uppercase opacity-80">Everything you need to know.</p>
            </div>
            
            <Accordion className="w-full space-y-4">
              {[
                { q: "What equipment does my child need?", a: "A reliable laptop or desktop computer with internet access and a webcam. A quiet place for the live sessions is also highly recommended." },
                { q: "What if we miss a live class?", a: "All live sessions are recorded and made available to students. Our tutors also provide asynchronous support via our learning platform for any questions." },
                { q: "Do you accept students from any country?", a: "Yes! Our platform is 100% online, and we organize our micro-cohorts to accommodate different time zones, typically catering to UK, US, European, and African time zones." },
                { q: "Is prior coding experience required?", a: "Not at all. The Passion Test helps us determine the appropriate starting point, whether they are absolute beginners or have some prior experience." },
                { q: "What happens after the Passion Test?", a: "Once completed, our team will share a detailed capability report and place the student in the most suitable track and cohort. You will then receive the enrollment details." }
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="bg-white px-6 py-2 rounded-2xl border border-surface-3 shadow-sm data-[state=open]:border-baby/50 transition-colors">
                  <AccordionTrigger className="text-left font-display font-bold text-navy hover:text-baby text-lg hover:no-underline [&[data-state=open]]:text-baby">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-text-secondary font-medium leading-relaxed pb-4 pt-2">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* 11. Lead capture form */}
        <section id="leads" className="py-24 sm:py-32 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-4xl sm:text-6xl font-display font-bold text-navy mb-8 tracking-tighter leading-none uppercase">Join the <br /><span className="text-baby">Tribe</span>.</h2>
              <p className="text-lg sm:text-xl text-text-secondary font-medium mb-12 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Ready to transform your child's future? Or maybe your own? Fill out the enquiry form and our team will guide you through the Passion Test.
              </p>
              <div className="space-y-6">
                 <div className="p-6 bg-surface-2 rounded-2xl flex items-center gap-6 border border-surface-3">
                    <Mail className="w-10 h-10 text-baby" />
                    <div>
                       <h4 className="font-bold text-navy uppercase tracking-widest text-[10px]">Email Us</h4>
                       <p className="text-lg font-display font-bold">trustartechinstitute@gmail.com</p>
                    </div>
                 </div>
                 <div className="p-6 bg-surface-2 rounded-2xl flex items-center gap-6 border border-surface-3">
                    <MessageCircle className="w-10 h-10 text-baby" />
                    <div>
                       <h4 className="font-bold text-navy uppercase tracking-widest text-[10px]">WhatsApp Link</h4>
                       <p className="text-lg font-display font-bold">wa.me/message/CXXZKUTZKSDXI1</p>
                    </div>
                 </div>
              </div>
            </div>

            <div className="bg-surface-2 p-6 sm:p-10 lg:p-14 rounded-[2.5rem] sm:rounded-[4rem] border border-surface-3 shadow-2xl shadow-navy/5">
              {!submitted ? (
                <>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Full Name</label>
                        <Input required placeholder="Your name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="rounded-xl h-14 bg-white border-none shadow-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Country</label>
                        <Input required placeholder="Nigeria, UK, US..." value={form.country} onChange={(e) => setForm({...form, country: e.target.value})} className="rounded-xl h-14 bg-white border-none shadow-sm" />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Child's Age / For Self?</label>
                        <Input required placeholder="e.g. 7 years old" value={form.childAge} onChange={(e) => setForm({...form, childAge: e.target.value})} className="rounded-xl h-14 bg-white border-none shadow-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Preferred Track</label>
                        <Select required onValueChange={(val: string) => setForm({...form, interestedTrack: val})}>
                          <SelectTrigger className="rounded-xl h-14 bg-white border-none shadow-sm">
                            <SelectValue placeholder="Select interest" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Foundations">Foundations (4-7)</SelectItem>
                            <SelectItem value="Explorers">Explorers (8-12)</SelectItem>
                            <SelectItem value="Builders">Builders (12-17)</SelectItem>
                            <SelectItem value="Engineers">Engineers (15+ / Adults)</SelectItem>
                            <SelectItem value="Short Courses">Short Courses</SelectItem>
                            <SelectItem value="Not Sure">I'm not sure yet</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Message (Optional)</label>
                      <Textarea placeholder="Any questions for the Passion Test?" value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} className="rounded-2xl min-h-[120px] bg-white border-none shadow-sm resize-none" />
                    </div>
                    <Button type="submit" className="w-full h-16 rounded-3xl bg-baby hover:bg-baby-dark text-navy font-bold text-xl shadow-xl shadow-baby/20">
                      Submit Enquiry
                    </Button>
                    <p className="text-center text-[10px] font-bold text-text-muted uppercase tracking-widest">WhatsApp Business will open on click</p>
                  </form>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-teal/10 text-teal rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-teal/20">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h2 className="text-4xl font-display font-bold text-navy mb-4 text-center">THANK YOU!</h2>
                  <p className="text-text-secondary font-medium leading-relaxed max-w-sm mx-auto mb-10">
                    Your enquiry has been received. Our team will reach out on WhatsApp very soon to guide you through the next steps.
                  </p>
                  <Button onClick={() => setSubmitted(false)} variant="outline" className="rounded-full border-baby text-baby px-10 h-12 font-bold tracking-widest text-xs uppercase">Send Another</Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 14. Footer */}
        <footer className="bg-navy pt-24 pb-12 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16 border-b border-white/10 pb-20 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-12 h-12 rounded-full bg-baby flex items-center justify-center font-display font-bold text-navy text-2xl shadow-lg shadow-baby/20">T</div>
                <span className="font-display font-bold text-3xl tracking-tighter text-white uppercase">TRUSTAR</span>
              </div>
              <p className="text-white/50 font-medium max-w-sm mb-12 leading-relaxed lg:text-lg">
                Training for a world that transforms. World-class tech education for all ages. Cape Town • Lagos • London • Global.
              </p>
              <div className="flex gap-6">
                <a href="https://instagram.com/trustartechinstitute" target="_blank" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-baby transition-all hover:text-navy"><Instagram className="w-6 h-6" /></a>
                <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-baby transition-all hover:text-navy"><Users className="w-6 h-6" /></a>
                <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-baby transition-all hover:text-navy"><MessageCircle className="w-6 h-6" /></a>
              </div>
            </div>
            <div>
              <h5 className="font-display font-bold text-white uppercase tracking-[0.3em] text-xs mb-10 opacity-40">Programmes</h5>
              <div className="space-y-4 flex flex-col font-medium">
                <a href="#tracks" className="text-white/60 hover:text-baby transition-colors">Foundations (4–7)</a>
                <a href="#tracks" className="text-white/60 hover:text-baby transition-colors">Explorers (8–12)</a>
                <a href="#tracks" className="text-white/60 hover:text-baby transition-colors">Builders (12–17)</a>
                <a href="#tracks" className="text-white/60 hover:text-baby transition-colors">Engineers (15+)</a>
                <a href="#curriculum" className="text-white/60 hover:text-baby transition-colors">Short Courses</a>
              </div>
            </div>
            <div>
              <h5 className="font-display font-bold text-white uppercase tracking-[0.3em] text-xs mb-10 opacity-40">Contact Us</h5>
              <div className="space-y-5 flex flex-col font-medium">
                <a href="mailto:trustartechinstitute@gmail.com" className="text-white/60 hover:text-baby transition-colors flex items-center gap-3"><Mail className="w-4 h-4" /> trustartechinstitute@gmail.com</a>
                <a href="#" className="text-white/60 hover:text-baby transition-colors flex items-center gap-3"><Phone className="w-4 h-4" /> +234 (0) XXX XXX XXXX</a>
                <a href="https://wa.me/message/CXXZKUTZKSDXI1" target="_blank" className="text-white/60 hover:text-baby transition-colors flex items-center gap-3"><MessageCircle className="w-4 h-4" /> WhatsApp Business</a>
                <p className="text-white/40 text-[10px] mt-4 uppercase tracking-[0.2em]">Live Support Available <br /> 9am – 6pm WAT</p>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.3em] font-bold text-white/20">
            <p>© 2026 Trustar Tech Institute. All rights reserved.</p>
            <p className="flex items-center gap-2">Built for the future <span className="text-baby"><Heart className="w-3 h-3 fill-current" /></span></p>
          </div>
        </footer>
      </main>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
}
