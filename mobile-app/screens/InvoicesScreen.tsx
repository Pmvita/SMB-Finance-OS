import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, SafeAreaView, RefreshControl, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const InvoicesScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  
  const invoices = [
    {
      id: 'INV-001',
      client: 'TechStart Solutions',
      amount: 2500,
      status: 'paid',
      date: '2024-01-15',
      dueDate: '2024-01-30',
    },
    {
      id: 'INV-002',
      client: 'Green Energy Co.',
      amount: 1800,
      status: 'pending',
      date: '2024-01-10',
      dueDate: '2024-01-25',
    },
    {
      id: 'INV-003',
      client: 'Patel Consulting',
      amount: 3200,
      status: 'overdue',
      date: '2024-01-05',
      dueDate: '2024-01-20',
    },
    {
      id: 'INV-004',
      client: 'Global Services Ltd',
      amount: 4500,
      status: 'draft',
      date: '2024-01-12',
      dueDate: '2024-02-12',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return '#10b981';
      case 'pending':
        return '#f59e0b';
      case 'overdue':
        return '#ef4444';
      case 'draft':
        return '#64748b';
      default:
        return '#64748b';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return 'checkmark-circle';
      case 'pending':
        return 'time';
      case 'overdue':
        return 'warning';
      case 'draft':
        return 'document-outline';
      default:
        return 'help-circle';
    }
  };

  const renderInvoice = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.invoiceCard}>
      <View style={styles.invoiceHeader}>
        <Text style={styles.invoiceId}>{item.id}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Ionicons name={getStatusIcon(item.status) as any} size={12} color="white" />
          <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
        </View>
      </View>
      <Text style={styles.clientName}>{item.client}</Text>
      <View style={styles.invoiceDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Amount:</Text>
          <Text style={styles.amount}>${item.amount.toLocaleString()}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Date:</Text>
          <Text style={styles.detailValue}>{item.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Due:</Text>
          <Text style={styles.detailValue}>{item.dueDate}</Text>
        </View>
      </View>
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
            <Text style={styles.refreshText}>Refreshing invoices...</Text>
          </View>
        )}
        
        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Invoices</Text>
            <Text style={styles.summaryValue}>24</Text>
            <Text style={styles.summaryChange}>+12% this month</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Outstanding</Text>
            <Text style={styles.summaryValue}>$8,450</Text>
            <Text style={styles.summaryChange}>-5% this month</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#10b981' }]}>
            <Ionicons name="add-circle" size={20} color="white" />
            <Text style={styles.actionButtonText}>Create Invoice</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#3b82f6' }]}>
            <Ionicons name="download" size={20} color="white" />
            <Text style={styles.actionButtonText}>Export</Text>
          </TouchableOpacity>
        </View>

        {/* Invoices List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Invoices</Text>
          <FlatList
            data={invoices}
            renderItem={renderInvoice}
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
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  invoiceCard: {
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
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  invoiceId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
  },
  clientName: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 12,
  },
  invoiceDetails: {
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

export default InvoicesScreen; 