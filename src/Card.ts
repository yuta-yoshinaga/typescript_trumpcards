////////////////////////////////////////////////////////////////////////////////
///	@file			Card.ts
///	@brief			カードクラス
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
var DEF_CARD_TYPE_MIN = DEF_CARD_TYPE_JOKER;
var DEF_CARD_TYPE_MAX = DEF_CARD_TYPE_DIAMOND;

var DEF_CARD_VALUE_JOKER = 0;
var DEF_CARD_VALUE_MIN = 0;
var DEF_CARD_VALUE_MAX = 13;

////////////////////////////////////////////////////////////////////////////////
///	@class		Card
///	@brief		カードクラス
///
////////////////////////////////////////////////////////////////////////////////
class Card
{
	private type: number;										//!< カード種類
	private value: number;										//!< カード値
	private drowFlag: boolean;									//!< カード払い出しフラグ
	private ext: string;										//!< カード拡張情報など(カード別にメッセージを出す場合など)

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
		this.type = DEF_CARD_TYPE_JOKER;
		this.value = DEF_CARD_VALUE_JOKER;
		this.drowFlag = false;
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
	public setType(type: number): void
	{
		if(DEF_CARD_TYPE_MIN <= type && type <= DEF_CARD_TYPE_MAX){
			this.type = type;
		}
	}

	////////////////////////////////////////////////////////////////////////////////
	///	@brief			ゲッター
	///	@fn				public getType(): number
	///	@return			カード種類
	///	@author			Yuta Yoshinaga
	///	@date			2018.05.04
	///
	////////////////////////////////////////////////////////////////////////////////
	public getType(): number
	{
		return this.type;
	}

	////////////////////////////////////////////////////////////////////////////////
	///	@brief			セッター
	///	@fn				public setValue(value: number): void
	///	@param[in]		value: number		カード値
	///	@return			ありません
	///	@author			Yuta Yoshinaga
	///	@date			2018.05.04
	///
	////////////////////////////////////////////////////////////////////////////////
	public setValue(value: number): void
	{
		if(DEF_CARD_VALUE_MIN <= value && value <= DEF_CARD_VALUE_MAX){
			this.value = value;
		}
	}

	////////////////////////////////////////////////////////////////////////////////
	///	@brief			ゲッター
	///	@fn				public getValue(): number
	///	@return			カード値
	///	@author			Yuta Yoshinaga
	///	@date			2018.05.04
	///
	////////////////////////////////////////////////////////////////////////////////
	public getValue(): number
	{
		return this.value;
	}

	////////////////////////////////////////////////////////////////////////////////
	///	@brief			セッター
	///	@fn				public setValue(drowFlag: boolean): void
	///	@param[in]		drowFlag: boolean		カード払い出しフラグ
	///	@return			ありません
	///	@author			Yuta Yoshinaga
	///	@date			2018.05.04
	///
	////////////////////////////////////////////////////////////////////////////////
	public setDrowFlag(drowFlag: boolean): void
	{
		this.drowFlag = drowFlag;
	}

	////////////////////////////////////////////////////////////////////////////////
	///	@brief			ゲッター
	///	@fn				public getDrowFlag(): boolean
	///	@return			カード払い出しフラグ
	///	@author			Yuta Yoshinaga
	///	@date			2018.05.04
	///
	////////////////////////////////////////////////////////////////////////////////
	public getDrowFlag(): boolean
	{
		return this.drowFlag;
	}
	
	////////////////////////////////////////////////////////////////////////////////
	///	@brief			セッター
	///	@fn				public setExt(ext: string): void
	///	@param[in]		ext: string		カード拡張情報など(カード別にメッセージを出す場合など)
	///	@return			ありません
	///	@author			Yuta Yoshinaga
	///	@date			2018.05.04
	///
	////////////////////////////////////////////////////////////////////////////////
	public setExt(ext: string): void
	{
		this.ext = ext;
	}

	////////////////////////////////////////////////////////////////////////////////
	///	@brief			ゲッター
	///	@fn				public getExt(): string
	///	@return			カード拡張情報など(カード別にメッセージを出す場合など)
	///	@author			Yuta Yoshinaga
	///	@date			2018.05.04
	///
	////////////////////////////////////////////////////////////////////////////////
	public getExt(): string
	{
		return this.ext;
	}
}
