import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('Sending message...');

    try {
      // Using a different email service - EmailJS or direct FormSubmit.co integration
      const response = await fetch('https://formsubmit.co/ajax/prabhuavula7@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: 'New Portfolio Message',
          _template: 'table'
        })
      });

      if (response.ok) {
        setSubmitStatus('Message sent successfully! I will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitStatus(''), 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setSubmitStatus('Failed to send message. Please try again or email me directly at prabhuavula7@gmail.com');
      setTimeout(() => setSubmitStatus(''), 8000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-section-light dark:bg-section-dark transition-colors duration-300">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-heading">Get In Touch</h2>

        <div className="max-w-4xl mx-auto">
          {/* Mac-style window */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
            {/* Window title bar */}
            <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 px-6 py-4 flex items-center space-x-3 border-b border-gray-700/50">
              <div className="flex space-x-3">
                <div className="w-4 h-4 bg-red-500 rounded-full shadow-sm hover:bg-red-400 transition-colors duration-200"></div>
                <div className="w-4 h-4 bg-yellow-500 rounded-full shadow-sm hover:bg-yellow-400 transition-colors duration-200"></div>
                <div className="w-4 h-4 bg-green-500 rounded-full shadow-sm hover:bg-green-400 transition-colors duration-200"></div>
              </div>
              <div className="flex-1 text-center">
                <span style={{color: 'white'}} className="text-base font-medium tracking-wide">Contact Form</span>
              </div>
              <div className="w-16"></div>
            </div>
            
            {/* Form content */}
            <div className="p-8 md:p-12 bg-white dark:bg-gray-950">
              <p className="text-center text-lg text-content mb-8 font-medium">
                Have a question, a project in mind, or just want to say hello? Feel free to reach out!
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-content mb-2 uppercase tracking-wide">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-input border border-input rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-input text-base"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-content mb-2 uppercase tracking-wide">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-input border border-input rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-input text-base"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-content mb-2 uppercase tracking-wide">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="6"
                    required
                    className="w-full px-4 py-3 bg-input border border-input rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-input text-base resize-none"
                    placeholder="Tell me about your project or just say hello!"
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => {
                      
                      // Manually trigger form submission
                      if (formData.name && formData.email && formData.message) {
                        handleSubmit({ preventDefault: () => {} });
                      }
                    }}
                    className="btn-primary w-full px-8 py-4 text-lg font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>

              {submitStatus && (
                <div className={`mt-6 p-4 rounded-xl text-center text-sm font-medium ${
                  submitStatus.includes('successfully') 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' 
                    : submitStatus.includes('Failed') 
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                    : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                }`}>
                  {submitStatus}
                </div>
              )}

              <div className="mt-8 text-center text-sm text-content opacity-70">
                <p>Or email me directly at: <a href="mailto:prabhuavula7@gmail.com" className="text-primary hover:text-accent transition-colors duration-200">prabhuavula7@gmail.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
