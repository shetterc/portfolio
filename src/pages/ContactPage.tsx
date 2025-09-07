import React /* , { useState } */ from 'react';
import { Mail, Linkedin, MapPin /*, Send, CheckCircle */ } from 'lucide-react';

export const ContactPage: React.FC = () => {
  /* 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  */

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            I'm always interested in connecting with fellow researchers, discussing new opportunities, 
            or collaborating on research projects. Let's start a conversation!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Let's Start a Conversation
            </h2>
            
            <div className="space-y-6 mb-12">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4">
                  <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Email</p>
                  <a 
                    href="mailto:cshetter4@protonmail.com" 
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    cshetter4@protonmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4">
                  <Linkedin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">LinkedIn</p>
                  <a 
                    href="https://linkedin.com/in/clarkshetter" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    linkedin.com/in/clarkshetter
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4">
                  <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Location</p>
                  <p className="text-gray-600 dark:text-gray-400">San Diego, CA</p>
                </div>
              </div>
            </div>

            {/* What I'm Looking For */}
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                What I'm Looking For
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• UX Research and Research Operations roles</li>
                <li>• Freelance research projects and consulting</li>
                <li>• Research collaboration opportunities</li>
                <li>• Speaking at UX events and meetups</li>
                <li>• Connecting with fellow researchers</li>
              </ul>
            </div>
          </div>

          {/* Contact Form - Commented out for later implementation */}
          {/* 
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Send me a message
              </h2>

              {isSubmitted && (
                <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-4 mb-6 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" />
                  <p className="text-green-800 dark:text-green-200">
                    Thanks for your message! I'll get back to you soon.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                ... form fields ...
              </form>
            </div>
          </div>
          */}

          {/* Mailto Link */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Send me a message
              </h2>
              
              <div className="space-y-6">
                <Mail className="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto" />
                
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Ready to start a conversation? Send me an email and I'll get back to you within 24-48 hours.
                </p>
                
                <a
                  href="mailto:cshetter4@protonmail.com?subject=Let's Connect - Portfolio Contact"
                  className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium transition-colors duration-200 text-lg"
                >
                  <Mail size={24} className="mr-3" />
                  Send Email
                </a>
                
                <div className="mt-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Or copy my email address:{' '}
                    <span className="text-blue-600 dark:text-blue-400 font-mono">
                      cshetter4@protonmail.com
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Response Time */}
        {/* <div className="text-center mt-16 bg-gray-50 dark:bg-gray-800 rounded-xl p-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Response Time
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            I typically respond to messages within 24-48 hours. For urgent matters, 
            feel free to reach out via LinkedIn for a quicker response.
          </p>
        </div> */}
      </div>
    </div>
  );
};