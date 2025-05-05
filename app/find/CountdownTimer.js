import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

const CountdownTimer = ({ initialTime = 300, onTimerEnd }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isTimeup, setIsTimeup] = useState(false);

  useEffect(() => {
    setTimeLeft(initialTime);
    setIsTimeup(false);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsTimeup(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [initialTime]);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimerEnd();
    }
  }, [timeLeft, onTimerEnd]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <View>
      <Text style={{ color: isTimeup ? "red" : "white", marginRight: 25 }}>
        {formatTime(timeLeft)}
      </Text>
    </View>
  );
};

export default CountdownTimer;
