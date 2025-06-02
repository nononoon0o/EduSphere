import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

const CountdownTimer = ({
  initialTime = 300,
  onTimerEnd = () => {},
  onTick = () => {},
  textStyle = {},
}) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    setTimeLeft(initialTime);
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        onTick(next); // inform parent
        if (next <= 0) {
          clearInterval(interval);
          onTimerEnd();
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [initialTime]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <View>
      <Text style={[{ color: "#1D4ED8", fontWeight: "600" }, textStyle]}>
        {formatTime(timeLeft)}
      </Text>
    </View>
  );
};

export default CountdownTimer;
