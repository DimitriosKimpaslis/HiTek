import { Container } from '@mui/material';
import React from 'react';

const About = () => {
    return (
        <div className="bg-white p-4 h-screen">
            <div className="text-center mb-8">
                <img
                    src={require('../logo.png')} // Replace with the URL of your image
                    alt="Our Team"
                    className="w-48 h-48 mx-auto rounded-full shadow-lg"
                />
            </div>
            <Container className='text-justify pb-10'>
                <h1 className="text-3xl font-bold mb-4 text-center">Welcome to Our Tech E-commerce Store</h1>
                <p className="text-gray-700 text-center">
                    At HiTek, we are dedicated to bringing you the latest and greatest in the world of technology. Our passion for innovation and commitment to quality drive everything we do. We believe that technology should be accessible to everyone, and we're here to make that a reality for you.
                </p>
            </Container>
            <Container className='text-justify bg-gray-900 pt-5 pb-8'>
                <p className="text-white mt-4 text-center">
                    Our journey began with a small team of tech enthusiasts who shared a common vision: to provide our customers with cutting-edge gadgets, electronics, and accessories that enhance their digital lives. Today, we're proud to offer a wide range of products, carefully curated to meet your diverse needs.
                </p>
            </Container>
            <Container className='text-justify pb-10'>
                <p className="text-gray-700 mt-4 text-center">
                    Our team is not just about selling products; it's about building relationships. We value your trust and are committed to delivering an exceptional shopping experience. Our customer support team is always ready to assist you and provide guidance, ensuring that you make the right choices.
                </p>
                <p className="text-gray-700 mt-4 text-center">
                    We're excited to be part of your tech journey and look forward to serving you. Thank you for choosing us as your tech shopping destination.
                </p>
            </Container>

        </div>
    );
}

export default About;
