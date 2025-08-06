import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = () => {
  const menuItems = [
    {
      title: 'Business Profile',
      icon: 'business',
      color: '#10b981',
      action: 'navigate',
    },
    {
      title: 'Security Settings',
      icon: 'shield-checkmark',
      color: '#3b82f6',
      action: 'navigate',
    },
    {
      title: 'Notifications',
      icon: 'notifications',
      color: '#f59e0b',
      action: 'toggle',
      value: true,
    },
    {
      title: 'Payment Methods',
      icon: 'card',
      color: '#8b5cf6',
      action: 'navigate',
    },
    {
      title: 'Tax Settings',
      icon: 'calculator',
      color: '#ef4444',
      action: 'navigate',
    },
    {
      title: 'Support',
      icon: 'help-circle',
      color: '#64748b',
      action: 'navigate',
    },
    {
      title: 'About',
      icon: 'information-circle',
      color: '#06b6d4',
      action: 'navigate',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={40} color="#ffffff" />
            </View>
          </View>
          <Text style={styles.userName}>Business Owner</Text>
          <Text style={styles.userEmail}>owner@smbfinanceos.com</Text>
          <Text style={styles.businessName}>SMB Finance OS</Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Invoices</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>$48,930</Text>
            <Text style={styles.statLabel}>Balance</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Expenses</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Settings</Text>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuIcon, { backgroundColor: item.color }]}>
                  <Ionicons name={item.icon as any} size={20} color="white" />
                </View>
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              <View style={styles.menuItemRight}>
                {item.action === 'toggle' ? (
                  <Switch
                    value={item.value}
                    onValueChange={() => {}}
                    trackColor={{ false: '#e2e8f0', true: '#10b981' }}
                    thumbColor="#ffffff"
                  />
                ) : (
                  <Ionicons name="chevron-forward" size={20} color="#64748b" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Account Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="log-out" size={20} color="#ef4444" />
            <Text style={[styles.actionButtonText, { color: '#ef4444' }]}>Sign Out</Text>
          </TouchableOpacity>
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
  profileHeader: {
    backgroundColor: '#1e293b',
    padding: 20,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 8,
  },
  businessName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#10b981',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  menuSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  menuItemRight: {
    alignItems: 'center',
  },
  section: {
    padding: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    gap: 12,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen; 