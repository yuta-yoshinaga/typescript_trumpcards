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

var DEF_CARD_CNT = ((13 * 4) + 2);

////////////////////////////////////////////////////////////////////////////////
///	@class		TrumpCards
///	@brief		トランプカードクラス
///
////////////////////////////////////////////////////////////////////////////////
class TrumpCards
{
	private cards: Card[];										//!< カード
	private deck: Card[];										//!< 山札

	////////////////////////////////////////////////////////////////////////////////
	///	@brief			コンストラクタ
	///	@fn				public constructor()
	///	@return			ありません
	///	@author			Yuta Yoshinaga
	///	@date			2018.05.04
	///
	////////////////////////////////////////////////////////////////////////////////
	public constructor()
	{
		this.cardsInit();
		this.shuffle();
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
		this.cards = new Array();
		for(var i = 0; i < DEF_CARD_CNT; i++){
			this.cards[i] = new Card();
			this.cards[i].setDrowFlag(false);
			if(0 <= i && i <= 12){
				// *** スペード *** //
				this.cards[i].setType(DEF_CARD_TYPE_SPADE);
				this.cards[i].setValue(i + 1);
			}else if(13 <= i && i <= 25){
				// *** クローバー *** //
				this.cards[i].setType(DEF_CARD_TYPE_CLOVER);
				this.cards[i].setValue((13 - i) + 1);
			}else if(26 <= i && i <= 38){
				// *** ハート *** //
				this.cards[i].setType(DEF_CARD_TYPE_HEART);
				this.cards[i].setValue((26 - i) + 1);
			}else if(39 <= i && i <= 51){
				// *** ダイアモンド *** //
				this.cards[i].setType(DEF_CARD_TYPE_DIAMOND);
				this.cards[i].setValue((39 - i) + 1);
			}else{
				// *** ジョーカー *** //
				this.cards[i].setType(DEF_CARD_TYPE_JOKER);
				this.cards[i].setValue(DEF_CARD_VALUE_JOKER);
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
		this.deck = new Array();
		for(var i = 0; i < DEF_CARD_CNT; i++){
			this.deck[i] = null;
		}
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
		this.deckInit();
		var exec: number = 0;
		for(;;){
			var point: number = Math.floor(Math.random() * (DEF_CARD_CNT - 1));
			if(this.cards[point].getDrowFlag() == false){
				this.cards[point].setDrowFlag(true);
				this.deck[exec] = this.cards[point];
				exec++;
			}
			if((DEF_CARD_CNT - 1) <= exec) break;
		}
	}
}
