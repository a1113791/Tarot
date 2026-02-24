import React, { useState } from "react";
import "./App.css";

// 塔羅牌資料庫 (加入正逆位解釋)
const tarotCards = [
  {
    name: "愚者 (The Fool)",
    meaningUpright:
      "【正位】代表新的開始、冒險與自發性。這是一個跳出舒適圈的絕佳時機，宇宙正鼓勵你勇敢踏出未知的第一步。",
    meaningReversed:
      "【逆位】象徵魯莽、過度冒險或錯失良機。你可能對未知感到恐懼而停滯不前，或者行事欠缺考量與計畫。",
  },
  {
    name: "魔術師 (The Magician)",
    meaningUpright:
      "【正位】象徵創造力與行動力。你已經擁有成功所需的所有資源與天賦，現在是將想法化為現實的時刻。",
    meaningReversed:
      "【逆位】代表能力未經引導、計畫不周或缺乏自信。小心被表象蒙蔽，或是有資源卻不知道如何運用。",
  },
  {
    name: "女祭司 (The High Priestess)",
    meaningUpright:
      "【正位】代表直覺與潛意識。請放慢腳步，相信你的直覺與夢境，傾聽內在最深處的聲音，答案已在心中。",
    meaningReversed:
      "【逆位】象徵忽略內在聲音、充滿偏見或隱藏的秘密。你可能太依賴理性而抗拒直覺，導致內心充滿焦慮與迷惘。",
  },
  {
    name: "皇后 (The Empress)",
    meaningUpright:
      "【正位】象徵豐盛、孕育與感官的享受。這是一段充滿愛與美的時期，請好好照顧自己，並對身邊的人付出關懷。",
    meaningReversed:
      "【逆位】代表過度依賴、自我放縱或缺乏成長。可能在人際關係中感到窒息，或是忽略了自我照顧與內在的匱乏。",
  },
  {
    name: "皇帝 (The Emperor)",
    meaningUpright:
      "【正位】代表結構、穩定與權威。現在需要建立秩序並展現領導力，用理性的態度與紀律去面對當前的挑戰。",
    meaningReversed:
      "【逆位】象徵專制、缺乏彈性或失去控制。過度固執己見可能會帶來阻礙，或是你正處於混亂、缺乏紀律的狀態中。",
  },
  {
    name: "戀人 (The Lovers)",
    meaningUpright:
      "【正位】象徵愛、和諧與價值觀的選擇。代表一段重要的關係、完美的合作，或是一個需要用心權衡的重大決定。",
    meaningReversed:
      "【逆位】代表關係中的不和諧、錯誤的選擇或價值觀衝突。可能面臨誘惑、分離，或是需要重新審視目前的承諾。",
  },
  {
    name: "戰車 (The Chariot)",
    meaningUpright:
      "【正位】代表意志力與克服困難。只要保持高度的專注與決心，你將能駕馭任何阻礙，迎向最終的勝利。",
    meaningReversed:
      "【逆位】象徵失去方向、感到失控或遭遇強烈阻力。你可能感到力不從心，需要停下來重新評估策略，而非盲目衝刺。",
  },
  {
    name: "力量 (Strength)",
    meaningUpright:
      "【正位】象徵內在的勇氣與耐心。請用同理心、溫柔與堅韌去面對挑戰或難搞的人事物，而非使用蠻力。",
    meaningReversed:
      "【逆位】代表自我懷疑、軟弱或情緒失控。你可能感到恐懼與無力，請記得找回內在的平靜，不要被一時的情緒吞噬。",
  },
  {
    name: "隱者 (The Hermit)",
    meaningUpright:
      "【正位】代表內省與追尋靈性智慧。你需要暫時遠離外界的喧囂，給自己獨處的時間，尋找靈魂深處的指引。",
    meaningReversed:
      "【逆位】象徵過度孤立、逃避現實或拒絕他人幫助。雖然獨處很重要，但過度封閉自己可能會讓你感到孤獨與迷失。",
  },
  {
    name: "命運之輪 (Wheel of Fortune)",
    meaningUpright:
      "【正位】象徵命運的轉折與不可預期的變化。世事無常，請擁抱即將到來的改變，因為好運的齒輪正在為你轉動。",
    meaningReversed:
      "【逆位】代表運勢低迷、抗拒改變或陷入重複的惡性循環。即使處於低潮，也要明白這只是短暫的週期，學習隨遇而安。",
  },
];

const positions = ["過去 (Past)", "現在 (Present)", "未來 (Future)"];

export default function TarotApp() {
  const [drawnCards, setDrawnCards] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [flipped, setFlipped] = useState([false, false, false]);

  // 抽牌邏輯
  const drawCards = () => {
    setIsDrawing(true);
    setDrawnCards([]);
    setFlipped([false, false, false]);

    setTimeout(() => {
      let shuffled = [...tarotCards].sort(() => 0.5 - Math.random());

      // 取出三張牌，並為每張牌隨機加上正逆位屬性 (isReversed)
      let selected = shuffled.slice(0, 3).map((card) => ({
        ...card,
        isReversed: Math.random() > 0.5, // 50% 機率為逆位
      }));

      setDrawnCards(selected);
      setIsDrawing(false);
    }, 1200);
  };

  // 清除並重置
  const resetCards = () => {
    setDrawnCards([]);
    setFlipped([false, false, false]);
  };

  const handleFlip = (index) => {
    const newFlipped = [...flipped];
    newFlipped[index] = true;
    setFlipped(newFlipped);
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1 className="mystic-title">神聖塔羅指引</h1>
        <p className="subtitle">深呼吸，在心中默想你的問題，尋求宇宙的解答。</p>

        <div className="button-group">
          {drawnCards.length === 0 ? (
            <button
              className="gold-button"
              onClick={drawCards}
              disabled={isDrawing}
            >
              {isDrawing ? "洗牌中..." : "✦ 開始抽牌 ✦"}
            </button>
          ) : (
            <button className="gold-button outline" onClick={resetCards}>
              重新淨化牌陣
            </button>
          )}
        </div>
      </div>

      <div className="cards-container">
        {isDrawing && <div className="loading-text">感受靈性能量中...</div>}

        {!isDrawing &&
          drawnCards.length > 0 &&
          drawnCards.map((card, index) => (
            <div key={index} className="card-wrapper">
              <div className="card-position-label">{positions[index]}</div>

              <div
                className={`card-inner ${flipped[index] ? "is-flipped" : ""}`}
                onClick={() => handleFlip(index)}
              >
                {/* 牌背 */}
                <div className="card-face card-back">
                  <div className="card-back-design">
                    <div className="star-icon">✧</div>
                    <p>點擊翻啟</p>
                    <div className="star-icon">✧</div>
                  </div>
                </div>

                {/* 牌面 */}
                <div className="card-face card-front">
                  <div className="card-text-content">
                    <h2 className="card-name">{card.name}</h2>

                    {/* 動態顯示正逆位標籤 */}
                    <div
                      className={`orientation-tag ${card.isReversed ? "reversed" : "upright"}`}
                    >
                      {card.isReversed ? "逆位 (Reversed)" : "正位 (Upright)"}
                    </div>

                    <div className="divider"></div>

                    {/* 根據正逆位顯示對應的解釋 */}
                    <p className="card-meaning">
                      {card.isReversed
                        ? card.meaningReversed
                        : card.meaningUpright}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

        {!isDrawing && drawnCards.length === 0 && (
          <div className="empty-state">牌陣已準備就緒</div>
        )}
      </div>
    </div>
  );
}
