import React, { memo, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { SharedContextModel } from '../../models/typescript/sharedContext';
import { SharedContext } from '../../store/context/SharedContext';
import { width_screen } from '../../utilities/dimensions';

const Overlay = memo(() => {
    const currentContext: SharedContextModel = useContext(SharedContext);

    return (
        <>
            {currentContext.showOverlay && <View style={styles.overlay}></View>}
        </>
    );

});

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        opacity: 0.5,
        backgroundColor: 'black',
        width: width_screen,
        zIndex: 5
    }
});

export default Overlay;