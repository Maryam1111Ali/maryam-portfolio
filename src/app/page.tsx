'use client'

import Navbar from '@/components/Navbar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const [emailCopied, setEmailCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [emailError, setEmailError] = useState('');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Project data with multiple images
  const projectData = {
    'mehrum-app': {
      name: 'Mehrum App',
      description: 'A comprehensive matchmaking/matrimonial platform with complete backend development. Built the entire Django REST backend including user authentication, prospect profile management, and admin verification workflows.',
      technologies: ['Django REST', 'JWT', 'Socket.IO', 'PostgreSQL', 'Push Notifications'],
      features: [
        'Complete Django REST backend with scalable models and serializers',
        'User authentication with secure JWT implementation',
        'Prospect profile management with admin verification workflows',
        'Advanced search with filters, national ID verification, and favorite profiles',
        'Token-based unlock requests for premium features',
        'Real-time chat using Socket.IO with room management',
        'Push notifications integration',
        'Optimized endpoints for mobile and web performance'
      ],
      liveUrl: 'https://rishta-app-demo.com',
      githubUrl: 'https://github.com/yourusername/rishta-app',
      images: [
        { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop', alt: 'Mehrum App - White Rose Wedding Engagement' },
        { src: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=600&fit=crop', alt: 'Mehrum App - Boy and Girl Meeting' },
        { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop', alt: 'Mehrum App - Engagement Ring' },
        { src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=600&fit=crop', alt: 'Mehrum App - Wedding Engagement Ceremony' }
      ]
    },
    'arabsocials': {
      name: 'Arab Socials',
      description: 'Social Media Platform with country-based restrictions and complete post module. Implemented group registration restrictions, comprehensive post management with nested comments and like systems.',
      technologies: ['Django', 'REST API', 'JWT', 'PostgreSQL'],
      features: [
        'Country-based restrictions for group registration and onboarding',
        'Complete post module with CRUD operations',
        'Nested comments system',
        'Like/unlike functionality',
        'User profile management',
        'RESTful API design and implementation'
      ],
      liveUrl: 'https://arabsocials-demo.com',
      githubUrl: 'https://github.com/yourusername/arabsocials',
      images: [
        { src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop', alt: 'Arab Socials - Social Media Event' },
        { src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop', alt: 'Arab Socials - Community Gathering' },
        { src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop', alt: 'Arab Socials - Social Networking' },
        { src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop', alt: 'Arab Socials - Group Event' },
        { src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop', alt: 'Arab Socials - Social Platform' }
      ]
    },
    'nestly': {
      name: 'Nestly',
      description: 'Real Estate Platform Backend with AI-powered property search. Developed user CRUD operations, dynamic property questionnaire system, and personalized property recommendations.',
      technologies: ['Django', 'JWT', 'OAuth2', 'Google Auth', 'Facebook Auth', 'MLS Integration'],
      features: [
        'User CRUD operations with role-based authentication',
        'Dynamic property questionnaire system for personalized recommendations',
        'Google & Facebook login integration with secure session handling',
        'AI-powered property search assistant',
        'MLS data integration for property listings',
        'Secure authentication and authorization system'
      ],
      liveUrl: 'https://nestly-demo.com',
      githubUrl: 'https://github.com/yourusername/nestly',
      images: [
        { src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop', alt: 'Nestly - Modern House Property' },
        { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop', alt: 'Nestly - Luxury Home' },
        { src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop', alt: 'Nestly - Property Interior' },
        { src: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop', alt: 'Nestly - Apartment Building' },
        { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop', alt: 'Nestly - Real Estate Property' },
        { src: 'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800&h=600&fit=crop', alt: 'Nestly - Property Exterior' }
      ]
    },
    'listico': {
      name: 'Listico - Canadian Real Estate Platform',
      description: 'Comprehensive Canadian real estate platform with advanced search, social logins, and AI-powered features. Developed complete backend with property management, admin approval workflows, and chatbot integration.',
      technologies: ['Django', 'JWT', 'OAuth2', 'Cloudinary', 'Socket.IO', 'AI Integration'],
      features: [
        'Property CRUD with admin approval/rejection workflows',
        'Favorites/unfavorites and listing visibility rules',
        'Advanced search filters (price, location, amenities, beds/baths)',
        'Email/social logins (Google, Facebook, GitHub) with JWT authentication',
        'AI-powered real estate chatbot backend',
        'Personalized listing suggestions system',
        'Cloudinary integration for property image uploads',
        'Real-time buyer-agent chat using Socket.IO',
        'Offers, negotiation, property tours, and automatic agent assignment workflows',
        'Push notifications and property preferences management'
      ],
      liveUrl: 'https://listico-demo.com',
      githubUrl: 'https://github.com/yourusername/listico',
      images: [
        { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop', alt: 'Listico - Canadian Real Estate Property' },
        { src: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop', alt: 'Listico - Modern Condo' },
        { src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop', alt: 'Listico - Luxury Property' },
        { src: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop', alt: 'Listico - Property Listing' },
        { src: 'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800&h=600&fit=crop', alt: 'Listico - Real Estate Home' },
        { src: 'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=800&h=600&fit=crop', alt: 'Listico - Property View' },
        { src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop', alt: 'Listico - Property Interior Design' }
      ]
    },
    'booking-app': {
      name: 'Booking App',
      description: 'Organization-Based Booking System with multi-organization structure. Each organization manages its own booking workflows with secure authentication and validation.',
      technologies: ['Django', 'REST API', 'JWT', 'PostgreSQL'],
      features: [
        'Multi-organization booking structure',
        'Organization-specific booking workflows',
        'Booking creation endpoints with validation',
        'User-organization linking system',
        'Schedule management APIs',
        'Clean authentication and validation',
        'Organization ID auto-generation with strict constraints'
      ],
      liveUrl: 'https://booking-app-demo.com',
      githubUrl: 'https://github.com/yourusername/booking-app',
      images: [
        { src: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop', alt: 'Booking App - Calendar Booking System' },
        { src: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop', alt: 'Booking App - Appointment Calendar' },
        { src: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop', alt: 'Booking App - Schedule Management' },
        { src: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop', alt: 'Booking App - Online Booking' }
      ]
    },
    'ai-education-recommendation': {
      name: 'AI-Based Education Recommendation System',
      description: 'Final Year Project (FYP) - AI-powered education and career recommendation platform. Built Django backend with OpenAI integration to provide personalized career guidance based on student responses to questionnaires.',
      technologies: ['Django', 'OpenAI API', 'REST API', 'JWT', 'PostgreSQL', 'Real-time Chat'],
      features: [
        'Django backend with OpenAI integration for AI-powered recommendations',
        'Interactive questionnaire system for career assessment',
        'AI-based career choice recommendations based on student responses',
        'Real-time career counselor matching and scheduling system',
        'Meeting alignment system for students and counselors',
        'Career guidance and counseling platform',
        'Secure authentication and user management',
        'Personalized recommendation engine'
      ],
      liveUrl: 'https://ai-education-recommendation-demo.com',
      githubUrl: 'https://github.com/yourusername/ai-education-recommendation',
      images: [
        { src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop', alt: 'AI Education - Students Learning' },
        { src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop', alt: 'AI Education - Counseling Session' },
        { src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop', alt: 'AI Education - Career Guidance' },
        { src: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop', alt: 'AI Education - Airplane Pilot Career' },
        { src: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop', alt: 'AI Education - Aviation Career' }
      ]
    },
    'sentiment-analysis': {
      name: 'Sentiment Analysis on Twitter Dataset',
      description: 'Machine Learning project performing sentiment analysis on a dataset of 5,000 Twitter tweets. Built and trained ML models to classify tweets as positive, negative, or neutral sentiment.',
      technologies: ['Python', 'Machine Learning', 'NLP', 'Pandas', 'Scikit-learn', 'NLTK'],
      features: [
        'Sentiment analysis on 5,000 Twitter tweets dataset',
        'Data preprocessing and cleaning',
        'Feature extraction and text vectorization',
        'Multiple ML model training and evaluation',
        'Sentiment classification (positive, negative, neutral)',
        'Model performance metrics and visualization',
        'Text preprocessing and tokenization',
        'Comparative analysis of different ML algorithms'
      ],
      liveUrl: 'https://sentiment-analysis-demo.com',
      githubUrl: 'https://github.com/yourusername/sentiment-analysis',
      images: [
        { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop', alt: 'Sentiment Analysis - Data Visualization' },
        { src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop', alt: 'Sentiment Analysis - AI and Machine Learning' },
        { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop', alt: 'Sentiment Analysis - Model Results' },
        { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop', alt: 'Sentiment Analysis - Analytics Dashboard' },
        { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop', alt: 'Sentiment Analysis - Code and Data' }
      ]
    },
    'ml-models-training': {
      name: 'Machine Learning Models Training',
      description: 'Collection of machine learning training projects and models. Various small-scale ML projects demonstrating different algorithms, data preprocessing techniques, and model evaluation methods.',
      technologies: ['Python', 'Machine Learning', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib'],
      features: [
        'Multiple ML model training projects',
        'Data preprocessing and feature engineering',
        'Various ML algorithms implementation',
        'Model evaluation and performance metrics',
        'Data visualization and analysis',
        'Cross-validation and hyperparameter tuning',
        'Model comparison and selection',
        'Small-scale ML project implementations'
      ],
      liveUrl: 'https://ml-models-training-demo.com',
      githubUrl: 'https://github.com/yourusername/ml-models-training',
      images: [
        { src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop', alt: 'ML Training - Machine Learning Models' },
        { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop', alt: 'ML Training - Data Science Analytics' },
        { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop', alt: 'ML Training - Model Training Process' },
        { src: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop', alt: 'ML Training - Algorithm Development' }
      ]
    }
  };

  const openProjectModal = (projectId: string) => {
    setSelectedProject(projectId);
    setCurrentImageIndex(0);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject && projectData[selectedProject as keyof typeof projectData]) {
      const project = projectData[selectedProject as keyof typeof projectData];
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }
  };

  const prevImage = () => {
    if (selectedProject && projectData[selectedProject as keyof typeof projectData]) {
      const project = projectData[selectedProject as keyof typeof projectData];
      setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    }
  };

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('maryamamanat692@gmail.com');
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy email: ', err);
    }
  };

  const downloadResume = () => {
    // Create a download link to the PDF file in the public folder
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Maryam_Amanat_Resume.pdf';
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
  };

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate email in real-time
    if (name === 'email') {
      if (value && !validateEmail(value)) {
        setEmailError('Please enter a valid email address');
      } else {
        setEmailError('');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email before submission
    if (!validateEmail(formData.email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setEmailError(''); // Clear any previous email errors

    try {
      // Send email using your API route
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
            to: 'maryamamanat692@gmail.com',
        }),
      });

      await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-[#0a0a1a] min-h-screen">
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-b from-[#0a0a1a] via-[#1a0a2e] to-[#0a0a1a] text-white py-20 overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_20px_rgba(34,211,238,0.8)]"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-pulse shadow-[0_0_20px_rgba(168,85,247,0.8)]"></div>
          <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-pink-400 rounded-full animate-pulse shadow-[0_0_20px_rgba(244,114,182,0.8)]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-2"
              >
                <span className="text-purple-300 text-lg">Hello,</span>
                <span className="text-2xl animate-bounce">👋</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight"
              >
                <span className="bg-gradient-to-r from-purple-300 via-cyan-300 to-pink-300 bg-clip-text text-transparent">
                  I&apos;m a
                </span>
                <br />
                <span className="text-purple-200 drop-shadow-[0_0_30px_rgba(196,181,253,0.5)]">
                  Software Engineer
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-purple-200/80"
              >
                Building scalable backend systems and robust APIs
              </motion.p>
              
              {/* Social Media Icons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex gap-4 pt-4"
              >
                {[
                  { name: 'GitHub', icon: '💻', url: 'https://github.com' },
                  { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com' },
                  { name: 'Twitter', icon: '🐦', url: 'https://twitter.com' },
                  { name: 'Email', icon: '📧', url: 'mailto:maryamamanat692@gmail.com' }
                ].map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-full bg-purple-900/50 border border-purple-500/30 flex items-center justify-center text-xl hover:bg-purple-800/50 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-300"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side - Visual Element */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full h-[500px] flex items-center justify-center">
                {/* Glowing background circle */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-cyan-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
                
                {/* Main visual container */}
                <div className="relative z-10 w-80 h-80 rounded-full border-4 border-cyan-400/50 shadow-[0_0_50px_rgba(34,211,238,0.5)] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-cyan-600/30"></div>
                  {/* Placeholder for profile image - you can replace this with an actual image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-8xl">👩‍💻</div>
                  </div>
                  
                  {/* Animated neon lines */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 320">
                    <motion.path
                      d="M160,80 Q200,120 240,160 Q200,200 160,240 Q120,200 80,160 Q120,120 160,80"
                      stroke="rgba(34,211,238,0.6)"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-[#0a0a1a] border-y border-purple-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2"
              >
                3+
              </motion.div>
              <p className="text-purple-200/60 text-sm uppercase tracking-wider">Years of Experience</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2"
              >
                12+
              </motion.div>
              <p className="text-purple-200/60 text-sm uppercase tracking-wider">Projects Completed Around The World</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-16 bg-[#0a0a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 text-purple-200"
          >
            Technology Stack
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { name: 'Python', icon: '🐍', gradient: 'from-yellow-400 to-blue-500' },
              { name: 'Django', icon: '🌐', gradient: 'from-green-400 to-green-600' },
              { name: 'JavaScript', icon: 'JS', gradient: 'from-yellow-300 to-yellow-500' },
              { name: 'React', icon: '⚛️', gradient: 'from-cyan-400 to-blue-500' },
              { name: 'PostgreSQL', icon: '🐘', gradient: 'from-blue-400 to-blue-600' },
              { name: 'Docker', icon: '🐳', gradient: 'from-blue-400 to-cyan-500' },
              { name: 'Git', icon: '📦', gradient: 'from-orange-400 to-red-500' },
              { name: 'Machine Learning', icon: '🤖', gradient: 'from-purple-400 to-pink-500' }
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.15, y: -5 }}
                className={`w-16 h-16 rounded-full bg-gradient-to-br ${tech.gradient} flex items-center justify-center text-2xl font-bold shadow-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all duration-300 cursor-pointer border-2 border-purple-500/30`}
              >
                {tech.icon}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-[#0a0a1a] to-[#1a0a2e] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-8"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-purple-200/90 text-lg text-center max-w-2xl mx-auto leading-relaxed"
          >
            Motivated and detail-oriented developer with experience in Python, Django, and Machine Learning projects. 
            Resourceful Django Backend Developer with hands-on experience building scalable APIs, secure authentication systems, 
            real-time chat features, and production-ready backend architectures. Completed multiple end-to-end projects in Django, 
            DRF, JWT, database design, and smooth API integrations for mobile and web apps. Also skilled in Canva and Figma, 
            with a strong creative mindset.
          </motion.p>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-[#1a0a2e] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-16"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              My Skills
            </span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="h-full"
            >
              <Card className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 border border-purple-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-300 h-full flex flex-col backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="text-5xl mb-4">⚙️</div>
                  <CardTitle className="text-purple-200 text-xl">Backend Development</CardTitle>
                </CardHeader>
                <CardContent className="text-center flex-1 flex flex-col justify-center">
                  <p className="text-purple-200/80 leading-relaxed">Python (Experienced), Django (Experienced), Django REST Framework (Expert), JWT (Experienced), Sockets (Skillful)</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="h-full"
            >
              <Card className="bg-gradient-to-br from-cyan-900/40 to-cyan-800/20 border border-cyan-500/30 hover:border-purple-400/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-300 h-full flex flex-col backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="text-5xl mb-4">💻</div>
                  <CardTitle className="text-cyan-200 text-xl">Web & Development</CardTitle>
                </CardHeader>
                <CardContent className="text-center flex-1 flex flex-col justify-center">
                  <p className="text-cyan-200/80 leading-relaxed">Web Development (Skillful), Backend Development (Skillful), Machine Learning (Skillful), Data Visualization (Skillful)</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="h-full"
            >
              <Card className="bg-gradient-to-br from-pink-900/40 to-pink-800/20 border border-pink-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-300 h-full flex flex-col backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="text-5xl mb-4">🛠️</div>
                  <CardTitle className="text-pink-200 text-xl">Tools & Design</CardTitle>
                </CardHeader>
                <CardContent className="text-center flex-1 flex flex-col justify-center">
                  <p className="text-pink-200/80 leading-relaxed">Git (Expert), Docker (Experienced), Figma (Skillful), Canva Design (Expert)</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gradient-to-b from-[#1a0a2e] to-[#0a0a1a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/3 right-0 w-96 h-96 bg-pink-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-16"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              My Projects
            </span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="transition-all duration-300 h-full"
            >
              <Card className="bg-gradient-to-br from-purple-900/30 to-purple-800/10 border border-purple-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-300 overflow-hidden h-full flex flex-col backdrop-blur-sm">
         <div 
           className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 cursor-pointer hover:opacity-90 transition-opacity"
           onClick={() => openProjectModal('mehrum-app')}
         >
           <div className="absolute inset-0 bg-black bg-opacity-20"></div>
           <div className="absolute inset-0 flex items-center justify-center">
             <div className="text-white text-center">
               <div className="text-4xl mb-2">💍</div>
               <div className="text-sm font-medium">Mehrum App</div>
               <div className="text-xs mt-1 opacity-80">Click to view gallery</div>
             </div>
           </div>
           
           {/* Simple image counter */}
           <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
             4 Images
           </div>
           
           {/* Simple dots */}
           <div className="absolute bottom-2 right-2 flex gap-1">
             <div className="w-2 h-2 bg-white rounded-full"></div>
             <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
             <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
             <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
           </div>
         </div>
                <CardHeader>
                  <CardTitle className="text-purple-200">Mehrum App</CardTitle>
                  <CardDescription className="text-purple-300/70">
                    Matchmaking/Matrimonial Platform - Complete Backend Development with Django REST, real-time chat, and admin workflows.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-purple-200/90 mb-4">
                    Built the entire Django REST backend including user authentication, prospect profile management, admin verification workflows, 
                    real-time chat using Socket.IO, and push notifications for mobile and web platforms.
                  </p>
                  <div className="flex gap-2 flex-wrap mb-4">
                    <Badge variant="secondary">Django REST</Badge>
                    <Badge variant="secondary">JWT</Badge>
                    <Badge variant="secondary">Socket.IO</Badge>
                    <Badge variant="secondary">PostgreSQL</Badge>
                  </div>
                  <div className="flex gap-3 mt-auto">
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-300"
                      onClick={() => window.open('https://rishta-app-demo.com', '_blank')}
                    >
                      🌐 Live Demo
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-purple-500/50 text-purple-200 hover:bg-purple-900/30 hover:border-cyan-400/50 hover:text-cyan-200 transition-all duration-300"
                      onClick={() => window.open('https://github.com/yourusername/rishta-app', '_blank')}
                    >
                      📁 GitHub
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="transition-all duration-300 h-full"
            >
              <Card className="bg-gradient-to-br from-purple-900/30 to-purple-800/10 border border-purple-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-300 overflow-hidden h-full flex flex-col backdrop-blur-sm">
                <div 
                  className="relative h-48 bg-gradient-to-br from-orange-500 to-red-600 cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => openProjectModal('nestly')}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-4xl mb-2">🏢</div>
                      <div className="text-sm font-medium">Nestly</div>
                      <div className="text-xs mt-1 opacity-80">Click to view gallery</div>
                    </div>
                  </div>
                  
                  {/* Simple image counter */}
                  <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
                    6 Images
                  </div>
                  
                  {/* Simple dots */}
                  <div className="absolute bottom-2 right-2 flex gap-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
                    <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
                    <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
                    <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
                    <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-purple-200">Nestly</CardTitle>
                  <CardDescription className="text-purple-300/70">
                    A comprehensive real estate platform with advanced authentication, social logins, and property management system.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-purple-200/90 mb-4">
                    Real Estate Platform Backend with AI-powered property search, dynamic questionnaire system for personalized recommendations, 
                    Google & Facebook login integration, and MLS data integration.
                  </p>
                  <div className="flex gap-2 flex-wrap mb-4">
                    <Badge variant="secondary">Django</Badge>
                    <Badge variant="secondary">JWT</Badge>
                    <Badge variant="secondary">OAuth2</Badge>
                    <Badge variant="secondary">AI Integration</Badge>
                  </div>
                  <div className="flex gap-3 mt-auto">
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-300"
                      onClick={() => window.open('https://nestly-demo.com', '_blank')}
                    >
                      🌐 Live Demo
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-purple-500/50 text-purple-200 hover:bg-purple-900/30 hover:border-cyan-400/50 hover:text-cyan-200 transition-all duration-300"
                      onClick={() => window.open('https://github.com/yourusername/nestly', '_blank')}
                    >
                      📁 GitHub
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="transition-all duration-300 h-full"
            >
              <Card className="bg-gradient-to-br from-purple-900/30 to-purple-800/10 border border-purple-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-300 overflow-hidden h-full flex flex-col backdrop-blur-sm">
                <div 
                  className="relative h-48 bg-gradient-to-br from-teal-500 to-indigo-600 cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => openProjectModal('listico')}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-4xl mb-2">🏠</div>
                      <div className="text-sm font-medium">Listico</div>
                      <div className="text-xs mt-1 opacity-80">Click to view gallery</div>
                    </div>
                  </div>
                  
                  {/* Simple image counter */}
                  <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
                    7 Images
                  </div>
                  
                  {/* Simple dots */}
                  <div className="absolute bottom-2 right-2 flex gap-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
                    <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
                    <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
                    <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
                    <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
                    <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-purple-200">Listico</CardTitle>
                  <CardDescription className="text-purple-300/70">
                    A comprehensive property management platform with advanced features and admin dashboard.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-purple-200/90 mb-4">
                    Canadian Real Estate Platform with advanced search filters, property CRUD with admin approval, 
                    social logins (Google, Facebook, GitHub), AI-powered chatbot, Cloudinary image uploads, and real-time buyer-agent chat.
                  </p>
                  <div className="flex gap-2 flex-wrap mb-4">
                    <Badge variant="secondary">Django</Badge>
                    <Badge variant="secondary">JWT</Badge>
                    <Badge variant="secondary">Cloudinary</Badge>
                    <Badge variant="secondary">Socket.IO</Badge>
                  </div>
                  <div className="flex gap-3 mt-auto">
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-300"
                      onClick={() => window.open('https://listico-demo.com', '_blank')}
                    >
                      🌐 Live Demo
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-purple-500/50 text-purple-200 hover:bg-purple-900/30 hover:border-cyan-400/50 hover:text-cyan-200 transition-all duration-300"
                      onClick={() => window.open('https://github.com/yourusername/listico', '_blank')}
                    >
                      📁 GitHub
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="transition-all duration-300 h-full"
            >
              <Card className="bg-gradient-to-br from-purple-900/30 to-purple-800/10 border border-purple-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-300 overflow-hidden h-full flex flex-col backdrop-blur-sm">
                <div 
                  className="relative h-48 bg-gradient-to-br from-green-500 to-blue-600 cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => openProjectModal('arabsocials')}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-4xl mb-2">👥</div>
                      <div className="text-sm font-medium">ArabSocials</div>
                      <div className="text-xs mt-1 opacity-80">Click to view gallery</div>
                    </div>
                  </div>
                  
                  {/* Simple image counter */}
                  <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
                    5 Images
                  </div>
                  
                  {/* Simple dots */}
                  <div className="absolute bottom-2 right-2 flex gap-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
                    <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
                    <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
                    <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-purple-200">Arab Socials</CardTitle>
                  <CardDescription className="text-purple-300/70">
                    Social Media Platform with country-based restrictions and complete post module with nested comments.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-purple-200/90 mb-4">
                    Social Media Platform with country-based restrictions for group registration, complete post module with CRUD operations, 
                    nested comments system, and like/unlike functionality.
                  </p>
                  <div className="flex gap-2 flex-wrap mb-4">
                    <Badge variant="secondary">Django</Badge>
                    <Badge variant="secondary">REST API</Badge>
                    <Badge variant="secondary">JWT</Badge>
                    <Badge variant="secondary">PostgreSQL</Badge>
                  </div>
                  <div className="flex gap-3 mt-auto">
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-300"
                      onClick={() => window.open('https://arabsocials-demo.com', '_blank')}
                    >
                      🌐 Live Demo
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-purple-500/50 text-purple-200 hover:bg-purple-900/30 hover:border-cyan-400/50 hover:text-cyan-200 transition-all duration-300"
                      onClick={() => window.open('https://github.com/yourusername/arabsocials', '_blank')}
                    >
                      📁 GitHub
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="transition-all duration-300 h-full"
            >
              <Card className="bg-gradient-to-br from-purple-900/30 to-purple-800/10 border border-purple-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-300 overflow-hidden h-full flex flex-col backdrop-blur-sm">
                <div 
                  className="relative h-48 bg-gradient-to-br from-indigo-500 to-purple-600 cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => openProjectModal('booking-app')}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-4xl mb-2">📅</div>
                      <div className="text-sm font-medium">Booking App</div>
                      <div className="text-xs mt-1 opacity-80">Click to view gallery</div>
                    </div>
                  </div>
                  
                  {/* Simple image counter */}
                  <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
                    4 Images
                  </div>
                  
                  {/* Simple dots */}
                  <div className="absolute bottom-2 right-2 flex gap-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
                    <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
                    <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-purple-200">Organization-Based Booking System</CardTitle>
                  <CardDescription className="text-purple-300/70">
                    Multi-organization booking structure where each organization manages its own booking workflows.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-purple-200/90 mb-4">
                    Implemented multi-organization booking structure where each organization manages its own booking workflows. 
                    Created endpoints for booking creation, user–organization linking, and schedule management. 
                    Ensured clean authentication, validation, and organization ID auto-generation with strict constraints.
                  </p>
                  <div className="flex gap-2 flex-wrap mb-4">
                    <Badge variant="secondary">Django</Badge>
                    <Badge variant="secondary">REST API</Badge>
                    <Badge variant="secondary">JWT</Badge>
                    <Badge variant="secondary">PostgreSQL</Badge>
                  </div>
                  <div className="flex gap-3 mt-auto">
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-300"
                      onClick={() => window.open('https://booking-app-demo.com', '_blank')}
                    >
                      🌐 Live Demo
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-purple-500/50 text-purple-200 hover:bg-purple-900/30 hover:border-cyan-400/50 hover:text-cyan-200 transition-all duration-300"
                      onClick={() => window.open('https://github.com/yourusername/booking-app', '_blank')}
                    >
                      📁 GitHub
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="transition-all duration-300 h-full"
            >
              <Card className="bg-gradient-to-br from-purple-900/30 to-purple-800/10 border border-purple-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-300 overflow-hidden h-full flex flex-col backdrop-blur-sm">
                <div 
                  className="relative h-48 bg-gradient-to-br from-purple-500 to-pink-600 cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => openProjectModal('ai-education-recommendation')}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-4xl mb-2">🎓</div>
                      <div className="text-sm font-medium">AI Education System</div>
                      <div className="text-xs mt-1 opacity-80">Click to view gallery</div>
                    </div>
                  </div>
                  
                  {/* Simple image counter */}
                  <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
                    5 Images
                  </div>
                  
                  {/* Simple dots */}
                  <div className="absolute bottom-2 right-2 flex gap-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
                    <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
                    <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
                    <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-purple-200">AI-Based Education Recommendation System</CardTitle>
                  <CardDescription className="text-purple-300/70">
                    Final Year Project (FYP) - AI-powered career recommendation platform with OpenAI integration and real-time counselor matching.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-purple-200/90 mb-4">
                    Django backend with OpenAI integration providing AI-based career recommendations based on student questionnaire responses. 
                    Features real-time career counselor matching, meeting alignment system, and personalized guidance platform.
                  </p>
                  <div className="flex gap-2 flex-wrap mb-4">
                    <Badge variant="secondary">Django</Badge>
                    <Badge variant="secondary">OpenAI API</Badge>
                    <Badge variant="secondary">JWT</Badge>
                    <Badge variant="secondary">Real-time Chat</Badge>
                  </div>
                  <div className="flex gap-3 mt-auto">
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-300"
                      onClick={() => window.open('https://ai-education-recommendation-demo.com', '_blank')}
                    >
                      🌐 Live Demo
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-purple-500/50 text-purple-200 hover:bg-purple-900/30 hover:border-cyan-400/50 hover:text-cyan-200 transition-all duration-300"
                      onClick={() => window.open('https://github.com/yourusername/ai-education-recommendation', '_blank')}
                    >
                      📁 GitHub
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="transition-all duration-300 h-full"
            >
              <Card className="bg-gradient-to-br from-purple-900/30 to-purple-800/10 border border-purple-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-300 overflow-hidden h-full flex flex-col backdrop-blur-sm">
                <div 
                  className="relative h-48 bg-gradient-to-br from-blue-500 to-cyan-600 cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => openProjectModal('sentiment-analysis')}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-4xl mb-2">📊</div>
                      <div className="text-sm font-medium">Sentiment Analysis</div>
                      <div className="text-xs mt-1 opacity-80">Click to view gallery</div>
                    </div>
                  </div>
                  
                  {/* Simple image counter */}
                  <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
                    5 Images
                  </div>
                  
                  {/* Simple dots */}
                  <div className="absolute bottom-2 right-2 flex gap-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
                    <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
                    <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
                    <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-purple-200">Sentiment Analysis on Twitter Dataset</CardTitle>
                  <CardDescription className="text-purple-300/70">
                    Machine Learning project performing sentiment analysis on 5,000 Twitter tweets dataset.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-purple-200/90 mb-4">
                    ML project analyzing sentiment on 5k Twitter dataset. Includes data preprocessing, feature extraction, 
                    multiple ML model training, and sentiment classification (positive, negative, neutral) with performance evaluation.
                  </p>
                  <div className="flex gap-2 flex-wrap mb-4">
                    <Badge variant="secondary">Python</Badge>
                    <Badge variant="secondary">Machine Learning</Badge>
                    <Badge variant="secondary">NLP</Badge>
                    <Badge variant="secondary">Scikit-learn</Badge>
                  </div>
                  <div className="flex gap-3 mt-auto">
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-300"
                      onClick={() => window.open('https://sentiment-analysis-demo.com', '_blank')}
                    >
                      🌐 Live Demo
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-purple-500/50 text-purple-200 hover:bg-purple-900/30 hover:border-cyan-400/50 hover:text-cyan-200 transition-all duration-300"
                      onClick={() => window.open('https://github.com/yourusername/sentiment-analysis', '_blank')}
                    >
                      📁 GitHub
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="transition-all duration-300 h-full"
            >
              <Card className="bg-gradient-to-br from-purple-900/30 to-purple-800/10 border border-purple-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-300 overflow-hidden h-full flex flex-col backdrop-blur-sm">
                <div 
                  className="relative h-48 bg-gradient-to-br from-indigo-500 to-purple-600 cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => openProjectModal('ml-models-training')}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-4xl mb-2">🤖</div>
                      <div className="text-sm font-medium">ML Models Training</div>
                      <div className="text-xs mt-1 opacity-80">Click to view gallery</div>
                    </div>
                  </div>
                  
                  {/* Simple image counter */}
                  <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
                    4 Images
                  </div>
                  
                  {/* Simple dots */}
                  <div className="absolute bottom-2 right-2 flex gap-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
                    <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
                    <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-purple-200">Machine Learning Models Training</CardTitle>
                  <CardDescription className="text-purple-300/70">
                    Collection of machine learning training projects demonstrating various algorithms and techniques.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-purple-200/90 mb-4">
                    Various small-scale ML projects showcasing different algorithms, data preprocessing techniques, 
                    feature engineering, model evaluation, hyperparameter tuning, and comparative analysis.
                  </p>
                  <div className="flex gap-2 flex-wrap mb-4">
                    <Badge variant="secondary">Python</Badge>
                    <Badge variant="secondary">Machine Learning</Badge>
                    <Badge variant="secondary">Scikit-learn</Badge>
                    <Badge variant="secondary">Data Science</Badge>
                  </div>
                  <div className="flex gap-3 mt-auto">
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-300"
                      onClick={() => window.open('https://ml-models-training-demo.com', '_blank')}
                    >
                      🌐 Live Demo
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-purple-500/50 text-purple-200 hover:bg-purple-900/30 hover:border-cyan-400/50 hover:text-cyan-200 transition-all duration-300"
                      onClick={() => window.open('https://github.com/yourusername/ml-models-training', '_blank')}
                    >
                      📁 GitHub
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Employment History Section */}
      <section id="experience" className="py-20 bg-gradient-to-b from-[#0a0a1a] to-[#1a0a2e] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-12"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Employment History
            </span>
          </motion.h2>
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Card className="relative bg-gradient-to-br from-purple-900/40 to-purple-800/20 border border-purple-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] transition-all duration-500 backdrop-blur-sm overflow-hidden group">
                {/* Animated glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full"></div>
                
                <CardHeader>
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="flex justify-between items-start flex-wrap gap-4 relative z-10"
                  >
                    <div>
                      <CardTitle className="text-2xl text-purple-200 group-hover:text-cyan-200 transition-colors duration-300">Backend Developer</CardTitle>
                      <CardDescription className="text-lg mt-1 text-purple-300/70 group-hover:text-purple-300 transition-colors duration-300">Techanzy Limited</CardDescription>
                    </div>
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      viewport={{ once: true }}
                      className="text-right relative z-10"
                    >
                      <p className="text-sm font-semibold text-cyan-300 group-hover:text-cyan-200 transition-colors duration-300">Jun 2025 — Present</p>
                      <p className="text-sm text-purple-300/60 group-hover:text-purple-300/80 transition-colors duration-300">Lahore, Punjab</p>
                    </motion.div>
                  </motion.div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-purple-200/90 relative z-10">
                    {[
                      'Built complete backend systems using Django + DRF, from models to production-ready APIs',
                      'Implemented secure authentication using JWT with full request/response validation',
                      'Designed and tested APIs extensively in Postman',
                      'Worked with real-time messaging using Socket.IO and optimized room/connection handling',
                      'Collaborated with frontend teams for smooth integration across Flutter and web platforms',
                      'Ensured clean error handling and proper database migrations for all features'
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start group/item"
                      >
                        <motion.span
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.4, delay: 0.5 + index * 0.1, type: "spring" }}
                          viewport={{ once: true }}
                          className="text-cyan-400 mr-3 mt-1 text-lg group-hover/item:text-green-400 transition-colors duration-300"
                        >
                          ✓
                        </motion.span>
                        <span className="group-hover/item:text-cyan-200 transition-colors duration-300">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Card className="relative bg-gradient-to-br from-cyan-900/30 to-cyan-800/10 border border-cyan-500/30 hover:border-purple-400/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] transition-all duration-500 backdrop-blur-sm overflow-hidden group">
                {/* Animated glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full"></div>
                
                <CardHeader>
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="flex justify-between items-start flex-wrap gap-4 relative z-10"
                  >
                    <div>
                      <CardTitle className="text-2xl text-cyan-200 group-hover:text-purple-200 transition-colors duration-300">Python Developer</CardTitle>
                      <CardDescription className="text-lg mt-1 text-cyan-300/70 group-hover:text-cyan-300 transition-colors duration-300">Digital Optimizer</CardDescription>
                    </div>
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      viewport={{ once: true }}
                      className="text-right relative z-10"
                    >
                      <p className="text-sm font-semibold text-purple-300 group-hover:text-purple-200 transition-colors duration-300">Jul 2023 — Mar 2024</p>
                      <p className="text-sm text-cyan-300/60 group-hover:text-cyan-300/80 transition-colors duration-300">UK</p>
                    </motion.div>
                  </motion.div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-cyan-200/90 relative z-10">
                    {[
                      'Developed machine learning models to enhance predictive analytics',
                      'Collaborated with data scientists to optimize algorithms and improve accuracy',
                      'Engaged in code reviews to maintain high-quality standards and best practices'
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start group/item"
                      >
                        <motion.span
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.4, delay: 0.5 + index * 0.1, type: "spring" }}
                          viewport={{ once: true }}
                          className="text-green-400 mr-3 mt-1 text-lg group-hover/item:text-cyan-400 transition-colors duration-300"
                        >
                          ✓
                        </motion.span>
                        <span className="group-hover/item:text-cyan-100 transition-colors duration-300">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-[#1a0a2e] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-500 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-12"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Education
            </span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <Card className="relative bg-gradient-to-br from-cyan-900/40 to-cyan-800/20 border border-cyan-500/30 hover:border-purple-400/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] transition-all duration-500 backdrop-blur-sm overflow-hidden group">
              {/* Animated glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full"></div>
              
              <CardHeader>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="flex justify-between items-start flex-wrap gap-4 relative z-10"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <CardTitle className="text-2xl text-cyan-200 group-hover:text-purple-200 transition-colors duration-300">BS Software Engineering</CardTitle>
                    <CardDescription className="text-lg mt-1 text-cyan-300/70 group-hover:text-cyan-300 transition-colors duration-300">The University of Lahore</CardDescription>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="text-right relative z-10"
                  >
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                      viewport={{ once: true }}
                      className="text-sm font-semibold text-purple-300 group-hover:text-purple-200 transition-colors duration-300"
                    >
                      Sept 2020 — Aug 2024
                    </motion.p>
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.7 }}
                      viewport={{ once: true }}
                      className="text-sm text-cyan-300/60 group-hover:text-cyan-300/80 transition-colors duration-300"
                    >
                      Lahore
                    </motion.p>
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 }}
                      viewport={{ once: true }}
                      className="text-sm font-semibold text-purple-300 group-hover:text-purple-200 transition-colors duration-300 mt-1"
                    >
                      GPA: 3.21/4.0
                    </motion.p>
                  </motion.div>
                </motion.div>
              </CardHeader>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-[#1a0a2e] to-[#0a0a1a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-8"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-purple-200/90 text-lg mb-8"
          >
            I&apos;m always interested in new opportunities and exciting backend development projects. 
            Let&apos;s discuss how we can work together to build scalable APIs and robust backend systems.
          </motion.p>
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="max-w-md mx-auto bg-gradient-to-br from-purple-900/50 to-purple-800/20 border border-purple-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-300 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-purple-200">Send me a message</CardTitle>
                <CardDescription className="text-purple-300/70">
                  Fill out the form below and I&apos;ll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Input 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name" 
                      required
                      className="bg-purple-900/30 border-purple-500/30 text-purple-200 placeholder:text-purple-400/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Input 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Your email" 
                      type="email"
                      required
                      className={`bg-purple-900/30 text-purple-200 placeholder:text-purple-400/50 transition-all duration-300 ${
                        emailError 
                          ? 'border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-400/20' 
                          : 'border-purple-500/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20'
                      }`}
                    />
                    {emailError && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm mt-1"
                      >
                        {emailError}
                      </motion.p>
                    )}
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Your message" 
                      required
                      className="bg-purple-900/30 border-purple-500/30 text-purple-200 placeholder:text-purple-400/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                      rows={4}
                    />
                  </motion.div>
                  
                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-green-400 text-sm text-center"
                    >
                      ✅ Message sent successfully! I&apos;ll get back to you soon.
                    </motion.div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm text-center"
                    >
                      ❌ Failed to send message. Please try again or email me directly.
                    </motion.div>
                  )}
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      type="submit"
                      disabled={isSubmitting || !!emailError}
                      className={`w-full transition-all duration-300 ${
                        isSubmitting || emailError
                          ? 'bg-purple-800/50 text-purple-300/50 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-400 hover:to-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]'
                      }`}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center gap-6 mt-8"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={copyEmailToClipboard}
                variant="outline" 
                className={`bg-gradient-to-r from-cyan-500 to-purple-600 text-white border-cyan-400/50 hover:from-cyan-400 hover:to-purple-500 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-300 ${
                  emailCopied ? 'bg-gradient-to-r from-green-500 to-emerald-600 border-green-400' : ''
                }`}
              >
                {emailCopied ? 'Email Copied! 📧' : 'Email Me'}
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={downloadResume}
                variant="outline" 
                className="bg-white text-black hover:bg-purple-500 hover:text-white transition-colors duration-300"
              >
                Download Resume
              </Button>
            </motion.div>
          </motion.div>
    </div>
      </section>

      {/* Project Image Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0a1a] border border-purple-500/30 rounded-lg max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.3)]">
            <div className="flex justify-between items-center p-4 border-b border-purple-500/30">
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {projectData[selectedProject as keyof typeof projectData]?.name} - Project Details
              </h3>
              <button
                onClick={closeProjectModal}
                className="text-purple-300 hover:text-cyan-400 text-3xl transition-colors duration-200 hover:scale-110"
              >
                ×
              </button>
            </div>
            
            <div className="flex h-[80vh]">
              {/* Left side - Images */}
              <div className="w-1/2 p-4 border-r border-purple-500/30">
                <div className="relative h-96">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={projectData[selectedProject as keyof typeof projectData]?.images[currentImageIndex]?.src}
                    alt={projectData[selectedProject as keyof typeof projectData]?.images[currentImageIndex]?.alt}
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/400x300/cccccc/666666?text=Image+Loading...';
                    }}
                  />
                  
                  {/* Navigation arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-purple-900/80 backdrop-blur-sm border border-purple-500/50 text-cyan-300 p-3 rounded-full hover:bg-purple-800/90 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-300"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-900/80 backdrop-blur-sm border border-purple-500/50 text-cyan-300 p-3 rounded-full hover:bg-purple-800/90 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-300"
                  >
                    →
                  </button>
                </div>
                
                {/* Image counter and description */}
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-purple-300">
                    {currentImageIndex + 1} of {projectData[selectedProject as keyof typeof projectData]?.images.length} images
                  </p>
                  <p className="text-sm text-purple-400/70">
                    {projectData[selectedProject as keyof typeof projectData]?.images[currentImageIndex]?.alt}
                  </p>
                </div>
                
                {/* Thumbnail navigation */}
                <div className="mt-4 flex gap-2 overflow-x-auto">
                  {projectData[selectedProject as keyof typeof projectData]?.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        index === currentImageIndex ? 'border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)] scale-110' : 'border-purple-500/30 hover:border-purple-400/50'
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/64x64/cccccc/666666?text=...';
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right side - Project Information */}
              <div className="w-1/2 p-6 overflow-y-auto">
                <div className="space-y-6">
                  {/* Project Description */}
                  <div>
                    <h4 className="text-lg font-semibold text-cyan-300 mb-2">Project Description</h4>
                    <p className="text-purple-200/90 leading-relaxed">
                      {projectData[selectedProject as keyof typeof projectData]?.description}
                    </p>
                  </div>

                  {/* Technologies Used */}
                  <div>
                    <h4 className="text-lg font-semibold text-cyan-300 mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {projectData[selectedProject as keyof typeof projectData]?.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 text-cyan-200 rounded-full text-sm font-medium hover:border-cyan-400/50 hover:shadow-[0_0_10px_rgba(34,211,238,0.3)] transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div>
                    <h4 className="text-lg font-semibold text-cyan-300 mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {projectData[selectedProject as keyof typeof projectData]?.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-cyan-400 mr-2 mt-1 text-xl">✓</span>
                          <span className="text-purple-200/90">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Project Links */}
                  <div>
                    <h4 className="text-lg font-semibold text-cyan-300 mb-3">Project Links</h4>
                    <div className="space-y-3">
                      <a
                        href={projectData[selectedProject as keyof typeof projectData]?.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-400 hover:to-blue-500 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-300"
                      >
                        <span>🌐</span>
                        <span>Live Demo</span>
                      </a>
                      <a
                        href={projectData[selectedProject as keyof typeof projectData]?.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg hover:from-purple-500 hover:to-purple-700 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300"
                      >
                        <span>📁</span>
                        <span>GitHub Repository</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
