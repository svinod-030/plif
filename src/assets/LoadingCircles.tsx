import * as React from "react"
import Svg, { Circle } from "react-native-svg"

const LoadingCircles = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        viewBox="0 0 100 100"
        {...props}
    >
        <Circle cx={6} cy={50} r={6} fill="#fff" />
        <Circle cx={26} cy={50} r={6} fill="#fff" />
        <Circle cx={46} cy={50} r={6} fill="#fff" />
    </Svg>
)

export default LoadingCircles
