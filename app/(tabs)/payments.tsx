import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  CreditCard, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Download, 
  Smartphone,
  History,
  Plus
} from 'lucide-react-native';

type PaymentStatus = 'paid' | 'pending' | 'overdue' | 'upcoming';

type Payment = {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  status: PaymentStatus;
  paidDate?: string;
  method?: string;
  reference?: string;
};

type PaymentMethod = {
  id: string;
  name: string;
  provider: string;
  number: string;
  icon: string;
};

const PaymentCard = ({ payment, onPay }: { payment: Payment; onPay: (payment: Payment) => void }) => {
  const getStatusConfig = (status: PaymentStatus) => {
    switch (status) {
      case 'paid':
        return { icon: CheckCircle2, color: '#10B981', label: 'Payé', bgColor: '#ECFDF5' };
      case 'pending':
        return { icon: Clock, color: '#F59E0B', label: 'En attente', bgColor: '#FFFBEB' };
      case 'overdue':
        return { icon: AlertCircle, color: '#EF4444', label: 'En retard', bgColor: '#FEF2F2' };
      case 'upcoming':
        return { icon: Clock, color: '#6B7280', label: 'À venir', bgColor: '#F9FAFB' };
      default:
        return { icon: Clock, color: '#6B7280', label: 'Inconnu', bgColor: '#F9FAFB' };
    }
  };

  const config = getStatusConfig(payment.status);
  const Icon = config.icon;

  return (
    <View style={styles.paymentCard}>
      <View style={styles.paymentHeader}>
        <View style={[styles.statusIcon, { backgroundColor: config.bgColor }]}>
          <Icon size={20} color={config.color} />
        </View>
        <View style={styles.paymentInfo}>
          <Text style={styles.paymentDescription}>{payment.description}</Text>
          <Text style={styles.paymentDue}>Échéance: {payment.dueDate}</Text>
          {payment.paidDate && (
            <Text style={styles.paymentPaid}>Payé le: {payment.paidDate}</Text>
          )}
        </View>
        <View style={styles.paymentAmount}>
          <Text style={styles.amount}>{payment.amount.toLocaleString('fr-FR')} FCFA</Text>
          <View style={[styles.statusBadge, { backgroundColor: config.bgColor }]}>
            <Text style={[styles.statusText, { color: config.color }]}>
              {config.label}
            </Text>
          </View>
        </View>
      </View>
      
      {payment.status === 'pending' || payment.status === 'overdue' ? (
        <View style={styles.paymentActions}>
          <TouchableOpacity 
            style={styles.payButton}
            onPress={() => onPay(payment)}
          >
            <Smartphone size={16} color="#FFFFFF" />
            <Text style={styles.payButtonText}>Payer maintenant</Text>
          </TouchableOpacity>
        </View>
      ) : payment.status === 'paid' && (
        <View style={styles.paymentActions}>
          <TouchableOpacity style={styles.downloadButton}>
            <Download size={16} color="#3B82F6" />
            <Text style={styles.downloadButtonText}>Télécharger le reçu</Text>
          </TouchableOpacity>
        </View>
      )}

      {payment.reference && (
        <Text style={styles.reference}>Référence: {payment.reference}</Text>
      )}
    </View>
  );
};

