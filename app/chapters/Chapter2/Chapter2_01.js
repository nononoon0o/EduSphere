import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHigh, faCloud, faCloudSun, faSun, faRain, faSnowflake } from '@fortawesome/free-solid-svg-icons';

const ClimateScienceContent = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>기권과 지구 기온 (The Atmosphere and Earth's Temperature)</h1>

      <div style={styles.scrollableContainer}>
        <div style={styles.section}>
          <h2 style={styles.subHeader}>1. 지구 대기의 구성 (Composition of Earth's Atmosphere)</h2>
          <p style={styles.text}>
            대기는 주로 질소(N₂) 78%, 산소(O₂) 21%, 그리고 이산화탄소(CO₂), 메탄(CH₄), 오존(O₃), 수증기(H₂O) 등 추적 가스로 이루어져 있습니다. 이 기체들은 대기에서 차지하는 비율은 적지만, 지구의 기후와 기온에 미치는 영향은 매우 큽니다.
          </p>
          <ul style={styles.list}>
            <li><FontAwesomeIcon icon={faCloudSun} /> 질소(N₂): 비활성 기체</li>
            <li><FontAwesomeIcon icon={faSun} /> 산소(O₂): 호흡과 연소 과정에 중요</li>
            <li><FontAwesomeIcon icon={faTemperatureHigh} /> 이산화탄소(CO₂): 온실 효과</li>
            <li><FontAwesomeIcon icon={faCloud} /> 메탄(CH₄): 강력한 온실가스</li>
            <li><FontAwesomeIcon icon={faSnowflake} /> 수증기(H₂O): 날씨 시스템과 온실 효과</li>
          </ul>
        </div>

        <div style={styles.section}>
          <h2 style={styles.subHeader}>2. 온실 효과와 지구 온난화 (Greenhouse Effect and Global Warming)</h2>
          <p style={styles.text}>
            온실 효과는 특정 가스들이 열을 잡아두어 우주로 빠져나가지 않게 하여 지구 표면 온도를 일정하게 유지하는 자연적인 과정입니다. 이산화탄소, 메탄, 수증기 등 온실 가스들이 이 열을 흡수하고 방출하여 지구를 따뜻하게 만듭니다.
          </p>
          <ul style={styles.list}>
            <li><FontAwesomeIcon icon={faCloudSun} /> 태양 에너지 흡수</li>
            <li><FontAwesomeIcon icon={faRain} /> 적외선 복사 및 열 차단</li>
            <li><FontAwesomeIcon icon={faTemperatureHigh} /> 강화된 온실 효과</li>
          </ul>
        </div>

        <div style={styles.section}>
          <h2 style={styles.subHeader}>3. 화학 반응과 기후 역학에서의 역할 (Role of Chemical Reactions in Climate Dynamics)</h2>
          <p style={styles.text}>
            대기에서 일어나는 화학 반응은 지구의 온도와 기후를 조절하는 중요한 과정입니다.
          </p>
          <ul style={styles.list}>
            <li><FontAwesomeIcon icon={faSun} /> 연소 반응</li>
            <li><FontAwesomeIcon icon={faCloud} /> 광합성과 호흡</li>
            <li><FontAwesomeIcon icon={faTemperatureHigh} /> 해양 흡수 및 탄소 격리</li>
          </ul>
        </div>

        <div style={styles.section}>
          <h2 style={styles.subHeader}>4. 대기 중 에너지 전송 메커니즘 (Energy Transfer Mechanisms in the Atmosphere)</h2>
          <p style={styles.text}>
            지구 대기 중에서 열은 전도, 대류, 복사를 통해 전달됩니다.
          </p>
          <ul style={styles.list}>
            <li><FontAwesomeIcon icon={faSun} /> 전도</li>
            <li><FontAwesomeIcon icon={faCloudSun} /> 대류</li>
            <li><FontAwesomeIcon icon={faRain} /> 복사</li>
          </ul>
        </div>

        <div style={styles.section}>
          <h2 style={styles.subHeader}>5. 인간의 기후 변화 및 화학 반응에 대한 영향 (Human Impact on Climate Change and Chemical Reactions)</h2>
          <p style={styles.text}>
            인간의 활동은 대기 중 온실 가스를 증가시키고 기후 변화를 초래합니다.
          </p>
          <ul style={styles.list}>
            <li><FontAwesomeIcon icon={faCloud} /> 화석 연료 연소</li>
            <li><FontAwesomeIcon icon={faSun} /> 산림 벌채</li>
            <li><FontAwesomeIcon icon={faRain} /> 농업 및 가축</li>
          </ul>
        </div>

        <div style={styles.section}>
          <h2 style={styles.subHeader}>6. 기후 변화에 대한 영향 (Impacts of Climate Change)</h2>
          <p style={styles.text}>
            대기 중의 화학 반응들, 예를 들어 연소, 광합성 및 호흡은 온실 가스의 균형에 직접적인 영향을 미칩니다. 인간 활동으로 인해 온실 가스 농도가 증가하면 지구 온도가 상승하고 기후 변화가 발생합니다.
          </p>
          <ul style={styles.list}>
            <li><FontAwesomeIcon icon={faTemperatureHigh} /> 지구 평균 온도 상승</li>
            <li><FontAwesomeIcon icon={faSnowflake} /> 빙하 융해 및 해수면 상승</li>
            <li><FontAwesomeIcon icon={faCloud} /> 극단적인 날씨 현상</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
    color: '#333'
  },
  header: {
    textAlign: 'center',
    color: '#2c3e50',
  },
  subHeader: {
    color: '#2980b9',
    fontSize: '1.5em',
    marginTop: '20px',
  },
  text: {
    fontSize: '1em',
    lineHeight: '1.6',
  },
  section: {
    marginBottom: '30px',
  },
  list: {
    listStyleType: 'none',
    paddingLeft: '0',
  },
  scrollableContainer: {
    maxHeight: '80vh',
    overflowY: 'auto',
    marginTop: '20px',
    paddingRight: '10px',
  },
};

export default ClimateScienceContent;
