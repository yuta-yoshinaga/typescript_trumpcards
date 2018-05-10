var blackJack = new BlackJack();
var storage = localStorage;
$(document).ready(function () {
    var lblackJack = storage.getItem('blackJack');
    if(lblackJack != null){
        var tmpJson = JSON.parse(lblackJack).theme;
        blackJack.setTheme(tmpJson);
    }else{
        storage.setItem('blackJack',JSON.stringify(blackJack));
    }

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

    $('#appMenuModal').on('click', '.btn-primary', function () {
        var oldTheme = blackJack.getTheme();
        blackJack.setTheme($("#theme .active input").val());
        $('head link[href=".\/css\/theme\/' + oldTheme + '\/bootstrap.min.css"]').remove();
        var addEle = '<link href=".\/css\/theme\/' + blackJack.getTheme() + '\/bootstrap.min.css" rel="stylesheet" media="screen">';
        $('head').append(addEle);          
        setUi();
        storage.setItem('blackJack',JSON.stringify(blackJack));       
        console.log(blackJack);      
    });

    $('#appMenuModal').on('click', '.btn-warning', function () {
        // *** デフォルト設定 *** //
        blackJack.setTheme('Darkly');
        setUi();
    });

    $('#appMenuModal').on('click', '.btn-default', function () {
        // *** キャンセル *** //
        setUi();
    });

    // *** ダイアログクローズイベント *** //
    $('#appMenuModal').on('hidden.bs.modal', function () {
        console.log("appMenuModal close");
	});

});

function setUi() {
    $('#theme input[value="' + blackJack.getTheme() + '"]').parent().addClass('active');
    $('.trumpcards_field').empty();
    var dc = blackJack.getDealerCards();
    var dcc = blackJack.getDealerCardsCnt();
    var addEle = '<div>'
    addEle += '<div><h3 class="card-header">ディーラー手札</h3>'
    addEle += '<h3 class="card-header">スコア ' + (blackJack.getGameEndFlag() ? blackJack.getScore(dc,dcc) : '') + '</h3>'
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
    addEle += '<h3 class="card-header">プレイヤー手札</h3>'
    addEle += '<h3 class="card-header">スコア ' + blackJack.getScore(pc,pcc) + '</h3>'
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