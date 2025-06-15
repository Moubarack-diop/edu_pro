import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookOpen, TrendingUp, Download, Filter, Calendar } from 'lucide-react-native';

type Subject = {
  id: string;
  name: string;
  average: number;
  color: string;
  grades: Grade[];
};

type Grade = {
  id: string;
  name: string;
  grade: number;
  maxGrade: number;
  date: string;
  coefficient: number;
};

const SubjectCard = ({ subject }: { subject: Subject }) => {
  const getGradeColor = (average: number) => {
    if (average >= 16) return '#10B981';
    if (average >= 14) return '#F59E0B';
    if (average >= 10) return '#EF4444';
    return '#DC2626';
  };

  return (
    <View style={styles.subjectCard}>
      <View style={styles.subjectHeader}>
        <View style={[styles.subjectIcon, { backgroundColor: subject.color }]}>
          <BookOpen size={20} color="#FFFFFF" />
        </View>
        <View style={styles.subjectInfo}>
          <Text style={styles.subjectName}>{subject.name}</Text>
          <Text style={styles.gradeCount}>{subject.grades.length} note(s)</Text>
        </View>
        <View style={styles.averageContainer}>
          <Text style={[styles.average, { color: getGradeColor(subject.average) }]}>
            {subject.average.toFixed(1)}
          </Text>
          <Text style={styles.maxGrade}>/20</Text>
        </View>
      </View>
      
      <View style={styles.gradesContainer}>
        {subject.grades.slice(0, 3).map((grade) => (
          <View key={grade.id} style={styles.gradeItem}>
            <View style={styles.gradeInfo}>
              <Text style={styles.gradeName}>{grade.name}</Text>
              <Text style={styles.gradeDate}>{grade.date}</Text>
            </View>
            <Text style={[styles.gradeValue, { color: getGradeColor(grade.grade) }]}>
              {grade.grade}/{grade.maxGrade}
            </Text>
          </View>
        ))}
        {subject.grades.length > 3 && (
          <TouchableOpacity style={styles.showMore}>
            <Text style={styles.showMoreText}>Voir toutes les notes</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const PeriodSelector = ({ selected, onSelect }: { selected: string; onSelect: (period: string) => void }) => {
  const periods = ['Trimestre 1', 'Trimestre 2', 'Trimestre 3'];
  
  return (
    <View style={styles.periodSelector}>
      {periods.map((period) => (
        <TouchableOpacity
          key={period}
          style={[styles.periodButton, selected === period && styles.periodButtonActive]}
          onPress={() => onSelect(period)}
        >
          <Text style={[styles.periodText, selected === period && styles.periodTextActive]}>
            {period}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default function GradesScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('Trimestre 2');

  const subjects: Subject[] = [
    {
      id: '1',
      name: 'Mathématiques',
      average: 16.5,
      color: '#3B82F6',
      grades: [
        { id: '1', name: 'Contrôle Fonctions', grade: 18, maxGrade: 20, date: '15/05/2024', coefficient: 2 },
        { id: '2', name: 'DM Probabilités', grade: 15, maxGrade: 20, date: '12/05/2024', coefficient: 1 },
        { id: '3', name: 'Interrogation', grade: 16, maxGrade: 20, date: '08/05/2024', coefficient: 1 },
      ]
    },
    {
      id: '2',
      name: 'Français',
      average: 14.2,
      color: '#10B981',
      grades: [
        { id: '4', name: 'Dissertation', grade: 13, maxGrade: 20, date: '20/05/2024', coefficient: 3 },
        { id: '5', name: 'Lecture analytique', grade: 16, maxGrade: 20, date: '18/05/2024', coefficient: 2 },
        { id: '6', name: 'Oral', grade: 14, maxGrade: 20, date: '15/05/2024', coefficient: 1 },
      ]
    },
    {
      id: '3',
      name: 'Histoire-Géographie',
      average: 15.8,
      color: '#F59E0B',
      grades: [
        { id: '7', name: 'Composition Histoire', grade: 17, maxGrade: 20, date: '22/05/2024', coefficient: 2 },
        { id: '8', name: 'Croquis Géographie', grade: 14, maxGrade: 20, date: '19/05/2024', coefficient: 1 },
        { id: '9', name: 'Interrogation', grade: 16, maxGrade: 20, date: '16/05/2024', coefficient: 1 },
      ]
    },
    {
      id: '4',
      name: 'Anglais',
      average: 13.5,
      color: '#8B5CF6',
      grades: [
        { id: '10', name: 'Expression écrite', grade: 12, maxGrade: 20, date: '21/05/2024', coefficient: 2 },
        { id: '11', name: 'Compréhension orale', grade: 15, maxGrade: 20, date: '17/05/2024', coefficient: 1 },
      ]
    },
    {
      id: '5',
      name: 'Sciences Physiques',
      average: 17.2,
      color: '#06B6D4',
      grades: [
        { id: '12', name: 'TP Chimie', grade: 18, maxGrade: 20, date: '23/05/2024', coefficient: 1 },
        { id: '13', name: 'Contrôle Physique', grade: 17, maxGrade: 20, date: '20/05/2024', coefficient: 2 },
        { id: '14', name: 'Exercices', grade: 16, maxGrade: 20, date: '18/05/2024', coefficient: 1 },
      ]
    },
  ];

  const overallAverage = subjects.reduce((sum, subject) => sum + subject.average, 0) / subjects.length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notes et Bulletins</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Filter size={20} color="#64748B" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Download size={20} color="#64748B" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Overall Statistics */}
        <View style={styles.overallStats}>
          <View style={styles.overallCard}>
            <View style={styles.overallHeader}>
              <View style={styles.overallIcon}>
                <TrendingUp size={24} color="#FFFFFF" />
              </View>
              <View>
                <Text style={styles.overallTitle}>Moyenne générale</Text>
                <Text style={styles.overallPeriod}>{selectedPeriod}</Text>
              </View>
            </View>
            <Text style={styles.overallAverage}>{overallAverage.toFixed(1)}/20</Text>
            <Text style={styles.overallProgress}>+0.3 pts depuis le dernier trimestre</Text>
          </View>
        </View>

        {/* Period Selector */}
        <PeriodSelector selected={selectedPeriod} onSelect={setSelectedPeriod} />

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Download size={20} color="#3B82F6" />
            <Text style={styles.actionText}>Télécharger le bulletin</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Calendar size={20} color="#3B82F6" />
            <Text style={styles.actionText}>Planning des évaluations</Text>
          </TouchableOpacity>
        </View>

        {/* Subjects */}
        <View style={styles.subjectsContainer}>
          <Text style={styles.sectionTitle}>Matières</Text>
          {subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </View>

        {/* Tips */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>💡 Conseils</Text>
          <Text style={styles.tipsText}>
            Votre moyenne générale est excellente ! Continuez vos efforts en anglais pour améliorer votre moyenne dans cette matière.
          </Text>
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
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overallStats: {
    padding: 20,
  },
  overallCard: {
    backgroundColor: '#3B82F6',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  overallHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  overallIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  overallTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  overallPeriod: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  overallAverage: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  overallProgress: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  periodSelector: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 4,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  periodText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  periodTextActive: {
    color: '#1E293B',
  },
  quickActions: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    gap: 8,
  },
  actionText: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: '#3B82F6',
  },
  subjectsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  subjectCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  subjectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  subjectIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  subjectInfo: {
    flex: 1,
  },
  subjectName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
  },
  gradeCount: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    marginTop: 2,
  },
  averageContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  average: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  maxGrade: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
  },
  gradesContainer: {
    gap: 12,
  },
  gradeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gradeInfo: {
    flex: 1,
  },
  gradeName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1E293B',
  },
  gradeDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    marginTop: 2,
  },
  gradeValue: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  showMore: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  showMoreText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#3B82F6',
  },
  tipsContainer: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 16,
  },
  tipsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#92400E',
    marginBottom: 8,
  },
  tipsText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#92400E',
    lineHeight: 20,
  },
});