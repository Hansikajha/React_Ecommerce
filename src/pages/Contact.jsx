import React, { useState } from "react";
import { FiBook, FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for contacting us!");
    setFormData({ name: "", email: "", message: "" });
  };

  const contactCards = [
    {
      title: "Documentation",
      subtitle: "abcd.com/docs",
      isLink: true,
      href: "https://abcd.com/docs",
      Icon: FiBook,
    },
    {
      title: "Our Email",
      subtitle: "hello@mail.com",
      Icon: FiMail,
    },
    {
      title: "Phone",
      subtitle: "+977 1252497852",
      Icon: FiPhone,
    },
    {
      title: "Visit Us",
      subtitle: "Kathmandu, Nepal",
      Icon: FiMapPin,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Contact Us
        </h1>
        <p className="text-gray-600">
          Have a question or need assistance? Fill out the form below and we'll get back to you as soon as possible.
        </p>
      </div>

      {/* Contact Form & Info */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Form */}
        <div className="bg-white p-8 rounded-xl shadow-md h-full">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="message">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-gray-800 text-white font-medium py-3 rounded-lg hover:bg-[#CD2C58] transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info Grid */}
        <div className="bg-white p-8 rounded-xl shadow-md flex flex-col h-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
            {contactCards.map(({ title, subtitle, Icon, isLink, href }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 text-xl mb-4">
                  <Icon />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
                {isLink ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    {subtitle}
                  </a>
                ) : (
                  <p className="text-gray-500">{subtitle}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
