import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Moon, 
  Download, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Smartphone,
  Eye,
  Lock
} from 'lucide-react-native';

type SettingItem = {
  id: string;
  title: string;
  subtitle?: string;
  icon: any;
  type: 'navigation' | 'toggle' | 'action';
  value?: boolean;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
  destructive?: boolean;
};

const SettingCard = ({ item }: { item: SettingItem }) => {
  const Icon = item.icon;
  
  return (
    <TouchableOpacity 
      style={[styles.settingItem, item.destructive && styles.destructiveItem]}
      onPress={item.onPress}
      disabled={item.type === 'toggle'}
    >
      <View style={[styles.settingIcon, item.destructive && styles.destructiveIcon]}>
        <Icon size={20} color={item.destructive ? "#EF4444" : "#64748B"} />
      </View>
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, item.destructive && styles.destructiveText]}>
          {item.title}
        </Text>
        {item.subtitle && (
          <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
        )}
      </View>
      {item.type === 'toggle' ? (
        <Switch
          value={item.value || false}
          onValueChange={item.onToggle}
          trackColor={{ false: '#E2E8F0', true: '#3B82F6' }}
          thumbColor="#FFFFFF"
        />
      ) : (
        <ChevronRight size={20} color="#CBD5E1" />
      )}
    </TouchableOpacity>
  );
};

