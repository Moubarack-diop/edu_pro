import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  BookOpen, 
  Calendar, 
  CreditCard, 
  MessageCircle, 
  FileText, 
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react-native';

const StatCard = ({ title, value, subtitle, color, icon: Icon }: {
  title: string;
  value: string;
  subtitle: string;
  color: string;
  icon: any;
}) => (
  <View style={[styles.statCard, { backgroundColor: color }]}>
    <View style={styles.statCardHeader}>
      <Icon size={24} color="#FFFFFF" />
      <Text style={styles.statTitle}>{title}</Text>
    </View>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statSubtitle}>{subtitle}</Text>
  </View>
);

const ModuleCard = ({ title, icon: Icon, color }: {
  title: string;
  icon: any;
  color: string;
}) => (
  <TouchableOpacity style={styles.moduleCard}>
    <View style={[styles.moduleIcon, { backgroundColor: color }]}>
      <Icon size={24} color="#FFFFFF" />
    </View>
    <Text style={styles.moduleTitle}>{title}</Text>
  </TouchableOpacity>
);

const EventCard = ({ title, date, time, type }: {
  title: string;
  date: string;
  time: string;
  type: 'exam' | 'meeting' | 'event';
}) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'exam': return '#EF4444';
      case 'meeting': return '#3B82F6';
      case 'event': return '#10B981';
      default: return '#6B7280';
    }
  };

  return (
    <View style={styles.eventCard}>
      <View style={[styles.eventIndicator, { backgroundColor: getTypeColor(type) }]} />
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{title}</Text>
        <Text style={styles.eventDate}>{date} • {time}</Text>
      </View>
    </View>
  );
};

const MessageCard = ({ sender, message, time, unread }: {
  sender: string;
  message: string;
  time: string;
  unread: boolean;
}) => (
  <TouchableOpacity style={styles.messageCard}>
    <View style={styles.messageAvatar}>
      <Text style={styles.messageAvatarText}>{sender.charAt(0)}</Text>
    </View>
    <View style={styles.messageContent}>
      <View style={styles.messageHeader}>
        <Text style={styles.messageSender}>{sender}</Text>
        <Text style={styles.messageTime}>{time}</Text>
      </View>
      <Text style={styles.messageText} numberOfLines={2}>{message}</Text>
    </View>
    {unread && <View style={styles.unreadIndicator} />}
  </TouchableOpacity>
);

export default function HomeScreen() {
  const currentDate = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Bonjour, Thomas Dubois</Text>
            <Text style={styles.date}>{currentDate}</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.profileButtonText}>TD</Text>
          </TouchableOpacity>
        </View>

        {/* Statistics Cards */}
        <View style={styles.statsContainer}>
          <StatCard
            title="Moyenne générale"
            value="15.7/20"
            subtitle="0.5 pt depuis le dernier trimestre"
            color="#3B82F6"
            icon={TrendingUp}
          />
          <StatCard
            title="Taux de présence"
            value="98%"
            subtitle="2 absences ce trimestre"
            color="#10B981"
            icon={CheckCircle2}
          />
          <StatCard
            title="Frais des paiements"
            value="À jour"
            subtitle="Prochain paiement: 15/07/2024"
            color="#F59E0B"
            icon={CheckCircle2}
          />
        </View>

        {/* Modules */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Modules</Text>
          <View style={styles.modulesGrid}>
            <ModuleCard title="Notes et Bulletins" icon={BookOpen} color="#3B82F6" />
            <ModuleCard title="Présence" icon={Calendar} color="#10B981" />
            <ModuleCard title="Paiements" icon={CreditCard} color="#F59E0B" />
            <ModuleCard title="Communication" icon={MessageCircle} color="#8B5CF6" />
            <ModuleCard title="Documents" icon={FileText} color="#06B6D4" />
            <ModuleCard title="Paramètres" icon={Clock} color="#6B7280" />
          </View>
        </View>

        {/* Upcoming Events */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Événements à venir</Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.eventsContainer}>
            <EventCard
              title="Examen de mathématiques"
              date="Lundi, 15 juin 2024"
              time="08:00"
              type="exam"
            />
            <EventCard
              title="Réunion parents-professeurs"
              date="Mardi, 16 juin 2024"
              time="16:00"
              type="meeting"
            />
            <EventCard
              title="Sortie scolaire - Musée des Sciences"
              date="Jeudi, 18 juin 2024"
              time="Toute la journée"
              type="event"
            />
          </View>
        </View>

        {/* Recent Messages */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Messages récents</Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.messagesContainer}>
            <MessageCard
              sender="Mme Dupont"
              message="Bonjour, concernant le devoir de français..."
              time="10:35"
              unread={true}
            />
            <MessageCard
              sender="M. Laurent (Directeur)"
              message="Information importante concernant la fin du trimestre."
              time="hier"
              unread={false}
            />
            <MessageCard
              sender="M. Moreau (Maths)"
              message="Les résultats du contrôle sont disponibles."
              time="2j"
              unread={false}
            />
          </View>
        </View>

        {/* Sync Status */}
        <View style={styles.syncStatus}>
          <CheckCircle2 size={16} color="#10B981" />
          <Text style={styles.syncText}>
            Toutes les données sont synchronisées
          </Text>
          <Text style={styles.syncTime}>Dernière mise à jour: aujourd'hui à 16:42</Text>
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
  greeting: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
  },
  date: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    marginTop: 2,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  statsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 16,
  },
  statCard: {
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statTitle: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginLeft: 8,
    opacity: 0.9,
  },
  statValue: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    marginBottom: 4,
  },
  statSubtitle: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    opacity: 0.8,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
  },
  sectionLink: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#3B82F6',
  },
  modulesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  moduleCard: {
    width: '31%',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  moduleIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  moduleTitle: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    textAlign: 'center',
  },
  eventsContainer: {
    gap: 12,
  },
  eventCard: {
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
  eventIndicator: {
    width: 4,
    borderRadius: 2,
    marginRight: 12,
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
  },
  messagesContainer: {
    gap: 12,
  },
  messageCard: {
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
  messageAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  messageAvatarText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#475569',
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  messageSender: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
  },
  messageTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
  },
  messageText: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    lineHeight: 18,
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3B82F6',
    alignSelf: 'center',
    marginLeft: 8,
  },
  syncStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 8,
  },
  syncText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#10B981',
  },
  syncTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    marginLeft: 4,
  },
});