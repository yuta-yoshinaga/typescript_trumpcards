////////////////////////////////////////////////////////////////////////////////
///	@file			TrumpCards.ts
///	@brief			トランプカードクラス
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
/// <reference path="Card.ts" />
/// <reference path="types/jquery/index.d.ts" />
var DEF_CARD_CNT = ((13 * 4) + 2);
////////////////////////////////////////////////////////////////////////////////
///	@class		TrumpCards
///	@brief		トランプカードクラス
///
////////////////////////////////////////////////////////////////////////////////
var TrumpCards = (function () {
    ////////////////////////////////////////////////////////////////////////////////
    ///	@brief			コンストラクタ
    ///	@fn				public constructor(jokerFlag: boolean)
    ///	@param[in]		jokerFlag: boolean		ジョーカー有効フラグ
    ///	@return			ありません
    ///	@author			Yuta Yoshinaga
    ///	@date			2018.05.04
    ///
    ////////////////////////////////////////////////////////////////////////////////
    function TrumpCards(jokerFlag) {
        this.deckCnt = DEF_CARD_CNT;
        if (jokerFlag == false)
            this.deckCnt -= 2;
        this.cardsInit();
        this.deckInit();
    }
    ////////////////////////////////////////////////////////////////////////////////
    ///	@brief			カード初期化
    ///	@fn				private cardsInit(): void
    ///	@return			ありません
    ///	@author			Yuta Yoshinaga
    ///	@date			2018.05.04
    ///
    ////////////////////////////////////////////////////////////////////////////////
    TrumpCards.prototype.cardsInit = function () {
        this.cards = new Array();
        for (var i = 0; i < this.deckCnt; i++) {
            this.cards[i] = new Card();
            this.cards[i].setDrowFlag(false);
            if (0 <= i && i <= 12) {
                // *** スペード *** //
                this.cards[i].setType(DEF_CARD_TYPE_SPADE);
                this.cards[i].setValue(i + 1);
            }
            else if (13 <= i && i <= 25) {
                // *** クローバー *** //
                this.cards[i].setType(DEF_CARD_TYPE_CLOVER);
                this.cards[i].setValue((i - 13) + 1);
            }
            else if (26 <= i && i <= 38) {
                // *** ハート *** //
                this.cards[i].setType(DEF_CARD_TYPE_HEART);
                this.cards[i].setValue((i - 26) + 1);
            }
            else if (39 <= i && i <= 51) {
                // *** ダイアモンド *** //
                this.cards[i].setType(DEF_CARD_TYPE_DIAMOND);
                this.cards[i].setValue((i - 39) + 1);
            }
            else {
                // *** ジョーカー *** //
                this.cards[i].setType(DEF_CARD_TYPE_JOKER);
                this.cards[i].setValue((i - 52) + 1);
            }
        }
    };
    ////////////////////////////////////////////////////////////////////////////////
    ///	@brief			山札初期化
    ///	@fn				private deckInit(): void
    ///	@return			ありません
    ///	@author			Yuta Yoshinaga
    ///	@date			2018.05.04
    ///
    ////////////////////////////////////////////////////////////////////////////////
    TrumpCards.prototype.deckInit = function () {
        this.deck = new Array();
        this.deck = $.extend(true, [], this.cards);
        this.deckDrowFlagInit();
        this.deckDrowCnt = 0;
    };
    ////////////////////////////////////////////////////////////////////////////////
    ///	@brief			山札ドローフラグ初期化
    ///	@fn				private deckDrowFlagInit(): void
    ///	@return			ありません
    ///	@author			Yuta Yoshinaga
    ///	@date			2018.05.04
    ///
    ////////////////////////////////////////////////////////////////////////////////
    TrumpCards.prototype.deckDrowFlagInit = function () {
        for (var i = 0; i < this.deckCnt; i++) {
            this.deck[i].setDrowFlag(false);
        }
    };
    ////////////////////////////////////////////////////////////////////////////////
    ///	@brief			山札シャッフルローカル
    ///	@fn				private shuffleLocal(array: any): any
    ///	@param[in]		array: any
    ///	@return			シャッフル済み配列
    ///	@author			Yuta Yoshinaga
    ///	@date			2018.05.04
    ///
    ////////////////////////////////////////////////////////////////////////////////
    TrumpCards.prototype.shuffleLocal = function (array) {
        var n = array.length, t, i;
        while (n) {
            i = Math.floor(Math.random() * n--);
            t = array[n];
            array[n] = array[i];
            array[i] = t;
        }
        return array;
    };
    ////////////////////////////////////////////////////////////////////////////////
    ///	@brief			山札シャッフル
    ///	@fn				public shuffle(): void
    ///	@return			ありません
    ///	@author			Yuta Yoshinaga
    ///	@date			2018.05.04
    ///
    ////////////////////////////////////////////////////////////////////////////////
    TrumpCards.prototype.shuffle = function () {
        this.deck = this.shuffleLocal(this.deck);
        this.deckDrowFlagInit();
        this.deckDrowCnt = 0;
    };
    ////////////////////////////////////////////////////////////////////////////////
    ///	@brief			山札配る
    ///	@fn				public drowCard(): Card
    ///	@return			カードクラス
    ///	@author			Yuta Yoshinaga
    ///	@date			2018.05.04
    ///
    ////////////////////////////////////////////////////////////////////////////////
    TrumpCards.prototype.drowCard = function () {
        var res = null;
        if (this.deckDrowCnt < this.deckCnt) {
            this.deck[this.deckDrowCnt].setDrowFlag(true);
            res = this.deck[this.deckDrowCnt++];
        }
        return res;
    };
    ////////////////////////////////////////////////////////////////////////////////
    ///	@brief			ゲッター
    ///	@fn				public getDeckDrowCnt(): number
    ///	@return			山札配った枚数
    ///	@author			Yuta Yoshinaga
    ///	@date			2018.05.04
    ///
    ////////////////////////////////////////////////////////////////////////////////
    TrumpCards.prototype.getDeckDrowCnt = function () {
        return this.deckDrowCnt;
    };
    return TrumpCards;
}());
//# sourceMappingURL=TrumpCards.js.map