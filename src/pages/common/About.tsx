import React from 'react';
import { CheckCircle } from 'lucide-react';
import Heading from '@/components/common/landing/Heading';

const About: React.FC = () => {


    const points: string[] = [
        "Smart Scheduling Platform – Slotflow helps businesses and professionals manage appointments, bookings, and schedules with ease.",
        "Seamless User Experience – Built with a modern, intuitive interface so both providers and customers can book and manage slots effortlessly.",
        "Role-based Access – Supports multiple roles (Users, Providers, Admins) with tailored dashboards and features for each.",
        "Subscription Plans – Flexible tiered subscription model (Free, Starter, Professional, Enterprise) so providers can choose the features that fit their needs.",
        "Automated Workflows – Reduces manual overhead by automating booking confirmations, reminders, and updates.",
        "Real-time Updates – Stay synced with instant notifications and real-time slot availability.",
        "Scalable & Secure – Designed with scalability in mind, ensuring smooth performance and secure handling of user data.",
        "Analytics & Insights – Providers get access to insights and revenue stats to track business growth.",
        "Customizable Features – From address management to profile settings, providers can fully manage their presence on the platform.",
        "Future-ready – Continuously evolving with new features, integrations, and enhancements based on user needs."
    ];

    return (
        <section id="about" className="w-full py-16 bg-[var(--background)]">
            <div className="max-w-7xl mx-auto px-4 md:px-0">

                <Heading
                    heading="About Us"
                    headingDescription="Know more about us"
                />

                <ul className="space-y-4" data-aos="fade-up">
                    {points.map((point, index) => (
                        <li key={index} className="flex items-start gap-3" >
                            <CheckCircle className="text-[var(--mainColor)] w-5 h-5 shrink-0 mt-1" />
                            <span className="text-sm md:text-lg">{point || "loading..."}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default About