import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, SafeAreaView, RefreshControl, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const ExpensesScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  
  const expenses = [
    {
      id: 'EXP-001',
      category: 'Office Supplies',
      amount: 150,
      date: '2024-01-15',
      status: 'approved',
      description: 'Printer ink and paper',
    },
    {
      id: 'EXP-002',
      category: 'Travel',
      amount: 450,
      date: '2024-01-12',
      status: 'pending',
      description: 'Client meeting travel',
    },
    {
      id: 'EXP-003',
      category: 'Marketing',
      amount: 800,
      date: '2024-01-10',
      status: 'approved',
      description: 'Digital advertising',
    },
    {
      id: 'EXP-004',
      category: 'Software',
      amount: 200,
      date: '2024-01-08',
      status: 'approved',
      description: 'Project management tool',
    },
  ];

  const categories = [
    { name: 'Office Supplies', icon: 'briefcase', color: '#10b981', amount: 450, count: 8 },
    { name: 'Travel', icon: 'airplane', color: '#3b82f6', amount: 320, count: 3 },
    { name: 'Marketing', icon: 'megaphone', color: '#8b5cf6', amount: 800, count: 5 },
    { name: 'Software', icon: 'laptop', color: '#f59e0b', amount: 200, count: 2 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return '#10b981';
      case 'pending':
        return '#f59e0b';
      case 'rejected':
        return '#ef4444';
      default:
        return '#64748b';
    }
  };

  const renderExpense = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.expenseCard}>
      <View style={styles.expenseHeader}>
        <Text style={styles.expenseId}>{item.id}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
        </View>
      </View>
      <Text style={styles.categoryName}>{item.category}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.expenseDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Amount:</Text>
          <Text style={styles.amount}>${item.amount.toLocaleString()}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Date:</Text>
          <Text style={styles.detailValue}>{item.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.categoryCard}>
      <View style={[styles.categoryIcon, { backgroundColor: item.color }]}>
        <Ionicons name={item.icon as any} size={24} color="white" />
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
      <Text style={styles.categoryAmount}>${item.amount.toLocaleString()}</Text>
      <Text style={styles.categoryCount}>{item.count} expenses</Text>
    </TouchableOpacity>
  );

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
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
            <Text style={styles.refreshText}>Refreshing expenses...</Text>
          </View>
        )}
        
        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Expenses</Text>
            <Text style={styles.summaryValue}>$1,600</Text>
            <Text style={styles.summaryChange}>-12% this month</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>This Month</Text>
            <Text style={styles.summaryValue}>$450</Text>
            <Text style={styles.summaryChange}>+8% vs last month</Text>
          </View>
        </View>

        {/* Categories Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category, index) => (
              <TouchableOpacity key={index} style={styles.categoryCard}>
                <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                  <Ionicons name={category.icon as any} size={24} color="white" />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryAmount}>${category.amount.toLocaleString()}</Text>
                <Text style={styles.categoryCount}>{category.count} expenses</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#10b981' }]}>
            <Ionicons name="add-circle" size={20} color="white" />
            <Text style={styles.actionButtonText}>Add Expense</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#3b82f6' }]}>
            <Ionicons name="camera" size={20} color="white" />
            <Text style={styles.actionButtonText}>Scan Receipt</Text>
          </TouchableOpacity>
        </View>

        {/* Expenses List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Expenses</Text>
          <FlatList
            data={expenses}
            renderItem={renderExpense}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
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
  summaryContainer: {
    flexDirection: 'row',
    padding: 16,
    paddingTop: 10,
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  summaryChange: {
    fontSize: 12,
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
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
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
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 4,
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 2,
  },
  categoryCount: {
    fontSize: 12,
    color: '#64748b',
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
  expenseCard: {
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
  expenseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  expenseId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
  },
  description: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 12,
  },
  expenseDetails: {
    gap: 4,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  detailValue: {
    fontSize: 12,
    color: '#1e293b',
  },
});

export default ExpensesScreen; 