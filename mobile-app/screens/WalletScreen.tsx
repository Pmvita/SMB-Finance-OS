import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const WalletScreen = () => {
  const wallets = [
    {
      name: 'Main Business Account',
      balance: 25430,
      currency: 'USD',
      type: 'checking',
    },
    {
      name: 'Savings Account',
      balance: 15000,
      currency: 'USD',
      type: 'savings',
    },
    {
      name: 'Tax Reserve',
      balance: 8500,
      currency: 'USD',
      type: 'reserve',
    },
  ];

  const recentTransactions = [
    {
      id: 'TXN-001',
      type: 'credit',
      amount: 2500,
      description: 'Invoice payment - TechStart',
      date: '2024-01-15',
    },
    {
      id: 'TXN-002',
      type: 'debit',
      amount: 150,
      description: 'Office supplies',
      date: '2024-01-14',
    },
    {
      id: 'TXN-003',
      type: 'credit',
      amount: 1800,
      description: 'Invoice payment - Green Energy',
      date: '2024-01-13',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Total Balance */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>$48,930</Text>
          <Text style={styles.balanceChange}>+$4,250 this month</Text>
        </View>

        {/* Wallets */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Wallets</Text>
          {wallets.map((wallet, index) => (
            <TouchableOpacity key={index} style={styles.walletCard}>
              <View style={styles.walletHeader}>
                <View style={styles.walletInfo}>
                  <Text style={styles.walletName}>{wallet.name}</Text>
                  <Text style={styles.walletType}>{wallet.type}</Text>
                </View>
                <View style={styles.walletBalance}>
                  <Text style={styles.balanceText}>${wallet.balance.toLocaleString()}</Text>
                  <Text style={styles.currencyText}>{wallet.currency}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <View style={[styles.actionIcon, { backgroundColor: '#10b981' }]}>
                <Ionicons name="add-circle" size={24} color="white" />
              </View>
              <Text style={styles.actionTitle}>Send Money</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <View style={[styles.actionIcon, { backgroundColor: '#3b82f6' }]}>
                <Ionicons name="card" size={24} color="white" />
              </View>
              <Text style={styles.actionTitle}>Request Payment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <View style={[styles.actionIcon, { backgroundColor: '#f59e0b' }]}>
                <Ionicons name="swap-horizontal" size={24} color="white" />
              </View>
              <Text style={styles.actionTitle}>Exchange</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <View style={[styles.actionIcon, { backgroundColor: '#8b5cf6' }]}>
                <Ionicons name="analytics" size={24} color="white" />
              </View>
              <Text style={styles.actionTitle}>Analytics</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          {recentTransactions.map((transaction, index) => (
            <TouchableOpacity key={index} style={styles.transactionCard}>
              <View style={styles.transactionHeader}>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionId}>{transaction.id}</Text>
                  <Text style={styles.transactionDescription}>{transaction.description}</Text>
                </View>
                <View style={styles.transactionAmount}>
                  <Text style={[
                    styles.amountText,
                    { color: transaction.type === 'credit' ? '#10b981' : '#ef4444' }
                  ]}>
                    {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toLocaleString()}
                  </Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
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
  balanceCard: {
    backgroundColor: '#1e293b',
    padding: 20,
    margin: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  balanceChange: {
    fontSize: 14,
    color: '#10b981',
    fontWeight: '600',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  walletCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  walletInfo: {
    flex: 1,
  },
  walletName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  walletType: {
    fontSize: 12,
    color: '#64748b',
    textTransform: 'capitalize',
  },
  walletBalance: {
    alignItems: 'flex-end',
  },
  balanceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  currencyText: {
    fontSize: 12,
    color: '#64748b',
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
  transactionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionId: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  transactionDescription: {
    fontSize: 12,
    color: '#64748b',
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: '#64748b',
  },
});

export default WalletScreen; 