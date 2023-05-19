import * as React from 'react';
import { SvgUri } from "react-native-svg";

// @ts-ignore
function SvgComponent(props) {
    return (
        <SvgUri
            width="50%"
            height="50%"
            uri="https://www.lenasoftware.com/Assets/img/logo-single-black.svg"
        />
    );
}

const SvgLena = React.memo(SvgComponent);
export default SvgLena;