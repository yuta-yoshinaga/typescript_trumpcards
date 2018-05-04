////////////////////////////////////////////////////////////////////////////////
///	@file			Card.ts
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
var DEF_CARD_TYPE_JOKER = 0;
var DEF_CARD_TYPE_SPADE = 1;
var DEF_CARD_TYPE_CLOVER = 2;
var DEF_CARD_TYPE_HEART = 3;
var DEF_CARD_TYPE_DIAMOND = 4;
var DEF_CARD_VALUE_JOKER = 0;
////////////////////////////////////////////////////////////////////////////////
///	@class		Card
///	@brief		トランプカードクラス
///
////////////////////////////////////////////////////////////////////////////////
var Card = (function () {
    ////////////////////////////////////////////////////////////////////////////////
    ///	@brief			コンストラクタ
    ///	@fn				public constructor()
    ///	@return			ありません
    ///	@author			Yuta Yoshinaga
    ///	@date			2018.05.04
    ///
    ////////////////////////////////////////////////////////////////////////////////
    function Card() {
        this.type = DEF_CARD_TYPE_JOKER;
        this.value = DEF_CARD_VALUE_JOKER;
        this.ext = "";
    }
    ////////////////////////////////////////////////////////////////////////////////
    ///	@brief			セッター
    ///	@fn				public setType(type: number): void
    ///	@param[in]		type: number		カード種類
    ///	@return			ありません
    ///	@author			Yuta Yoshinaga
    ///	@date			2018.05.04
    ///
    ////////////////////////////////////////////////////////////////////////////////
    Card.prototype.setType = function (type) {
        this.type = type;
    };
    ////////////////////////////////////////////////////////////////////////////////
    ///	@brief			ゲッター
    ///	@fn				public getType(): number
    ///	@return			カード種類
    ///	@author			Yuta Yoshinaga
    ///	@date			2018.05.04
    ///
    ////////////////////////////////////////////////////////////////////////////////
    Card.prototype.getType = function () {
        return this.type;
    };
    ////////////////////////////////////////////////////////////////////////////////
    ///	@brief			セッター
    ///	@fn				public setValue(value: number): void
    ///	@param[in]		value: number		カード値
    ///	@return			ありません
    ///	@author			Yuta Yoshinaga
    ///	@date			2018.05.04
    ///
    ////////////////////////////////////////////////////////////////////////////////
    Card.prototype.setValue = function (value) {
        this.value = value;
    };
    ////////////////////////////////////////////////////////////////////////////////
    ///	@brief			ゲッター
    ///	@fn				public getValue(): number
    ///	@return			カード値
    ///	@author			Yuta Yoshinaga
    ///	@date			2018.05.04
    ///
    ////////////////////////////////////////////////////////////////////////////////
    Card.prototype.getValue = function () {
        return this.value;
    };
    ////////////////////////////////////////////////////////////////////////////////
    ///	@brief			セッター
    ///	@fn				public setExt(ext: string): void
    ///	@param[in]		ext: string		カード値
    ///	@return			ありません
    ///	@author			Yuta Yoshinaga
    ///	@date			2018.05.04
    ///
    ////////////////////////////////////////////////////////////////////////////////
    Card.prototype.setExt = function (ext) {
        this.ext = ext;
    };
    ////////////////////////////////////////////////////////////////////////////////
    ///	@brief			ゲッター
    ///	@fn				public getExt(): string
    ///	@return			カード拡張情報など(カード別にメッセージを出す場合など)
    ///	@author			Yuta Yoshinaga
    ///	@date			2018.05.04
    ///
    ////////////////////////////////////////////////////////////////////////////////
    Card.prototype.getExt = function () {
        return this.ext;
    };
    return Card;
}());
//# sourceMappingURL=Card.js.map