const PaymentMethodModal = ({ 
  visible, 
  onClose, 
  onSelectMethod, 
  payment 
}: { 
  visible: boolean; 
  onClose: () => void; 
  onSelectMethod: (method: PaymentMethod) => void;
  payment: Payment | null;
}) => {
  const paymentMethods: PaymentMethod[] = [
    { id: '1', name: 'Orange Money', provider: 'Orange', number: '*144#', icon: '🟠' },
    { id: '2', name: 'M-Pesa', provider: 'Vodacom', number: '*150#', icon: '🔴' },
    { id: '3', name: 'Free Money', provider: 'Tigo', number: '*145#', icon: '🔵' },
    { id: '4', name: 'Airtel Money', provider: 'Airtel', number: '*182#', icon: '🔴' },
  ];

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Choisir un mode de paiement</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          
          {payment && (
            <View style={styles.paymentSummary}>
              <Text style={styles.summaryTitle}>Détails du paiement</Text>
              <Text style={styles.summaryDescription}>{payment.description}</Text>
              <Text style={styles.summaryAmount}>{payment.amount.toLocaleString('fr-FR')} FCFA</Text>
            </View>
          )}

          <View style={styles.methodsList}>
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={styles.methodCard}
                onPress={() => onSelectMethod(method)}
              >
                <Text style={styles.methodIcon}>{method.icon}</Text>
                <View style={styles.methodInfo}>
                  <Text style={styles.methodName}>{method.name}</Text>
                  <Text style={styles.methodProvider}>{method.provider}</Text>
                  <Text style={styles.methodNumber}>Composez {method.number}</Text>
                </View>
                <View style={styles.methodArrow}>
                  <Text style={styles.arrowText}>→</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default function PaymentsScreen() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const payments: Payment[] = [
    {
      id: '1',
      description: 'Frais de scolarité - Trimestre 2',
      amount: 150000,
      dueDate: '15 juillet 2024',
      status: 'pending',
    },
    {
      id: '2',
      description: 'Frais de transport - Juin 2024',
      amount: 25000,
      dueDate: '30 juin 2024',
      status: 'overdue',
    },
    {
      id: '3',
      description: 'Frais de scolarité - Trimestre 1',
      amount: 150000,
      dueDate: '15 avril 2024',
      status: 'paid',
      paidDate: '12 avril 2024',
      method: 'Orange Money',
      reference: 'OM240412001',
    },
    {
      id: '4',
      description: 'Frais d\'examen - Session 2024',
      amount: 50000,
      dueDate: '15 août 2024',
      status: 'upcoming',
    },
    {
      id: '5',
      description: 'Cotisation association parents',
      amount: 10000,
      dueDate: '20 mars 2024',
      status: 'paid',
      paidDate: '18 mars 2024',
      method: 'M-Pesa',
      reference: 'MP240318002',
    },
  ];

  const stats = {
    totalPaid: payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0),
    totalPending: payments.filter(p => p.status === 'pending' || p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0),
    overdueCount: payments.filter(p => p.status === 'overdue').length,
  };

  const handlePay = (payment: Payment) => {
    setSelectedPayment(payment);
    setShowPaymentModal(true);
  };

  const handleSelectPaymentMethod = (method: PaymentMethod) => {
    // Ici, vous intégreriez avec l'API du fournisseur de Mobile Money
    console.log('Paiement avec', method.name, 'pour', selectedPayment?.description);
    setShowPaymentModal(false);
    setSelectedPayment(null);
    // Afficher les instructions de paiement ou rediriger vers l'app du fournisseur
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Paiements</Text>
        <TouchableOpacity style={styles.historyButton}>
          <History size={20} color="#64748B" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Balance Overview */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <View style={styles.balanceIcon}>
              <CreditCard size={24} color="#FFFFFF" />
            </View>
            <View>
              <Text style={styles.balanceTitle}>Solde des paiements</Text>
              <Text style={styles.balancePeriod}>Année scolaire 2023-2024</Text>
            </View>
          </View>
          <Text style={styles.totalPaid}>
            {stats.totalPaid.toLocaleString('fr-FR')} FCFA
          </Text>
          <Text style={styles.balanceSubtitle}>Montant total payé</Text>
          
          {stats.totalPending > 0 && (
            <View style={styles.pendingAlert}>
              <AlertCircle size={16} color="#EF4444" />
              <Text style={styles.pendingText}>
                {stats.totalPending.toLocaleString('fr-FR')} FCFA en attente
              </Text>
            </View>
          )}
        </View>

        {/* Quick Stats */}
        <View style={styles.quickStats}>
          <View style={styles.statCard}>
            <CheckCircle2 size={24} color="#10B981" />
            <Text style={styles.statValue}>
              {payments.filter(p => p.status === 'paid').length}
            </Text>
            <Text style={styles.statLabel}>Payés</Text>
          </View>
          <View style={styles.statCard}>
            <Clock size={24} color="#F59E0B" />
            <Text style={styles.statValue}>
              {payments.filter(p => p.status === 'pending').length}
            </Text>
            <Text style={styles.statLabel}>En attente</Text>
          </View>
          <View style={styles.statCard}>
            <AlertCircle size={24} color="#EF4444" />
            <Text style={styles.statValue}>{stats.overdueCount}</Text>
            <Text style={styles.statLabel}>En retard</Text>
          </View>
        </View>

        {/* Payment Methods Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💳 Modes de paiement acceptés</Text>
          <View style={styles.methodsInfo}>
            <View style={styles.methodInfo}>
              <Text style={styles.methodEmoji}>🟠</Text>
              <Text style={styles.methodText}>Orange Money</Text>
            </View>
            <View style={styles.methodInfo}>
              <Text style={styles.methodEmoji}>🔴</Text>
              <Text style={styles.methodText}>M-Pesa</Text>
            </View>
            <View style={styles.methodInfo}>
              <Text style={styles.methodEmoji}>🔵</Text>
              <Text style={styles.methodText}>Free Money</Text>
            </View>
            <View style={styles.methodInfo}>
              <Text style={styles.methodEmoji}>🔴</Text>
              <Text style={styles.methodText}>Airtel Money</Text>
            </View>
          </View>
        </View>

        {/* Payments List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Historique des paiements</Text>
          <View style={styles.paymentsList}>
            {payments.map((payment) => (
              <PaymentCard 
                key={payment.id} 
                payment={payment} 
                onPay={handlePay}
              />
            ))}
          </View>
        </View>

        {/* Help Section */}
        <View style={styles.helpSection}>
          <Text style={styles.helpTitle}>💡 Besoin d'aide ?</Text>
          <Text style={styles.helpText}>
            Pour toute question concernant les paiements, contactez l'administration au +243 XX XXX XXXX ou par email à comptabilite@ecole.cd
          </Text>
          <TouchableOpacity style={styles.helpButton}>
            <Text style={styles.helpButtonText}>Contacter l'administration</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <PaymentMethodModal
        visible={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSelectMethod={handleSelectPaymentMethod}
        payment={selectedPayment}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
  },
  historyButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceCard: {
    margin: 20,
    backgroundColor: '#3B82F6',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  balanceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  balanceTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  balancePeriod: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  totalPaid: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  balanceSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  pendingAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 8,
    padding: 8,
    gap: 8,
  },
  pendingText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#EF4444',
  },
  quickStats: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  methodsInfo: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  methodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 12,
  },
  methodEmoji: {
    fontSize: 20,
  },
  methodText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1E293B',
  },
  paymentsList: {
    gap: 16,
  },
  paymentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  paymentHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  statusIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentDescription: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 4,
  },
  paymentDue: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    marginBottom: 2,
  },
  paymentPaid: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#10B981',
  },
  paymentAmount: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  paymentActions: {
    flexDirection: 'row',
    gap: 8,
  },
  payButton: {
    flexDirection: 'row',
    backgroundColor: '#10B981',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  payButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  downloadButton: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 8,
  },
  downloadButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#3B82F6',
  },
  reference: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    marginTop: 8,
    fontStyle: 'italic',
  },
  helpSection: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  helpTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1E40AF',
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1E40AF',
    lineHeight: 20,
    marginBottom: 12,
  },
  helpButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  helpButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 34,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#64748B',
  },
  paymentSummary: {
    padding: 20,
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  summaryTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
    marginBottom: 8,
  },
  summaryDescription: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 4,
  },
  summaryAmount: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#3B82F6',
  },
  methodsList: {
    padding: 20,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  methodIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  methodName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
  },
  methodProvider: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    marginBottom: 2,
  },
  methodNumber: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
  },
  methodArrow: {
    marginLeft: 'auto',
  },
  arrowText: {
    fontSize: 18,
    color: '#3B82F6',
  },
});