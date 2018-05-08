var blackJack = new BlackJack();
$(document).ready(function () {
    setUi();
    $('.btn_field').on('click', '.reset', function () {
        blackJack.gameInit();
        setUi();
    });
    $('.btn_field').on('click', '.hit', function () {
        blackJack.playerHit();
        setUi();
    });
    $('.btn_field').on('click', '.stand', function () {
        blackJack.playerStand();
        setUi();
    });
});

function setUi() {
    $('.trumpcards_field').empty();
    var dc = blackJack.getDealerCards();
    var dcc = blackJack.getDealerCardsCnt();
    var addEle = '<div>'
    addEle += '<div><p clsss="text-center">ディーラー手札</p>'
    addEle += '<p clsss="text-center">スコア ' + (blackJack.getGameEndFlag() ? blackJack.getScore(dc,dcc) : '') + '</p>'
    for(var i = 0; i < dcc; i++){
        if(i == 0 || blackJack.getGameEndFlag()){
            addEle += '<div class="col-xs-3"><image class="img-responsive" src="' + getImagePath(dc[i]) + '" /></div>';
        }else{
            addEle += '<div class="col-xs-3"><image class="img-responsive" src="./images/z01.png" /></div>';
        }
    }
    addEle += '<div class="clearfix"></div></div>'
    $('.trumpcards_field').append(addEle);

    var pc = blackJack.getPlayerCards();
    var pcc = blackJack.getPlayerCardsCnt();
    addEle = '<div>'
    addEle += '<p clsss="text-center">プレイヤー手札</p>'
    addEle += '<p clsss="text-center">スコア ' + blackJack.getScore(pc,pcc) + '</p>'
    for(var i = 0; i < pcc; i++){
        addEle += '<div class="col-xs-3"><image class="img-responsive" src="' + getImagePath(pc[i]) + '" /></div>';
    }
    addEle += '<div class="clearfix"></div></div>'
    $('.trumpcards_field').append(addEle);

    if(blackJack.getGameEndFlag()){
        if(blackJack.gameJudgment() == 1){
            alert('あなたの勝ちです。');
        }else if(blackJack.gameJudgment() == 0){
            alert('引き分けです。');
        }else{
            alert('あなたの負けです。');
        }
    }
}

function getImagePath(card) {
    var resImage = './images/';
    if(card.getType() == DEF_CARD_TYPE_JOKER){
        // *** ジョーカー *** //
        resImage += 'x';
    }else if(card.getType() == DEF_CARD_TYPE_SPADE){
        // *** スペード *** //
        resImage += 's';
    }else if(card.getType() == DEF_CARD_TYPE_CLOVER){
        // *** クローバー *** //
        resImage += 'c';
    }else if(card.getType() == DEF_CARD_TYPE_HEART){
        // *** ハート *** //
        resImage += 'h';
    }else if(card.getType() == DEF_CARD_TYPE_DIAMOND){
        // *** ダイアモンド *** //
        resImage += 'd';
    }
    resImage += String(zeroPadding(card.getValue(),2)) + '.png';
    return resImage;
}

function zeroPadding(num,length){
    return ('0000000000' + num).slice(-length);
}