import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  Card,
  Title,
  Paragraph,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../theme/theme';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = {
        name,
        email,
        token: 'demo-token-123',
      };
      
      await AsyncStorage.setItem('userToken', userData.token);
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      
      Alert.alert('Sucesso', 'Conta criada com sucesso!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'MainTabs' }],
            });
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Falha no cadastro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[theme.colors.primary, theme.colors.secondary]}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Title style={styles.title}>Criar Conta</Title>
              <Paragraph style={styles.subtitle}>
                Preencha os dados para se cadastrar
              </Paragraph>

              <TextInput
                label="Nome completo"
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

              <TextInput
                label="Senha"
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                style={styles.input}
                secureTextEntry={!showPassword}
                right={
                  <TextInput.Icon
                    icon={showPassword ? 'eye-off' : 'eye'}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
                left={<TextInput.Icon icon="lock" />}
              />

              <TextInput
                label="Confirmar senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                mode="outlined"
                style={styles.input}
                secureTextEntry={!showConfirmPassword}
                right={
                  <TextInput.Icon
                    icon={showConfirmPassword ? 'eye-off' : 'eye'}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                }
                left={<TextInput.Icon icon="lock-check" />}
              />

              <Button
                mode="contained"
                onPress={handleRegister}
                loading={loading}
                disabled={loading}
                style={styles.button}
                contentStyle={styles.buttonContent}
              >
                Cadastrar
              </Button>

              <Button
                mode="text"
                onPress={() => navigation.navigate('Login')}
                style={styles.linkButton}
              >
                Já tem conta? Faça login
              </Button>
            </Card.Content>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    elevation: 8,
    borderRadius: 16,
  },
  cardContent: {
    padding: 24,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 32,
    color: theme.colors.placeholder,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    marginBottom: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  linkButton: {
    marginTop: 8,
  },
});