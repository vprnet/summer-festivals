var removed = false;
$('a#remove_past').click(function(event) {
    var pastFests = $('div.past');
    event.preventDefault();
    if (!removed) {
        pastFests.hide();
        removed = true;
        $(this).text('Show Past Festivals');
    } else {
        pastFests.show();
        removed = false;
        $(this).text('Remove Past Festivals');
    }
});

var classical = false,
    folk = false,
    otherFests = $('div.folk'),
    classicalFests = $('div.classical');

$('p#just_classical').click(function(event) {
    if (!classical) {
        classicalFests.show();
        otherFests.hide();
        classical = true;
        folk = false;
        $(this).addClass('active');
        $('p#everything_else').removeClass('active');
        $('p#all_fests').removeClass('active');
    } else {
        otherFests.show();
        classical = false;
        $(this).removeClass('active');
        $('p#all_fests').addClass('active');
    }
});

$('p#everything_else').click(function(event) {
    if (!folk) {
        classicalFests.hide();
        otherFests.show();
        folk = true;
        classical = false;
        $(this).addClass('active');
        $('p#just_classical').removeClass('active');
        $('p#all_fests').removeClass('active');
    } else {
        classicalFests.show();
        folk = false;
        $(this).removeClass('active');
        $('p#all_fests').addClass('active');
    }
});

$('p#all_fests').click(function(event) {
    if (!$(this).hasClass('active')) {
        $(this).addClass('active');
        $('p#just_classical').removeClass('active');
        $('p#everything_else').removeClass('active');
        classicalFests.show();
        otherFests.show();
        folk = false;
        classical = false;
    }
});

function searchFestivals(query) {
    $('#filters').hide();
    $('#reset_results').show();
    var pattern = new RegExp(query, 'gi');
    $('div.festival').find('h2').each(function() {
        var festName = $(this).text(),
            result = pattern.test(festName),
            festival = $(this).parents('div.festival');
        if (!result) {
            festival.hide();
        } else if (result) {
            festival.show();
        }
    });
}

$('form#search_for_festival').on('submit', function(e) {
    var query = $(this).children('input').val();
    searchFestivals(query);
    return false;
});

$('p#full_results').on('click', function() {
    var allFests = $('p#all_fests');

    searchFestivals('');
    $('#filters').show();
    $('#reset_results').hide();
    $('form#search_for_festival').children('input').val('');

    if (!allFests.hasClass('active')) {
        allFests.addClass('active');
        $('p#just_classical').removeClass('active');
        $('p#everything_else').removeClass('active');
        classicalFests.show();
        otherFests.show();
        folk = false;
        classical = false;
    }
});

$('form#search_for_festival button').on('click', function() {
    var query = $(this).parent().siblings('input').val();
    searchFestivals(query);
});

$('p.detail_prompt').on('click', function() {
    var card = $(this).parent();
    showDetail(card);
});

$('div.headline h2').on('click', function() {
    var card = $(this).parent().siblings('.detail');
    showDetail(card);
});

function showDetail(card) {
    card.toggleClass('closed');
    card.toggleClass('opened');
    card.children('p.detail_prompt')
        .children('i.icon').toggleClass('ion-ios7-plus-outline');
    card.children('p.detail_prompt')
        .children('i.icon').toggleClass('ion-ios7-plus');
}

var small_window = false;

function moveMoreInfo() {
    if (!small_window && Modernizr.mq('(max-width: 767px)')) {
        $('#underwriter').insertAfter('.festival:nth-child(3)').hide().fadeIn();
        small_window = true;
    } else if (small_window && Modernizr.mq('(min-width: 768px)')) {
        $('#underwriter').insertBefore('#marcomm').hide().fadeIn();
        small_window = false;
    }
}

$(document).ready(function () {
    moveMoreInfo();
});