const ProfileSection = () => (
  <View style={styles.profileSection}>
    <View style={styles.profileCard}>
      <View style={styles.profileAvatar}>
        <Text style={styles.profileAvatarText}>TD</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>Thomas Dubois</Text>
        <Text style={styles.profileRole}>Élève - Terminale S</Text>
        <Text style={styles.profileClass}>Classe: TS1 • Matricule: 2024001</Text>
      </View>
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Modifier</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [offlineMode, setOfflineMode] = useState(true);
  const [biometrics, setBiometrics] = useState(false);

  const accountSettings: SettingItem[] = [
    {
      id: '1',
      title: 'Informations personnelles',
      subtitle: 'Nom, email, numéro de téléphone',
      icon: User,
      type: 'navigation',
      onPress: () => console.log('Navigate to profile'),
    },
    {
      id: '2',
      title: 'Sécurité et confidentialité',
      subtitle: 'Mot de passe, authentification',
      icon: Shield,
      type: 'navigation',
      onPress: () => console.log('Navigate to security'),
    },
    {
      id: '3',
      title: 'Authentification biométrique',
      subtitle: 'Empreinte digitale, reconnaissance faciale',
      icon: Lock,
      type: 'toggle',
      value: biometrics,
      onToggle: setBiometrics,
    },
  ];

  const appSettings: SettingItem[] = [
    {
      id: '4',
      title: 'Notifications',
      subtitle: 'Push, SMS, email',
      icon: Bell,
      type: 'toggle',
      value: notifications,
      onToggle: setNotifications,
    },
    {
      id: '5',
      title: 'Mode sombre',
      subtitle: 'Apparence de l\'application',
      icon: Moon,
      type: 'toggle',
      value: darkMode,
      onToggle: setDarkMode,
    },
    {
      id: '6',
      title: 'Langue',
      subtitle: 'Français',
      icon: Globe,
      type: 'navigation',
      onPress: () => console.log('Navigate to language'),
    },
    {
      id: '7',
      title: 'Mode hors-ligne',
      subtitle: 'Synchronisation automatique',
      icon: Download,
      type: 'toggle',
      value: offlineMode,
      onToggle: setOfflineMode,
    },
  ];

  const otherSettings: SettingItem[] = [
    {
      id: '8',
      title: 'Centre d\'aide',
      subtitle: 'FAQ, guides, contact support',
      icon: HelpCircle,
      type: 'navigation',
      onPress: () => console.log('Navigate to help'),
    },
    {
      id: '9',
      title: 'À propos de l\'application',
      subtitle: 'Version 1.0.0',
      icon: Smartphone,
      type: 'navigation',
      onPress: () => console.log('Navigate to about'),
    },
    {
      id: '10',
      title: 'Politique de confidentialité',
      subtitle: 'Conditions d\'utilisation',
      icon: Eye,
      type: 'navigation',
      onPress: () => console.log('Navigate to privacy'),
    },
  ];

  const logoutSetting: SettingItem[] = [
    {
      id: '11',
      title: 'Se déconnecter',
      subtitle: 'Déconnexion de votre compte',
      icon: LogOut,
      type: 'action',
      destructive: true,
      onPress: () => console.log('Logout'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Paramètres</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <ProfileSection />

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compte</Text>
          <View style={styles.settingsGroup}>
            {accountSettings.map((item) => (
              <SettingCard key={item.id} item={item} />
            ))}
          </View>
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Application</Text>
          <View style={styles.settingsGroup}>
            {appSettings.map((item) => (
              <SettingCard key={item.id} item={item} />
            ))}
          </View>
        </View>

        {/* Sync Status */}
        <View style={styles.syncSection}>
          <View style={styles.syncCard}>
            <View style={styles.syncHeader}>
              <Download size={20} color="#10B981" />
              <Text style={styles.syncTitle}>Synchronisation</Text>
            </View>
            <Text style={styles.syncStatus}>
              ✅ Dernière synchronisation: Aujourd'hui à 16:42
            </Text>
            <Text style={styles.syncInfo}>
              📱 Données locales: 2.4 MB • ☁️ Stockage cloud: 15.8 MB
            </Text>
            <TouchableOpacity style={styles.syncButton}>
              <Text style={styles.syncButtonText}>Synchroniser maintenant</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Notification Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.notificationCard}>
            <Text style={styles.notificationTitle}>Types de notifications</Text>
            <View style={styles.notificationOptions}>
              <View style={styles.notificationOption}>
                <Text style={styles.notificationLabel}>📚 Notes et bulletins</Text>
                <Switch value={true} onValueChange={() => {}} />
              </View>
              <View style={styles.notificationOption}>
                <Text style={styles.notificationLabel}>📅 Présence et absences</Text>
                <Switch value={true} onValueChange={() => {}} />
              </View>
              <View style={styles.notificationOption}>
                <Text style={styles.notificationLabel}>💳 Paiements</Text>
                <Switch value={true} onValueChange={() => {}} />
              </View>
              <View style={styles.notificationOption}>
                <Text style={styles.notificationLabel}>💬 Messages</Text>
                <Switch value={notifications} onValueChange={() => {}} />
              </View>
              <View style={styles.notificationOption}>
                <Text style={styles.notificationLabel}>📢 Annonces générales</Text>
                <Switch value={true} onValueChange={() => {}} />
              </View>
            </View>
          </View>
        </View>

        {/* Other Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Autres</Text>
          <View style={styles.settingsGroup}>
            {otherSettings.map((item) => (
              <SettingCard key={item.id} item={item} />
            ))}
          </View>
        </View>

        {/* Logout */}
        <View style={styles.section}>
          <View style={styles.settingsGroup}>
            {logoutSetting.map((item) => (
              <SettingCard key={item.id} item={item} />
            ))}
          </View>
        </View>

        {/* App Version */}
        <View style={styles.versionSection}>
          <Text style={styles.versionText}>EduManager Pro</Text>
          <Text style={styles.versionNumber}>Version 1.0.0 (Build 2024.06.001)</Text>
          <Text style={styles.versionCopyright}>© 2024 EduManager. Tous droits réservés.</Text>
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
  profileSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileAvatarText: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    marginBottom: 2,
  },
  profileRole: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
    marginBottom: 2,
  },
  profileClass: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
  },
  editButton: {
    backgroundColor: '#F0F9FF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  editButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#3B82F6',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    marginBottom: 12,
  },
  settingsGroup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  destructiveItem: {
    borderBottomWidth: 0,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  destructiveIcon: {
    backgroundColor: '#FEF2F2',
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
  },
  destructiveText: {
    color: '#EF4444',
  },
  settingSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    marginTop: 2,
  },
  syncSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  syncCard: {
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  syncHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  syncTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#065F46',
    marginLeft: 8,
  },
  syncStatus: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#065F46',
    marginBottom: 4,
  },
  syncInfo: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#065F46',
    marginBottom: 12,
  },
  syncButton: {
    backgroundColor: '#10B981',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  syncButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 16,
  },
  notificationOptions: {
    gap: 12,
  },
  notificationOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1E293B',
  },
  versionSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  versionText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  versionNumber: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    marginBottom: 8,
  },
  versionCopyright: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    textAlign: 'center',
  },
});