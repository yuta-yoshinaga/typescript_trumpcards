////////////////////////////////////////////////////////////////////////////////
///	@file			OldMaid.ts
///	@brief			ババ抜きクラス
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
///	@class		OldMaid
///	@brief		ババ抜きクラス
///
////////////////////////////////////////////////////////////////////////////////
var OldMaid = (function () {
    ////////////////////////////////////////////////////////////////////////////////
    ///	@brief			コンストラクタ
    ///	@fn				public constructor()
    ///	@return			ありません
    ///	@author			Yuta Yoshinaga
    ///	@date			2018.05.04
    ///
    ////////////////////////////////////////////////////////////////////////////////
    function OldMaid() {
        this.trumpCards = new TrumpCards(0);
        this.theme = 'Darkly';
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
    OldMaid.prototype.gameInit = function () {
        this.gameEndFlag = false;
        // *** 山札シャッフル *** //
        for (var i = 0; i < DEF_SHUFFLE_CNT; i++) {
            this.trumpCards.shuffle();
        }
    };
    ////////////////////////////////////////////////////////////////////////////////
    ///	@brief			ゲッター
    ///	@fn				public getGameEndFlag(): number
    ///	@return			ゲーム終了フラグ
    ///	@author			Yuta Yoshinaga
    ///	@date			2018.05.04
    ///
    ////////////////////////////////////////////////////////////////////////////////
    OldMaid.prototype.getGameEndFlag = function () {
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
    OldMaid.prototype.setTheme = function (theme) {
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
    OldMaid.prototype.getTheme = function () {
        return this.theme;
    };
    return OldMaid;
}());
//# sourceMappingURL=OldMaid.js.map