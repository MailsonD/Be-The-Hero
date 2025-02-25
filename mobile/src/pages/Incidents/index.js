import React, { useEffect, useState, useCallback } from 'react';
import { Feather } from '@expo/vector-icons';
import {
    View,
    FlatList,
    Text,
    Image,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

import logoImg from '../../assets/logo.png';
import styles from './style';

const Incidents = () => {
    const [refreshing, setRefreshing] = useState(false);

    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        loadIncidents();
    }, []);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        setIncidents([]);
        setTotal(0);
        setPage(1);
        await loadIncidents();
        setRefreshing(false);
    }, [refreshing]);

    async function loadIncidents() {
        if (loading) {
            return;
        }

        if (total > 0 && incidents.length === total) {
            return;
        }

        setLoading(true);

        const response = await api.get('incidents', {
            params: { page },
        });
        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident });
    }

    return (
        <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            style={styles.container}>
            <View>
                <View style={styles.header}>
                    <Image source={logoImg}></Image>
                    <Text style={styles.headerText}>
                        Total de
                        <Text style={styles.headerTextBold}>
                            {' '}
                            {total} casos
                        </Text>
                        .
                    </Text>
                </View>
                <Text style={styles.title}>Bem-vindo!</Text>
                <Text style={styles.description}>
                    Escolha um dos casos abaixo e salve o dia
                </Text>

                <FlatList
                    style={styles.incidentList}
                    data={incidents}
                    keyExtractor={incident => incident.id}
                    showsVerticalScrollIndicator={false}
                    onEndReached={loadIncidents}
                    onEndReachedThreshold={0.2}
                    renderItem={({ item: incident }) => (
                        <View style={styles.incident}>
                            <Text style={styles.incidentProperty}>ONG:</Text>
                            <Text style={styles.incidentValue}>
                                {incident.name}
                            </Text>

                            <Text style={styles.incidentProperty}>CASO:</Text>
                            <Text style={styles.incidentValue}>
                                {incident.title}
                            </Text>

                            <Text style={styles.incidentProperty}>VALOR:</Text>
                            <Text style={styles.incidentValue}>
                                {Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                }).format(incident.value)}
                            </Text>

                            <TouchableOpacity
                                style={styles.detailsButton}
                                onPress={() => navigateToDetail(incident)}>
                                <Text style={styles.detailsButtonText}>
                                    Ver mais detalhes
                                </Text>
                                <Feather
                                    name='arrow-right'
                                    size={16}
                                    color='#E02041'
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        </RefreshControl>
    );
};

export default Incidents;
