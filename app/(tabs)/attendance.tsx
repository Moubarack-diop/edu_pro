import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, CheckCircle2, XCircle, Clock, Filter, TrendingUp } from 'lucide-react-native';

type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

type AttendanceRecord = {
  id: string;
  date: string;
  status: AttendanceStatus;
  subject: string;
  time: string;
  reason?: string;
};

const AttendanceItem = ({ record }: { record: AttendanceRecord }) => {
  const getStatusConfig = (status: AttendanceStatus) => {
    switch (status) {
      case 'present':
        return { icon: CheckCircle2, color: '#10B981', label: 'Présent', bgColor: '#ECFDF5' };
      case 'absent':
        return { icon: XCircle, color: '#EF4444', label: 'Absent', bgColor: '#FEF2F2' };
      case 'late':
        return { icon: Clock, color: '#F59E0B', label: 'Retard', bgColor: '#FFFBEB' };
      case 'excused':
        return { icon: CheckCircle2, color: '#8B5CF6', label: 'Excusé', bgColor: '#F3F4F6' };
      default:
        return { icon: Clock, color: '#6B7280', label: 'Inconnu', bgColor: '#F9FAFB' };
    }
  };

  const config = getStatusConfig(record.status);
  const Icon = config.icon;

  return (
    <View style={styles.attendanceItem}>
      <View style={[styles.statusIndicator, { backgroundColor: config.bgColor }]}>
        <Icon size={16} color={config.color} />
      </View>
      <View style={styles.attendanceInfo}>
        <View style={styles.attendanceHeader}>
          <Text style={styles.attendanceSubject}>{record.subject}</Text>
          <Text style={styles.attendanceTime}>{record.time}</Text>
        </View>
        <Text style={styles.attendanceDate}>{record.date}</Text>
        {record.reason && (
          <Text style={styles.attendanceReason}>{record.reason}</Text>
        )}
      </View>
      <View style={[styles.statusBadge, { backgroundColor: config.bgColor }]}>
        <Text style={[styles.statusText, { color: config.color }]}>
          {config.label}
        </Text>
      </View>
    </View>
  );
};

