import { useState } from "react";
import MainLayout from "../layouts/MainLayout";

function Contact() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (

    <MainLayout>

      <section className="px-8 py-24 max-w-4xl mx-auto">

        <h1 className="text-5xl font-bold text-center text-[#1A1A1A]">

          Contact Us

        </h1>

        <p className="mt-6 text-center text-[#6B6B6B]">

          Questions, partnerships,
          or support requests.

        </p>

        <div className="mt-16 bg-white border border-[#E0DCD5] rounded-2xl p-10">

          <form onSubmit={handleSubmit} className="space-y-8">

            <div>

              <label className="block text-sm text-[#6B6B6B] mb-3 font-medium">

                Full Name

              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="
                  w-full
                  bg-[#F5F3EF]
                  border border-[#E0DCD5]
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  focus:border-[#D4A574]
                  transition
                "
              />

            </div>

            <div>

              <label className="block text-sm text-[#6B6B6B] mb-3 font-medium">

                Email

              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="
                  w-full
                  bg-[#F5F3EF]
                  border border-[#E0DCD5]
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  focus:border-[#D4A574]
                  transition
                "
              />

            </div>

            <div>

              <label className="block text-sm text-[#6B6B6B] mb-3 font-medium">

                Message

              </label>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                placeholder="Your message..."
                required
                className="
                  w-full
                  bg-[#F5F3EF]
                  border border-[#E0DCD5]
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  focus:border-[#D4A574]
                  transition
                "
              />

            </div>

            <button 
              type="submit"
              className="w-full bg-[#1A1A1A] text-white py-4 rounded-2xl font-semibold hover:bg-[#333333] transition"
            >

              Send Message

            </button>

          </form>

        </div>

      </section>

    </MainLayout>
  );
}

export default Contact;