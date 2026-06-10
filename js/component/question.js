const questioComponent = Vue.createApp({
  data() {
    return {
      sections: [
        {
          id: 1,
          text: '首はエラよりも',
          answers: [
            {
              id: 'A',
              text: '太め',
              next: 2,
            },
            {
              id: 'B',
              text: '細め',
              next: 3,
            },
          ],
        },
        {
          id: 2,
          text: '指は',
          answers: [
            {
              id: 'A',
              text: '関節がしっかりしている',
              next: 5,
            },
            {
              id: 'B',
              text: '指全体が同じ太さ',
              next: 4,
            },
          ],
        },
        {
          id: 3,
          text: 'お尻の形は',
          answers: [
            {
              id: 'A',
              text: '立体的で丸い',
              next: 4,
            },
            {
              id: 'B',
              text: '下に丸みがある',
              next: 6,
            },
          ],
        },
        {
          id: 4,
          text: '横を向くと',
          answers: [
            {
              id: 'A',
              text: '厚みがある',
              isToCard: true,
              next: 'straight',
            },
            {
              id: 'B',
              text: '薄め',
              next: 6,
            },
          ],
        },
        {
          id: 5,
          text: '膝の関節は',
          answers: [
            {
              id: 'A',
              text: '大きめ',
              isToCard: true,
              next: 'natural',
            },
            {
              id: 'B',
              text: '小さめ',
              isToCard: true,
              next: 'straight',
            },
          ],
        },
        {
          id: 6,
          text: '筋肉は腕の上腕に',
          answers: [
            {
              id: 'A',
              text: 'つきやすい',
              isToCard: true,
              next: 'straight',
            },
            {
              id: 'B',
              text: 'つきにくい',
              isToCard: true,
              next: 'wave',
            },
          ],
        },
      ],
      types: [
        {
          id: 'straight',
          alt: 'あなたは「骨格ストレート」です。',
        },
        {
          id: 'wave',
          alt: 'あなたは「骨格ウェーブ」です。',
        },
        {
          id: 'natural',
          alt: 'あなたは「骨格ナチュラル」です。',
        },
      ],
    }
  },
});

questioComponent.mount('#question');
