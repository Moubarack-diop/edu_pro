import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageCircle, Search, Plus, Phone, Video, MoreVertical, Send } from 'lucide-react-native';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'contact';
  timestamp: string;
};

type Contact = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  online: boolean;
};

const ContactCard = ({ contact, onPress }: { contact: Contact; onPress: (contact: Contact) => void }) => (
  <TouchableOpacity style={styles.contactCard} onPress={() => onPress(contact)}>
    <View style={styles.contactInfo}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>{contact.avatar}</Text>
        {contact.online && <View style={styles.onlineIndicator} />}
      </View>
      <View style={styles.contactDetails}>
        <View style={styles.contactHeader}>
          <Text style={styles.contactName}>{contact.name}</Text>
          <Text style={styles.messageTime}>{contact.lastMessageTime}</Text>
        </View>
        <Text style={styles.contactRole}>{contact.role}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {contact.lastMessage}
        </Text>
      </View>
      {contact.unreadCount > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadCount}>{contact.unreadCount}</Text>
        </View>
      )}
    </View>
  </TouchableOpacity>
);

const MessageBubble = ({ message }: { message: Message }) => (
  <View style={[
    styles.messageBubble,
    message.sender === 'user' ? styles.userMessage : styles.contactMessage
  ]}>
    <Text style={[
      styles.messageText,
      message.sender === 'user' ? styles.userMessageText : styles.contactMessageText
    ]}>
      {message.text}
    </Text>
    <Text style={[
      styles.messageTime,
      message.sender === 'user' ? styles.userMessageTime : styles.contactMessageTime
    ]}>
      {message.timestamp}
    </Text>
  </View>
);

