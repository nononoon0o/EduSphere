import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      title: 'Discover the World of Chemistry',
      subtitle: 'Dive into atoms, reactions, and molecular mysteries.',
      goToAccount: 'Go to your account',
      chapterList: '3rd Year of Middle School Science Curriculum',
      credits: 'Credits',
      donate: 'Donate',
      partners: 'Partners',
      legal: 'All rights reserved.',
      chapterTitles: {
        Chapter1: 'CHAPTER I',
        Chapter2: 'CHAPTER Ⅱ',
        Chapter3: 'CHAPTER Ⅲ',
        Chapter4: 'CHAPTER Ⅳ',
      },
      chapter1: {
        title: 'I. Rules of Chemical Reactions and Energy Changes',
        subtitles: {
          "01": 'Changes in Matter and Chemical Equations',
          "02": 'Law of Conservation of Mass & Law of Constant Proportions',
          "03": 'Gas Reaction Law & Energy in Chemical Reactions',
        },
      },
        chapter1_01: {
            subtitle: '01. Changes in Matter and Chemical Equations',
            title: 'I. Rules of Chemical Reactions and Energy Changes',
            sections: {
            concept: 'Concept Summary',
            learn: 'Learn',
            video: 'Video Learning',
            },
        },
            concept: {
                back: 'Back',
                goal: '📘 Learning Goal: Explain the difference between physical and chemical changes.',
                features: 'Features',
                examples: 'Examples',
                physical: {
                title: 'Physical Change',
                feature1: 'No new substance is created.',
                feature2: 'The change is usually reversible.',
                example1: 'Cutting paper',
                example2: 'Melting ice into water',
                },
                chemical: {
                title: 'Chemical Change',
                feature1: 'The original substance disappears and a new one is formed.',
                feature2: 'The change is usually irreversible.',
                example1: 'Burning wood into ash',
                example2: 'Iron rusting into iron oxide',
                }
            },
            learn: {
                classifyPrompt: 'Classify the images by type of change',
                physicalChange: 'Physical Change',
                chemicalChange: 'Chemical Change',
                correct: '🎉 Correct! See the explanations below.',
                wrong: '❌ Try again.',
                seePhysical: 'See physical change explanation',
                seeChemical: 'See chemical change explanation',
                retry: 'Retry',
                close: 'Close',
                back: 'Back',
              },
          
        chapter1_02: {
            subtitle: '02. Law of Conservation of Mass & Law of Constant Proportions',
            description: 'Learn about the principle of mass conservation in chemical reactions and the law of definite proportions.',
            cards: {
            law1: '⚖ 1. Law of Conservation of Mass',
            law2: '📊 2. Law of Constant Proportions',
            law3: '🔗 3. Importance of Both Laws',
            },
        },
        chapter1_03: {
            title: '03. Gas Reaction Law & Energy Flow in Reactions',
            description: 'Explore gas volume ratios in reactions and how energy is exchanged during chemical processes.',
            cards: {
            item1: '1. Volume Ratios in Gas Reactions',
            item2: '2. Energy Exchange in Chemical Reactions',
            item3: '3. Activation Energy & Reaction Pathways',
            item4: '4. Ideal vs Real Gases',
            item5: '5. Role of Energy Transfer',
            item6: '6. Catalysts & Activation Energy',
            item7: '7. Practical Applications of Gas Laws',
            },
        },
      
      
      chapter2: {
        title: 'Ⅱ. Atmosphere and Weather',
        subtitles: {
          "01": 'Atmosphere and Earth Temperature',
          "02": 'Clouds and Precipitation',
          "03": 'Air Pressure and Wind',
          "04": 'Weather Changes',
        },
      },
        chapter2_01: {
            title: "The Atmosphere and Earth's Temperature",
            menu: {
            item1: '1. Composition of Earth\'s Atmosphere',
            item2: '2. Greenhouse Effect & Global Warming',
            item3: '3. Chemical Reactions in Climate Dynamics',
            item4: '4. Role of Energy Transfer Mechanisms',
            item5: '5. Human Impact on Climate',
            item6: '6. Effects of Climate Change',
            },
        },
        chapter2_02: {
            title: '02. Law of Conservation of Mass & Law of Definite Proportions',
            description: 'Learn how mass is conserved in chemical reactions and how components combine in fixed ratios.',
            menu: {
              item1: '1. Law of Conservation of Mass',
              item2: '2. Law of Definite Proportions',
            },
          },
          chapter2_03: {
            title: '03. Pressure and Wind',
            description: 'Explore how gases behave under pressure and how energy is exchanged in chemical reactions.',
            menu: {
              item1: '1. Pressure',
              item2: '2. Wind',
              item3: '3. Gas and Energy Exchange in Reactions',
            },
          },
          
          
      
      chapter3: {
        title: 'Ⅲ. Motion and Energy',
        subtitles: {
          "01": 'Motion',
          "02": 'Work and Energy',
        },
      },
      
      
      chapter4: {
        title: 'Ⅳ. Stimuli and Responses',
        subtitles: {
          "01": 'Sense Organs',
          "02": 'Nervous System and Hormones',
        },
      },

      translation: {
        welcome: "Welcome",
        login: "Login",
        logout: "Logout",
        editProfile: "Edit Profile",
        deleteAccount: "Delete Account",
        viewResults: "View Learning Results",
        sendMessage: "Send Message",
        teacherMenu: "Teacher Menu",
        studentMenu: "Student Menu",
        setCurriculum: "Set Curriculum",
        manageStudents: "Manage Students",
        pleaseLogin: "Please log in",
        greeting: "{{role}} {{name}}, welcome!",
      },
      
    },
  },
  fr: {
    translation: {
      title: 'Découvrez le monde de la chimie',
      subtitle: 'Plongez dans les atomes, les réactions et les mystères moléculaires.',
      goToAccount: 'Accéder à votre compte',
      chapterList: 'Programme de sciences pour la classe de 3e du collège',
      credits: 'Crédits',
      donate: 'Faire un don',
      partners: 'Partenaires',
      legal: 'Tous droits réservés.',
      chapterTitles: {
        Chapter1: 'CHAPITRE Ⅰ',
        Chapter2: 'CHAPITRE Ⅱ',
        Chapter3: 'CHAPITRE Ⅲ',
        Chapter4: 'CHAPITRE Ⅳ',
      },
      chapter1: {
        title: 'I. Règles des réactions chimiques et changements d\'énergie',
        subtitles: {
          "01": 'Changements de matière et équations chimiques',
          "02": 'Loi de conservation de la masse et proportion définie',
          "03": 'Loi des gaz et énergie des réactions',
        },
      },
        chapter1_01: {
            subtitle: '01. Changements de matière et équations chimiques',
            title: 'I. Règles des réactions chimiques et changements d\'énergie',
            sections: {
            concept: 'Résumé du concept',
            learn: 'Apprendre',
            video: 'Apprentissage vidéo',
            },
        },
            concept: {
                back: 'Retour',
                goal: '📘 Objectif d’apprentissage : Expliquer la différence entre les changements physiques et chimiques.',
                features: 'Caractéristiques',
                examples: 'Exemples',
                physical: {
                title: 'Changement physique',
                feature1: 'Aucune nouvelle substance n’est créée.',
                feature2: 'Le changement est généralement réversible.',
                example1: 'Couper du papier',
                example2: 'La glace fond en eau',
                },
                chemical: {
                title: 'Changement chimique',
                feature1: 'La substance d’origine disparaît et une nouvelle est formée.',
                feature2: 'Le changement est généralement irréversible.',
                example1: 'Le bois qui brûle devient de la cendre',
                example2: 'Le fer qui rouille en oxyde de fer',
                }
            },
            learn: {
                classifyPrompt: 'Classez les images selon le type de changement',
                physicalChange: 'Changement physique',
                chemicalChange: 'Changement chimique',
                correct: '🎉 Bonne réponse ! Consultez les explications ci-dessous.',
                wrong: '❌ Réessayez.',
                seePhysical: 'Voir l\'explication physique',
                seeChemical: 'Voir l\'explication chimique',
                retry: 'Réinitialiser',
                close: 'Fermer',
                back: 'Retour',
              },
          

        chapter1_02: {
            subtitle: '02. Loi de conservation de la masse et proportion définie',
            description: 'Découvrez le principe de conservation de la masse et la loi des proportions définies dans les réactions chimiques.',
            cards: {
            law1: '⚖ 1. Loi de conservation de la masse',
            law2: '📊 2. Loi des proportions définies',
            law3: '🔗 3. Importance des deux lois',
            },
        },
        chapter1_03: {
            title: '03. Loi des gaz & Énergie dans les réactions',
            description: 'Explorez les rapports de volumes dans les réactions gazeuses et les échanges d\'énergie dans les réactions chimiques.',
            cards: {
            item1: '1. Rapport de volume dans les réactions gazeuses',
            item2: '2. Échanges d\'énergie dans les réactions chimiques',
            item3: '3. Énergie d\'activation et chemin réactionnel',
            item4: '4. Gaz idéaux vs réels',
            item5: '5. Rôle du transfert d\'énergie',
            item6: '6. Catalyseurs et énergie d\'activation',
            item7: '7. Applications pratiques des lois des gaz',
            },
        },
      
      chapter2: {
        title: 'Ⅱ. Atmosphère et météo',
        subtitles: {
          "01": "L'atmosphère et la température terrestre",
          "02": 'Nuages et précipitations',
          "03": 'Pression atmosphérique et vent',
          "04": 'Changements météorologiques',
        },
      },
        chapter2_01: {
            title: "L'atmosphère et la température terrestre",
            menu: {
            item1: '1. Composition de l\'atmosphère terrestre',
            item2: '2. Effet de serre et réchauffement climatique',
            item3: '3. Réactions chimiques dans la dynamique du climat',
            item4: '4. Rôle des mécanismes de transfert d\'énergie',
            item5: '5. Impact de l\'activité humaine sur le climat',
            item6: '6. Effets du changement climatique',
            },
        },
        chapter2_02: {
            title: '02. Loi de conservation de la masse et loi des proportions définies',
            description: 'Comprenez comment la masse se conserve dans les réactions chimiques et comment les éléments se combinent selon des proportions fixes.',
            menu: {
            item1: '1. Loi de conservation de la masse',
            item2: '2. Loi des proportions définies',
            },
        },
        chapter2_03: {
            title: '03. Pression et vent',
            description: 'Découvrez le comportement des gaz sous pression et les échanges d\'énergie dans les réactions chimiques.',
            menu: {
              item1: '1. Pression',
              item2: '2. Vent',
              item3: '3. Échange de gaz et d\'énergie dans les réactions',
            },
          },
          
      chapter3: {
        title: 'Ⅲ. Mouvement et énergie',
        subtitles: {
          "01": 'Mouvement',
          "02": 'Travail et énergie',
        },
      },
      
      
      chapter4: {
        title: 'Ⅳ. Stimuli et Réponses',
        subtitles: {
          "01": 'Organes sensoriels',
          "02": 'Système nerveux et hormones',
        },
      },
      translation: {
        welcome: "Bienvenue",
        login: "Connexion",
        logout: "Déconnexion",
        editProfile: "Modifier le profil",
        deleteAccount: "Supprimer le compte",
        viewResults: "Voir les résultats",
        sendMessage: "Envoyer un message",
        teacherMenu: "Menu enseignant",
        studentMenu: "Menu étudiant",
        setCurriculum: "Définir le programme",
        manageStudents: "Gérer les étudiants",
        pleaseLogin: "Veuillez vous connecter",
        greeting: "{{role}} {{name}}, bienvenue !",
      },
      
    },
  },
  ko: {
    translation: {
      title: '화학의 세계를 발견하세요',
      subtitle: '원자, 반응, 분자의 신비를 탐험해보세요.',
      goToAccount: '내 계정으로 이동',
      chapterList: '중학교 3학년 과학 목차',
      credits: '크레딧',
      donate: '기부하기',
      partners: '파트너',
      legal: '모든 권리 보유.',
      chapterTitles: {
        Chapter1: '제 Ⅰ 장',
        Chapter2: '제 Ⅱ 장',
        Chapter3: '제 Ⅲ 장',
        Chapter4: '제 Ⅳ 장',
      },
      chapter1: {
        title: 'I. 화학 반응의 규칙과 에너지 변화',
        subtitles: {
          "01": '물질 변화와 화학 반응식',
          "02": '질량 보존 법칙, 일정 성분비 법칙',
          "03": '기체 반응 법칙, 화학 반응에서의 에너지 출입',
        },
      },
        chapter1_01: {
            subtitle: '01. 물질 변화와 화학 반응식',
            title: 'I. 화학 반응의 규칙과 에너지 변화',
            sections: {
            concept: '개념 요약',
            learn: '학습하기',
            video: '영상 학습',
            },
        },
            concept: {
                back: '뒤로가기',
                goal: '📘 학습목표 : 물리 변화와 화학 변화의 차이를 설명할 수 있다.',
                features: '특징',
                examples: '예시',
                physical: {
                title: '물리변화',
                feature1: '새로운 물질이 만들어지지 않습니다.',
                feature2: '변화는 보통 되돌릴 수 있습니다.',
                example1: '종이를 자르는 것',
                example2: '얼음이 녹아 물이 되는 것',
                },
                chemical: {
                title: '화학변화',
                feature1: '원래의 물질이 사라지고 새로운 물질이 생성됩니다.',
                feature2: '변화는 보통 되돌리기 어렵습니다.',
                example1: '나무가 타서 재가 되는 것',
                example2: '철이 녹슬어 산화철이 되는 것',
                }
            },
            learn: {
        classifyPrompt: '변화 유형에 따라 이미지를 분류해보세요',
        physicalChange: '물리 변화',
        chemicalChange: '화학 변화',
        correct: '🎉 정답입니다! 각 변화의 설명을 확인해보세요.',
        wrong: '❌ 다시 풀어보세요',
        seePhysical: '물리 변화 풀이 보기',
        seeChemical: '화학 변화 풀이 보기',
        retry: '다시 풀기',
        close: '닫기',
        back: '뒤로가기',
      },
          

        chapter1_02: {
            subtitle: '02. 질량 보존 법칙, 일정 성분비 법칙',
            description: '화학 반응에서 질량이 보존되는 원리와, 일정한 비율로 성분이 결합하는 법칙을 배웁니다.',
            cards: {
            law1: '⚖ 1. 질량 보존의 법칙',
            law2: '📊 2. 일정 성분비의 법칙',
            law3: '🔗 3. 두 법칙의 중요성',
            },
        },
        chapter1_03: {
            title: '03. 기체 반응 법칙, 화학 반응에서의 에너지 출입',
            description: '기체 반응에서의 부피 비율과 화학 반응 중 에너지 교환에 대해 알아봅니다.',
            cards: {
            item1: '1. 기체 반응에서의 부피 비율',
            item2: '2. 화학 반응에서의 에너지 출입',
            item3: '3. 활성화 에너지와 반응 경로',
            item4: '4. 이상 기체 법칙 및 실제 기체 행동',
            item5: '5. 에너지 전달의 화학 반응에서의 역할',
            item6: '6. 촉매와 활성화 에너지',
            item7: '7. 기체 법칙과 에너지 전달의 실용적 적용',
            },
        },
      
      chapter2: {
        title: 'Ⅱ. 기권과 날씨',
        subtitles: {
          "01": '기권과 지구 기온',
          "02": '구름과 강수',
          "03": '기압과 바람',
          "04": '날씨의 변화',
        },
      },
        chapter2_01: {
            title: '기권과 지구 기온',
            menu: {
            item1: '1. 지구 대기의 구성',
            item2: '2. 온실 효과와 지구 온난화',
            item3: '3. 기후 역학에서의 화학 반응',
            item4: '4. 에너지 전송 메커니즘 역할',
            item5: '5. 인간의 영향',
            item6: '6. 기후 변화의 영향',
            },
        },
        chapter2_02: {
            title: '02. 질량 보존 법칙, 일정 성분비 법칙',
            description: '화학 반응에서 질량이 보존되는 원리와 성분이 일정한 비율로 결합하는 법칙을 배웁니다.',
            menu: {
              item1: '1. 질량 보존 법칙',
              item2: '2. 일정 성분비 법칙',
            },
          },
          chapter2_03: {
            title: '03. 기압과 바람',
            description: '기체가 압력 하에서 어떻게 행동하고 화학 반응에서 에너지가 어떻게 교환되는지 탐구합니다.',
            menu: {
              item1: '1. 기압',
              item2: '2. 바람',
              item3: '3. 화학 반응에서 기체와 에너지의 교환',
            },
          },
          
      
      chapter3: {
        title: 'Ⅲ. 운동과 에너지',
        subtitles: {
          "01": '운동',
          "02": '일과 에너지',
        },
      },
      
      
      chapter4: {
        title: 'Ⅳ. 자극과 반응',
        subtitles: {
          "01": '감각 기관',
          "02": '신경계와 호르몬',
        },
      },
      greeting: "{{role}} {{name}}님 어서오세요", // or "Welcome {{role}} {{name}}"
        pleaseLogin: "로그인 해주세요",
        login: "로그인",
        logout: "로그아웃",
        editProfile: "계정 정보 수정",
        deleteAccount: "회원 탈퇴",
        viewResults: "학습 결과 확인",
        sendMessage: "쪽지 보내기",
        teacherMenu: "교사",
        studentMenu: "학생",
        setCurriculum: "진도 설정",
        manageStudents: "학생 관리",
      
    },
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
