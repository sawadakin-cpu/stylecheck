const DOMAIN = "stylecheck";
const ENDPOINT = "stylecheck";
const API_KEY = "AzomqgigKJ0QVtIe1W8hgnVkjhGv4u7p4WcA"; // ← load.jsと同じ読み取り専用APIキーを入れる

const app = Vue.createApp({
  data() {
    return {
      sections: [
        {
          id: "straight",
          abb: "st",
          type: "ストレート",
          recommend:
            "https://www.palcloset.jp/display/display/?section_cd=kokkakustraight&g=1&type=01",
        },
        {
          id: "wave",
          abb: "wv",
          type: "ウェーブ",
          recommend:
            "https://www.palcloset.jp/display/display/?section_cd=kokkakuwave&g=1&type=01",
        },
        {
          id: "natural",
          abb: "nt",
          type: "ナチュラル",
          recommend:
            "https://www.palcloset.jp/display/display/?section_cd=kokkakunatural&g=1&type=01",
        },
      ],
      contents: [
        {
          id: 1,
          title: "パーソナルカラー診断",
          src: "images/other/color.jpg",
          url: "https://www.palcloset.jp/shared/pc_pal/event/palcloset/personalcolor/",
        },
        {
          id: 2,
          title: "ファッションテイスト診断",
          src: "https://www.palcloset.jp/shared/pc_pal/images/brand_top/fashion_taste_news.jpg",
          url: "https://www.palcloset.jp/shared/pc_pal/event/palcloset/2024/personal_chart/",
        },
      ],
      lists: [],
      targetType: null,
    };
  },
  async mounted() {
    const resultElement = document.getElementById("app");
    if (resultElement) {
      this.targetType = resultElement.dataset.target;
    }

    // URLパラメータ（プレビュー用：?page=20260608）
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get("page");

    // 現在時刻（JST）
    const jstNow = new Date(Date.now() + 9 * 60 * 60 * 1000);
    const today =
      String(jstNow.getUTCFullYear()) +
      String(jstNow.getUTCMonth() + 1).padStart(2, "0") +
      String(jstNow.getUTCDate()).padStart(2, "0");
    const jstHour = jstNow.getUTCHours();

    const isActive = (start) =>
      start < today || (start === today && jstHour >= 12);

    const fetchUrl = pageParam
      ? `https://${DOMAIN}.microcms.io/api/v1/${ENDPOINT}?filters=start[equals]${pageParam}`
      : `https://${DOMAIN}.microcms.io/api/v1/${ENDPOINT}?limit=20&orders=-start`;

    try {
      const res = await fetch(fetchUrl, {
        headers: { "X-MICROCMS-API-KEY": API_KEY },
      });
      const json = await res.json();
      const content = pageParam
        ? json.contents[0]
        : json.contents.find((item) => isActive(item.start));

      if (content) {
        const toDateStr = (yyyymmdd) =>
          `${yyyymmdd.slice(0, 4)}/${yyyymmdd.slice(4, 6)}/${yyyymmdd.slice(6, 8)} 12:00:00`;

        this.lists = [
          {
            start: toDateStr(content.start),
            end: content.end ? toDateStr(content.end) : "",
            item_name: content.item_name || "",
            st_points: content.st_points
              ? content.st_points.split(/\r?\n/).filter((s) => s.trim())
              : [],
            wv_points: content.wv_points
              ? content.wv_points.split(/\r?\n/).filter((s) => s.trim())
              : [],
            nt_points: content.nt_points
              ? content.nt_points.split(/\r?\n/).filter((s) => s.trim())
              : [],
          },
        ];
      }
    } catch (e) {
      console.log("microCMS fetch 失敗", e);
    }
  },
  computed: {
    filteredItem() {
      return (
        this.sections.find((section) => section.id === this.targetType) || {
          date: "",
          title: "No Data Found",
        }
      );
    },
    excludedItems() {
      return this.sections.filter((section) => section.id !== this.targetType);
    },
    filteredLists() {
      return this.lists;
    },
  },
});

app.component("check-component", {
  template: `
    <div class="check">
      <div class="check__inner">
        <div class="check__title animated inviewfadeIn">
          <img src="images/check/title.png" alt="他の骨格タイプをチェック">
        </div>
        <ul class="check__list animated inviewfadeIn">
          <li v-for="section in sections">
            <a :href="section.id + '.html'">
              <p>骨格{{ section.type }}の<br>特徴を見る</p>
              <div class="check__image">
                <img :src="'images/check/' + section.abb + '_nude_front_face.png'" :alt="'骨格' + section.type + 'の特徴を見る'">
              </div>
            </a>
          </li>
        </ul>
        <a class="check__back animated inviewfadeIn" href="index.html#shindan">診断ページに戻る&emsp;&gt;</a>
      </div>
    </div>
  `,
  props: ["sections"],
});

app.component("fixed-component", {
  template: `
    <div class="fixed">
      <div class="fixed__inner">
        <ul class="fixed__list">
          <li v-for="section in sections">
            <a :class="section.id" :href="section.id + '.html'">
              骨格{{ section.type }}の特徴を見る
            </a>
          </li>
        </ul>
        <a href="index.html#shindan" class="fixed__back hidden-sp">&#60;&emsp;診断ページに戻る</a>
      </div>
    </div>
  `,
  props: ["sections"],
});

app.component("other-component", {
  template: `
    <div class="other">
      <div class="other__inner">
        <p class="other__title">
          <span>あなたにおすすめの</span>
          診断系コンテンツ
        </p>
        <ul class="other__list">
          <li
            class="animated inviewfadeIn"
            v-for="content in contents"
          >
            <a :href="content.url">
              <img :src="content.src" :alt="content.title">
            </a>
          </li>
        </ul>
      </div>
    </div>
  `,
  props: ["contents"],
});

app.mount("#app");

// Vueが描画完了したら再計算
window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});
