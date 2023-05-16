import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Title, Paragraph, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
type Props = {

    url: string;
    username: string;
    password: string;
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: 'black',
        margin: 8,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    icon: {
        marginRight: 16,
    },
    passInfoContainer: {
        flexDirection: 'column',
    },
    dataFieldContainer: {
        flexDirection: 'column',
        flex: 1,
    },
    passField: {
        height: 30,
        flex: 1,
        marginTop: 6,
        width: '100%',
    },
    viewIcon: {
        marginLeft: 8,
        marginTop: 9,

    },
    passFieldContainer: {
        flexDirection: 'row',
    }
});

function PassCard(props: Props): JSX.Element {
    const { url, username, password } = props;
    return (
        <Card style={styles.container}>
            <Card.Content style={styles.content}>
                <Icon name="form-textbox-password" size={24} style={styles.icon} />
                <View style={styles.passInfoContainer}>
                    <Title>{url}</Title>
                    <View style={styles.dataFieldContainer}>
                        <TextInput
                            style={styles.passField}
                            disabled={true}
                            secureTextEntry={false}
                            value={username}
                        />
                        <View style={styles.passFieldContainer}>
                            <TextInput
                                style={styles.passField}
                                disabled={true}
                                secureTextEntry={true}
                                value={password}
                            />
                            <Icon name="eye" size={24} style={styles.viewIcon} />
                        </View>

                    </View>
                </View>
            </Card.Content>
        </Card>
    );
}


export default PassCard;