import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const pricingPlans = [
  {
    name: 'Pay As You Go',
    description: 'Perfect for occasional rides',
    price: 'From $8',
    period: 'per ride',
    features: [
      'Standard sedan vehicles',
      'Real-time tracking',
      '24/7 customer support',
      'Safe & reliable drivers',
      'Cashless payments',
    ],
    popular: false,
    buttonText: 'Book Now',
    color: 'default',
  },
  {
    name: 'Goovista Plus',
    description: 'Great for regular commuters',
    price: '$29.99',
    period: 'per month',
    features: [
      'All Pay As You Go features',
      'Priority booking',
      '15% discount on all rides',
      'Premium vehicle options',
      'No surge pricing',
      'Ride scheduling',
    ],
    popular: true,
    buttonText: 'Start Free Trial',
    color: 'primary',
  },
  {
    name: 'Business Elite',
    description: 'For businesses and frequent travelers',
    price: '$99.99',
    period: 'per month',
    features: [
      'All Plus features included',
      'Luxury vehicle fleet',
      'Dedicated account manager',
      'Corporate billing',
      'Multiple user accounts',
      'Priority customer support',
      'Expense reporting',
    ],
    popular: false,
    buttonText: 'Contact Sales',
    color: 'secondary',
  },
];

const vehiclePricing = [
  {
    type: 'Sedan',
    icon: '🚗',
    baseRate: '$2.50',
    perMile: '$1.20',
    perMinute: '$0.30',
    description: 'Comfortable 4-passenger vehicles',
  },
  {
    type: 'SUV',
    icon: '🚙',
    baseRate: '$3.50',
    perMile: '$1.80',
    perMinute: '$0.45',
    description: 'Spacious 6-passenger vehicles',
  },
  {
    type: 'Maxi',
    icon: '🚐',
    baseRate: '$4.50',
    perMile: '$2.20',
    perMinute: '$0.55',
    description: 'Large 8-passenger vehicles',
  },
  {
    type: 'Premium',
    icon: '✨',
    baseRate: '$6.00',
    perMile: '$2.80',
    perMinute: '$0.70',
    description: 'Luxury vehicles with premium service',
  },
];

const PricingSection: React.FC = () => {
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
            Simple, <span className="text-primary">Transparent</span> Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your lifestyle. No hidden fees, no surprises.
          </p>
        </motion.div>

        {/* Subscription Plans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <Card className={`h-full ${plan.popular ? 'ring-2 ring-primary shadow-xl' : 'shadow-lg'} hover:shadow-xl transition-shadow duration-300`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <p className="text-muted-foreground">{plan.description}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    <span className="text-muted-foreground ml-1">/{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90 shadow-taxi' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Vehicle Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center mb-12">Vehicle Pricing</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {vehiclePricing.map((vehicle, index) => (
              <motion.div
                key={vehicle.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{vehicle.icon}</div>
                    <h4 className="text-xl font-bold mb-2">{vehicle.type}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{vehicle.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Base rate:</span>
                        <span className="font-semibold text-primary">{vehicle.baseRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Per mile:</span>
                        <span className="font-semibold text-primary">{vehicle.perMile}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Per minute:</span>
                        <span className="font-semibold text-primary">{vehicle.perMinute}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          <Card className="text-center">
            <CardContent className="p-6">
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">No Wait Time Fees</h4>
              <p className="text-sm text-muted-foreground">
                First 5 minutes of waiting are free. After that, standard per-minute rates apply.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Safe Travels</h4>
              <p className="text-sm text-muted-foreground">
                All rides include comprehensive insurance coverage at no extra cost.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Star className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Premium Support</h4>
              <p className="text-sm text-muted-foreground">
                24/7 customer support and ride assistance included with all plans.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">Questions About Pricing?</h3>
            <p className="text-muted-foreground mb-6">
              Our team is here to help you choose the right plan for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-taxi">
                Contact Sales
              </Button>
              <Button size="lg" variant="outline">
                View FAQ
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingSection;