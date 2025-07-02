import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  FAB,
  Chip,
  Text,
  Surface,
  IconButton,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Camiseta Básica',
      size: 'M',
      color: 'Azul',
      currentStock: 5,
      minStock: 10,
      status: 'low',
    },
    {
      id: 2,
      name: 'Calça Jeans',
      size: '42',
      color: 'Preto',
      currentStock: 15,
      minStock: 8,
      status: 'ok',
    },
    {
      id: 3,
      name: 'Tênis Esportivo',
      size: '40',
      color: 'Branco',
      currentStock: 2,
      minStock: 5,
      status: 'critical',
    },
  ]);

  const [stats, setStats] = useState({
    totalProducts: 3,
    lowStock: 2,
    outOfStock: 0,
    totalValue: 'R$ 12.450,00',
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical':
        return theme.colors.error;
      case 'low':
        return theme.colors.warning;
      case 'ok':
        return theme.colors.success;
      default:
        return theme.colors.placeholder;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'critical':
        return 'Crítico';
      case 'low':
        return 'Baixo';
      case 'ok':
        return 'Normal';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.secondary]}
        style={styles.header}
      >
        <Title style={styles.headerTitle}>Controle de Estoque</Title>
        <Paragraph style={styles.headerSubtitle}>
          Gerencie seus produtos
        </Paragraph>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <Surface style={[styles.statCard, { backgroundColor: theme.colors.primary }]}>
            <Ionicons name="cube-outline" size={24} color="white" />
            <Text style={styles.statNumber}>{stats.totalProducts}</Text>
            <Text style={styles.statLabel}>Produtos</Text>
          </Surface>

          <Surface style={[styles.statCard, { backgroundColor: theme.colors.warning }]}>
            <Ionicons name="warning-outline" size={24} color="white" />
            <Text style={styles.statNumber}>{stats.lowStock}</Text>
            <Text style={styles.statLabel}>Estoque Baixo</Text>
          </Surface>

          <Surface style={[styles.statCard, { backgroundColor: theme.colors.error }]}>
            <Ionicons name="alert-circle-outline" size={24} color="white" />
            <Text style={styles.statNumber}>{stats.outOfStock}</Text>
            <Text style={styles.statLabel}>Sem Estoque</Text>
          </Surface>
        </View>

        {/* Products List */}
        <View style={styles.section}>
          <Title style={styles.sectionTitle}>Produtos Recentes</Title>
          
          {products.map((product) => (
            <Card key={product.id} style={styles.productCard}>
              <Card.Content>
                <View style={styles.productHeader}>
                  <View style={styles.productInfo}>
                    <Title style={styles.productName}>{product.name}</Title>
                    <Paragraph style={styles.productDetails}>
                      {product.size} • {product.color}
                    </Paragraph>
                  </View>
                  <Chip
                    mode="outlined"
                    textStyle={{ color: getStatusColor(product.status) }}
                    style={{ borderColor: getStatusColor(product.status) }}
                  >
                    {getStatusText(product.status)}
                  </Chip>
                </View>
                
                <View style={styles.stockInfo}>
                  <View style={styles.stockItem}>
                    <Text style={styles.stockLabel}>Estoque Atual</Text>
                    <Text style={[styles.stockValue, { color: getStatusColor(product.status) }]}>
                      {product.currentStock}
                    </Text>
                  </View>
                  <View style={styles.stockItem}>
                    <Text style={styles.stockLabel}>Mínimo</Text>
                    <Text style={styles.stockValue}>{product.minStock}</Text>
                  </View>
                </View>
              </Card.Content>
              
              <Card.Actions>
                <IconButton
                  icon="eye"
                  mode="outlined"
                  onPress={() => {}}
                />
                <IconButton
                  icon="pencil"
                  mode="outlined"
                  onPress={() => {}}
                />
              </Card.Actions>
            </Card>
          ))}
        </View>

        {/* Recent Activities */}
        <View style={styles.section}>
          <Title style={styles.sectionTitle}>Atividades Recentes</Title>
          
          <Card style={styles.activityCard}>
            <Card.Content>
              <View style={styles.activityItem}>
                <Ionicons name="arrow-down-circle" size={20} color={theme.colors.success} />
                <View style={styles.activityText}>
                  <Text style={styles.activityTitle}>Entrada de estoque</Text>
                  <Text style={styles.activitySubtitle}>Camiseta Básica - 20 unidades</Text>
                </View>
                <Text style={styles.activityTime}>2h atrás</Text>
              </View>
              
              <View style={styles.activityItem}>
                <Ionicons name="arrow-up-circle" size={20} color={theme.colors.error} />
                <View style={styles.activityText}>
                  <Text style={styles.activityTitle}>Venda realizada</Text>
                  <Text style={styles.activitySubtitle}>Tênis Esportivo - 3 unidades</Text>
                </View>
                <Text style={styles.activityTime}>4h atrás</Text>
              </View>
              
              <View style={styles.activityItem}>
                <Ionicons name="alert-circle" size={20} color={theme.colors.warning} />
                <View style={styles.activityText}>
                  <Text style={styles.activityTitle}>Alerta de estoque</Text>
                  <Text style={styles.activitySubtitle}>Calça Jeans abaixo do mínimo</Text>
                </View>
                <Text style={styles.activityTime}>1d atrás</Text>
              </View>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => {}}
        label="Adicionar Produto"
      />
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
    paddingBottom: 30,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    padding: 16,
    marginHorizontal: 4,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: theme.colors.text,
  },
  productCard: {
    marginBottom: 12,
    elevation: 2,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productDetails: {
    fontSize: 14,
    color: theme.colors.placeholder,
  },
  stockInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.background,
  },
  stockItem: {
    alignItems: 'center',
  },
  stockLabel: {
    fontSize: 12,
    color: theme.colors.placeholder,
    marginBottom: 4,
  },
  stockValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  activityCard: {
    elevation: 2,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background,
  },
  activityText: {
    flex: 1,
    marginLeft: 12,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  activitySubtitle: {
    fontSize: 12,
    color: theme.colors.placeholder,
  },
  activityTime: {
    fontSize: 12,
    color: theme.colors.placeholder,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});