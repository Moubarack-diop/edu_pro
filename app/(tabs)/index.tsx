import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  FadeInUp, 
  FadeInDown,
  SlideInRight,
  withSpring,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withDelay
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { 
  BookOpen, 
  Calendar, 
  CreditCard, 
  MessageCircle, 
  FileText, 
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Bell,
  ChevronRight
} from 'lucide-react-native';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  header: {
    width: '100%',
    marginBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
  },
  headerGradient: {
    paddingTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  greeting: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#0F172A',
    marginBottom: 6,
  },
  date: {
    fontSize: 15,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  notificationBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EF4444',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1E40AF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  profileButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  statsContainer: {
    marginBottom: 32,
  },
  statsScroll: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    gap: 16,
  },
  statCard: {
    width: 300,
    height: 160,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  statGradient: {
    flex: 1,
    padding: 20,
  },
  statCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    opacity: 0.95,
  },
  statValue: {
    fontSize: 36,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  statSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#0F172A',
    marginBottom: 20,
  },
  modulesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 8,
  },
  moduleCard: {
    width: '30%',
    aspectRatio: 0.9,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  moduleBlur: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  moduleIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  moduleTitle: {
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    textAlign: 'center',
    lineHeight: 18,
  }
});

const StatCard = ({ title, value, subtitle, color, icon: Icon, delay = 0 }: {
  title: string;
  value: string;
  subtitle: string;
  color: string;
  icon: any;
  delay?: number;
}) => {
  const scale = useSharedValue(1);

  const handlePress = () => {
    scale.value = withSequence(
      withSpring(0.95),
      withSpring(1)
    );
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  return (
    <AnimatedPressable
      onPress={handlePress}
      style={[styles.statCard, animatedStyle]}
      entering={SlideInRight.delay(delay)}
    >
      <LinearGradient
        colors={[color, color.replace('rgb', 'rgba').replace(')', ', 0.85)')]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.statGradient}
      >
        <View style={styles.statCardHeader}>
          <View style={styles.statIconContainer}>
            <Icon size={22} color="#FFFFFF" />
          </View>
          <Text style={styles.statTitle}>{title}</Text>
        </View>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statSubtitle}>{subtitle}</Text>
      </LinearGradient>
    </AnimatedPressable>
  );
};

const ModuleCard = ({ title, icon: Icon, color, delay = 0 }: {
  title: string;
  icon: any;
  color: string;
  delay?: number;
}) => {
  const scale = useSharedValue(1);

  const handlePress = () => {
    scale.value = withSequence(
      withSpring(0.92),
      withSpring(1)
    );
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  return (
    <AnimatedPressable 
      onPress={handlePress}
      style={[styles.moduleCard, animatedStyle]}
      entering={FadeInUp.delay(delay).springify()}
    >
      <BlurView intensity={40} style={styles.moduleBlur}>
        <View style={[styles.moduleIcon, { backgroundColor: color }]}>
          <Icon size={24} color="#FFFFFF" />
        </View>
        <Text style={styles.moduleTitle}>{title}</Text>
      </BlurView>
    </AnimatedPressable>
  );
};

export default function HomeScreen() {
  const { width } = Dimensions.get('window');
  const currentDate = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleNotificationPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handleProfilePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View entering={FadeInDown.springify()} style={styles.header}>
          <LinearGradient
            colors={['rgba(59, 130, 246, 0.12)', 'rgba(59, 130, 246, 0.05)', 'transparent']}
            style={styles.headerGradient}
          >
            <View style={styles.headerContent}>
              <View>
                <Text style={styles.greeting}>Bonjour, Thomas</Text>
                <Text style={styles.date}>{currentDate}</Text>
              </View>
              <View style={styles.headerActions}>
                <TouchableOpacity 
                  style={styles.notificationButton}
                  onPress={handleNotificationPress}
                  activeOpacity={0.8}
                >
                  <Bell size={22} color="#1E293B" />
                  <View style={styles.notificationBadge} />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.profileButton}
                  onPress={handleProfilePress}
                  activeOpacity={0.8}
                >
                  <Text style={styles.profileButtonText}>TD</Text>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Statistics Cards */}
        <View style={styles.statsContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.statsScroll}
          >
            <StatCard
              title="Moyenne générale"
              value="15.7/20"
              subtitle="0.5 pt depuis le dernier trimestre"
              color="rgb(59, 130, 246)"
              icon={TrendingUp}
              delay={100}
            />
            <StatCard
              title="Taux de présence"
              value="98%"
              subtitle="2 absences ce trimestre"
              color="rgb(16, 185, 129)"
              icon={CheckCircle2}
              delay={200}
            />
            <StatCard
              title="Frais des paiements"
              value="À jour"
              subtitle="Prochain paiement: 15/07/2024"
              color="rgb(245, 158, 11)"
              icon={CreditCard}
              delay={300}
            />
          </ScrollView>
        </View>

        {/* Modules */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <Text style={styles.sectionTitle}>Modules</Text>
          <View style={styles.modulesGrid}>
            <ModuleCard title="Notes et Bulletins" icon={BookOpen} color="#3B82F6" delay={100} />
            <ModuleCard title="Présence" icon={Calendar} color="#10B981" delay={200} />
            <ModuleCard title="Paiements" icon={CreditCard} color="#F59E0B" delay={300} />
            <ModuleCard title="Communication" icon={MessageCircle} color="#8B5CF6" delay={400} />
            <ModuleCard title="Documents" icon={FileText} color="#06B6D4" delay={500} />
            <ModuleCard title="Paramètres" icon={Clock} color="#6B7280" delay={600} />
          </View>
        </Animated.View>

        {/* Rest of the existing code */}
      </ScrollView>
    </SafeAreaView>
  );
}