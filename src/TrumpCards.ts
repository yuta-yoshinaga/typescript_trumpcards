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

var DEF_CARD_CNT = (13 * 4);

////////////////////////////////////////////////////////////////////////////////
///	@class		TrumpCards
///	@brief		トランプカードクラス
///
////////////////////////////////////////////////////////////////////////////////
class TrumpCards
{
	private deck: Card[];										//!< 山札
	private deckDrowCnt: number;								//!< 山札配った枚数
	private deckCnt: number;									//!< 山札枚数

	////////////////////////////////////////////////////////////////////////////////
	///	@brief			コンストラクタ
	///	@fn				public constructor(jokerFlag: boolean)
	///	@param[in]		jokerFlag: boolean		ジョーカー有効フラグ
	///	@return			ありません
	///	@author			Yuta Yoshinaga
	///	@date			2018.05.04
	///
	////////////////////////////////////////////////////////////////////////////////
	public constructor(jokerCnt: number)
	{
		this.deckCnt = DEF_CARD_CNT + jokerCnt;
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
	private cardsInit(): void
	{
		this.deck = new Array();
		for(var i = 0; i < this.deckCnt; i++){
			this.deck[i] = new Card();
			this.deck[i].setDrowFlag(false);
			if(0 <= i && i <= 12){
				// *** スペード *** //
				this.deck[i].setType(DEF_CARD_TYPE_SPADE);
				this.deck[i].setValue(i + 1);
			}else if(13 <= i && i <= 25){
				// *** クローバー *** //
				this.deck[i].setType(DEF_CARD_TYPE_CLOVER);
				this.deck[i].setValue((i- 13) + 1);
			}else if(26 <= i && i <= 38){
				// *** ハート *** //
				this.deck[i].setType(DEF_CARD_TYPE_HEART);
				this.deck[i].setValue((i - 26) + 1);
			}else if(39 <= i && i <= 51){
				// *** ダイアモンド *** //
				this.deck[i].setType(DEF_CARD_TYPE_DIAMOND);
				this.deck[i].setValue((i - 39) + 1);
			}else{
				// *** ジョーカー *** //
				this.deck[i].setType(DEF_CARD_TYPE_JOKER);
				this.deck[i].setValue((i - 52) + 1);
			}
		}
	}
	
	////////////////////////////////////////////////////////////////////////////////
	///	@brief			山札初期化
	///	@fn				private deckInit(): void
	///	@return			ありません
	///	@author			Yuta Yoshinaga
	///	@date			2018.05.04
	///
	////////////////////////////////////////////////////////////////////////////////
	private deckInit(): void
	{
		this.deckDrowFlagInit();
		this.deckDrowCnt = 0;
	}

	////////////////////////////////////////////////////////////////////////////////
	///	@brief			山札ドローフラグ初期化
	///	@fn				private deckDrowFlagInit(): void
	///	@return			ありません
	///	@author			Yuta Yoshinaga
	///	@date			2018.05.04
	///
	////////////////////////////////////////////////////////////////////////////////
	private deckDrowFlagInit(): void
	{
		for(var i = 0; i < this.deckCnt; i++){
			this.deck[i].setDrowFlag(false);
		}
	}

	////////////////////////////////////////////////////////////////////////////////
	///	@brief			山札シャッフルローカル
	///	@fn				private shuffleLocal(array: any): any
	///	@param[in]		array: any
	///	@return			シャッフル済み配列
	///	@author			Yuta Yoshinaga
	///	@date			2018.05.04
	///
	////////////////////////////////////////////////////////////////////////////////
	private shuffleLocal(array: any): any
	{
		var n = array.length, t, i; 
		while (n) {
		  i = Math.floor(Math.random() * n--);
		  t = array[n];
		  array[n] = array[i];
		  array[i] = t;
		}
		return array;
	}
	
	////////////////////////////////////////////////////////////////////////////////
	///	@brief			山札シャッフル
	///	@fn				public shuffle(): void
	///	@return			ありません
	///	@author			Yuta Yoshinaga
	///	@date			2018.05.04
	///
	////////////////////////////////////////////////////////////////////////////////
	public shuffle(): void
	{
		this.deck = this.shuffleLocal(this.deck);
		this.deckDrowFlagInit();
		this.deckDrowCnt = 0;
	}

	////////////////////////////////////////////////////////////////////////////////
	///	@brief			山札配る
	///	@fn				public drowCard(): Card
	///	@return			カードクラス
	///	@author			Yuta Yoshinaga
	///	@date			2018.05.04
	///
	////////////////////////////////////////////////////////////////////////////////
	public drowCard(): Card
	{
		var res: Card = null;
		if(this.deckDrowCnt < this.deckCnt){
			this.deck[this.deckDrowCnt].setDrowFlag(true);
			res = this.deck[this.deckDrowCnt++];
		}
		return res;
	}

	////////////////////////////////////////////////////////////////////////////////
	///	@brief			ゲッター
	///	@fn				public getDeckDrowCnt(): number
	///	@return			山札配った枚数
	///	@author			Yuta Yoshinaga
	///	@date			2018.05.04
	///
	////////////////////////////////////////////////////////////////////////////////
	public getDeckDrowCnt(): number
	{
		return this.deckDrowCnt;
	}
}
