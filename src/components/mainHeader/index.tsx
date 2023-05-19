import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text
} from 'react-native';
import { height_screen, width_screen } from '../../utilities/dimensions';
import { useNavigation } from '@react-navigation/native';
import { UseNavigationModel } from '../../models/typescript/navigation';
import AntdesingIcon from 'react-native-vector-icons/AntDesign'
import SvgLena from '../../assets/svgs/SvgLena';
import { fonts } from '../../utilities/fonts/index';

interface MainHeaderParamsModel {
    showGoBackButton?: boolean
}
function MainHeader(props: MainHeaderParamsModel): JSX.Element {
    const navigation: UseNavigationModel = useNavigation();

    const { showGoBackButton } = props

    function OnGoBackPressed() {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            {showGoBackButton ?
                <TouchableOpacity style={styles.leftSection} onPress={OnGoBackPressed}>
                    <AntdesingIcon name='arrowleft' size={width_screen * .08} color={'black'} />
                </TouchableOpacity>
                :
                <View style={styles.leftSection}></View>
            }
            <View style={styles.middleSection}>
                <SvgLena />
                <Text style={styles.lenaText}>Lena</Text>
            </View>
            <View style={styles.rightSection}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: height_screen * .09,
        backgroundColor: 'white',
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: '#e0e0e0',

    },
    middleSection: {
        flexDirection: 'row',
        flex: 4,
        alignItems: 'center',
    },
    lenaText: {
        fontFamily: fonts.PoppinsBold,
        fontSize: 32,
        color: 'black',
    },
    logo: {
        height: '100%',
        width: '100%'
    },
    leftSection: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    rightSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }

});

export default MainHeader;
