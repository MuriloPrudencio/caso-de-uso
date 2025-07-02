import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  TextInput,
  Avatar,
  Divider,
  List,
  Switch,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../theme/theme';

export default function ProfileScreen({ navigation }) {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        const data = JSON.parse(userDataString);
        setUserData(data);
        setName(data.name);
        setEmail(data.email);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleSave = async () => {
    try {
      const updatedData = { ...userData, name, email };
      await AsyncStorage.setItem('userData', JSON.stringify(updatedData));
      setUserData(updatedData);
      setEditMode(false);
      Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar os dados');
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair da sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.multiRemove(['userToken', 'userData']);
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            } catch (error) {
              console.error('Error logging out:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.secondary]}
        style={styles.header}
      >
        <Avatar.Text
          size={80}
          label={userData.name.charAt(0).toUpperCase()}
          style={styles.avatar}
        />
        <Title style={styles.headerTitle}>{userData.name}</Title>
        <Paragraph style={styles.headerSubtitle}>{userData.email}</Paragraph>
      </LinearGradient>

      <ScrollView style={styles.content}>
        {/* Personal Information */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <Title style={styles.cardTitle}>Informações Pessoais</Title>
              <Button
                mode="text"
                onPress={() => setEditMode(!editMode)}
                compact
              >
                {editMode ? 'Cancelar' : 'Editar'}
              </Button>
            </View>

            {editMode ? (
              <>
                <TextInput
                  label="Nome"
                  value={name}
                  onChangeText={setName}
                  mode="outlined"
                  style={styles.input}
                  left={<TextInput.Icon icon="account" />}
                />
                <TextInput
                  label="Email"
                  value={email}
                  onChangeText={setEmail}
                  mode="outlined"
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  left={<TextInput.Icon icon="email" />}
                />
                <Button
                  mode="contained"
                  onPress={handleSave}
                  style={styles.saveButton}
                >
                  Salvar Alterações
                </Button>
              </>
            ) : (
              <>
                <List.Item
                  title="Nome"
                  description={userData.name}
                  left={props => <List.Icon {...props} icon="account" />}
                />
                <List.Item
                  title="Email"
                  description={userData.email}
                  left={props => <List.Icon {...props} icon="email" />}
                />
              </>
            )}
          </Card.Content>
        </Card>

        {/* Settings */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Configurações</Title>
            
            <List.Item
              title="Notificações Push"
              description="Receber notificações no dispositivo"
              left={props => <List.Icon {...props} icon="bell" />}
              right={() => (
                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                />
              )}
            />
            
            <List.Item
              title="Alertas por Email"
              description="Receber alertas de estoque por email"
              left={props => <List.Icon {...props} icon="email-alert" />}
              right={() => (
                <Switch
                  value={emailAlerts}
                  onValueChange={setEmailAlerts}
                />
              )}
            />
          </Card.Content>
        </Card>

        {/* App Information */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Sobre o App</Title>
            
            <List.Item
              title="Versão"
              description="1.0.0"
              left={props => <List.Icon {...props} icon="information" />}
            />
            
            <List.Item
              title="Suporte"
              description="Contatar equipe de suporte"
              left={props => <List.Icon {...props} icon="help-circle" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {}}
            />
            
            <List.Item
              title="Política de Privacidade"
              description="Ler nossa política de privacidade"
              left={props => <List.Icon {...props} icon="shield-check" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {}}
            />
          </Card.Content>
        </Card>

        {/* Logout Button */}
        <Card style={[styles.card, styles.logoutCard]}>
          <Card.Content>
            <Button
              mode="contained"
              onPress={handleLogout}
              style={styles.logoutButton}
              buttonColor={theme.colors.error}
              icon="logout"
            >
              Sair da Conta
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 16,
  },
  saveButton: {
    marginTop: 8,
  },
  logoutCard: {
    marginBottom: 32,
  },
  logoutButton: {
    paddingVertical: 8,
  },
});