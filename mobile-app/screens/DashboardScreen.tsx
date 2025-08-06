import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const DashboardScreen = () => {
  const metrics = [
    { title: 'Total Revenue', value: '$45,230', change: '+12.5%', color: '#10b981' },
    { title: 'Outstanding Invoices', value: '$8,450', change: '-5.2%', color: '#f59e0b' },
    { title: 'Monthly Expenses', value: '$12,800', change: '+8.1%', color: '#ef4444' },
    { title: 'Cash Flow', value: '$32,430', change: '+15.3%', color: '#3b82f6' },
  ];

  const quickActions = [
    { title: 'Create Invoice', icon: 'add-circle-outline', color: '#10b981' },
    { title: 'Add Expense', icon: 'calculator-outline', color: '#f59e0b' },
    { title: 'Send Payment', icon: 'card-outline', color: '#3b82f6' },
    { title: 'View Reports', icon: 'bar-chart-outline', color: '#8b5cf6' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Good morning, Business Owner</Text>
          <Text style={styles.subtitle}>Here's your financial overview</Text>
        </View>

        {/* Metrics Grid */}
        <View style={styles.metricsContainer}>
          {metrics.map((metric, index) => (
            <View key={index} style={styles.metricCard}>
              <Text style={styles.metricTitle}>{metric.title}</Text>
              <Text style={styles.metricValue}>{metric.value}</Text>
              <View style={styles.changeContainer}>
                <Ionicons 
                  name={metric.change.startsWith('+') ? 'trending-up' : 'trending-down'} 
                  size={16} 
                  color={metric.change.startsWith('+') ? '#10b981' : '#ef4444'} 
                />
                <Text style={[
                  styles.changeText, 
                  { color: metric.change.startsWith('+') ? '#10b981' : '#ef4444' }
                ]}>
                  {metric.change}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity key={index} style={styles.actionCard}>
                <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                  <Ionicons name={action.icon as any} size={24} color="white" />
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: '#10b981' }]}>
                <Ionicons name="checkmark-circle" size={20} color="white" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Invoice #INV-001 paid</Text>
                <Text style={styles.activitySubtitle}>$2,500 • 2 hours ago</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: '#f59e0b' }]}>
                <Ionicons name="receipt" size={20} color="white" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Expense added</Text>
                <Text style={styles.activitySubtitle}>$150 • Office supplies</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: '#3b82f6' }]}>
                <Ionicons name="card" size={20} color="white" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Payment received</Text>
                <Text style={styles.activitySubtitle}>$1,200 • Client ABC</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#1e293b',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  metricCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    width: '47%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricTitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    width: '47%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
  },
  activityList: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  activitySubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
});

export default DashboardScreen; 