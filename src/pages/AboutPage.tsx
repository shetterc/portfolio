import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, BookOpen, Target, Zap } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useAboutPageData } from '../hooks/useAboutData';

export const AboutPage: React.FC = () => {
  const { aboutData, loading } = useAboutPageData();
  
  const skills = [
    'User Interviews',
    'Usability Testing',
    'Survey Design',
    'A/B Testing',
    'Card Sorting',
    'Journey Mapping',
    'Persona Development',
    'Competitive Analysis',
    'Research Repository',
    'Tool Implementation',
    'Process Design',
    'Team Training',
    'Stakeholder Management',
    'Data Analysis',
    'Prototyping',
    'Workshop Facilitation'
  ];

  const tools = [
    'UserTesting.com',
    'Maze',
    'Figma',
    'Dovetail',
    'Airtable',
    'Notion',
    'Miro',
    'Optimal Workshop',
    'Hotjar',
    'Google Analytics',
    'Typeform',
    'Calendly',
    'Slack',
    'Zoom'
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            {aboutData ? (
              <img 
                src="/portfolio/images/clark-about.jpg"
                alt="Clark - UX Researcher"
                className="w-40 h-48 md:w-48 md:h-60 rounded-2xl mx-auto object-cover shadow-lg"
              />
            ) : (
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full mx-auto mb-8 flex items-center justify-center text-white text-4xl font-bold">
                UX
              </div>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About Clark
          </h1>
        </div>

        {/* Dynamic Content from Airtable */}
        {loading.isLoading ? (
          <section className="mb-16">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
          </section>
        ) : loading.error ? (
          <section className="mb-16 text-center">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Error Loading Content</h2>
              <p className="text-red-600 dark:text-red-400 mb-6">{loading.error}</p>
              <button
                onClick={() => window.location.reload()}
                className="btn-primary"
              >
                Retry
              </button>
            </div>
          </section>
        ) : aboutData?.fields.description ? (
          <section className="mb-16">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <ReactMarkdown>{aboutData.fields.description}</ReactMarkdown>
            </div>
          </section>
        ) : (
          <section className="mb-16 text-center">
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-4">Content Not Available</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">About page content is not currently available.</p>
              <Link to="/" className="btn-primary">
                Return to Home
              </Link>
            </div>
          </section>
        )}

        {/* Approach */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-research-100 dark:bg-research-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-research-600 dark:text-research-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Research-Driven
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Every recommendation is backed by solid research methodology and validated insights 
                from real users.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-ops-100 dark:bg-ops-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-ops-600 dark:text-ops-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Strategic
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                I align research efforts with business goals and ensure insights directly inform 
                product decisions.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-gray-600 dark:text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Scalable
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                I build systems and processes that enable teams to conduct research efficiently 
                and make data-driven decisions independently.
              </p>
            </div>
          </div>
        </section>

        {/* Skills & Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Skills */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Skills & Methods
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Tools & Platforms
            </h2>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool, index) => (
                <span
                  key={index}
                  className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Experience */}
        {/* <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Experience</h2>
          <div className="space-y-8">
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                UX Researcher
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">Current Role • 2022 - Present</p>
              <ul className="text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Lead research studies from planning through insight delivery</li>
                <li>• Conduct user interviews, usability tests, and surveys</li>
                <li>• Collaborate with product and design teams to inform decision-making</li>
                <li>• Contribute to research operations and process improvements</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-teal-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Research Operations Contributor
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">Various Projects • 2021 - Present</p>
              <ul className="text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Built and maintained research repositories</li>
                <li>• Created templates and processes for research consistency</li>
                <li>• Facilitated research knowledge sharing across teams</li>
                <li>• Supported recruitment and tooling workflows</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-gray-400 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Junior UX Researcher
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">Previous Role • 2020 - 2022</p>
              <ul className="text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Supported research projects with data collection and analysis</li>
                <li>• Conducted moderated and unmoderated usability testing</li>
                <li>• Synthesized findings and created research reports</li>
                <li>• Collaborated with cross-functional teams on product improvements</li>
              </ul>
            </div>
          </div>
        </section> */}

        {/* Education */}
        {/* <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Education</h2>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Master of Science in Human-Computer Interaction
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">University Name • 2018</p>
            <p className="text-gray-600 dark:text-gray-400">
              Specialized in user research methodologies, information architecture, and interaction design.
            </p>
          </div>
        </section> */}

        {/* CTA */}
        <section className="text-center bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Let's Collaborate
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            I'm always interested in discussing new opportunities, research challenges, 
            or potential collaborations. Feel free to reach out!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-primary inline-flex items-center justify-center"
            >
              <Mail size={20} className="mr-2" />
              Get In Touch
            </Link>
            {/* <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center justify-center"
            >
              <Download size={20} className="mr-2" />
              Download Resume
            </a> */}
          </div>
        </section>
      </div>
    </div>
  );
};