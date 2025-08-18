import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const onboardingData = [
    {
      title: 'Smart Invoicing',
      description: 'Create, send, and track professional invoices with automated payment reminders.',
      icon: 'document-text',
      color: '#10b981',
    },
    {
      title: 'Expense Tracking',
      description: 'Automatically categorize and track business expenses with receipt scanning.',
      icon: 'calculator',
      color: '#f59e0b',
    },
    {
      title: 'Digital Wallets',
      description: 'Manage multiple business accounts and track cash flow in real-time.',
      icon: 'wallet',
      color: '#3b82f6',
    },
    {
      title: 'Credit & Lending',
      description: 'Build business credit scores and access financing opportunities.',
      icon: 'trending-up',
      color: '#8b5cf6',
    },
    {
      title: 'Simple Pricing',
      description: 'Choose the plan that fits your business needs with transparent pricing.',
      icon: 'card',
      color: '#ef4444',
      isPricing: true,
    },
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      description: 'Perfect for small businesses getting started',
      features: [
        'Up to 5 users',
        'Basic invoicing',
        'Expense tracking',
        'Mobile app access',
        'Email support',
        'Basic reporting'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: '$79',
      period: '/month',
      description: 'Ideal for growing businesses',
      features: [
        'Up to 25 users',
        'Advanced invoicing',
        'Expense tracking',
        'Digital wallets',
        'Payment processing',
        'Tax reporting',
        'Priority support',
        'Advanced analytics'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$199',
      period: '/month',
      description: 'For large organizations with complex needs',
      features: [
        'Unlimited users',
        'All features included',
        'Custom integrations',
        'API access',
        'Dedicated support',
        'Custom reporting',
        'Multi-currency support',
        'Advanced security'
      ],
      popular: false
    }
  ];

  const handleNext = () => {
    if (currentPage < onboardingData.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const renderPricingPage = () => {
    return (
      <View style={styles.pricingPage}>
        <Text style={styles.pricingTitle}>Choose Your Plan</Text>
        <Text style={styles.pricingSubtitle}>Start with a 14-day free trial. No credit card required.</Text>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pricingContainer}
          style={styles.pricingScrollView}
        >
          {pricingPlans.map((plan, index) => (
            <Animated.View 
              key={plan.name} 
              style={[
                styles.pricingCard, 
                plan.popular && styles.popularCard,
                plan.popular && { transform: [{ scale: 1.05 }] }
              ]}
            >
              {plan.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularBadgeText}>Most Popular</Text>
                </View>
              )}
              
              <Text style={styles.planName}>{plan.name}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>{plan.price}</Text>
                <Text style={styles.period}>{plan.period}</Text>
              </View>
              <Text style={styles.planDescription}>{plan.description}</Text>
              
              <View style={styles.featuresList}>
                {plan.features.map((feature, idx) => (
                  <View key={idx} style={styles.featureItem}>
                    <Ionicons name="checkmark-circle" size={16} color="#10b981" />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
              
              <TouchableOpacity style={[styles.planButton, plan.popular && styles.popularButton]}>
                <Text style={[styles.planButtonText, plan.popular && styles.popularButtonText]}>
                  {plan.popular ? 'Start Free Trial' : 'Get Started'}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderPage = (item: any, index: number) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const titleScale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    });

    const descriptionOpacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.4, 1, 0.4],
      extrapolate: 'clamp',
    });

    const iconScale = scrollX.interpolate({
      inputRange,
      outputRange: [0.6, 1, 0.6],
      extrapolate: 'clamp',
    });

    // If this is the pricing page, render the pricing content
    if (item.isPricing) {
      return (
        <View key={index} style={styles.page}>
          {renderPricingPage()}
        </View>
      );
    }

    return (
      <View key={index} style={styles.page}>
        <View style={styles.iconContainer}>
          <Animated.View
            style={[
              styles.iconWrapper,
              { backgroundColor: item.color },
              { transform: [{ scale: iconScale }] },
            ]}
          >
            <Ionicons name={item.icon as any} size={60} color="white" />
          </Animated.View>
        </View>

        <Animated.Text
          style={[
            styles.title,
            { transform: [{ scale: titleScale }] },
          ]}
        >
          {item.title}
        </Animated.Text>

        <Animated.Text
          style={[
            styles.description,
            { opacity: descriptionOpacity },
          ]}
        >
          {item.description}
        </Animated.Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1e293b', '#334155']}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <Animated.ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          style={styles.scrollView}
        >
          {onboardingData.map((item, index) => renderPage(item, index))}
        </Animated.ScrollView>

        {/* Pagination */}
        <View style={styles.pagination}>
          {onboardingData.map((_, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];

            const dotScale = scrollX.interpolate({
              inputRange,
              outputRange: [0.8, 1.2, 0.8],
              extrapolate: 'clamp',
            });

            const dotOpacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.4, 1, 0.4],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  {
                    transform: [{ scale: dotScale }],
                    opacity: dotOpacity,
                  },
                ]}
              />
            );
          })}
        </View>

        {/* Bottom Actions */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            onPress={handleNext}
            style={styles.nextButton}
          >
            <Text style={styles.nextButtonText}>
              {currentPage === onboardingData.length - 1 ? 'Get Started' : 'Next'}
            </Text>
            <Ionicons
              name={currentPage === onboardingData.length - 1 ? 'checkmark' : 'arrow-forward'}
              size={20}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  skipButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  skipText: {
    color: '#94a3b8',
    fontSize: 16,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  page: {
    width,
    height: height * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    marginBottom: 40,
  },
  iconWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 24,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
    marginHorizontal: 4,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  nextButton: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  // Pricing styles
  pricingPage: {
    flex: 1,
    width: width,
    paddingHorizontal: 20,
  },
  pricingTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  pricingSubtitle: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 30,
  },
  pricingScrollView: {
    flex: 1,
  },
  pricingContainer: {
    paddingHorizontal: 10,
  },
  pricingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 10,
    width: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  popularCard: {
    borderColor: '#10b981',
    borderWidth: 2,
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: '#10b981',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  planName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  period: {
    fontSize: 16,
    color: '#64748b',
    marginLeft: 4,
  },
  planDescription: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 20,
  },
  featuresList: {
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
  },
  planButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  popularButton: {
    backgroundColor: '#10b981',
  },
  planButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  popularButtonText: {
    color: '#ffffff',
  },
});

export default OnboardingScreen; 