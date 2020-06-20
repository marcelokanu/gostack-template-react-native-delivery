import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';

import api from '../../services/api';
import formatValue from '../../utils/formatValue';

import {
  Container,
  Header,
  HeaderTitle,
  FoodsContainer,
  FoodList,
  Food,
  FoodImageContainer,
  FoodContent,
  FoodTitle,
  FoodDescription,
  FoodPricing,
} from './styles';
import { useNavigation } from '@react-navigation/native';

interface Food {
  id: number;
  product_id: number;
  name: string;
  description: string;
  price: number;
  formattedValue: number;
  thumbnail_url: string;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Food[]>([]);

  const navigation = useNavigation();

  const handleNavigate = (id: number) => {
    navigation.navigate('FoodDetails', { id });
  };

  useEffect(() => {
    async function loadOrders(): Promise<void> {
      // Load orders from API
      const response = await api.get<Food[]>('/orders');

      const foodData = response.data;

      setOrders(foodData);
    }

    loadOrders();
  }, []);

  return (
    <Container>
      <Header>
        <HeaderTitle>Meus pedidos</HeaderTitle>
      </Header>

      <FoodsContainer>
        <FoodList
          data={orders}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Food
              key={item.id}
              activeOpacity={0.6}
              onPress={() => handleNavigate(item.product_id)}
            >
              <FoodImageContainer>
                <Image
                  style={{ width: 88, height: 88 }}
                  source={{ uri: item.thumbnail_url }}
                />
              </FoodImageContainer>
              <FoodContent>
                <FoodTitle>{item.name}</FoodTitle>
                <FoodDescription>{item.description}</FoodDescription>
                <FoodPricing>{formatValue(item.price)}</FoodPricing>
              </FoodContent>
            </Food>
          )}
        />
      </FoodsContainer>
    </Container>
  );
};

export default Orders;
