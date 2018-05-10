////////////////////////////////////////////////////////////////////////////////
///	@file			BlackJack.ts
///	@brief			ブラックジャッククラス
///	@author			Yuta Yoshinaga
///	@date			2018.05.04
///	$Version:		$
///	$Revision:		$
///
/// (c) 2018 Yuta Yoshinaga.
///
/// - 本ソフトウェアの一部又は全てを無断で複写複製（コピー）することは、
///   著作権侵害にあたりますので、これを禁止します。
/// - 本製品の使用に起因する侵害または特許権その他権利の侵害に関しては
///   当方は一切その責任を負いません。
///
////////////////////////////////////////////////////////////////////////////////
/// <reference path="TrumpCards.ts" />
var DEF_SHUFFLE_CNT = 10;
////////////////////////////////////////////////////////////////////////////////
///	@class		BlackJack
///	@brief		ブラックジャッククラス
///
////////////////////////////////////////////////////////////////////////////////
var BlackJack = (function () {
    ////////////////////////////////////////////////////////////////////////////////
    ///	@brief			コンストラクタ
    ///	@fn				public constructor()
    ///	@return			ありません
    ///	@author			Yuta Yoshinaga
    ///	@date			2018.05.04
    ///
    ////////////////////////////////////////////////////////////////////////////////
    function BlackJack() {
        this.trumpCards = new TrumpCards(false);
        this.theme = 'Cerulean';
        this.gameInit();
    }
    ////////////////////////////////////////////////////////////////////////////////
    ///	@brief			ゲーム初期化
    ///	@fn				public gameInit(): void
    ///	@return			ありません
    ///	@author			Yuta Yoshinaga
    ///	@date			2018.05.04
    ///
    ////////////////////////////////////////////////////////////////////////////////
    BlackJack.prototype.gameInit = function () {
        this.gameEndFlag = false;
        // *** 山札シャッフル *** //
        for (var i = 0; i < DEF_SHUFFLE_CNT; i++) {
            this.trumpCards.shuffle();
        }
        // *** プレイヤー・ディーラー手札初期化 *** //
        this.playerCards = new Array();
        this.playerCardsCnt = 0;
        this.dealerCards = new Array();
        this.dealerCardsCnt = 0;
        // *** プレイヤー・ディーラー手札を2枚づつ配る *** //
        this.playerCards[this.playerCardsCnt++] = this.trumpCards.drowCard();
        this.dealerCards[this.dealerCardsCnt++] = this.trumpCards.drowCard();
        this.playerCards[this.playerCardsCnt++] = this.trumpCards.drowCard();
        this.dealerCards[this.dealerCardsCnt++] = this.trumpCards.drowCard();
    };
    ////////////////////////////////////////////////////////////////////////////////
    ///	@brief			プレイヤーヒット
    ///	@fn				public playerHit(): void
    ///	@return			ありません
    ///	@author			Yuta Yoshinaga
    ///	@date			2018.05.04
    ///
    ////////////////////////////////////////////////////////////////////////////////
    BlackJack.prototype.playerHit = function () {
        if (this.gameEndFlag == false) {
            this.playerCards[this.playerCardsCnt++] = this.trumpCards.drowCard();
            var score = this.getScore(this.playerCards, this.playerCardsCnt);
            if (22 <= score)
                this.playerStand(); // バーストしたので強制終了
        }
    };
    ////////////////////////////////////////////////////////////////////////////////
    ///	@brief			プレイヤースタンド
    ///	@fn				public playerStand(): void
    ///	@return			ありません
    ///	@author			Yuta Yoshinaga
    ///	@date			2018.05.04
    ///
    ////////////////////////////////////////////////////////////////////////////////
    BlackJack.prototype.playerStand = function () {
        this.dealerHit();
    };
    ////////////////////////////////////////////////////////////////////////////////
    ///	@brief			ディーラーヒット
    ///	@fn				private dealerHit(): void
    ///	@return			ありません
    ///	@author			Yuta Yoshinaga
    ///	@date			2018.05.04
    ///
    ////////////////////////////////////////////////////////////////////////////////
    BlackJack.prototype.dealerHit = function () {
        for (;;) {
            var score = this.getScore(this.dealerCards, this.dealerCardsCnt);
            if (score < 17) {
                // *** ディーラーは自分の手持ちのカードの合計が「17」以上になるまで	  *** //
                // *** ヒットし続ける（カードを引き続ける）							*** //
                this.dealerCards[this.dealerCardsCnt++] = this.trumpCards.drowCard();
            }
            else {
                // *** ディーラーは自分の手持ちカードの合計が「17」以上になったら	  *** //
                // *** ステイする（カードを引かない）。								*** //
                this.dealerStand();
                break;
            }
        }
    };
    ////////////////////////////////////////////////////////////////////////////////
    ///	@brief			ディーラースタンド
    ///	@fn				private dealerStand(): void
    ///	@return			ありません
    ///	@author			Yuta Yoshinaga
    ///	@date			2018.05.04
    ///
    ////////////////////////////////////////////////////////////////////////////////
    BlackJack.prototype.dealerStand = function () {
        this.gameEndFlag = true;
    };
    ////////////////////////////////////////////////////////////////////////////////
    ///	@brief			手札から現在のスコア取得
    ///	@fn				public getScore(cards: Card[],cardsCnt: number): number
    ///	@param[in]		cards: Card[]		手札
    ///	@param[in]		cardsCnt: number	手札枚数
    ///	@return			現在のスコア
    ///	@author			Yuta Yoshinaga
    ///	@date			2018.05.04
    ///
    ////////////////////////////////////////////////////////////////////////////////
    BlackJack.prototype.getScore = function (cards, cardsCnt) {
        var res = 0;
        var aceFlag = false;
        for (var i = 0; i < cardsCnt; i++) {
            if (2 <= cards[i].getValue() && cards[i].getValue() <= 10) {
                // *** 2～10 *** //
                res += cards[i].getValue();
            }
            else if (11 <= cards[i].getValue() && cards[i].getValue() <= 13) {
                // *** 11～13 *** //
                res += 10;
            }
            else {
                if (aceFlag) {
                    // *** 2枚目のエースは強制的に1で換算する*** //
                    res += 1;
                }
                else {
                    // *** エースは後ほど計算する *** //
                    aceFlag = true;
                }
            }
        }
        if (aceFlag) {
            // *** エース計算 *** //
            var tmpScore1 = res + 1;
            var tmpScore2 = res + 11;
            var diff1 = 21 - tmpScore1;
            var diff2 = 21 - tmpScore2;
            if ((22 <= tmpScore1) && (22 <= tmpScore2)) {
                // *** どちらもバーストしているならエースを1 *** //
                res = tmpScore1;
            }
            else if ((22 <= tmpScore1) && (tmpScore2 <= 21)) {
                // *** エースが1でバーストしているならエースを11 *** //
                res = tmpScore2;
            }
            else if ((tmpScore1 <= 21) && (22 <= tmpScore2)) {
                // *** エースが11でバーストしているならエースを1 *** //
                res = tmpScore1;
            }
            else {
                // *** どちらもバーストしていないなら21との差分が小さい方を採用 *** //
                if (diff1 < diff2)
                    res = tmpScore1;
                else
                    res = tmpScore2;
            }
        }
        return res;
    };
    ////////////////////////////////////////////////////////////////////////////////
    ///	@brief			ゲーム勝敗判定
    ///	@fn				public gameJudgment(): boolean
    ///	@return			ゲーム勝敗判定
    ///					- 1 : プレイヤーの勝利
    ///					- 0 : 引き分け
    ///					- -1 : プレイヤーの敗北
    ///
    ///	@author			Yuta Yoshinaga
    ///	@date			2018.05.04
    ///
    ////////////////////////////////////////////////////////////////////////////////
    BlackJack.prototype.gameJudgment = function () {
        var res = 0;
        var score1 = this.getScore(this.playerCards, this.playerCardsCnt);
        var score2 = this.getScore(this.dealerCards, this.dealerCardsCnt);
        var diff1 = 21 - score1;
        var diff2 = 21 - score2;
        if (22 <= score1 && 22 <= score2) {
            // *** プレイヤー・ディーラー共にバーストしているので負け *** //
            res = -1;
        }
        else if (22 <= score1 && score2 <= 21) {
            // *** プレイヤーバーストしているので負け *** //
            res = -1;
        }
        else if (score1 <= 21 && 22 <= score2) {
            // *** ディーラーバーストしているので勝ち *** //
            res = 1;
        }
        else {
            if (diff1 == diff2) {
                // *** 同スコアなら引き分け *** //
                res = 0;
                if (score1 == 21 && this.playerCardsCnt == 2 && this.dealerCardsCnt != 2) {
                    // *** プレイヤーのみがピュアブラックジャックならプレイヤーの勝ち *** //
                    res = 1;
                }
            }
            else if (diff1 < diff2) {
                // *** プレイヤーの方が21に近いので勝ち *** //
                res = 1;
            }
            else {
                // *** ディーラーの方が21に近いので負け *** //
                res = -1;
            }
        }
        return res;
    };
    ////////////////////////////////////////////////////////////////////////////////
    ///	@brief			ゲッター
    ///	@fn				public getPlayerCards(): Card[]
    ///	@return			プレイヤーカード
    ///	@author			Yuta Yoshinaga
    ///	@date			2018.05.04
    ///
    ////////////////////////////////////////////////////////////////////////////////
    BlackJack.prototype.getPlayerCards = function () {
        return this.playerCards;
    };
    ////////////////////////////////////////////////////////////////////////////////
    ///	@brief			ゲッター
    ///	@fn				public getPlayerCardsCnt(): number
    ///	@return			プレイヤーカード枚数
    ///	@author			Yuta Yoshinaga
    ///	@date			2018.05.04
    ///
    ////////////////////////////////////////////////////////////////////////////////
    BlackJack.prototype.getPlayerCardsCnt = function () {
        return this.playerCardsCnt;
    };
    ////////////////////////////////////////////////////////////////////////////////
    ///	@brief			ゲッター
    ///	@fn				public getDealerCards(): Card[]
    ///	@return			ディーラーカード
    ///	@author			Yuta Yoshinaga
    ///	@date			2018.05.04
    ///
    ////////////////////////////////////////////////////////////////////////////////
    BlackJack.prototype.getDealerCards = function () {
        return this.dealerCards;
    };
    ////////////////////////////////////////////////////////////////////////////////
    ///	@brief			ゲッター
    ///	@fn				public getDealerCardsCnt(): number
    ///	@return			プレイヤーカード枚数
    ///	@author			Yuta Yoshinaga
    ///	@date			2018.05.04
    ///
    ////////////////////////////////////////////////////////////////////////////////
    BlackJack.prototype.getDealerCardsCnt = function () {
        return this.dealerCardsCnt;
    };
    ////////////////////////////////////////////////////////////////////////////////
    ///	@brief			ゲッター
    ///	@fn				public getGameEndFlag(): number
    ///	@return			ゲーム終了フラグ
    ///	@author			Yuta Yoshinaga
    ///	@date			2018.05.04
    ///
    ////////////////////////////////////////////////////////////////////////////////
    BlackJack.prototype.getGameEndFlag = function () {
        return this.gameEndFlag;
    };
    ////////////////////////////////////////////////////////////////////////////////
    ///	@brief			セッター
    ///	@fn				public setTheme(theme: string): void
    ///	@param[in]		theme: string		テーマ
    ///	@return			ありません
    ///	@author			Yuta Yoshinaga
    ///	@date			2018.05.04
    ///
    ////////////////////////////////////////////////////////////////////////////////
    BlackJack.prototype.setTheme = function (theme) {
        this.theme = theme;
    };
    ////////////////////////////////////////////////////////////////////////////////
    ///	@brief			ゲッター
    ///	@fn				public getTheme(): string
    ///	@return			テーマ
    ///	@author			Yuta Yoshinaga
    ///	@date			2018.05.04
    ///
    ////////////////////////////////////////////////////////////////////////////////
    BlackJack.prototype.getTheme = function () {
        return this.theme;
    };
    return BlackJack;
}());
//# sourceMappingURL=BlackJack.js.map