const WeekView = ({ week, onDayPress }: { 
  week: { date: string; status: AttendanceStatus | null }[]; 
  onDayPress: (date: string) => void;
}) => {
  const getStatusColor = (status: AttendanceStatus | null) => {
    switch (status) {
      case 'present': return '#10B981';
      case 'absent': return '#EF4444';
      case 'late': return '#F59E0B';
      case 'excused': return '#8B5CF6';
      default: return '#E5E7EB';
    }
  };

  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  return (
    <View style={styles.weekView}>
      {week.map((day, index) => (
        <TouchableOpacity
          key={day.date}
          style={styles.dayButton}
          onPress={() => onDayPress(day.date)}
        >
          <Text style={styles.dayLabel}>{days[index]}</Text>
          <View style={[styles.dayIndicator, { backgroundColor: getStatusColor(day.status) }]}>
            <Text style={styles.dayNumber}>{new Date(day.date).getDate()}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default function AttendanceScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('Cette semaine');

  const attendanceRecords: AttendanceRecord[] = [
    {
      id: '1',
      date: '2024-06-10',
      status: 'present',
      subject: 'Mathématiques',
      time: '08:00 - 09:00',
    },
    {
      id: '2',
      date: '2024-06-10',
      status: 'late',
      subject: 'Français',
      time: '09:00 - 10:00',
      reason: 'Transport en retard',
    },
    {
      id: '3',
      date: '2024-06-09',
      status: 'present',
      subject: 'Histoire-Géographie',
      time: '14:00 - 15:00',
    },
    {
      id: '4',
      date: '2024-06-08',
      status: 'absent',
      subject: 'Anglais',
      time: '10:00 - 11:00',
      reason: 'Maladie (certificat médical fourni)',
    },
    {
      id: '5',
      date: '2024-06-08',
      status: 'excused',
      subject: 'Sciences Physiques',
      time: '15:00 - 16:00',
      reason: 'Rendez-vous médical',
    },
  ];

  const currentWeek = [
    { date: '2024-06-10', status: 'late' as AttendanceStatus },
    { date: '2024-06-11', status: 'present' as AttendanceStatus },
    { date: '2024-06-12', status: 'present' as AttendanceStatus },
    { date: '2024-06-13', status: 'present' as AttendanceStatus },
    { date: '2024-06-14', status: null },
    { date: '2024-06-15', status: null },
    { date: '2024-06-16', status: null },
  ];

  const stats = {
    presentDays: 18,
    totalDays: 20,
    lateCount: 2,
    absentCount: 1,
    excusedCount: 1,
  };

  const attendanceRate = (stats.presentDays / stats.totalDays) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Présence</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#64748B" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Statistics Card */}
        <View style={styles.statsCard}>
          <View style={styles.statsHeader}>
            <View style={styles.statsIcon}>
              <TrendingUp size={24} color="#FFFFFF" />
            </View>
            <View>
              <Text style={styles.statsTitle}>Taux de présence</Text>
              <Text style={styles.statsPeriod}>Ce trimestre</Text>
            </View>
          </View>
          <Text style={styles.statsRate}>{attendanceRate.toFixed(1)}%</Text>
          <Text style={styles.statsSubtitle}>
            {stats.presentDays} jours présents sur {stats.totalDays}
          </Text>
        </View>

        {/* Week View */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cette semaine</Text>
          <WeekView 
            week={currentWeek} 
            onDayPress={(date) => console.log('Selected date:', date)} 
          />
        </View>

        {/* Quick Stats */}
        <View style={styles.quickStats}>
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: '#ECFDF5' }]}>
              <CheckCircle2 size={20} color="#10B981" />
            </View>
            <Text style={styles.statValue}>{stats.presentDays}</Text>
            <Text style={styles.statLabel}>Présent</Text>
          </View>
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: '#FFFBEB' }]}>
              <Clock size={20} color="#F59E0B" />
            </View>
            <Text style={styles.statValue}>{stats.lateCount}</Text>
            <Text style={styles.statLabel}>Retard</Text>
          </View>
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: '#FEF2F2' }]}>
              <XCircle size={20} color="#EF4444" />
            </View>
            <Text style={styles.statValue}>{stats.absentCount}</Text>
            <Text style={styles.statLabel}>Absent</Text>
          </View>
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: '#F3F4F6' }]}>
              <CheckCircle2 size={20} color="#8B5CF6" />
            </View>
            <Text style={styles.statValue}>{stats.excusedCount}</Text>
            <Text style={styles.statLabel}>Excusé</Text>
          </View>
        </View>

        {/* Recent Attendance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Historique récent</Text>
          <View style={styles.attendanceList}>
            {attendanceRecords.map((record) => (
              <AttendanceItem key={record.id} record={record} />
            ))}
          </View>
        </View>

        {/* Alerts */}
        <View style={styles.alertsContainer}>
          <View style={styles.alertCard}>
            <Text style={styles.alertTitle}>⚠️ Attention</Text>
            <Text style={styles.alertText}>
              N'oubliez pas de justifier votre absence du 8 juin en fournissant le certificat médical à l'administration.
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.primaryButton}>
            <Calendar size={20} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>Justifier une absence</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Voir le planning complet</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsCard: {
    margin: 20,
    backgroundColor: '#10B981',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statsIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  statsPeriod: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  statsRate: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statsSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
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
  weekView: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dayButton: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  dayLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  dayIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayNumber: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  quickStats: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  statItem: {
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
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
    textAlign: 'center',
  },
  attendanceList: {
    gap: 12,
  },
  attendanceItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statusIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  attendanceInfo: {
    flex: 1,
  },
  attendanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  attendanceSubject: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
  },
  attendanceTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
  },
  attendanceDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    marginBottom: 4,
  },
  attendanceReason: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    fontStyle: 'italic',
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginLeft: 8,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  alertsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  alertCard: {
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  alertTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#92400E',
    marginBottom: 8,
  },
  alertText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#92400E',
    lineHeight: 20,
  },
  actionButtons: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 12,
  },
  primaryButton: {
    flexDirection: 'row',
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  secondaryButton: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#3B82F6',
  },
});