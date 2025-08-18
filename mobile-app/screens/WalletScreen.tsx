import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, SafeAreaView, RefreshControl, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const WalletScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  
  const wallets = [
    {
      id: 'acc-001',
      name: 'Main Business Account',
      balance: 25430,
      currency: 'USD',
      type: 'checking',
      accountNumber: '****1234',
    },
    {
      id: 'acc-002',
      name: 'Savings Account',
      balance: 15000,
      currency: 'USD',
      type: 'savings',
      accountNumber: '****5678',
    },
    {
      id: 'acc-003',
      name: 'Tax Reserve',
      balance: 8500,
      currency: 'USD',
      type: 'reserve',
      accountNumber: '****9012',
    },
  ];

  const transactions = [
    {
      id: 'TXN-001',
      type: 'credit',
      amount: 2500,
      description: 'Invoice payment - TechStart',
      date: '2024-01-15',
      account: 'Main Business Account',
    },
    {
      id: 'TXN-002',
      type: 'debit',
      amount: 150,
      description: 'Office supplies',
      date: '2024-01-14',
      account: 'Main Business Account',
    },
    {
      id: 'TXN-003',
      type: 'credit',
      amount: 1800,
      description: 'Invoice payment - Green Energy',
      date: '2024-01-13',
      account: 'Main Business Account',
    },
  ];

  const renderWallet = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.walletCard}>
      <View style={styles.walletHeader}>
        <View style={styles.walletInfo}>
          <Text style={styles.walletName}>{item.name}</Text>
          <Text style={styles.accountNumber}>{item.accountNumber}</Text>
        </View>
        <View style={styles.balanceContainer}>
          <Text style={styles.balance}>${item.balance.toLocaleString()}</Text>
          <Text style={styles.currency}>{item.currency}</Text>
        </View>
      </View>
      <View style={styles.walletFooter}>
        <Text style={styles.walletType}>{item.type.toUpperCase()}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderTransaction = ({ item }: { item: any }) => (
    <View style={styles.transactionItem}>
      <View style={[styles.transactionIcon, { backgroundColor: item.type === 'credit' ? '#10b981' : '#ef4444' }]}>
        <Ionicons 
          name={item.type === 'credit' ? 'arrow-down' : 'arrow-up'} 
          size={16} 
          color="white" 
        />
      </View>
      <View style={styles.transactionContent}>
        <Text style={styles.transactionDescription}>{item.description}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>
      <View style={styles.transactionAmount}>
        <Text style={[styles.amount, { color: item.type === 'credit' ? '#10b981' : '#ef4444' }]}>
          {item.type === 'credit' ? '+' : '-'}${item.amount.toLocaleString()}
        </Text>
      </View>
    </View>
  );

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={['#10b981']}
            tintColor="#10b981"
            progressBackgroundColor="#f0fdf4"
          />
        }
      >
        {/* Refresh Indicator */}
        {refreshing && (
          <View style={styles.refreshIndicator}>
            <ActivityIndicator size="small" color="#10b981" />
            <Text style={styles.refreshText}>Refreshing wallet...</Text>
          </View>
        )}
        
        {/* Total Balance */}
        <View style={styles.balanceHeader}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.totalBalance}>$48,930</Text>
          <View style={styles.balanceChange}>
            <Ionicons name="trending-up" size={16} color="#10b981" />
            <Text style={styles.balanceChangeText}>+$4,250 (9.5%)</Text>
          </View>
        </View>

        {/* Wallets */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Wallets</Text>
          <FlatList
            data={wallets}
            renderItem={renderWallet}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#10b981' }]}>
            <Ionicons name="add-circle" size={20} color="white" />
            <Text style={styles.actionButtonText}>Add Money</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#3b82f6' }]}>
            <Ionicons name="send" size={20} color="white" />
            <Text style={styles.actionButtonText}>Send Money</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <View style={styles.transactionsList}>
            <FlatList
              data={transactions}
              renderItem={renderTransaction}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
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
  refreshIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0fdf4',
    paddingVertical: 12,
    paddingHorizontal: 20,
    gap: 8,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
  },
  refreshText: {
    fontSize: 14,
    color: '#10b981',
    fontWeight: '500',
  },

  scrollView: {
    flex: 1,
  },
  balanceHeader: {
    backgroundColor: '#1e293b',
    padding: 20,
    paddingTop: 10,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 8,
  },
  totalBalance: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  balanceChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  balanceChangeText: {
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
    marginBottom: 8,
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
  accountNumber: {
    fontSize: 12,
    color: '#64748b',
  },
  balanceContainer: {
    alignItems: 'flex-end',
  },
  balance: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  currency: {
    fontSize: 12,
    color: '#64748b',
  },
  walletFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  walletType: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748b',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  transactionsList: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  transactionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionContent: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  transactionDate: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WalletScreen; 