const ChatView = ({ contact, onBack }: { contact: Contact; onBack: () => void }) => {
  const [newMessage, setNewMessage] = useState('');
  
  const messages: Message[] = [
    {
      id: '1',
      text: 'Bonjour, j\'aimerais vous parler du dernier devoir de Thomas.',
      sender: 'user',
      timestamp: '14:30'
    },
    {
      id: '2',
      text: 'Bonjour ! Bien sûr, je vous écoute. Comment puis-je vous aider ?',
      sender: 'contact',
      timestamp: '14:32'
    },
    {
      id: '3',
      text: 'Il a eu des difficultés avec les exercices sur les fonctions. Pourriez-vous lui donner quelques conseils ?',
      sender: 'user',
      timestamp: '14:33'
    },
    {
      id: '4',
      text: 'Absolument ! Je vais lui préparer quelques exercices supplémentaires et nous pourrons programmer une séance de révision.',
      sender: 'contact',
      timestamp: '14:35'
    },
    {
      id: '5',
      text: 'C\'est parfait, merci beaucoup pour votre aide !',
      sender: 'user',
      timestamp: '14:36'
    }
  ];

  const sendMessage = () => {
    if (newMessage.trim()) {
      // Ici, vous ajouteriez le message à la liste et l'enverriez au serveur
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <View style={styles.chatContainer}>
      {/* Chat Header */}
      <View style={styles.chatHeader}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View style={styles.chatContactInfo}>
          <Text style={styles.chatContactName}>{contact.name}</Text>
          <Text style={styles.chatContactRole}>{contact.role}</Text>
        </View>
        <View style={styles.chatActions}>
          <TouchableOpacity style={styles.chatActionButton}>
            <Phone size={20} color="#3B82F6" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatActionButton}>
            <Video size={20} color="#3B82F6" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatActionButton}>
            <MoreVertical size={20} color="#64748B" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </ScrollView>

      {/* Message Input */}
      <View style={styles.messageInputContainer}>
        <TextInput
          style={styles.messageInput}
          placeholder="Tapez votre message..."
          value={newMessage}
          onChangeText={setNewMessage}
          multiline
        />
        <TouchableOpacity 
          style={[styles.sendButton, newMessage.trim() && styles.sendButtonActive]}
          onPress={sendMessage}
          disabled={!newMessage.trim()}
        >
          <Send size={20} color={newMessage.trim() ? "#FFFFFF" : "#9CA3AF"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function MessagesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const contacts: Contact[] = [
    {
      id: '1',
      name: 'Mme Dupont',
      role: 'Professeur de Français',
      avatar: 'MD',
      lastMessage: 'Les résultats du contrôle sont disponibles',
      lastMessageTime: '10:35',
      unreadCount: 2,
      online: true,
    },
    {
      id: '2',
      name: 'M. Laurent',
      role: 'Directeur',
      avatar: 'ML',
      lastMessage: 'Information importante concernant la fin du trimestre',
      lastMessageTime: 'hier',
      unreadCount: 0,
      online: false,
    },
    {
      id: '3',
      name: 'M. Moreau',
      role: 'Professeur de Mathématiques',
      avatar: 'MM',
      lastMessage: 'N\'hésitez pas si vous avez des questions',
      lastMessageTime: '2j',
      unreadCount: 0,
      online: true,
    },
    {
      id: '4',
      name: 'Mme Martin',
      role: 'Conseillère d\'orientation',
      avatar: 'MM',
      lastMessage: 'Rendez-vous programmé pour vendredi',
      lastMessageTime: '3j',
      unreadCount: 1,
      online: false,
    },
    {
      id: '5',
      name: 'Service Administration',
      role: 'Administration',
      avatar: 'SA',
      lastMessage: 'Votre demande a été traitée',
      lastMessageTime: '1sem',
      unreadCount: 0,
      online: true,
    },
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedContact) {
    return (
      <SafeAreaView style={styles.container}>
        <ChatView 
          contact={selectedContact} 
          onBack={() => setSelectedContact(null)} 
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity style={styles.newChatButton}>
          <Plus size={20} color="#3B82F6" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher une conversation..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Contacts List */}
      <ScrollView style={styles.contactsList} showsVerticalScrollIndicator={false}>
        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickAction}>
            <View style={styles.quickActionIcon}>
              <MessageCircle size={20} color="#3B82F6" />
            </View>
            <Text style={styles.quickActionText}>Nouvelle conversation</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Conversations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conversations récentes</Text>
          {filteredContacts.map((contact) => (
            <ContactCard 
              key={contact.id} 
              contact={contact} 
              onPress={setSelectedContact}
            />
          ))}
        </View>

        {/* Communication Guidelines */}
        <View style={styles.guidelinesContainer}>
          <Text style={styles.guidelinesTitle}>📝 Conseils de communication</Text>
          <View style={styles.guideline}>
            <Text style={styles.guidelineText}>
              • Soyez respectueux dans vos échanges avec l'équipe pédagogique
            </Text>
          </View>
          <View style={styles.guideline}>
            <Text style={styles.guidelineText}>
              • Privilégiez les messages durant les heures ouvrables (8h-17h)
            </Text>
          </View>
          <View style={styles.guideline}>
            <Text style={styles.guidelineText}>
              • Pour les urgences, contactez directement l'administration
            </Text>
          </View>
        </View>

        {/* Contact Info */}
        <View style={styles.contactInfo}>
          <Text style={styles.contactInfoTitle}>🏫 Contact École</Text>
          <Text style={styles.contactInfoText}>Téléphone: +243 XX XXX XXXX</Text>
          <Text style={styles.contactInfoText}>Email: contact@ecole.cd</Text>
          <Text style={styles.contactInfoText}>Horaires: Lun-Ven 7h30-17h00</Text>
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
  newChatButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1E293B',
  },
  contactsList: {
    flex: 1,
  },
  quickActions: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  quickAction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  quickActionText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    marginBottom: 12,
  },
  contactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatarText: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E2E8F0',
    textAlign: 'center',
    lineHeight: 48,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#475569',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  contactDetails: {
    flex: 1,
  },
  contactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  contactName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
  },
  messageTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
  },
  contactRole: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
  },
  unreadBadge: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  unreadCount: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  guidelinesContainer: {
    marginHorizontal: 20,
    marginVertical: 16,
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    padding: 16,
  },
  guidelinesTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1E40AF',
    marginBottom: 12,
  },
  guideline: {
    marginBottom: 8,
  },
  guidelineText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1E40AF',
    lineHeight: 20,
  },
  contactInfo: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 16,
  },
  contactInfoTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#92400E',
    marginBottom: 8,
  },
  contactInfoText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#92400E',
    marginBottom: 4,
  },
  // Chat Styles
  chatContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  backText: {
    fontSize: 24,
    color: '#3B82F6',
  },
  chatContactInfo: {
    flex: 1,
  },
  chatContactName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
  },
  chatContactRole: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
  },
  chatActions: {
    flexDirection: 'row',
    gap: 8,
  },
  chatActionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    marginBottom: 16,
    borderRadius: 16,
    padding: 12,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#3B82F6',
    borderBottomRightRadius: 4,
  },
  contactMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  messageText: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
    marginBottom: 4,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  contactMessageText: {
    color: '#1E293B',
  },
  userMessageTime: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  contactMessageTime: {
    color: '#64748B',
  },
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    gap: 12,
  },
  messageInput: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonActive: {
    backgroundColor: '#3B82F6',
  },
});