//@codekit-prepend "svg-support.js"

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
        $(this).css("background", "#fc8d59");
        $('p#everything_else').css('background', '#f4faef');
    } else {
        otherFests.show();
        classical = false;
        $(this).css("background", "#fff4ef");
    }
});

$('p#everything_else').click(function(event) {
    if (!folk) {
        classicalFests.hide();
        otherFests.show();
        folk = true;
        classical = false;
        $(this).css("background", "#91cf60");
        $('p#just_classical').css('background', '#fff4ef');
    } else {
        classicalFests.show();
        folk = false;
        $(this).css("background", "#f4faef");
    }
});

function searchFestivals(query) {
    var pattern = new RegExp(query, 'gi');
    $('div.festival').find('a').each(function() {
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

$('form#search_for_festival button').on('click', function() {
    var query = $(this).parent().siblings('input').val();
    console.log(query);
    searchFestivals(query);
});

$('p.detail_prompt').on('click', function() {
    $(this).parent().siblings('.detail').toggleClass('hidden');
});
