import { useState } from "react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState("");

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Saving...");

        try {
            const res = await fetch("http://localhost:5000/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("✅ Details saved successfully!");
                setFormData({ name: "", email: "", message: "" });
            } else {
                setStatus(`❌ ${data.error}`);
            }
        } catch (err) {
            console.error(err);
            setStatus("❌ Failed to save. Please try again.");
        }
    };

    return (
        <section
            id="contact"
            className="mx-7 px-6 py-10 sm:px-6 md:px-16 lg:px-24 bg-gray-100 rounded-2xl shadow-lg"
        >
            <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center md:items-start gap-12">
                {/* Left Section - Text + Form */}
                <div className="w-full md:w-1/2">
                    <h3 className="text-4xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900 text-center md:text-left">
                        Contact Us
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-8 leading-relaxed text-center md:text-left">
                        We’re here to help you succeed! Whether you’re a developer looking
                        for opportunities or a team seeking collaboration tools, our support
                        team is ready to assist you.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full text-black border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full text-black border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <textarea
                            name="message"
                            placeholder="Message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full text-black border border-gray-300 p-3 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="bg-black text-white w-full py-3 rounded-lg hover:bg-[#5465ff] transition cursor-pointer"
                        >
                            Send Message
                        </button>
                    </form>

                    {status && (
                        <p className="text-center mt-4 text-gray-700 font-medium">
                            {status}
                        </p>
                    )}
                </div>

                {/* Right Section - Illustration */}
                <div className="w-full md:w-1/2 hidden md:block justify-center md:justify-end">
                    <img
                        src="/Images/Mask.png"
                        alt="Contact Illustration"
                        className="w-full md:w-[90%] lg:w-[80%] max-w-xl object-contain drop-shadow-md md:ml-auto h-1/2"
                    />
                </div>
            </div>
        </section>
    );
}
