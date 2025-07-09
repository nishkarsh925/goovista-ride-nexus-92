import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Star, Users, Award, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const stats = [
  { number: '50K+', label: 'Happy Customers', icon: Users },
  { number: '24/7', label: 'Service Available', icon: Clock },
  { number: '4.9★', label: 'Average Rating', icon: Star },
  { number: '500+', label: 'Professional Drivers', icon: Award },
];

const features = [
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'All our drivers are thoroughly vetted and vehicles are regularly inspected for your safety.',
  },
  {
    icon: Clock,
    title: 'Always On Time',
    description: 'We pride ourselves on punctuality. Your time is valuable, and we respect that.',
  },
  {
    icon: Star,
    title: 'Premium Service',
    description: 'Experience luxury and comfort with our premium fleet and professional service.',
  },
  {
    icon: Globe,
    title: 'City-Wide Coverage',
    description: 'Available across the entire metropolitan area with comprehensive coverage.',
  },
];

const AboutSection: React.FC = () => {
  return (
    <div className="py-24 bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-primary">Goovista</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're revolutionizing urban transportation with premium taxi services that prioritize 
            safety, comfort, and reliability. Your journey matters to us.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-1">{stat.number}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-20"
        >
          <div>
            <h3 className="text-3xl font-bold mb-6">Our Story</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded in 2020, Goovista emerged from a simple vision: to transform the way people 
                move around the city. We noticed that traditional taxi services often fell short of 
                modern expectations for reliability, comfort, and customer service.
              </p>
              <p>
                Starting with just 10 drivers and a commitment to excellence, we've grown into the 
                city's most trusted ride service. Our success stems from treating every passenger 
                like family and every journey as an opportunity to exceed expectations.
              </p>
              <p>
                Today, we're proud to serve thousands of customers daily, maintaining the same values 
                that started our journey: safety first, service always, and smiles guaranteed.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🚕</div>
                <h4 className="text-2xl font-bold mb-2">Serving Since 2020</h4>
                <p className="text-muted-foreground">Growing stronger every day</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-3xl font-bold text-center mb-12">Why Choose Goovista?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-12">
            <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              To provide safe, reliable, and comfortable transportation services that connect people 
              to their destinations and opportunities. We're not just moving passengers; we're 
              facilitating connections, enabling possibilities, and making every journey count.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;