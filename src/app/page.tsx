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
        { src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop', alt: 'Rishta App - Homepage' },
        { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop', alt: 'Rishta App - User Profiles' },
        { src: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=300&fit=crop', alt: 'Rishta App - Admin Panel' },
        { src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop', alt: 'Rishta App - Search & Filter' }
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
        { src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop', alt: 'ArabSocials - Community Feed' },
        { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop', alt: 'ArabSocials - User Profiles' },
        { src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop', alt: 'ArabSocials - Post Creation' },
        { src: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=300&fit=crop', alt: 'ArabSocials - Comments System' },
        { src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop', alt: 'ArabSocials - Country Restrictions' }
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
        { src: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop', alt: 'Nestly - Property Listings' },
        { src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop', alt: 'Nestly - Property Details' },
        { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop', alt: 'Nestly - User Authentication' },
        { src: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop', alt: 'Nestly - Search & Filters' },
        { src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop', alt: 'Nestly - Favorites' },
        { src: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=300&fit=crop', alt: 'Nestly - Admin Dashboard' }
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
        { src: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop', alt: 'Listico - Property Management' },
        { src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop', alt: 'Listico - Property Creation' },
        { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop', alt: 'Listico - Image Upload' },
        { src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop', alt: 'Listico - Notifications' },
        { src: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=300&fit=crop', alt: 'Listico - Analytics' },
        { src: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=300&fit=crop', alt: 'Listico - Admin Panel' },
        { src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop', alt: 'Listico - Contact System' }
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
        { src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop', alt: 'Booking App - Dashboard' },
        { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop', alt: 'Booking App - Organization Management' },
        { src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop', alt: 'Booking App - Booking Creation' }
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
        { src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop', alt: 'AI Education System - Dashboard' },
        { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop', alt: 'AI Education System - Questionnaire' },
        { src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop', alt: 'AI Education System - Recommendations' },
        { src: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=300&fit=crop', alt: 'AI Education System - Counselor Matching' }
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
        { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop', alt: 'Sentiment Analysis - Data Processing' },
        { src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop', alt: 'Sentiment Analysis - Model Training' },
        { src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop', alt: 'Sentiment Analysis - Results' }
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
        { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop', alt: 'ML Training - Data Analysis' },
        { src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop', alt: 'ML Training - Model Development' },
        { src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop', alt: 'ML Training - Results' }
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
    <main className="bg-gray-100">
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section */}
      <section id="home" className="bg-black text-white py-30">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold mb-8 hover:text-purple-400 transition-colors duration-300"
          >
            Hi, I&apos;m Maryam Amanat
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl mb-8"
          >
            Software Engineer specializing in Python, Django, and Machine Learning
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={copyEmailToClipboard}
                className={`bg-white text-black hover:bg-purple-500 transition-all duration-300 ${
                  emailCopied ? 'bg-green-500 text-white' : ''
                }`}
              >
                {emailCopied ? 'Email Copied! 📧' : 'Get In Touch'}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-30 bg-black">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center mb-8 text-white"
          >
            About Me
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-100 text-lg text-center max-w-2xl mx-auto"
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
      <section id="skills" className="py-30 bg-black">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center mb-20 text-white"
          >
            My Skills
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="h-full"
            >
              <Card className="bg-white hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2">⚙️</div>
                  <CardTitle>Backend Development</CardTitle>
                </CardHeader>
                <CardContent className="text-center flex-1 flex flex-col justify-center">
                  <p className="text-gray-600">Python (Experienced), Django (Experienced), Django REST Framework (Expert), JWT (Experienced), Sockets (Skillful)</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-full"
            >
              <Card className="bg-white hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2">💻</div>
                  <CardTitle>Web & Development</CardTitle>
                </CardHeader>
                <CardContent className="text-center flex-1 flex flex-col justify-center">
                  <p className="text-gray-600">Web Development (Skillful), Backend Development (Skillful), Machine Learning (Skillful), Data Visualization (Skillful)</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-full"
            >
              <Card className="bg-white hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2">🛠️</div>
                  <CardTitle>Tools & Design</CardTitle>
                </CardHeader>
                <CardContent className="text-center flex-1 flex flex-col justify-center">
                  <p className="text-gray-600">Git (Expert), Docker (Experienced), Figma (Skillful), Canva Design (Expert)</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-30 bg-black">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center mb-12 text-white"
          >
            My Projects
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="transition-all duration-300 h-full"
            >
              <Card className="bg-gray-100 hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col">
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
                  <CardTitle>Mehrum App</CardTitle>
                  <CardDescription>
                    Matchmaking/Matrimonial Platform - Complete Backend Development with Django REST, real-time chat, and admin workflows.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-gray-800 mb-4">
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
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => window.open('https://rishta-app-demo.com', '_blank')}
                    >
                      🌐 Live Demo
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-gray-300 hover:bg-gray-50"
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
              <Card className="bg-gray-100 hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col">
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
                  <CardTitle>Nestly</CardTitle>
                  <CardDescription>
                    A comprehensive real estate platform with advanced authentication, social logins, and property management system.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-gray-800 mb-4">
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
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => window.open('https://nestly-demo.com', '_blank')}
                    >
                      🌐 Live Demo
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-gray-300 hover:bg-gray-50"
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
              <Card className="bg-gray-100 hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col">
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
                  <CardTitle>Listico</CardTitle>
                  <CardDescription>
                    A comprehensive property management platform with advanced features and admin dashboard.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-gray-800 mb-4">
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
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => window.open('https://listico-demo.com', '_blank')}
                    >
                      🌐 Live Demo
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-gray-300 hover:bg-gray-50"
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
              <Card className="bg-gray-100 hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col">
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
                  <CardTitle>Arab Socials</CardTitle>
                  <CardDescription>
                    Social Media Platform with country-based restrictions and complete post module with nested comments.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-gray-800 mb-4">
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
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => window.open('https://arabsocials-demo.com', '_blank')}
                    >
                      🌐 Live Demo
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-gray-300 hover:bg-gray-50"
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
              <Card className="bg-gray-100 hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col">
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
                    3 Images
                  </div>
                  
                  {/* Simple dots */}
                  <div className="absolute bottom-2 right-2 flex gap-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
                    <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>Organization-Based Booking System</CardTitle>
                  <CardDescription>
                    Multi-organization booking structure where each organization manages its own booking workflows.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-gray-800 mb-4">
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
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => window.open('https://booking-app-demo.com', '_blank')}
                    >
                      🌐 Live Demo
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-gray-300 hover:bg-gray-50"
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
              <Card className="bg-gray-100 hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col">
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
                  <CardTitle>AI-Based Education Recommendation System</CardTitle>
                  <CardDescription>
                    Final Year Project (FYP) - AI-powered career recommendation platform with OpenAI integration and real-time counselor matching.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-gray-800 mb-4">
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
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => window.open('https://ai-education-recommendation-demo.com', '_blank')}
                    >
                      🌐 Live Demo
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-gray-300 hover:bg-gray-50"
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
              <Card className="bg-gray-100 hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col">
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
                    3 Images
                  </div>
                  
                  {/* Simple dots */}
                  <div className="absolute bottom-2 right-2 flex gap-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
                    <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>Sentiment Analysis on Twitter Dataset</CardTitle>
                  <CardDescription>
                    Machine Learning project performing sentiment analysis on 5,000 Twitter tweets dataset.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-gray-800 mb-4">
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
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => window.open('https://sentiment-analysis-demo.com', '_blank')}
                    >
                      🌐 Live Demo
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-gray-300 hover:bg-gray-50"
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
              <Card className="bg-gray-100 hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col">
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
                    3 Images
                  </div>
                  
                  {/* Simple dots */}
                  <div className="absolute bottom-2 right-2 flex gap-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
                    <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>Machine Learning Models Training</CardTitle>
                  <CardDescription>
                    Collection of machine learning training projects demonstrating various algorithms and techniques.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-gray-800 mb-4">
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
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => window.open('https://ml-models-training-demo.com', '_blank')}
                    >
                      🌐 Live Demo
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-gray-300 hover:bg-gray-50"
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
      <section id="experience" className="py-30 bg-black">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center mb-12 text-white"
          >
            Employment History
          </motion.h2>
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="bg-gray-100 hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start flex-wrap gap-4">
                    <div>
                      <CardTitle className="text-2xl">Backend Developer</CardTitle>
                      <CardDescription className="text-lg mt-1">Techanzy Limited</CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-700">Jun 2025 — Present</p>
                      <p className="text-sm text-gray-600">Lahore, Punjab</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-800">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      <span>Built complete backend systems using Django + DRF, from models to production-ready APIs</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      <span>Implemented secure authentication using JWT with full request/response validation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      <span>Designed and tested APIs extensively in Postman</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      <span>Worked with real-time messaging using Socket.IO and optimized room/connection handling</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      <span>Collaborated with frontend teams for smooth integration across Flutter and web platforms</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      <span>Ensured clean error handling and proper database migrations for all features</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-gray-100 hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start flex-wrap gap-4">
                    <div>
                      <CardTitle className="text-2xl">Python Developer</CardTitle>
                      <CardDescription className="text-lg mt-1">Digital Optimizer</CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-700">Jul 2023 — Mar 2024</p>
                      <p className="text-sm text-gray-600">UK</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-800">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      <span>Developed machine learning models to enhance predictive analytics</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      <span>Collaborated with data scientists to optimize algorithms and improve accuracy</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      <span>Engaged in code reviews to maintain high-quality standards and best practices</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-30 bg-black">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center mb-12 text-white"
          >
            Education
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="bg-gray-100 hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div>
                    <CardTitle className="text-2xl">BS Software Engineering</CardTitle>
                    <CardDescription className="text-lg mt-1">The University of Lahore</CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-700">Sept 2020 — Aug 2024</p>
                    <p className="text-sm text-gray-600">Lahore</p>
                    <p className="text-sm font-semibold text-gray-700 mt-1">GPA: 3.21/4.0</p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-30 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-8 text-white"
          >
            Get In Touch
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-100 text-lg mb-8"
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
            <Card className="max-w-md mx-auto bg-gray-800 border-gray-700 hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-white">Send me a message</CardTitle>
                <CardDescription className="text-gray-300">
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
                      className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-purple-400 transition-colors duration-300"
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
                      className={`bg-gray-800 text-white placeholder:text-gray-400 transition-colors duration-300 ${
                        emailError 
                          ? 'border-red-500 focus:border-red-400' 
                          : 'border-gray-600 focus:border-purple-400'
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
                      className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-purple-400 transition-colors duration-300"
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
                      className={`w-full transition-colors duration-300 ${
                        isSubmitting || emailError
                          ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                          : 'bg-white text-black hover:bg-purple-500 hover:text-white'
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
                className={`bg-white text-black hover:bg-purple-500 hover:text-white transition-colors duration-300 ${
                  emailCopied ? 'bg-green-500 text-white border-green-500' : ''
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
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-2xl font-semibold">
                {projectData[selectedProject as keyof typeof projectData]?.name} - Project Details
              </h3>
              <button
                onClick={closeProjectModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="flex h-[80vh]">
              {/* Left side - Images */}
              <div className="w-1/2 p-4 border-r">
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
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                  >
                    →
                  </button>
                </div>
                
                {/* Image counter and description */}
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-gray-600">
                    {currentImageIndex + 1} of {projectData[selectedProject as keyof typeof projectData]?.images.length} images
                  </p>
                  <p className="text-sm text-gray-500">
                    {projectData[selectedProject as keyof typeof projectData]?.images[currentImageIndex]?.alt}
                  </p>
                </div>
                
                {/* Thumbnail navigation */}
                <div className="mt-4 flex gap-2 overflow-x-auto">
                  {projectData[selectedProject as keyof typeof projectData]?.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                        index === currentImageIndex ? 'border-blue-500' : 'border-gray-300'
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
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Project Description</h4>
                    <p className="text-gray-600 leading-relaxed">
                      {projectData[selectedProject as keyof typeof projectData]?.description}
                    </p>
                  </div>

                  {/* Technologies Used */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {projectData[selectedProject as keyof typeof projectData]?.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {projectData[selectedProject as keyof typeof projectData]?.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-2 mt-1">✓</span>
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Project Links */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Project Links</h4>
                    <div className="space-y-3">
                      <a
                        href={projectData[selectedProject as keyof typeof projectData]?.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <span>🌐</span>
                        <span>Live Demo</span>
                      </a>
                      <a
                        href={projectData[selectedProject as keyof typeof projectData]?.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
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
